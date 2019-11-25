import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';

import '../MyProjects/my_projects.css'

export default class HomePageComponent extends Component {
    constructor(props) {
        super(props);

        this.state ={}
    }

    render = () => {
        return(
            <div className='wrapper-public-projects' style={{ padding: 0 }}>
                <AppBar position="static" style={{ backgroundColor: '#F0AD4E' }}>
                    <Toolbar>   
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={8} lg={8}>
                                <Typography style={{ color: '#13293d' }} variant="h4" className='josefin-bold'>
                                    voluntourist
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Button color="inherit"><a style={{ color: '#fff', textDecoration: 'none' }} href="/search">Search Project</a></Button>
                                <Button color="inherit"><a style={{ color: '#fff', textDecoration: 'none' }} href="/login">Login</a></Button>
                                <Button color="inherit"><a style={{ color: '#fff', textDecoration: 'none' }} href="/register">Register</a></Button>                                                    
                            </Grid>                            
                        </Grid>                     
                    </Toolbar>
                </AppBar>
                <div style={{
                    height: 'auto',
                    padding: '10%',
                    background: 'url(https://voluntaris-images.s3-us-west-2.amazonaws.com/Grupo2.jpg) center / cover'
                }}>
                    <Card style={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        height: '100%',
                        width: '100%',
                        
                    }}>
                        <CardContent style={{ display:' flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '100%' }}>
                                <Typography style={{ color: '#fff' }} variant="h3" className='josefin-bold'>
                                    Who are we?
                                </Typography>
                                <Typography style={{ color: '#fff' }} variant="h5" className='josefin-regular'>
                                    We are:
                                </Typography>
                            </div>
                            <p style={{ color: '#fff', textAlign: 'justify', padding: '2%', lineHeight: 1.2 }} className='josefin-regular'>
                                French Guatemalan Irish Argentinean Czech Chinese Welsh Russian Cuban Syrian Indian Thai
                                Portuguese Chilean German Dutch Taiwanese Swiss Australian Canadian Belgian Costa Rican
                                American Vietnamese Filipino Japanese Greek Haitian Honduran Paraguayan Egyptian Panamanian
                                Peruvian Bolivian New Zealander Danish Moroccan Nicaraguan Korean Salvadorian French
                                Guatemalan Irish Argentinean Czech Hawaiian Chinese Welsh Russian Cuban Syrian Indian Thai Portuguese
                                Chilean German Dutch Taiwanese Swiss Australian Canadian Belgian Costa Rican American
                                Vietnamese Filipino Japanese Greek Haitian Honduran Paraguayan Egyptian Panamanian Peruvian
                                Bolivian New Zealander Danish Moroccan Nicaraguan Korean Salvadorian French Guatemalan Irish
                                Salvadorian New Guinean Guatemalan Korean
                            </p>
                            <Typography style={{ color: '#fff' }} variant="h2" className='josefin-bold'>
                                volunteers
                            </Typography>
                            <p style={{ color: '#fff', textAlign: 'justify', padding: '2%', lineHeight: 1.2 }} className='josefin-regular'>
                                Argentinean Czech Chinese Welsh Russian Cuban Syrian Indian Thai Portuguese Chilean German
                                Dutch Taiwanese Swiss Australian Canadian Belgian Costa Rican American Vietnamese Filipino
                                Japanese Greek Haitian Honduran Paraguayan Egyptian Panamanian Peruvian Bolivian New
                                Zealander Danish Moroccan Nicaraguan Korean Salvadorian French Guatemalan Irish Argentinean
                                Czech Chinese Welsh Russian Cuban Syrian Indian Thai Portuguese Chilean German Dutch
                                Taiwanese Swiss Australian Canadian Belgian Costa Rican American Vietnamese Filipino
                                Japanese Greek Haitian Honduran Paraguayan Egyptian Panamanian Peruvian Bolivian New
                                Zealander Danish Moroccan Nicaraguan Korean American
                            </p>
                            <Typography style={{ color: '#fff' }} variant="h5" className='josefin-regular'>
                                trying to make the world a better place
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <div style={{
                    
                    height: 'auto',
                    padding: '10%',
                    background: 'url(https://voluntaris-images.s3-us-west-2.amazonaws.com/Granuado.jpg) center / cover'
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Card style={{ width: '100%', height: '100%' }}>
                                <CardContent>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        padding: '2%',
                                        height: 150,
                                        marginBottom: '2%',
                                        background: 'url(https://images.unsplash.com/photo-1553531889-3836a7ee6d3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80) center / cover'
                                    }}>
                                        <Typography style={{ color: '#fff' }} variant="h5" className='josefin-bold'>
                                            Search Project
                                        </Typography>
                                    </div>
                                    <Typography variant="p" className='josefin-regular'>
                                        Looking to get in a new adventure! Don't know where to start? Come search for anything
                                        you like.
                                    </Typography>
                                    <CardActions style={{ width: '100%', height: 50, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                        <Button className='projects-open-btn' size="large" href="/search">Search Project Here!</Button>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Card style={{ width: '100%', height: '100%' }}>
                                <CardContent>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        padding: '2%',
                                        height: 150,
                                        marginBottom: '2%',
                                        background: 'url(https://images.unsplash.com/photo-1525026198548-4baa812f1183?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1233&q=80) center / cover'
                                    }}>
                                        <Typography style={{ color: '#fff' }} variant="h5" className='josefin-bold'>
                                            Register
                                        </Typography>
                                    </div>
                                    
                                    <Typography variant="p" className='josefin-regular'>
                                        Want to join the community? Create an account and be one of many volunteers around the
                                        globe.
                                    </Typography>
                                    <CardActions style={{ width: '100%', height: 50, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                        <Button className='projects-open-btn' size="large" href="/register">Register Here!</Button>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} lg={4}>
                            <Card style={{ width: '100%', height: '100%' }}>
                                <CardContent>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignContent: 'center',
                                        alignItems: 'center',
                                        padding: '2%',
                                        height: 150,
                                        marginBottom: '2%',
                                        background: 'url(https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80) center / cover'
                                    }}>
                                        <Typography style={{ color: '#fff' }} variant="h5" className='josefin-bold'>
                                            Login
                                        </Typography>
                                    </div>
                                    
                                    <Typography variant="p" className='josefin-regular'>
                                        Already have an account? Come check the updates on the projects you have been part of and don't miss anything!
                                    </Typography>
                                    <CardActions style={{ width: '100%', height: 50, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                        <Button className='projects-open-btn' size="large" href="/login">Login Here!</Button>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}
