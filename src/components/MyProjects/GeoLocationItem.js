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
import MapIcon from '@material-ui/icons/Map'

import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide';


import { limitTextToCertainLength, VOLUNTEER_COMMENTS_DIALOG_TITLE, VOLUNTEER_COMMENTS_DIALOG_OK } from './MyProjectsConstants';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default class GeoLocationItem extends Component {
    constructor(props) {
        super(props)

        this.state = {            
            showLocation: false
        }
    }

    render = () => {        
        const { showLocation } = this.state
        const { location } = this.props

        return(
            <ListItem style={{ width: '100%', paddingLeft: '10%', paddingRight: '10%' }} className='icon-pointer'>
                <Grid container spacing={2} onClick={() => this.setState({ showLocation: true })}>
                    <Grid item xs={4} sm={4} md={4} lg={4} className='inner-grid'>
                        {
                            location.volunteer.name &&
                            <p className='josefin-regular'>{ limitTextToCertainLength(location.volunteer.name, 30) }</p> 
                        }
                        {
                            !location.volunteer.name &&
                            <p className='josefin-regular'>{ location.volunteer.id }</p> 
                        }
                    </Grid>
                    <Grid item xs={7} sm={7} md={7} lg={7} className='inner-grid' style={{ flexDirection: 'row' }}>
                        { location.address && <MapIcon /> }

                        {
                            location.address &&
                            limitTextToCertainLength(location.address, 25)
                        }

                        {
                            !location.address &&
                            limitTextToCertainLength(`(${location.coordinates.lat}, ${location.coordinates.long})`, 25)
                        }
                    </Grid>                    
                    <Grid item xs={1} sm={1} md={1} lg={1} className='inner-grid'>
                        <ArrowForwardIosIcon />
                    </Grid>
                </Grid>
                {
                    showLocation &&                    
                    <Dialog TransitionComponent={Transition} open={showLocation} onClose={() => this.setState({ showLocation: false })}>
                        {
                            location &&
                            <div style={{ width: 600, height: 600 }}>
                                <iframe 
                                    width="600" 
                                    height="100%"                             
                                    src={`https://maps.google.com/maps?q=${location.coordinates.lat}+${location.coordinates.long}&t=&z=13&ie=UTF8&iwloc=&output=embed`} 
                                    frameborder="0" 
                                    scrolling="no" 
                                    marginheight="0" 
                                    marginwidth="0"
                                >                                
                                </iframe>
                                {
                                    location.address &&
                                    <p className='josefin-bold' style={{ textAlign: 'center', position: 'absolute', padding: '2%', top: 100, left: 10, width: 280, backgroundColor: '#fff', color: '#000', zIndex: 30 }}>{location.address}</p>
                                }
                            </div>

                        }                        
                    </Dialog>
                }
                {/* {
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
                } */}
            </ListItem>
        )
    }
}