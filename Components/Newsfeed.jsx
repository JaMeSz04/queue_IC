import React , {Component} from 'react';
import {FormControl, Modal, Panel, Row, Col, ListGroup, ListGroupItem, Button} from 'react-bootstrap';

export default class Newsfeed extends Component {

    constructor(props){
        super(props);
        this.state = {
            newsfeed : [],
            size : 0,
        }
        
        this.addNewsHandler = this.addNewsHandler.bind(this);
        this.handleNewsFeed = this.handleNewsFeed.bind(this);
    }

    addNewsHandler(nHeader, content){
        
        firebase.database().ref('feedList/' + nHeader).set({
            header: nHeader,
            message: content,
            id : this.state.size + 1
        });
}

    handleNewsFeed(snapshot){
        
        console.dir(snapshot.val());
        var nNews = this.state.newsfeed;
        nNews.unshift(snapshot.val());
        var newSize = this.state.size + 1;
        this.setState({newsfeed : nNews , size : newSize});

    }
    componentDidMount(){
        
        var newsRef = firebase.database().ref('feedList/');
        newsRef.orderByChild("id").limitToLast(5).on('child_added', this.handleNewsFeed);
        
    }
    render(){
        var listNews = this.state.newsfeed.map((element)=> { return (
                                             <ListGroupItem style = {{marginButton : 16}}>
                                                 <h3> {element.header} </h3> <hr/>
                                                 <p style = {{}}> {element.message} </p>
                                             </ListGroupItem> )})
        return(
            <Panel  bsStyle = "primary" header ="News feed" style = {{marginTop : 16, marginLeft : 16}}>

                    <ListGroup fill>
                        {listNews}
                    </ListGroup>
               
                <Row>
                    <Col md = {9}>
                    </Col>
                    <Col md = {3}>
                        {this.props.isAdmin? <AddBlock onSubmit = {this.addNewsHandler}/>  : <div></div> }
                                 
                    </Col>
                </Row>
            </Panel>
        );
    }

}


class AddBlock extends Component {
    constructor(props){
        super(props);
        this.state = {
            show : false,
            value : "",
            header : "",
            content : ""
        }
        this.addClickHandler = this.addClickHandler.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.submit = this.submit.bind(this);
        this.handleChangeHeader = this.handleChangeHeader.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this);
    }

    addClickHandler(){
        this.setState({show : true})
    }

    hideModal() {
    this.setState({show: false});
    }

    handleChangeHeader(text){
        this.setState({header : text.target.value });
        console.log(text.target.value);
    }

    handleChangeContent(text){
        this.setState({content : text.target.value});
        console.log(text.target.value);
    }
    submit(){
        console.log("clicked!!!");
        this.props.onSubmit(this.state.header, this.state.content);
        this.setState({header : "", content : ""});
        this.hideModal();
    }
    

    render(){
        return(
            <div>
            <Button block bsStyle = "primary" onClick = {this.addClickHandler}>
                Add Post
            </Button>
            <Modal style = {{marginTop: 100}}
          show={this.state.show}
          onHide={this.hideModal}
          dialogClassName="custom-modal"
         >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">Add new post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>    <FormControl
                type="text"
                value={this.state.header}
                placeholder="Enter Headline"
                onChange={this.handleChangeHeader}
            />    </h4>
            <FormControl
                type="text"
                componentClass="textarea"
                value={this.state.content}
                placeholder="Enter text"
                onChange={this.handleChangeContent}
            /> 
            
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.hideModal}>Close</Button>
            <Button bsStyle = "primary" onClick={this.submit}>Submit</Button>
          </Modal.Footer>
        </Modal>
        </div>
        );
    }
}