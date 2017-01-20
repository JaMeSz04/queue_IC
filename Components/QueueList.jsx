import React, {Component, PropTypes} from 'react';
import {ListGroup, ListGroupItem,Panel} from 'react-bootstrap';

export default class QueueList extends Component {

    getListGroupItem(text){
        return (
            <ListGroupItem> <p className = "listItem">{text}</p> </ListGroupItem>
        );
    }

    render(){
        var listAll = this.props.list.map( (text) =>  this.getListGroupItem(text))
        return(
            <Panel bsStyle = {this.props.style} header = {this.props.head}>
                <ListGroup fill>
                    {listAll}
                </ListGroup>
            </Panel>
        );
    }
}