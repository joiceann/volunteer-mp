import React, { Component } from 'react';
import {Layout, Header, Navigation, Content, Card, CardTitle, CardText, CardActions, Button, CardMenu, IconButton    } from "react-mdl";
import styled from "styled-components";
import imagen1 from './Images/Grupo2.jpg';
import Container from "@material-ui/core/Container";
const Logo = styled.h1`
  font-family: 'Josefin Sans', sans-serif;
  user-select: none;
  margin-right: 8px;
  margin-top: 100px;
`;


const MainContainer = styled(Container)`
  height: 100%;
  position: absolute; 
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MainCard = styled(Container)`
  alignSelf: strech;
  align-items: center;
  justify-content: center;
`;

const Options = styled.h3`
  font-family: 'Josefin Sans', sans-serif;
  user-select: none;
  margin-left: 68%;  
`;
export default class HomePageComponent extends Component {
    constructor(props) {
        super(props);

        this.state ={}
    }

    render = () => {
        return(
            <div style={{backgroundColor: '13293d'}}>
                <div style={{height: '300px', position: 'relative'}}>
                    <Layout style={{background: 'url(https://voluntaris-images.s3-us-west-2.amazonaws.com/Manos.jpg) center / cover'}}>
                        <Header transparent >
                            <Logo>voluntourist</Logo>
                            <Options>
                                <Navigation float>
                                    <a href="/search">Search Project</a>
                                    <a href="/login">Login</a>
                                    <a href="/register">Register</a>
                                </Navigation>
                            </Options>
                        </Header>
                    </Layout>
                </div>
                <div style={{ filter: 'brightness(50%)', height: '750px', width: '100%', background: 'url(https://voluntaris-images.s3-us-west-2.amazonaws.com/Grupo2.jpg) center / cover'}}>

                </div>
                <div style={{  height: '750px', width: '100%', background: 'url(https://voluntaris-images.s3-us-west-2.amazonaws.com/Granuado.jpg) center / cover'}}>

                    <Card shadow={0}  style={{height: '30%', width: '20%', position:'absolute',  left:'10%' , top:'140%', fontFamily: 'Josefin Sans'}}>
                        <CardTitle style={{ hover: {opacity: '0.5', filter: 'alpha(opacity=50)'}, color: '#fff', height: '176px', background: 'url(https://images.unsplash.com/photo-1553531889-3836a7ee6d3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80) center / cover'}}>Search Project</CardTitle>
                        <CardText >
                           Looking to get in a new adventure! Don't know where to start? Come search for anything
                            you like.
                        </CardText>
                        <CardActions border>
                            <Button colored href="/search">Search Project Here!</Button>
                        </CardActions>

                    </Card>
                    <Card shadow={0}  style={{height: '30%', width: '20%', position:'absolute',  left:'40%' , top:'140%', fontFamily: 'Josefin Sans'}}>
                        <CardTitle style={{ hover: {opacity: '0.5', filter: 'alpha(opacity=50)'}, color: '#fff', height: '176px', background: 'url(https://images.unsplash.com/photo-1525026198548-4baa812f1183?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1233&q=80) center / cover'}}>Register</CardTitle>
                        <CardText>
                            Want to join the community? Create an account and be one of many volunteers around the
                            globe.
                        </CardText>
                        <CardActions border>
                            <Button colored href="/register">Register Here!</Button>
                        </CardActions>
                    </Card>

                    <Card shadow={0}  style={{ height: '30%', width: '20%', position:'absolute',  left:'70%' , top:'140%', fontFamily: 'Josefin Sans'}}>
                        <CardTitle style={{ hover: {opacity: '0.5', filter: 'alpha(opacity=50)'},  background: 'url(https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80) center / cover', color: '#fff', height: '176px'}}>Login</CardTitle>
                        <CardText>
                            Already have an account? Come check the updates on the projects you have been part of.
                        </CardText>
                        <CardActions border>
                            <Button colored href="/login">Login Here!</Button>
                        </CardActions>
                    </Card>

                </div>

            </div>
        )
    }
}
