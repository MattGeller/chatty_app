import React, {Component} from 'react';
import openSocket from 'socket.io-client';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getRoomList} from '../actions';

class Chat extends Component {

    constructor(props){
        super(props);

        // this.socket = openSocket('http://localhost:3500');
        //
        // this.sendMessage = this.sendMessage().bind(this);
    }

    sendMessage(){
        // this.socket.emit('chat message', 'Hello hard coded')
    }

    componentDidMount(){
        // this.socket.on('chat message', msg=>{
        //     console.log('Message Recieved:', msg);
        // });
        this.props.getRoomList();
    }

    render(){
        console.log('This is rooms:', this.props.rooms);

        const roomList = this.props.rooms.map((room, index) => {
            //map through the roomList, and for each element, return this stuff
            return (
                <li key={index} className="collection-item avatar">
                    <i className="circle green"></i>
                    <Link to={`/chat/${room._id}`} className="title">{room.name}</Link>
                </li>
            )

        });

        return(
            <div>
                <h1>Chat Lobby</h1>
                <ul className="collection">
                    {roomList}
                </ul>
            </div>
        )

    }
}

function mapStateToProps(/*this is the whole redux state here*/state){
    return {
        //here we choose what part of the state we want to add to props
        rooms: state.chat.rooms
    }
}

//connect will call mapStateToProps with the redux state, and connect it to this particular component's props.
export default connect(mapStateToProps, {getRoomList})(Chat);