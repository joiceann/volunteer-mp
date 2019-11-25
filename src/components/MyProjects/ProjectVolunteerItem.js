import React, { Component } from 'react'
import {
    Typography,
    Paper,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
  } from '@material-ui/core'
import { limitTextToCertainLength, volunteerRemovalSuccess, COORDINATOR_LABEL, settingCoordinatorMessage, REMOVE_VOLUNTEER_DIALOG_TITLE, REMOVE_VOLUNTEER_DIALOG_CONTENT, REMOVE_VOLUNTEER_DIALOG_CANCEL_TEXT, REMOVE_VOLUNTEER_DIALOG_ACCEPT_TEXT, SERVER_ERROR, VOLUNTEER_ITEM_COORDINATOR_PLACEHOLDER, VOLUNTEER_ITEM_ACCEPTED_VOLUNTEER } from './MyProjectsConstants';
import CloseIcon from '@material-ui/icons/Close';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import CustomDialog from './CustomDialog';
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import MoreIcon from '@material-ui/icons/More';
import { createAxiosCancelToken, updateVolunteerRole, enrollOrOptOutFromProject, acceptVolunteer, getUserInfoById } from './MyProjectsProvider';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class ProjectVolunteerItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            coordinator: this.props.volunteer.role === 1 ? true : false,
            accepted: this.props.volunteer.accepted ? true : false,
            snackBarOpen: false,
            snackBarMessage: '',
            openDialogRemoveVolunteer: false,
            axiosCancelTokenSource: createAxiosCancelToken(),
            showVolunteerInfo: false,
            volunteerFetchedInfo: null
        }

        this.handleSnackBarOpen = this.handleSnackBarOpen.bind(this)
        this.handleVolunteerRemoval = this.handleVolunteerRemoval.bind(this)
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({ coordinator: nextProps.volunteer.role === 1 ? true : false })
    }

    handleVolunteerRoleChange = (checked) => {
        const { axiosCancelTokenSource } = this.state
        const snackBarMessage = settingCoordinatorMessage(this.props.volunteer.name, checked)
        
        const volunteer = this.props.volunteer
        volunteer.role = checked ? 1 : 0
        
        updateVolunteerRole(this.props.projectId, volunteer.id, volunteer.role, axiosCancelTokenSource).then(response => {
            console.log('updateVolunteerRole response', response)
            this.props.onHandleProjectVolunteerRoleChange(volunteer)
            this.setState({ coordinator: checked, snackBarOpen: true, snackBarMessage })
        }).catch(error => {
            console.log(error)
            this.setState({ snackBarOpen: true, snackBarMessage: SERVER_ERROR })
        })

    }

    handleVolunteerAcceptance = (checked) => {
        const { axiosCancelTokenSource } = this.state

        const volunteer = this.props.volunteer
        volunteer.accepted = checked ? true : false

        acceptVolunteer(
            axiosCancelTokenSource, 
            this.props.projectId, 
            volunteer.id, 
            volunteer.accepted ? 1 : 0
        )
            .then(response => {
                console.log(response)
                this.props.onHandleProjectVolunteerRoleChange(volunteer)
                this.setState({ accepted: checked })
            }).catch(error => {
                console.log(error)
                this.setState({ snackBarOpen: true, snackBarMessage: SERVER_ERROR })
            })

    }

    handleSnackBarOpen = (event) => {
        this.setState({ snackBarOpen: false })
    }

    handleVolunteerRemoval = () => {     
        const { axiosCancelTokenSource } = this.state
        
        enrollOrOptOutFromProject(this.props.projectId, this.props.volunteer.id, 2, axiosCancelTokenSource).then(response => {
            console.log(response)
            this.props.onHandleProjectVolunteerRemoval(this.props.volunteer.id)
            const successMessage = volunteerRemovalSuccess(this.props.volunteer.name, 'ONG')
            this.setState({ openDialogRemoveVolunteer: false, snackBarOpen: true, snackBarMessage: successMessage, })
        }).catch(error => {
            console.log(error)
            this.setState({ snackBarOpen: true, snackBarMessage: SERVER_ERROR, openDialogRemoveVolunteer: false })
        })

    }

    componentDidMount = () => {
        const { axiosCancelTokenSource } = this.state
        const { volunteer } = this.props        

        getUserInfoById(axiosCancelTokenSource, volunteer.id).then(info => {
            console.log(info)
            this.setState({ volunteerFetchedInfo: info })
        }).catch(error => console.log(error))
    }

    componentWillUnmount = () => {
        const { axiosCancelTokenSource } = this.state

        // cancel all concurrent subscriptions
        axiosCancelTokenSource.cancel()
    }

    render = () => {
        const { coordinator, snackBarOpen, snackBarMessage, openDialogRemoveVolunteer, accepted, showVolunteerInfo, volunteerFetchedInfo } = this.state
        const { volunteer, editMode } = this.props

        return(
            <ListItem style={{ width: '100%', paddingLeft: '10%', paddingRight: '10%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        {
                            volunteer.photo &&
                            <ListItemAvatar>
                                <Avatar src={volunteer.photo} />
                            </ListItemAvatar>
                        }
                        {
                            !volunteer.photo &&
                            <ListItemAvatar>
                                <Avatar>
                                    {`${volunteer.name && volunteer.name[0]}`}
                                </Avatar>
                            </ListItemAvatar>
                        }
                    </Grid>
                    <Grid style={{ flexDirection: 'row' }} onClick={ editMode ? () => this.setState({ showVolunteerInfo: true }) : () => {} } item xs={4} sm={4} md={4} lg={4} className={`${editMode ? 'icon-pointer inner-grid' : 'inner-grid'}`}>
                        {
                            editMode &&
                            <MoreIcon style={{ marginRight: 10 }}/>
                        }
                        {
                            volunteer.name &&
                            <p className='josefin-regular'>{ limitTextToCertainLength(volunteer.name, 30) }</p> 
                        }
                        {
                            !volunteer.name &&
                            <p className='josefin-regular'>{ volunteer.id }</p> 
                        }
                    </Grid>
                    {
                        editMode &&
                        <Grid item xs={2} sm={2} md={2} lg={2} className='inner-grid'>
                            <p style={{ fontSize: 8 }}>{VOLUNTEER_ITEM_ACCEPTED_VOLUNTEER}</p>
                            <Switch checked={accepted} onChange={(e) => this.handleVolunteerAcceptance(e.target.checked)} />                            
                        </Grid>
                    }
                    {
                        editMode &&
                        <Grid item xs={2} sm={2} md={2} lg={2} className='inner-grid'>
                            <p style={{ fontSize: 8 }}>{VOLUNTEER_ITEM_COORDINATOR_PLACEHOLDER}</p>
                            <Switch checked={coordinator} onChange={(e) => this.handleVolunteerRoleChange(e.target.checked)} />
                            {/* <FormGroup row>
                                <FormControlLabel
                                    control = {
                                        <Switch checked={volunteer.role} onChange={(e) => this.handleVolunteerRoleChange(e.target.checked)} />
                                    }
                                    label={COORDINATOR_LABEL}
                                    className='josefin-regular'
                                />
                            </FormGroup>                */}
                        </Grid>
                    }
                    {
                        editMode &&
                        <Grid item xs={2} sm={2} md={2} lg={2} className='inner-grid'>
                            <CloseIcon className='icon-pointer' onClick={() => this.setState({ openDialogRemoveVolunteer: true })}/>
                        </Grid>
                    }
                </Grid>
                <Snackbar 
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    
                    open={snackBarOpen}
                    autoHideDuration={3000}
                    onClose={this.handleSnackBarOpen}
                >
                    <SnackbarContent 
                        message={
                            <span style={{ display: 'flex', alignItems: 'center' }}>{snackBarMessage}</span>
                        }
                        style={{ backgroundColor: '#06A10B' }}
                    />
                </Snackbar>
                <CustomDialog 
                    open={openDialogRemoveVolunteer}
                    onClose={() => this.setState({ openDialogRemoveVolunteer: false })}
                    onAccept={this.handleVolunteerRemoval}
                    title={REMOVE_VOLUNTEER_DIALOG_TITLE}
                    content={REMOVE_VOLUNTEER_DIALOG_CONTENT}
                    cancelText={REMOVE_VOLUNTEER_DIALOG_CANCEL_TEXT}
                    acceptText={REMOVE_VOLUNTEER_DIALOG_ACCEPT_TEXT}
                />
                {
                    showVolunteerInfo &&
                    volunteerFetchedInfo &&
                    <Dialog TransitionComponent={Transition} maxWidth='lg' open={showVolunteerInfo} onClose={() => this.setState({ showVolunteerInfo: false })}>
                        <div style={{ padding: '10%', backgroundColor: '#fff', width: '75%', height: '75%', display: 'flex', flexDirection: 'column' }}>
                            {
                                volunteer.photo &&
                                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '2%' }}>
                                    <img src={volunteer.photo} width={200} style={{ borderRadius: '50%' }}/>
                                </div>
                            }

                            <Typography variant="h4" className='josefin-bold'>
                                {volunteer.name}
                            </Typography>

                            <p className='josefin-regular'>
                                Nationality: {volunteerFetchedInfo.nationality}
                            </p>
                            <p className='josefin-regular'>
                                Occupation: {volunteerFetchedInfo.occupation}
                            </p>
                            <p className='josefin-regular'>
                                Phone Number: +{volunteerFetchedInfo.ncode} {volunteerFetchedInfo.phone}
                            </p>                            
                            <p className='josefin-regular'>
                                e-mail: {volunteerFetchedInfo.email}
                            </p>
                            <p className='josefin-regular'>
                                Gender: {
                                    volunteerFetchedInfo.gender === 1 ? 'Women' :
                                    volunteerFetchedInfo.gender === 2 ? 'Men' : 'Prefer not to say'
                                }
                            </p>
                            <p className='josefin-regular'>
                                Birth Date: {(new Date(volunteerFetchedInfo.bdate)).toDateString()}
                            </p>
                            <p className='josefin-regular'>
                                {volunteerFetchedInfo.bio}
                            </p>
                            <p className='josefin-regular'>
                                Civil Status: {
                                    volunteerFetchedInfo.civilStatus === 1 ? 'Single' :
                                    volunteerFetchedInfo.civilStatus === 2 ? 'Married' :
                                    volunteerFetchedInfo.civilStatus === 3 ? 'Widow' :
                                    volunteerFetchedInfo.civilStatus === 4 ? 'Divorced' :
                                    volunteerFetchedInfo.civilStatus === 5 ? 'Free Union' : 'N/A'
                                }
                            </p>
                            <p className='josefin-regular'>
                                Education Level: {
                                    volunteerFetchedInfo.educationLevel === 1 ? 'Elementary' :
                                    volunteerFetchedInfo.educationLevel === 2 ? 'Highschool' :
                                    volunteerFetchedInfo.educationLevel === 3 ? 'Licenciatura' :
                                    volunteerFetchedInfo.educationLevel === 4 ? 'Master' :
                                    volunteerFetchedInfo.educationLevel === 5 ? 'PhD' : 'N/A'
                                }
                            </p>
                            <p className='josefin-regular'>
                                Diet: {
                                    volunteerFetchedInfo.foodInfo === 1 ? 'Vegan' :
                                    volunteerFetchedInfo.foodInfo === 2 ? 'Vegetarian' : 'N/A'
                                }
                            </p>
                            <p className='josefin-regular'>
                                Allergies: {volunteerFetchedInfo.healthInfo.allergies}
                            </p>
                            <p className='josefin-regular'>
                                Special Medicine: {volunteerFetchedInfo.healthInfo.medicine}
                            </p>
                            <p className='josefin-regular'>
                                Special Condition: {volunteerFetchedInfo.healthInfo.pcondition}
                            </p>
                            <p className='josefin-regular'>
                                Blood Type: {
                                    volunteerFetchedInfo.healthInfo.btype === 1 ? 'O-' :
                                    volunteerFetchedInfo.healthInfo.btype === 2 ? 'O+' : 
                                    volunteerFetchedInfo.healthInfo.btype === 3 ? 'A+' :
                                    volunteerFetchedInfo.healthInfo.btype === 4 ? 'A-' : 
                                    volunteerFetchedInfo.healthInfo.btype === 5 ? 'B-' :
                                    volunteerFetchedInfo.healthInfo.btype === 6 ? 'B+' :
                                    volunteerFetchedInfo.healthInfo.btype === 7 ? 'AB-' :
                                    volunteerFetchedInfo.healthInfo.btype === 8 ? 'AB+' : 'N/A'    
                                }
                            </p>
                            <p className='josefin-regular'>
                                Knows Country and Language: {
                                    volunteerFetchedInfo.knowCountry === 1 ? 'Yes/Yes' :
                                    volunteerFetchedInfo.knowCountry === 2 ? 'Yes/No' : 
                                    volunteerFetchedInfo.knowCountry === 3 ? 'No/Yes' :
                                    volunteerFetchedInfo.knowCountry === 4 ? 'No/No' : 'N/A'    
                                }
                            </p>
                            <p className='josefin-regular'>
                                Project Interests: {
                                    volunteerFetchedInfo.pinterest === 1 ? 'Education' :
                                    volunteerFetchedInfo.pinterest === 2 ? 'Health' :
                                    volunteerFetchedInfo.pinterest === 3 ? 'Environment' :
                                    volunteerFetchedInfo.pinterest === 4 ? 'All' : 'N/A'
                                }
                            </p>
                            <p className='josefin-regular'>
                                Time Travel Availability: {
                                    volunteerFetchedInfo.timeTravel === 1 ? '1 week' :
                                    volunteerFetchedInfo.timeTravel === 2 ? '2 weeks' :
                                    volunteerFetchedInfo.timeTravel === 3 ? '4 weeks' :
                                    volunteerFetchedInfo.timeTravel === 4 ? '6 or more weeks' : 'N/A'
                                }
                            </p>
                        </div>
                    </Dialog>
                }
            </ListItem>
        )
    }
}