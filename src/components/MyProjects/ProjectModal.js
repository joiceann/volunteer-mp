import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import LocationOn from '@material-ui/icons/LocationOn'
import Home from '@material-ui/icons/Home'
import OfflineBolt from '@material-ui/icons/OfflineBolt'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import DateRangeIcon from '@material-ui/icons/DateRange'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun'
import BeenhereIcon from '@material-ui/icons/Beenhere'
import FilterListIcon from '@material-ui/icons/FilterList';
import DeleteIcon from '@material-ui/icons/Delete'
import FlagIcon from '@material-ui/icons/Flag'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import FeedbackIcon from '@material-ui/icons/Feedback';
import RoomIcon from '@material-ui/icons/Room';
import WarningIcon from '@material-ui/icons/Warning';
import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import './my_projects.css'
import colors from '../../colors'
import { width } from '@material-ui/system';
import ProjectVolunteerItem from './ProjectVolunteerItem';
import CustomDialog from './CustomDialog';
import { LEAVE_PROJECT, EDIT_PROJECT, SAVE_CHANGES, REMOVE_PROJECT, EDIT_PROJECT_CLOSE, volunteerRemovalSuccess, SERVER_ERROR, FINISH_PROJECT, LEAVE_PROJECT_TEXT, LEAVE_PROJECT_TITLE, DIALOG_GENERIC_NO, DIALOG_GENERIC_YES, REMOVE_PROJECT_TITLE, REMOVE_PROJECT_TEXT, FINISH_PROJECT_TITLE, FINISH_PROJECT_TEXT, volunteerEnroledSuccess, ENROLL_TITLE, ENROLL_TEXT, ENROLL_TO_PROJECT, starsAverage, LOCATION_FILTER, DOWNLOAD_CSV, DOWNLOAD_CSV_USER_LIST, ENROLL_TEXT_NOT_LOGGED } from './MyProjectsConstants';
import { enrollOrOptOutFromProject, createAxiosCancelToken, getUserInfoByToken, deleteProject, updateProjectState, getProjectEvaluations, getVolunteersWorkingTimes, getONGInfo, getONGInfoById, getAllVolunteerTasksForProject } from './MyProjectsProvider';
import VolunteerEvaluationItem from './VolunteerEvaluationItem';
import GeoLocationItem from './GeoLocationItem';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import image1 from './images/image1.jpg'
import image2 from './images/image2.jpg'
import image3 from './images/image3.jpg'
import image4 from './images/image4.jpg'
import image5 from './images/image5.jpg'
import image6 from './images/image6.jpg'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import en from './../../lang/en'
import es from './../../lang/es'
import counterpart from 'counterpart';
import Translate from 'react-translate-component';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import EditProject from '../Projects/EditProject';
import ProjectVolunteerServiceHours from './ProjectVolunteerServiceHours';
import { YellowButton } from '../CommonComponents';

import { Redirect } from "react-router-dom"

counterpart.registerTranslations('en', en);
counterpart.registerTranslations('es', es);
counterpart.setLocale(localStorage.getItem('lang'));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CustomAppBar = styled(AppBar)`
  position: relative;
  color: ${colors.fg};
  background-color: ${colors.main};
`

const Filler = styled.div`
  flex-grow: 1;
`;

const tileData = [
    {
        img: image1,
        title: 'Image',
        author: 'author',
        cols: 2,
    },
    {
        img: image2,
        title: 'Image',
        author: 'author',
        cols: 2,

    }, {
        img: image3,
        title: 'Image',
        author: 'author',
        cols: 2,
    },
    {
        img: image4,
        title: 'Image',
        author: 'author',
        cols: 2,
    },
    {
        img: image5,
        title: 'Image',
        author: 'author',
        cols: 2,
    },
    {
        img: image6,
        title: 'Image',
        author: 'author',
        cols: 2,
    }

];

export default class ProjectModal extends Component {
    constructor(props) {
        super(props)

        console.log((new Date()).toISOString())

        this.state = {
            showLocation: false,
            editMode: false,
            volunteers: this.props.project.volunteers,
            axiosCancelTokenSource: createAxiosCancelToken(),
            openDialog: false,
            dialogOptions: null,
            volunteerIsEnroled: false,
            volunteerAccepted: null,

            datePickerOrigin: new Date(),
            datePickerEnd: new Date(),
            datePickerOriginServiceHours: new Date(),
            datePickerEndServiceHours: new Date((new Date()).setDate((new Date()).getDate() + 1)),

            evaluations: [],
            initialGeoLocations: [
                { volunteer: { name: 'Berta Esquivel', id: "5dc76b5ca6d3306ba4f724a7" }, date: '2019-11-19', coordinates: { lat: 14.636100, long: -90.523556 }, address: '1a Avenida A, Guatemala 01003, Guatemala' },
                { volunteer: { name: 'Caridad Quiros', id: "5dc76b5ca6d3306ba4f724a5" }, date: '2019-10-12', coordinates: { lat: 14.635459, long: -90.514853 }, address: '6A Av (Paseo de la Sexta) 440, Guatemala' },
                { volunteer: { name: 'Berta Esquivel', id: "5dc76b5ca6d3306ba4f724a7" }, date: '2019-11-15', coordinates: { lat: 14.631392, long: -90.523726 }, address: '19 Calle 21, Guatemala' }
            ],
            geoLocations: [
                { volunteer: { name: 'Berta Esquivel', id: "5dc76b5ca6d3306ba4f724a7" }, date: '2019-11-19', coordinates: { lat: 14.636100, long: -90.523556 }, address: '1a Avenida A, Guatemala 01003, Guatemala' },
                { volunteer: { name: 'Caridad Quiros', id: "5dc76b5ca6d3306ba4f724a5" }, date: '2019-10-12', coordinates: { lat: 14.635459, long: -90.514853 }, address: '6A Av (Paseo de la Sexta) 440, Guatemala' },
                { volunteer: { name: 'Berta Esquivel', id: "5dc76b5ca6d3306ba4f724a7" }, date: '2019-11-15', coordinates: { lat: 14.631392, long: -90.523726 }, address: '19 Calle 21, Guatemala' }
            ],
            volunteerHours: [
                { volunteer: { name: 'Berta Esquivel', id: "5dc76b5ca6d3306ba4f724a7" }, serviceHours: 40 },
                { volunteer: { name: 'Caridad Quiros', id: "5dc76b5ca6d3306ba4f724a5" }, serviceHours: 30 }
            ],

            locationsVolunteersSelector: null,
            locationsVolunteerSelectorSelected: "",

            ongInfo: null,
        }

        this.onHandleProjectVolunteerRemoval = this.onHandleProjectVolunteerRemoval.bind(this)
        this.onHandleProjectVolunteerRoleChange = this.onHandleProjectVolunteerRoleChange.bind(this)
    }

    setVolunteersFromLocations = (geoLocations) => {
        if (geoLocations.size !== null) {
            const volunteersIds = geoLocations.map(location => {
                return location.volunteer.id
            })

            const uniqueVolunteersIds = [...new Set(volunteersIds)]
            console.log(uniqueVolunteersIds)
            const locationsVolunteersSelector = uniqueVolunteersIds.map(id => {
                let vol = null
                geoLocations.forEach(loc => {
                    if (loc.volunteer.id === id) {
                        vol = { id: id, name: loc.volunteer.name !== null ? loc.volunteer.name : id }
                    }
                })

                return vol
            })

            console.log('locationsVolunteersSelector', locationsVolunteersSelector)
            this.setState({ locationsVolunteersSelector })

        } else this.setState({ locationsVolunteersSelector: null })
    }

    componentDidMount = () => {
        const { volunteers, axiosCancelTokenSource, datePickerOriginServiceHours, datePickerEndServiceHours } = this.state
        const { userType } = this.props

        getUserInfoByToken(axiosCancelTokenSource).then(userInfo => {
            const searchVolunteer = volunteers.filter(v => v.id === userInfo._id)
            const volunteerIsEnroled = searchVolunteer.length === 1
            const volunteerAccepted = volunteerIsEnroled ? searchVolunteer[0].accepted ? true : false : null

            console.log('enroled: ', volunteerIsEnroled)
            console.log('accepted: ', volunteerAccepted)
            this.setState({ volunteerIsEnroled, volunteerAccepted })
        })

        getProjectEvaluations(axiosCancelTokenSource, this.props.project._id)
            .then(response => {
                console.log(response)
                this.setState({ evaluations: response })
            }).catch(error => {
                console.log(error)
            })

        const start = datePickerOriginServiceHours.toISOString().substring(0, 10)
        const end = datePickerEndServiceHours.toISOString().substring(0, 10)

        getVolunteersWorkingTimes(axiosCancelTokenSource, this.props.project._id, start, end)
            .then(volunteerHours => {
                console.log(volunteerHours)
                this.setState({ volunteerHours })
            }).catch(error => console.log(error))

        this.setVolunteersFromLocations(this.state.geoLocations)

        getONGInfoById(axiosCancelTokenSource, this.props.project.organizationInfo.id)
            .then(ongInfo => {
                this.setState({ ongInfo })
            })
            .catch(error => console.log(error))
    }

    setDialogOptions = (onAccept, title, content, cancelText, acceptText) => {
        const dialogOptions = {
            onAccept,
            title,
            content,
            cancelText,
            acceptText
        }

        this.setState({ dialogOptions, openDialog: true })

        this.handleEndDateChange = this.handleEndDateChange.bind(this)
        this.handleOriginDateChange = this.handleOriginDateChange.bind(this)
        this.handleEndDateChangeServiceHours = this.handleEndDateChangeServiceHours.bind(this)
        this.handleOriginDateChangeServiceHours = this.handleOriginDateChangeServiceHours.bind(this)
    }

    handleOriginDateChange = (datePickerOrigin) => {
        this.setState({ datePickerOrigin })
    }

    handleEndDateChange = (datePickerEnd) => {
        this.setState({ datePickerEnd })
    }

    handleOriginDateChangeServiceHours = (datePickerOriginServiceHours) => {
        this.setState({ datePickerOriginServiceHours })
    }

    handleEndDateChangeServiceHours = (datePickerEndServiceHours) => {
        this.setState({ datePickerEndServiceHours })
    }

    handleVolunteerOptInOrOut = (option) => {
        const { axiosCancelTokenSource } = this.state

        getUserInfoByToken(axiosCancelTokenSource).then(userInfo => {
            console.log(userInfo)
            enrollOrOptOutFromProject(this.props.project._id, userInfo._id, option, axiosCancelTokenSource).then(response => {
                console.log(response)

                if (option === 2) {
                    this.onHandleProjectVolunteerRemoval(userInfo._id, true)
                    const successMessage = volunteerRemovalSuccess(`${userInfo.name} ${userInfo.lname}`, 'NORMAL')
                    this.setState({ openDialogRemoveVolunteer: false, snackBarOpen: true, snackBarMessage: successMessage, })
                    this.props.onClose()
                } else if (option === 1) {
                    this.props.onHandleRefreshProjects()
                    const successMessage = volunteerEnroledSuccess(`${userInfo.name} ${userInfo.lname}`, 'NORMAL')
                    this.setState({ openDialogRemoveVolunteer: false, snackBarOpen: true, snackBarMessage: successMessage, })
                    this.props.onClose()
                }

            }).catch(error => {
                console.log(error)
                this.setState({ snackBarOpen: true, snackBarMessage: SERVER_ERROR, openDialogRemoveVolunteer: false })
            })
        }).catch(error => {
            console.log(error)
            this.setState({ snackBarOpen: true, snackBarMessage: SERVER_ERROR, openDialogRemoveVolunteer: false })
        })
    }

    handleVolunteerOptOut = () => {
        const { axiosCancelTokenSource } = this.state

        getUserInfoByToken(axiosCancelTokenSource).then(userInfo => {
            console.log(userInfo)
            enrollOrOptOutFromProject(this.props.project._id, userInfo._id, 2, axiosCancelTokenSource).then(response => {
                console.log(response)
                this.onHandleProjectVolunteerRemoval(userInfo._id, true)
                const successMessage = volunteerRemovalSuccess(`${userInfo.name} ${userInfo.lname}`, 'NORMAL')
                this.setState({ openDialogRemoveVolunteer: false, snackBarOpen: true, snackBarMessage: successMessage, })
                this.props.onClose()
            }).catch(error => {
                console.log(error)
                this.setState({ snackBarOpen: true, snackBarMessage: SERVER_ERROR, openDialogRemoveVolunteer: false })
            })
        }).catch(error => {
            console.log(error)
            this.setState({ snackBarOpen: true, snackBarMessage: SERVER_ERROR, openDialogRemoveVolunteer: false })
        })

    }

    handleRemoveProject = () => {
        console.log('removing project')
        const { axiosCancelTokenSource } = this.state

        deleteProject(axiosCancelTokenSource, this.props.project._id).then(response => {
            console.log(response)
            this.props.onHandleRefreshProjects()
            this.props.onClose()
            this.setState({ openDialog: false, dialogOptions: null })
        }).catch(error => {
            console.log(error.response)
            this.props.onHandleRefreshProjects()
            this.props.onClose()
            this.setState({ openDialog: false, dialogOptions: null })
        })
    }

    handleTerminateProject = () => {
        console.log('finishing project')
        const { axiosCancelTokenSource } = this.state

        updateProjectState(axiosCancelTokenSource, this.props.project._id, 2).then(response => {
            console.log(response)
            this.props.onHandleRefreshProjects()
            this.props.onClose()
            this.setState({ openDialog: false, dialogOptions: null })
        }).catch(error => {
            console.log(error.response)
            this.props.onHandleRefreshProjects()
            this.props.onClose()
            this.setState({ openDialog: false, dialogOptions: null })
        })
    }

    handleGetAllTaskHours = () => {
        const { axiosCancelTokenSource } = this.state
        getAllVolunteerTasksForProject(axiosCancelTokenSource, this.props.project._id)
            .then(volunteerHours => {
                console.log(volunteerHours)
                this.setState({ volunteerHours })
            })
            .catch(error => console.log(error))
    }

    onHandleProjectVolunteerRoleChange = (volunteer) => {
        const { volunteers } = this.state
        const newVolunteers = volunteers.map(v => {
            if (v.id !== volunteer.id) {
                return v
            } else return volunteer
        })

        this.updateProjectAfterAction('volunteers', newVolunteers)

        this.setState({ volunteers: newVolunteers })
    }

    onHandleProjectVolunteerRemoval = (volunteerId, optingOut = false) => {
        console.log(`removing ${volunteerId}`)
        const { volunteers } = this.state
        const newVolunteers = volunteers.filter(volunteer => volunteer.id !== volunteerId)

        this.updateProjectAfterAction('volunteers', newVolunteers, optingOut)

        this.setState({ volunteers: newVolunteers })
    }

    updateProjectAfterAction = (property, newValue, optingOut = false) => {
        const project = this.props.project
        project[property] = newValue
        this.props.onHandleProjectUpdate(project, optingOut)
    }

    handleFilterLocations = () => {
        this.setState({ geoLocations: [] })
    }

    handleFilterServiceHours = () => {
        const { datePickerOriginServiceHours, datePickerEndServiceHours, axiosCancelTokenSource } = this.state

        const start = datePickerOriginServiceHours.toISOString().substring(0, 10)
        const end = datePickerEndServiceHours.toISOString().substring(0, 10)

        this.setState({ volunteerHours: [] })
        getVolunteersWorkingTimes(axiosCancelTokenSource, this.props.project._id, start, end)
            .then(volunteerHours => {
                console.log(volunteerHours)
                this.setState({ volunteerHours })
            }).catch(error => console.log(error))

    }

    handleLocationsSelectorOnSelect = (e) => {
        const { initialGeoLocations } = this.state
        let geoLocations = initialGeoLocations

        if (e.target.value !== "") {
            geoLocations = initialGeoLocations.filter(location => location.volunteer.id === e.target.value)
        }

        this.setState({ locationsVolunteerSelectorSelected: e.target.value, geoLocations })
    }

    handleLocationsCSVDownload = () => {
        const { geoLocations } = this.state

        const rows = [['volunteer', 'date', 'latitude', 'longitude', 'address']]
        geoLocations.forEach(location => {
            const row = [location.volunteer.name || 'Anonymous', location.date, location.coordinates.lat, location.coordinates.long, location.address]
            rows.push(row)
        })

        const csv = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n")
        var encodedUri = encodeURI(csv)
        var link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "locations.csv")
        document.body.appendChild(link)

        link.click()
    }

    handleVolunteersInfoCSVDownload = () => {
        const { volunteers } = this.state

        const rows = [['name', 'nationality', 'role', 'phone']]
        volunteers.forEach(volunteer => {
            const row = [volunteer.name, volunteer.nationality, volunteer.role === 1 ? 'coordinator' : 'volunteer', volunteer.phone]
            rows.push(row)
        })

        const csv = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n")
        var encodedUri = encodeURI(csv)
        var link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "volunteers.csv")
        document.body.appendChild(link)

        link.click()
    }

    handleServiceHoursCSVDownload = () => {
        const { volunteerHours } = this.state

        const rows = [['name', 'hours', 'task']]
        volunteerHours.forEach(volunteer => {
            const row = [volunteer.volunteer.name, volunteer.serviceHours, volunteer.title ? volunteer.title : 'N/A']
            rows.push(row)
        })

        const csv = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n")
        var encodedUri = encodeURI(csv)
        var link = document.createElement("a")
        link.setAttribute("href", encodedUri)
        link.setAttribute("download", "volunteer-service-hours.csv")
        document.body.appendChild(link)

        link.click()
    }

    render = () => {
        const {
            showLocation,
            editMode,
            volunteers,
            openDialog,
            dialogOptions,
            volunteerIsEnroled,
            evaluations,
            geoLocations,
            datePickerEnd,
            datePickerOrigin,
            datePickerEndServiceHours,
            datePickerOriginServiceHours,
            locationsVolunteersSelector,
            locationsVolunteerSelectorSelected,
            volunteerHours,
            volunteerAccepted,
            ongInfo
        } = this.state
        const { userType } = this.props
        console.log(locationsVolunteersSelector)
        const lat = 14.601065
        const long = -90.688039
        console.log(`userType from modal is ${userType}`)

        const showVolunteers = userType === '2' ? true :
            volunteerAccepted === true

        return (
            <div style={{ height: '1200px' }}>
                {
                    this.state.redirectToLogin === true &&
                    <Redirect to={{ pathname: '/login' }} />
                }
                <CustomAppBar>
                    <Toolbar>
                        <Typography variant="h6" className='josefin-bold'>
                            <Translate content="projectDetails" />
                        </Typography>
                        <Filler />
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={this.props.onClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </CustomAppBar>

                <Grid container style={{ marginTop: '40px' }}>
                    <Grid item justify="space-around" xs={8} style={{ display: 'flex', alignContent: 'center' }}>
                        <Card style={{ width: '80%' }}>
                            <CardMedia
                                style={{ height: '350px' }}
                                image={this.props.project.photo[0]}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Grid container spacing={3} style={{ marginBottom: 20 }}>
                                    <Grid item xs={12}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Typography variant="h4" className='project-name-text'>
                                                {this.props.project.name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Home style={{ marginRight: 20, marginLeft: 60 }} />
                                    {/* {
                                    this.props.project.organinfo &&
                                    <p style={{ padding: 5, margin: 0 }} className='project-desc-text'>{this.props.project.organinfo.name}</p>
                                } */}
                                    {
                                        this.props.project.organizationInfo &&
                                        <Typography variant='body1' className='project-desc-text'>
                                            {this.props.project.organizationInfo.name}
                                        </Typography>

                                    }
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <EmojiPeopleIcon style={{ marginRight: 20, marginLeft: 60 }} />
                                    <Typography variant='body1' className='project-desc-text'>
                                        <Translate content='minimumAge' />:
                                            </Typography>

                                    {/* {
                                    this.props.project.mage &&
                                    <p style={{ padding: 5, margin: 0 }} className='project-desc-text'>{this.props.project.mage}</p>
                                } */}
                                    {
                                        this.props.project.minAge &&
                                        <Typography variant='body1' className='project-desc-text'>
                                            {this.props.project.minAge}
                                        </Typography>
                                    }
                                    {/* {
                                    this.props.project.maxAge &&
                                    <p style={{ padding: 5, margin: 0 }} className='project-desc-text'>{this.props.project.maxAge}</p>
                                } */}
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <LocationOn style={{ marginRight: 20, marginLeft: 60 }} />
                                    <Typography variant='body1' className='project-desc-text'>
                                        {this.props.project.address}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <OfflineBolt style={{ marginRight: 20, marginLeft: 60 }} />
                                    <Typography variant='body1' className='project-desc-text'>
                                        {
                                            this.props.project.state === 1 ? 'Active' :
                                                this.props.project.state === 2 ? 'Ended' :
                                                    this.props.project.state === 3 ? 'Canceled' :
                                                        this.props.project.state === 4 ? 'New and recruiting' : ''
                                        }
                                    </Typography>

                                </Grid>
                                <Grid item xs={12} sm={12} md={8} lg={8} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <DateRangeIcon style={{ marginRight: 20, marginLeft: 60 }} />
                                    {/* {
                                    this.props.project.fdate &&
                                    <p style={{ padding: 5, margin: 0 }} className='project-desc-text'>{`${(new Date(this.props.project.sdate)).toDateString()} through ${(new Date(this.props.project.fdate)).toDateString()}`}</p>
                                } */}
                                    {
                                        this.props.project.finalDate &&
                                        <Typography variant='body1' className='project-desc-text'>
                                            {`${(new Date(this.props.project.startDate)).toDateString()} through ${(new Date(this.props.project.finalDate)).toDateString()}`}
                                        </Typography>

                                    }
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', flexDirection: 'row' }}>
                                    <DateRangeIcon style={{ marginRight: 20, marginLeft: 60 }} />
                                    <Typography variant='body1' className='project-desc-text'>
                                        <Translate content='inscriptionPeriod' /> :
                                            </Typography>

                                    {/* {
                                    this.props.project.fdatei &&
                                    <p style={{ padding: 5, margin: 0 }} className='project-desc-text'>{`${(new Date(this.props.project.sdatei)).toDateString()} through ${(new Date(this.props.project.fdatei)).toDateString()}`}</p>
                                } */}
                                    {
                                        this.props.project.finalDateInscription &&
                                        <Typography variant='body1' className='project-desc-text'>
                                            {`${(new Date(this.props.project.startDateInscription)).toDateString()} through ${(new Date(this.props.project.finalDateInscription)).toDateString()}`}
                                        </Typography>
                                    }
                                </Grid>
                                {
                                    volunteerAccepted !== null &&
                                    <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
                                        <DateRangeIcon style={{ marginRight: 20, marginLeft: 60 }} />
                                        {
                                            volunteerAccepted === true &&
                                            <Typography variant='body1' className='project-desc-text'>
                                                <Translate content='accepted' />
                                            </Typography>

                                        }
                                        {
                                            volunteerAccepted === false &&
                                            <Typography variant='body1' className='project-desc-text'>
                                                <Translate content='application' />
                                            </Typography>

                                        }
                                    </Grid>
                                }


                                {
                                    this.props.project.description &&
                                    <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', flexDirection: 'row' }}>
                                        <p style={{ color: '#000', padding: '5%' }} className='project-desc-text project-desc-text-height'>{this.props.project.description}</p>
                                    </Grid>
                                }

                            </CardContent>
                        </Card>

                    </Grid>
                    <Grid item justify="space-around" xs={4}>
                        {
                            // USER_TYPE = NORMAL
                            userType === '1' && volunteerIsEnroled &&
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center', width: '90%' }}>
                                <Button onClick={
                                    () => this.setDialogOptions(
                                        () => this.handleVolunteerOptInOrOut(2),
                                        LEAVE_PROJECT_TITLE,
                                        LEAVE_PROJECT_TEXT,
                                        DIALOG_GENERIC_NO,
                                        DIALOG_GENERIC_YES
                                    )
                                } variant='contained' className='projects-leave-btn'><DirectionsRunIcon className='icon-btn' />{LEAVE_PROJECT}</Button>
                            </Grid>
                        }
                        {
                            // USER_TYPE = NORMAL
                            userType === '1' && !volunteerIsEnroled &&
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center', width: '90%' }}>
                                <Button onClick={
                                    () => this.setDialogOptions(
                                        () => this.handleVolunteerOptInOrOut(1),
                                        ENROLL_TITLE,
                                        ENROLL_TEXT,
                                        DIALOG_GENERIC_NO,
                                        DIALOG_GENERIC_YES
                                    )
                                } variant='contained' className='projects-enroll-btn'><BeenhereIcon className='icon-btn' />{ENROLL_TO_PROJECT}</Button>
                            </Grid>
                        }
                        {
                            // USER_TYPE = NOT_LOGGED
                            userType === 'NOT_LOGGED' &&
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center', width: '90%' }}>
                                <Button onClick={
                                    () => this.setDialogOptions(
                                        () => this.setState({ redirectToLogin: true }),
                                        ENROLL_TITLE,
                                        ENROLL_TEXT_NOT_LOGGED,
                                        DIALOG_GENERIC_NO,
                                        'OK'
                                    )
                                } variant='contained' className='projects-enroll-btn'><BeenhereIcon className='icon-btn' />{ENROLL_TO_PROJECT}</Button>
                            </Grid>
                        }
                        {/* {
                                userType === '2' &&
                                ONG
                            } */}
                        {
                            userType === '2' &&
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center', width: '90%' }}>
                                <Button onClick={
                                    () => this.setDialogOptions(
                                        () => this.handleRemoveProject(),
                                        REMOVE_PROJECT_TITLE,
                                        REMOVE_PROJECT_TEXT,
                                        DIALOG_GENERIC_NO,
                                        DIALOG_GENERIC_YES
                                    )
                                } variant='contained' className='projects-leave-btn'><DeleteIcon className='icon-btn' />{REMOVE_PROJECT}</Button>
                            </Grid>

                        }
                        {
                            userType === '2' &&
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center', width: '90%' }}>
                                <Button onClick={
                                    () => this.setDialogOptions(
                                        () => this.handleTerminateProject(),
                                        FINISH_PROJECT_TITLE,
                                        FINISH_PROJECT_TEXT,
                                        DIALOG_GENERIC_NO,
                                        DIALOG_GENERIC_YES
                                    )
                                } variant='contained' className='projects-leave-btn'><FlagIcon className='icon-btn' />{FINISH_PROJECT}</Button>
                            </Grid>
                        }
                        {
                            userType === '2' &&
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', justifyContent: 'center', width: '90%' }}>
                                <Button onClick={() => this.setState({ editMode: !editMode })} variant='contained' className='projects-edit-btn'><PeopleAltIcon className='icon-btn' />{!editMode ? EDIT_PROJECT : EDIT_PROJECT_CLOSE}</Button>
                            </Grid>
                        }
                        {/* {
                                editMode &&
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Button onClick={() => {}} variant='contained' className='projects-save-btn'>{SAVE_CHANGES}</Button>
                                </Grid>
                            } */}

                        {
                            userType === '1' &&
                            ongInfo &&
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'block', justifyContent: 'center', width: '90%', marginTop: '20px' }}>
                                <Card>

                                    <CardContent>
                                        <h3 style={{ padding: '10%', paddingBottom: '2%', paddingTop: '2%', textAlign: 'left', color: '#000' }} className='project-name-text'><Home /> <Translate content='ongInfo' />  </h3>

                                        <Typography variant='body2' className='project-desc-text project-desc-text-height' component="p" style={{ color: '#000', paddingLeft: '8%', paddingRight: '8%' }}>
                                            <Translate content='ongName' />: {ongInfo.name || 'N/A'}
                                        </Typography>
                                        <Typography variant='body2' className='project-desc-text project-desc-text-height' component="p" style={{ color: '#000', paddingLeft: '8%', paddingRight: '8%' }}>
                                            <Translate content='phone' />: {ongInfo.phone || 'N/A'}
                                        </Typography>
                                        <Typography variant='body2' className='project-desc-text project-desc-text-height' component="p" style={{ color: '#000', paddingLeft: '8%', paddingRight: '8%' }}>
                                            <Translate content='address' />: {ongInfo.address || 'N/A'}
                                        </Typography>
                                        <Typography variant='body2' className='project-desc-text project-desc-text-height' component="p" style={{ color: '#000', paddingLeft: '8%', paddingRight: '8%' }}>
                                            Website: {ongInfo.website || 'N/A'}
                                        </Typography>
                                        <Typography variant='body2' className='project-desc-text project-desc-text-height' component="p" style={{ color: '#000', paddingLeft: '8%', paddingRight: '8%' }}>
                                            <Translate content='email' />: {ongInfo.email || 'N/A'}
                                        </Typography>

                                        <Grid item xs={12} sm={12} md={12} lg={12} style={{ display: 'flex', flexDirection: 'row', color: '#000', paddingLeft: '5%', paddingRight: '5%', marginTop: '25px' }} component="p">
                                            <Typography variant='body2' className='project-desc-text project-desc-text-height' >
                                                {ongInfo.bio || 'NA'}
                                            </Typography>
                                        </Grid>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <h3 style={{ marginTop: '0%', paddingLeft: '10%', textAlign: 'left', color: '#000' }} className='project-name-text'><Home />
                                            <Translate content='about' />   {this.props.project.address}
                                        </h3>
                                        <Typography variant='body2' className='project-desc-text project-desc-text-height' style={{ display: 'flex', flexDirection: 'row', color: '#000', paddingLeft: '5%', paddingRight: '5%' }}>
                                            Izabal cuenta con Rio Dulce uno de los encantos de Guatemala. Tiene conexión con el Lago de Izabal y con el Mar Caribe. Tiene más de 33 millas donde conviven gran variedad de especies marinas. Es uno de los principales destinos turísticos para los visitantes que llegan a conocer Guatemala. En esta misma zona de Río Dulce vale la pena conocer otros sitios de interés: Castillo de San Felipe,  Lagunitas Salvador, Siete Altares…y en especial la ciudad de Livingston. Ésta última es una pequeña ciudad garífuna, situada en la desembocadura del Río.
                                        </Typography>
                                        <CardMedia
                                            style={{ height: '150px', width: '350px', margin: 'auto', marginTop: '10px' }}
                                            image={this.props.project.photo[1]}
                                            title={this.props.project.address}
                                        />
                                    </CardContent>
                                    <div style={{display:'flex', justifyContent:'center', marginBottom:'20px'}}>
                                    <YellowButton onClick={() => this.setState({ showLocation: true })} style={{width:'60%'}}>
                                        Ver en mapa
                                    </YellowButton>

                                    </div>

                                    


                                </Card>
                            </Grid>
                        }

                    </Grid>

                </Grid>
                {
                    showLocation &&
                    <Dialog TransitionComponent={Transition} open={showLocation} onClose={() => this.setState({ showLocation: false })}>

                        <div style={{ width: 600, height: 600 }}>
                            <iframe
                                width="600"
                                height="100%"
                                src={`https://maps.google.com/maps?q=${lat}+${long}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                            >
                            </iframe>
                            {
                                this.props.project.address &&
                                <p className='josefin-bold' style={{ textAlign: 'center', position: 'absolute', padding: '2%', top: 100, left: 10, width: 280, backgroundColor: '#fff', color: '#000', zIndex: 30 }}>{this.props.project.address}</p>
                            }
                        </div>


                    </Dialog>
                }

                <Grid container spacing={3} justify="space-around" xs={12} style={{ marginTop: "20px" }}>

                    <Grid item xs={12} sm={8}>
                        <GridList cellHeight={160} cols={8} style={{ padding: 2 }}>
                            {tileData.map((tile) => (
                                <GridListTile key={tile.img} cols={tile.cols || 5}>
                                    <img src={tile.img} alt={tile.title} />
                                </GridListTile>
                            ))}
                        </GridList>

                    </Grid>

                    {
                        !this.props.publicMode &&
                        showVolunteers &&
                        <Grid item xs={12} sm={4} >
                            <Card style={{ width: "100%" }}>
                                <h2 style={{ padding: '10%', paddingBottom: '5%', paddingTop: '2%', textAlign: 'left', color: '#000' }} className='project-name-text'><EmojiPeopleIcon /> Enroled volunteers</h2>

                                {
                                    userType === '2' &&
                                    <div className='inner-grid' style={{ width: '100%' }}>
                                        <Button style={{ width: '80%', marginTop: '2%' }} onClick={() => this.handleVolunteersInfoCSVDownload()} variant='contained' className='projects-enroll-btn'><PeopleAltIcon className='icon-btn' />{DOWNLOAD_CSV_USER_LIST}</Button>
                                    </div>
                                }

                                <List style={{ maxHeight: 400, position: 'relative', overflow: 'auto', width: '100%' }}>
                                    {
                                        volunteers.map((volunteer, index) => {
                                            return (
                                                <ProjectVolunteerItem projectId={this.props.project._id} onHandleProjectVolunteerRemoval={this.onHandleProjectVolunteerRemoval} onHandleProjectVolunteerRoleChange={this.onHandleProjectVolunteerRoleChange} key={index} volunteer={volunteer} editMode={editMode} />
                                            )
                                        })
                                    }
                                </List>
                            </Card>
                        </Grid>

                    }

                </Grid>
                {
                    openDialog &&
                    <CustomDialog
                        open={openDialog}
                        onClose={() => this.setState({ openDialog: false, dialogOptions: null })}
                        onAccept={dialogOptions.onAccept}
                        title={dialogOptions.title}
                        content={dialogOptions.content}
                        cancelText={dialogOptions.cancelText}
                        acceptText={dialogOptions.acceptText}
                    />

                }

            </div >
        )
    }
}