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
                <div style={{height: '750px', width: '100%', background: 'url(https://voluntaris-images.s3-us-west-2.amazonaws.com/Grupo2.jpg) center / cover'}}>

                </div>
                <div style={{height: '750px', width: '100%', background: 'url(https://voluntaris-images.s3-us-west-2.amazonaws.com/Granuado.jpg) center / cover'}}>
                    <Card shadow={0}  style={{height: '30%', width: '20%', position:'absolute',  left:'10%' , top:'140%'}}>
                        
                    </Card>
                    <Card shadow={0}  style={{height: '30%', width: '20%', position:'absolute',  left:'40%' , top:'140%'}}></Card>
                    <Card shadow={0}  style={{height: '30%', width: '20%', position:'absolute',  left:'70%' , top:'140%'}}></Card>
                </div>

            </div>
        )
    }
}
