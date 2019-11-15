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
import { limitTextToCertainLength, volunteerRemovalSuccess, COORDINATOR_LABEL, settingCoordinatorMessage, REMOVE_VOLUNTEER_DIALOG_TITLE, REMOVE_VOLUNTEER_DIALOG_CONTENT, REMOVE_VOLUNTEER_DIALOG_CANCEL_TEXT, REMOVE_VOLUNTEER_DIALOG_ACCEPT_TEXT, SERVER_ERROR } from './MyProjectsConstants';
import CloseIcon from '@material-ui/icons/Close';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import CustomDialog from './CustomDialog';
import { createAxiosCancelToken, updateVolunteerRole, enrollOrOptOutFromProject } from './MyProjectsProvider';

export default class ProjectVolunteerItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            coordinator: this.props.volunteer.role === 1 ? true : false,
            snackBarOpen: false,
            snackBarMessage: '',
            openDialogRemoveVolunteer: false,
            axiosCancelTokenSource: createAxiosCancelToken()
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

    componentWillUnmount = () => {
        const { axiosCancelTokenSource } = this.state

        // cancel all concurrent subscriptions
        axiosCancelTokenSource.cancel()
    }

    render = () => {
        const { coordinator, snackBarOpen, snackBarMessage, openDialogRemoveVolunteer } = this.state
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
                    <Grid item xs={4} sm={4} md={4} lg={4}>
                        <p className='josefin-regular'>{ limitTextToCertainLength(volunteer.name, 30) }</p> 
                    </Grid>
                    {
                        editMode &&
                        <Grid item xs={4} sm={4} md={4} lg={4} className='inner-grid'>
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
            </ListItem>
        )
    }
}