
import React from 'react';
import {Panel} from 'react-bootstrap';

export default class CardShubU extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            isAlert : false,
            isBlink : false,
            Style : "primary",
            counter : 0,
            blinkID : ""
        }
        this.blink = this.blink.bind(this);
        this.nextQueueHandler = this.nextQueueHandler.bind(this);
        this.endBlink = this.endBlink.bind(this);
    }

    endBlink(){
        this.setState({isBlink : false, Style : "primary"}) ;
        clearInterval(this.state.blinkID);
    }
    blink(){
        if (this.state.isBlink){
            if (this.state.Style == "primary"){
                this.setState( {Style : "danger" });
            }else {
                this.setState( {Style : "primary"});
            }
            var nCounter = this.state.counter + 1;
            this.setState( { counter : nCounter} );
    
        } 
  
    }

    
    nextQueueHandler(){
        this.setState ({isBlink : true});
        this.setState({ blinkID : setInterval(this.blink, 500) });
        setTimeout(this.endBlink, 3000);
        
        
    }
    render(){
        
        return(
            <Panel bsStyle = {this.state.Style} className = "card-current" header = "Current Queue" style = {{marginLeft : 16, marginTop : 16, marginRight : 32}}className = "newsfeed">
                {this.state.isAlert?  
                    (<div className = "blink_me">
                    <h1 className = "card-head">{this.props.current.id}</h1>
                    <h6 className = "card-text">{this.props.current.name}</h6>
                </div> ) : 
                     (<div><h1 className = "card-head">{this.props.current.id}</h1>
                <h6 className = "card-text">{this.props.current.name}</h6></div>)  }
            </Panel>
        );
    }

}


