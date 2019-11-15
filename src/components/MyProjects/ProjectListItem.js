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

import * as consts from './MyProjectsConstants'

export default class ProjectListItem extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render = () => {
        const { project } = this.props

        return(
            <Fade in={true}>
                <ListItem className='project-listitem icon-pointer' onClick={() => this.props.onOpenProject(project)}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='inner-grid'>
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
                        <Grid item xs={8} sm={8} md={8} lg={8}>
                            <p className='josefin-regular'>{ consts.limitTextToCertainLength(project.name, 45) }</p> 
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={2} className='inner-grid'>
                            <ArrowForwardIosIcon className='icon-pointer'/>
                        </Grid>
                    </Grid>                    
                </ListItem>
            </Fade>
        )
    }
}