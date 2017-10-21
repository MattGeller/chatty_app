import React, {Component} from 'react';
import openSocket from 'socket.io-client';

class ChatRoom extends Component {
    constructor(props){
        super(props);

        this.socket = openSocket('http://localhost:3500');

        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(){
        this.socket.emit('message', /*put the actual message right here, as this second argument.*/'Hello hard coded')
    }

    componentDidMount() {
        this.socket.on('connect', () => {
            this.socket.emit('room', this.props.match.params.id)
        });
        this.socket.on('message', msg=>{
            console.log('Message Recieved:', msg);
        });
    }

    componentWillUnmount(){
        console.log('Unmounting Chat Room');
        //this component itself is emiting an event for the back end to listen for. That event's name? 'leave room'
        this.socket.emit('leave room',/*I have to tell the back end the id of the room this user is leaving from*/ this.props.match.params.id)
    }

    render(){
        return(
            <div>
                <h1>Welcome to room{this.props.match.params.id}</h1>
                <button onClick={this.sendMessage}>Test Send Message</button>
            </div>
        )
    }
}

export default ChatRoom;