import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';

export default class NotiBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
  }

  handleTouchTap(){
    this.setState({
      open: true,
    });
    setTimeout(this.handleRequestClose, 3000);
  }

  handleRequestClose (){
    
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          message= {this.props.text}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}