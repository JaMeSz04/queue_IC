import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Titlebar from './Components/Titlebar.jsx';
import CardShubU from './Components/CardShubU.jsx';
import QueueList from './Components/QueueList.jsx';
import {Row, Col,Button} from 'react-bootstrap';
import Newsfeed from './Components/Newsfeed.jsx';
import NavigationBar from './Components/NavigationBar.jsx';
import Notibar from './Components/NotiBar.jsx';

export default class QueueApplication extends Component{

    constructor(props){
        super(props);
        this.state = {
            currentQueue : 2,
            currentName : "",
            nextQueue : [],
            queueList : [],
            prevList : {},
            queueIndex : -1,
            isNextQueue : false,
            allowPush : false
        }
        this.getInitHandler = this.getInitHandler.bind(this);
        this.setCurrentQueueHandler = this.setCurrentQueueHandler.bind(this);
        this.onNextClickHandler = this.onNextClickHandler.bind(this);
        this.setInitCurrent = this.setInitCurrent.bind(this);
        var queueCountRef = firebase.database().ref('queueList/');
        queueCountRef.orderByChild("queueNumber").on("child_added", this.getInitHandler);
    }

    componentDidMount(){
        var currentRef = firebase.database().ref('currentQueue/');
        currentRef.on("value", this.setCurrentQueueHandler);
    }

    setInitCurrent(snapshot){
         var val = snapshot.val();
         this.setState({ currentQueue : val });
    }

    setCurrentQueueHandler(snapshot){
        var val = snapshot.val();
        this.setState( { currentQueue : val });
        this.refs.card.nextQueueHandler();
        this.refs.noti.handleTouchTap();
        setTimeout(() => { this.setState({isNextQueue : false}); }, 3000);
    }

    getInitHandler(snapshot){
        var currentRef = firebase.database().ref('currentQueue/');
        currentRef.on("value", this.setInitCurrent);
        var data = snapshot.val();
        
        var nQueueList = this.state.queueList;
        nQueueList.push(data);
    }

    onNextClickHandler(){
        this.setState( { isNextQueue : true });
        var nId, nName, nQueueNumber;
        for (var i = 0 ; i < this.state.queueList.length ; i++){
            if (this.state.queueList[i].queueNumber == this.state.currentQueue['queueNumber']){
                nId = this.state.queueList[i + 1].id;
                nName = this.state.queueList[i + 1].name;
                nQueueNumber = this.state.queueList[i + 1].queueNumber;
                break;
            }
            else {
                nId = this.state.queueList[0].id;
                nName = this.state.queueList[0].name;
                nQueueNumber = this.state.queueList[0].queueNumber;
            }
        }
        firebase.database().ref('currentQueue/').set({
            id: nId,
            name: nName,
            queueNumber : nQueueNumber
        });
}

    render(){

        var isCurrent = false;
        var nNext = [];
        var nPrev = [];
        for (var i = 0 ; i < this.state.queueList.length ; i++){
            
            if (isCurrent){
                nNext.push(this.state.queueList[i].id);
            } else{
                if (this.state.queueList[i].id == this.state.currentQueue.id){
                    isCurrent = true;
                    continue;
                }
                nPrev.unshift(this.state.queueList[i].id)
            }
        }
        
        return(
            <div>
                <MuiThemeProvider>
                    <Titlebar title = "International College Queuing System"/>
                </MuiThemeProvider>
                <Row>
                    <Col lg = {7}>
                      <Newsfeed isAdmin = {this.props.isAdmin}/>
                    </Col>
                    <Col lg = {5}>
                        <Row>
                          <CardShubU ref = "card" current = {this.state.currentQueue}/>  
                        </Row>
                        <Row >
                            <Col md = {6} >
                                <div style = {{marginRight : 16}}>
                                    <QueueList style = "success" head = "Previous Queue" list = {nPrev}/>
                                </div>
                            </Col>
                            <Col md = {6}>
                                <div style = {{marginLeft: -16 ,marginRight : 16}}>
                                    <QueueList style = "primary" head = "Next Queue" list = {nNext}/>
                                </div>
                            </Col>
                        </Row>
                        {this.props.isAdmin? 
                        <Row style = {{marginRight : 32}}>
                            <Button style = {{marginLeft : 16}} bsStyle="primary"bsSize="large" block disabled = {this.state.isNextQueue} onClick = {this.onNextClickHandler}> {this.state.isNextQueue? "Pending..." : "Next Queue" } </Button>
                        </Row> : <div></div> }
                    </Col>
                </Row>
                <MuiThemeProvider>
                    <Notibar text = { "New Queue ready!!!" } ref = "noti"/>
                </MuiThemeProvider>
            </div>
        );
    }
}