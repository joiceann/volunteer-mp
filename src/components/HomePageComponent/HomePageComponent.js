import React, { Component } from 'react';
import styled from "styled-components";

const Logo = styled.h1`
  font-family: 'Josefin Sans', sans-serif;
  user-select: none;
  margin-right: 8px;
  margin-top: 10px;
`;

export default class HomePageComponent extends Component {
    constructor(props) {
        super(props);

        this.state ={}
    }

    render = () => {
        return(
            <div>
                <div style={{height: '300px', position: 'relative'}}>
                    <Layout style={{background: 'url(http://www.getmdl.io/assets/demos/transparent.jpg) center / cover'}}>
                        <Header transparent >
                            <Logo>Voluntourist</Logo>
                            <Navigation>
                                <a href="/login">Login</a>
                                <a href="/register">Register</a>
                            </Navigation>
                        </Header>
                    </Layout>
                </div>
                <div>
                    <Content>git 
                    </Content>
                </div>
                <div>
                    <Footer size="mini">
                        <FooterSection type="left" logo="Title">
                            <FooterLinkList>
                                <a href="#">Help</a>
                                <a href="#">Privacy & Terms</a>
                            </FooterLinkList>
                        </FooterSection>
                    </Footer>

                </div>
            </div>
        )
    }
}
