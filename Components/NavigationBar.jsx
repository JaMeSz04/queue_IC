

import React, {Component} from 'react'
import {Navbar, Nav, NavItem} from 'react-bootstrap'

export default class NavigationBar extends Component {
    render(){
        return(
            <Navbar>
                <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">{this.props.title}</a>
                </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                <NavItem eventKey={1} href="#">Link</NavItem>
                
                </Nav>
            </Navbar>
        );
    }
}