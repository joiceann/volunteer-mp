import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { LangButton } from '../CommonComponents'

import '../MyProjects/my_projects.css'

import colors from '../../colors';
import en from './../../lang/en'
import es from './../../lang/es'
import counterpart from 'counterpart';
import Translate from 'react-translate-component';


counterpart.registerTranslations('en', en);
counterpart.registerTranslations('es', es);
counterpart.setLocale('en');



export default class HomePageComponent extends Component {
    constructor(props) {
        super(props);

        if (localStorage.getItem('lang') == null || localStorage.getItem('lang') == undefined) {
            localStorage.setItem('lang', 'en');
        }
        counterpart.setLocale(localStorage.getItem('lang'));

        this.state = {
            lang: localStorage.getItem('lang')
        }



    }

    onLangChange = (lang) => {
        this.setState({ lang: lang });
        counterpart.setLocale(lang);
        localStorage.setItem('lang', lang);
    }

    render = () => {
        return (
            <div className='wrapper-public-projects' style={{ padding: 0 }}>

                <Grid container direction="row" justify="flex-end" verticalAlign="middle" alignItems="center" spacing={1} style={{ backgroundColor: colors.darkYellow, height: '35px' }}>
                    <Grid item>
                        <Button onClick={() => this.onLangChange('en')}>
                            <Typography style={{ fontSize: '10px', color: colors.fg }}  >
                                EN
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item >
                        <Button onClick={() => this.onLangChange('es')} >
                            <Typography style={{ fontSize: '10px', color: colors.fg }}  >
                                ES
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>

                <AppBar position="static" style={{ backgroundColor: colors.fg }}>
                    <Toolbar>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={8} lg={8}>
                                <Typography style={{ color: colors.main }} variant="h4" className='josefin-bold'>
                                    voluntourist
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                <Button color="inherit">
                                    <a style={{ color: colors.main, textDecoration: 'none' }} href="/search">
                                        <Translate content="searchP" />
                                    </a>
                                </Button>
                                <Button color="inherit">
                                    <a style={{ color: colors.main, textDecoration: 'none' }} href="/login">
                                        <Translate content="login" />
                                    </a>
                                </Button>
                                <Button color="inherit">
                                    <a style={{ color: colors.main, textDecoration: 'none' }} href="/register">
                                        <Translate content="register" />
                                    </a>
                                </Button>
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
                        <CardContent style={{ display: ' flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '100%' }}>
                                <Typography style={{ color: '#fff' }} variant="h3" className='josefin-bold'>
                                    <Translate content="whoweare" />
                                </Typography>
                                <Typography style={{ color: '#fff' }} variant="h5" className='josefin-regular'>
                                    <Translate content="weare" />
                                </Typography>
                            </div>
                            <p style={{ color: '#fff', textAlign: 'justify', padding: '2%', lineHeight: 1.2 }} className='josefin-regular'>
                                <Translate content='mainText'/>
                            </p>
                            <Typography style={{ color: '#fff' }} variant="h2" className='josefin-bold'>
                                <Translate content="volunteers" />
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
                                <Translate content="trying" />
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
                                        background: 'url(https://images.unsplash.com/photo-1525026198548-4baa812f1183?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1233&q=80) center / cover'
                                    }}>
                                        <Typography style={{ color: '#fff' }} variant="h5" className='josefin-bold'>
                                            <Translate content="register" />
                                        </Typography>
                                    </div>

                                    <Typography variant="p" className='josefin-regular'>
                                        <Translate content="registerText" />
                                    </Typography>
                                    <CardActions style={{ width: '100%', height: 50, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                        <Button className='projects-open-btn' size="large" href="/register">
                                            <Translate content="registerHere" />
                                        </Button>
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
                                            <Translate content="login" />
                                        </Typography>
                                    </div>

                                    <Typography variant="p" className='josefin-regular'>
                                        <Translate content="loginText" />
                                    </Typography>
                                    <CardActions style={{ width: '100%', height: 50, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                        <Button className='projects-open-btn' size="large" href="/login">
                                            <Translate content="loginHere" />
                                        </Button>
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
                                        background: 'url(https://images.unsplash.com/photo-1553531889-3836a7ee6d3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80) center / cover'
                                    }}>
                                        <Typography style={{ color: '#fff' }} variant="h5" className='josefin-bold'>
                                            <Translate content="searchP" />
                                        </Typography>
                                    </div>
                                    <Typography variant="p" className='josefin-regular'>
                                        <Translate content="searchPText" />
                                    </Typography>
                                    <CardActions style={{ width: '100%', height: 50, display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                        <Button className='projects-open-btn' size='large' href="/search" >
                                            <Translate content="searchPHere" />
                                        </Button>
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
