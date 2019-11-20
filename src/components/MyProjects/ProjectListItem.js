import React, { Component } from 'react'
import Card from '@material-ui/core/Card'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import {
    Typography,
    Paper,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
  } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import EditIcon from '@material-ui/icons/Edit';

import * as consts from './MyProjectsConstants'

export default class ProjectListItem extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.onOpen = this.onOpen.bind(this)
    }

    onOpen = () => { this.props.onOpenProject(this.props.project) }

    render = () => {        
        const { project, editOption } = this.props

        return(
            <Fade in={true}>
                <ListItem className='project-listitem icon-pointer'>
                    <Grid container spacing={2}>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='inner-grid' onClick={this.onOpen}>
                            {
                                project.photo[0] &&
                                <ListItemAvatar>
                                    <Avatar src={project.photo[0]} />
                                </ListItemAvatar>
                            }
                            {
                                !project.photo[0] &&
                                <ListItemAvatar>
                                    <Avatar>
                                        {`${project.name && project.name[0]}`}
                                    </Avatar>
                                </ListItemAvatar>
                            }
                        </Grid>
                        <Grid item xs={editOption ? 6 : 8} sm={editOption ? 6 : 8} md={editOption ? 6 : 8} lg={editOption ? 6 : 8} onClick={this.onOpen}>
                            <p className='josefin-regular'>{ consts.limitTextToCertainLength(project.name, 45) }</p> 
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='inner-grid' onClick={this.onOpen}>
                            <ArrowForwardIosIcon className='icon-pointer'/>
                        </Grid>
                        {
                            editOption &&
                            <Grid item xs={2} sm={2} md={2} lg={2} className='inner-grid' onClick={() => this.props.onEditProject(project)}>
                                <EditIcon className='icon-pointer'/>
                            </Grid>
                        }
                    </Grid>                    
                </ListItem>                
            </Fade>
        )
    }
}