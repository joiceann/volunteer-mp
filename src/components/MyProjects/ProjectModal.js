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
import styled from 'styled-components'

import './my_projects.css'
import colors from '../../colors'
import { width } from '@material-ui/system';
import ProjectVolunteerItem from './ProjectVolunteerItem';
import { LEAVE_PROJECT, EDIT_PROJECT, SAVE_CHANGES, REMOVE_PROJECT, EDIT_PROJECT_CLOSE, volunteerRemovalSuccess, SERVER_ERROR } from './MyProjectsConstants';
import { enrollOrOptOutFromProject, createAxiosCancelToken, getUserInfoByToken } from './MyProjectsProvider';

const CustomAppBar = styled(AppBar)`
  position: relative;
  color: ${colors.fg};
  background-color: #F0AD4E;
`

const Filler = styled.div`
  flex-grow: 1;
`;

export default class ProjectModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editMode: false,
            volunteers: this.props.project.volunteers,
            axiosCancelTokenSource: createAxiosCancelToken()
        }

        this.onHandleProjectVolunteerRemoval = this.onHandleProjectVolunteerRemoval.bind(this)
        this.onHandleProjectVolunteerRoleChange = this.onHandleProjectVolunteerRoleChange.bind(this)
    }

    // Possible TODO: add confirmation Dialog
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

    render = () => {
        const { editMode, volunteers } = this.state
        const { userType } = this.props        
        console.log(userType)

        return(
            <div>
                <CustomAppBar>
                    <Toolbar> 
                    <Typography variant="h6" className='josefin-bold'>
                        Project Details
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
                <Grid container spacing={2} className="wrapper-modal-flex">
                    <Grid container spacing={2} style={{ marginBottom: 20 }}>
                        <Grid item xs={12} sm={12} md={2} lg={2}>
                            {
                                this.props.project.photo[0] &&
                                <div style={{ width: '100%', height: '100%' }}>
                                    <img src={this.props.project.photo[0]} width="100%" height="100%" />
                                </div>
                            }
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <h2 style={{ padding: 0, textAlign: 'left' }} className='project-name-text'>{this.props.project.name}</h2>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} style={{ display: 'flex', flexDirection: 'row' }}>
                                <Home style={{ marginRight: 20}}/>
                                <p style={{ padding: 5, margin: 0 }} className='project-desc-text'>{this.props.project.organinfo.name}</p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6} style={{ display: 'flex', flexDirection: 'row' }}>
                                <LocationOn style={{ marginRight: 20}}/>
                                <p style={{ padding: 5, margin: 0 }} className='project-desc-text'>{this.props.project.address}</p>
                            </Grid>                            
                            <Grid item xs={12} sm={12} md={6} lg={6} style={{ display: 'flex', flexDirection: 'row' }}>
                                <OfflineBolt style={{ marginRight: 20}}/>
                                <p style={{ padding: 5, margin: 0 }} className='project-desc-text'>{this.props.project.state === 1 ? 'Currently active' : 'Currently inactive'}</p>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8} lg={8} style={{ display: 'flex', flexDirection: 'row' }}>
                                <DateRangeIcon style={{ marginRight: 20}}/>
                                <p style={{ padding: 5, margin: 0 }} className='project-desc-text'>{`${(new Date(this.props.project.fdate)).toDateString()} through ${(new Date(this.props.project.fdatei)).toDateString()}`}</p>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            {
                                // USER_TYPE = NORMAL
                                userType === '1' &&
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Button onClick={() => this.handleVolunteerOptOut()} variant='contained' className='projects-leave-btn'>{LEAVE_PROJECT}</Button>
                                </Grid>
                            }
                            {/* {
                                userType === '2' &&
                                ONG
                            } */}
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Button onClick={() => {}} variant='contained' className='projects-leave-btn'>{REMOVE_PROJECT}</Button>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Button onClick={() => this.setState({ editMode: !editMode })} variant='contained' className='projects-edit-btn'>{ !editMode ? EDIT_PROJECT : EDIT_PROJECT_CLOSE}</Button>
                            </Grid>
                            {/* {
                                editMode &&
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Button onClick={() => {}} variant='contained' className='projects-save-btn'>{SAVE_CHANGES}</Button>
                                </Grid>
                            } */}
                            
                        </Grid>                        
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Card>
                            <p style={{ color: '#000', padding: '10%' }} className='project-desc-text project-desc-text-height'>{this.props.project.desc}</p>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Card style={{ width: '100%' }}>
                            <h2 style={{ padding: '10%', paddingBottom: '5%', textAlign: 'left', color: '#000' }} className='project-name-text'>Enroled volunteers</h2>                            
                            <List style={{ maxHeight: 400, position: 'relative', overflow: 'auto' }}>
                                {
                                    volunteers.map((volunteer, index) => {
                                        return(
                                            <ProjectVolunteerItem projectId={this.props.project._id} onHandleProjectVolunteerRemoval={this.onHandleProjectVolunteerRemoval} onHandleProjectVolunteerRoleChange={this.onHandleProjectVolunteerRoleChange} key={index} volunteer={volunteer} editMode={editMode} />
                                        )
                                    })
                                }
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}