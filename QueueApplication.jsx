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
            currentQueueETM : 2,
            currentName : "",
            nextQueue : [],
            queueList : [],
            queueETMList : [],
            prevList : {},
            queueIndex : -1,
            isNextQueue : false,
            allowPush : false
        }

        this.getInitHandler = this.getInitHandler.bind(this);
        this.getInitETMHandler = this.getInitETMHandler.bind(this);
        this.setCurrentQueueHandler = this.setCurrentQueueHandler.bind(this);
        this.setCurrentETMQueueHandler = this.setCurrentETMQueueHandler.bind(this);
        this.onNextClickHandler = this.onNextClickHandler.bind(this);
        this.onNextETMClickHandler = this.onNextETMClickHandler.bind(this);
        this.setInitCurrent = this.setInitCurrent.bind(this);
        this.setInitETMCurrent = this.setInitETMCurrent.bind(this);
        var queueCountRef = firebase.database().ref('seQueueList/');
        queueCountRef.orderByChild("queueNumber").on("child_added", this.getInitHandler);

        var queueCountETMRef = firebase.database().ref('etmQueueList/');
        queueCountETMRef.orderByChild("queueNumber").on("child_added", this.getInitETMHandler);


    }

    componentDidMount(){
        var currentRef = firebase.database().ref('currentSeQueue/');
        currentRef.on("value", this.setCurrentQueueHandler);

        var currentETMRef = firebase.database().ref('currentEtmQueue/');
        currentETMRef.on("value", this.setCurrentETMQueueHandler);
        
    }

    setInitCurrent(snapshot){
         var val = snapshot.val();
         this.setState({ currentQueue : val });
    }

    setInitETMCurrent(snapshot){
        var val = snapshot.val();
        this.setState( { currentQueueETM : val });
    }

    setCurrentQueueHandler(snapshot){
        var val = snapshot.val();
        this.setState( { currentQueue : val });
        this.refs.card.nextQueueHandler();
        this.refs.noti.handleTouchTap();
        setTimeout(() => { this.setState({isNextQueue : false}); }, 3000);
    }

    setCurrentETMQueueHandler(snapshot){
        var val = snapshot.val();
        
        this.setState( { currentQueueETM : val });
        this.refs.card2.nextQueueHandler();
        this.refs.noti.handleTouchTap();
        setTimeout(() => { this.setState({isNextQueue : false}); }, 3000);
    }

    getInitHandler(snapshot){
        var currentRef = firebase.database().ref('currentSeQueue/');
        currentRef.on("value", this.setInitCurrent);
        var data = snapshot.val();
        
        var nQueueList = this.state.queueList;
        nQueueList.push(data);
        
    }

    getInitETMHandler(snapshot){
        var currentRef = firebase.database().ref('currentEtmQueue/');
        currentRef.on("value", this.setInitETMCurrent);
        var data = snapshot.val();
        var nQueueList = this.state.queueETMList;
        nQueueList.push(data);
        
    }

    onNextETMClickHandler(){
        console.log("kao law ");
        this.setState( { isNextQueue : true });
        var nId, nName, nQueueNumber;
        for (var i = 0 ; i < this.state.queueETMList.length ; i++){
            if (this.state.queueETMList[i].queueNumber == this.state.currentQueueETM['queueNumber']){
                nId = this.state.queueETMList[i + 1].id;
                nName = this.state.queueETMList[i + 1].name;
                nQueueNumber = this.state.queueETMList[i + 1].queueNumber;
                break;
            }
            else {
                nId = this.state.queueETMList[0].id;
                nName = this.state.queueETMList[0].name;
                nQueueNumber = this.state.queueETMList[0].queueNumber;
            }
        }
        console.log("nId: " + nId);
        console.log(nName);
        console.log(nQueueNumber);
        firebase.database().ref('currentEtmQueue/').set({
            id: nId,
            name: nName,
            queueNumber : nQueueNumber
        });
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
        firebase.database().ref('currentSeQueue/').set({
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

        var nNextETM = [];
        isCurrent = false;
        var nPrevETM = [];

        for (var i = 0 ; i < this.state.queueETMList.length ; i++){
            
            if (isCurrent){
                nNextETM.push(this.state.queueETMList[i].id);
            } else{
                console.log(this.state.queueETMList[i].id);
                console.log(this.state.currentQueueETM.id);
                if (this.state.queueETMList[i].id == this.state.currentQueueETM.id){
                    isCurrent = true;
                    continue;
                }
                nPrevETM.unshift(this.state.queueETMList[i].id)
            }
        }
        console.log(nNextETM);
        
        return(
            <div>
                <MuiThemeProvider>
                    <Titlebar title = "International College Queuing System"/>
                </MuiThemeProvider>
                <Row>
                        <Row style = {{marginLeft : 16}}>
                            <Col md = {6}>
                                <CardShubU ref = "card" current = {this.state.currentQueue}/>  
                            </Col>
                            <Col md = {6}>
                                <CardShubU ref = "card2" current = {this.state.currentQueueETM}/>
                            </Col>
                        </Row>
                        {this.props.isAdmin? 
                            <Row style = {{marginLeft : 16}}>
                            <Col md = {6} >
                                <div style = {{marginLeft : 16 ,marginRight : 32}}>
                                    <QueueList style = "success" head = "SE Queue" list = {nNext}/>
                                </div>
                            </Col>
                            <Col md = {6}>
                                <div style = {{marginLeft : 16,marginRight : 32}}>
                                    <QueueList style = "danger" head = "ETM Queue" list = {nNextETM}/>
                                </div>
                            </Col>
                        </Row> :
                            <Row style = {{marginLeft : 16}}>
                            <Col md = {6} >
                                <div style = {{marginLeft : 16 ,marginRight : 32}}>
                                    <QueueList style = "success" head = "SE Called Queue" list = {nPrev}/>
                                </div>
                            </Col>
                            <Col md = {6}>
                                <div style = {{marginLeft : 16,marginRight : 32}}>
                                    <QueueList style = "danger" head = "ETM Called Queue" list = {nPrevETM}/>
                                </div>
                            </Col>
                        </Row>
                        }
                        
                        {this.props.isAdmin? 
                        <Row style = {{marginLeft: 16}}>
                            <div>
                                <Col md = {6}>
                                    <Button  bsStyle="primary"bsSize="large" block disabled = {this.state.isNextQueue} onClick = {this.onNextClickHandler}> {this.state.isNextQueue? "Pending..." : "Next SE" } </Button>
                                </Col>
                                <Col md = {6}>
                                    <Button  bsStyle="primary"bsSize="large" block disabled = {this.state.isNextQueue} onClick = {this.onNextETMClickHandler}> {this.state.isNextQueue? "Pending..." : "Next ETM" } </Button>
                                </Col>
                            </div>
                        </Row> : <div></div> }
                    
                </Row>
                <MuiThemeProvider>
                    <Notibar text = { "New Queue ready!!!" } ref = "noti"/>
                </MuiThemeProvider>
            </div>
        );
    }
}