import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import grey400 from 'material-ui/styles/colors';
export default class Titlebar extends Component {

    render(){ 
        return(
            <AppBar style= {{backgroundColor : "#01579B"}}
                title= {this.props.title}
                />
        );
    }
}