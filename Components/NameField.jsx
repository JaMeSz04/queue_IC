import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import {Image} from 'react-bootstrap';


export default class NameField extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            error : "",
            value : "",
            valueName : "",
            errorName : "",
            queue : -1,
            facebook : "",
            nickname : "",
            phoneNum : ""
        }
        this.onTextChange = this.onTextChange.bind(this);
        this.onTextNameChange = this.onTextNameChange.bind(this);
        this.onTextNicknameChange = this.onTextNicknameChange.bind(this);
        this.onTextFacebookChange = this.onTextFacebookChange.bind(this);
        this.onTextPhoneNumChange = this.onTextPhoneNumChange.bind(this);
        this.getInitHandler = this.getInitHandler.bind(this);
        var queueCountRef = firebase.database().ref('queueList/');
        queueCountRef.on('value',  (this.getInitHandler));
    }

    getInitHandler(snapshot){
       var num = snapshot.numChildren()
       console.log(num);
       this.setState({queue : num});
       
   }
    
    onTextChange(event,text){
        console.log(text);
        this.setState( {value : text} );
    }

    onTextNameChange(event, text){
        console.log("name text : " + text);
        this.setState( {valueName : text} );
    }
    onTextNicknameChange(event, text){
        console.log("name text : " + text);
        this.setState( {nickname : text} );
    }
    onTextFacebookChange(event, text){
        console.log("name text : " + text);
        this.setState( {facebook : text} );
    }
    onTextPhoneNumChange(event, text){
        console.log("name text : " + text);
        this.setState( {phoneNum : text} );
    }
    onSubscribeClick(){
        var isPass = true;
        if (this.state.value == ""){
            this.setState ( {error : "Please enter this field..."});
            isPass = false;
        }
        if (this.state.valueName == ""){
            this.setState ( {errorName : "Please enter this field... "});
            isPass = false;
        }
        if (isPass){
            console.log("Clicked : " + this.state.value.toString());
            this.props.onSubmit(this.state.value, this.state.valueName, this.state.queue, this.state.nickname, this.state.facebook, this.state.phoneNum);
            this.setState ( {error : "" , errorName : "", value : "", valueName : "", nickname : "", facebook : "" , phoneNum : ""});
            
    }

        
    }
    
    render(){
        const style = {
            height: 100,
            width: 100,
            margin: 20,
            textAlign: 'center',
            display: 'inline-block',
        };
        console.log("rendering");
        return(
            <div>
            <Card style = {{width : "70%", height : "90vh", marginLeft : "15%" , marginTop : "2%"}}>
                <img style = {{marginLeft : "35.5%", marginTop : "6%"}} src="/realLogo.svg"  responsive/>
                <CardTitle className = "nameFieldHeader" title="International College Queuing System" />

                <TextField  style = {{marginTop : 20}} className = "nameField" value = {this.state.value} errorText= {this.state.error} onChange = { (event,text) => {this.onTextChange(event,text)}}
                    hintText="Full Name"
                    />
                
                <TextField  className = "nameField" value = {this.state.valueName} errorText= {this.state.errorName} onChange = { (event,text) => {this.onTextNameChange(event,text)}}
                    hintText="Registration ID"
                    />

                <TextField className = "nameField" value = {this.state.nickname} onChange = { (event,text) => {this.onTextNicknameChange(event,text)}}
                    hintText="Nickname"
                    />
                
                <TextField className = "nameField" value = {this.state.phoneNum} onChange = { (event,text) => {this.onTextPhoneNumChange(event,text)}}
                    hintText="Phone Number"
                    />
                
                <TextField className = "nameField" value = {this.state.facebook} onChange = { (event,text) => {this.onTextFacebookChange(event,text)}}
                    hintText="Facebook"
                    />
                
                <CardActions>
                    <FlatButton style = {{marginLeft : "44%"}}label="Enter Queue" primary={true} onClick = { () => { this.onSubscribeClick() }} />
                </CardActions>
            </Card>
                
            </div>
        );
    }
}