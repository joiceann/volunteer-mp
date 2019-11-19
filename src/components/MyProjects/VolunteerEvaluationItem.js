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

import CloseIcon from '@material-ui/icons/Close';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import CustomDialog from './CustomDialog';
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { limitTextToCertainLength, VOLUNTEER_COMMENTS_DIALOG_TITLE, VOLUNTEER_COMMENTS_DIALOG_OK } from './MyProjectsConstants';

export default class VolunteerEvaluationItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            emptyStarsArray: [1,2,3,4,5],
            showComments: false
        }
    }

    renderStars = () => {
        const { stars } = this.props
        const starsArray = []

        for (var i = 0; i < stars; i++) {
            starsArray.push('star')
        }

    }

    render = () => {
        const { emptyStarsArray, showComments } = this.state
        const { volunteer, stars, comments } = this.props

        return(
            <ListItem style={{ width: '100%', paddingLeft: '10%', paddingRight: '10%' }} className='icon-pointer'>
                <Grid container spacing={2} onClick={() => this.setState({ showComments: true })}>
                    <Grid item xs={2} sm={2} md={2} lg={2}>
                        <ListItemAvatar>
                            <Avatar>
                                {`${volunteer.name && volunteer.name[0]}`}
                            </Avatar>
                        </ListItemAvatar>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} lg={4} className='inner-grid'>
                        {
                            volunteer.name &&
                            <p className='josefin-regular'>{ limitTextToCertainLength(volunteer.name, 30) }</p> 
                        }
                        {
                            !volunteer.name &&
                            <p className='josefin-regular'>{ volunteer.id }</p> 
                        }
                    </Grid>
                    <Grid item xs={5} sm={5} md={5} lg={5} className='inner-grid' style={{ flexDirection: 'row' }}>
                        {
                            emptyStarsArray.map((star, index) => {
                                const starValue = index + 1

                                if (starValue <= stars) {
                                    return (<StarIcon key={index} className='star-icon'/>)
                                } else return (<StarBorderIcon key={index} className='star-icon'/>)
                            })
                        }
                    </Grid>                    
                    <Grid item xs={1} sm={1} md={1} lg={1} className='inner-grid'>
                        <ArrowForwardIosIcon />
                    </Grid>
                </Grid>
                {
                    showComments &&
                    <CustomDialog 
                        open={showComments}
                        onClose={() => this.setState({ showComments: false })}
                        onAccept={() => this.setState({ showComments: false })}
                        title={`${volunteer.name}${VOLUNTEER_COMMENTS_DIALOG_TITLE}`}
                        content={`${comments} \n(${stars}/5 stars)`}
                        cancelText={null}
                        acceptText={VOLUNTEER_COMMENTS_DIALOG_OK}
                    />
                }
            </ListItem>
        )
    }
}