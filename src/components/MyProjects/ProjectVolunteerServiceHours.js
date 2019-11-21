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

import Grid from '@material-ui/core/Grid'
import TimelapseIcon from '@material-ui/icons/Timelapse'

import { limitTextToCertainLength } from './MyProjectsConstants';

export default class ProjectVolunteerServiceHours extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render = () => {
        const { volunteer, serviceHours } = this.props

        return(
            <ListItem style={{ width: '100%', paddingLeft: '10%', paddingRight: '10%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={2} sm={2} md={2} lg={2} >
                        <ListItemAvatar>
                            <Avatar>
                                {`${volunteer.name && volunteer.name[0]}`}
                            </Avatar>
                        </ListItemAvatar>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} >
                        {
                            volunteer.name &&
                            <p className='josefin-regular'>{ limitTextToCertainLength(volunteer.name, 30) }</p> 
                        }
                        {
                            !volunteer.name &&
                            <p className='josefin-regular'>{ volunteer.id }</p> 
                        }
                    </Grid>
                    <Grid style={{ flexDirection: 'row' }} item xs={4} sm={4} md={4} lg={4} className='inner-grid'>
                        <TimelapseIcon style={{ marginRight: '5%' }}/>
                        <p className='josefin-regular'>{ serviceHours } hours in total.</p>
                    </Grid>                    
                </Grid>
                
            </ListItem>
        )
    }
}