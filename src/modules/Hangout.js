import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import HangoutInput from './HangoutInput';
import HangoutChat from './HangoutChat';
import io from 'socket.io-client';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import DifficultyInput from './Difficulty';
import '../css/App.css';
import RoomInput from './RoomInput';

// url of our hangout backend
const URL = process.env.REACT_APP_SERVER || 'http://localhost:3001/hangout';

class Hangout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLetter: '',
      chatMessage: '',
      chatLogs: [],
      roomInput: '',
      currentRoom: '',
      players: [],
      rooms: [],
      socket: null,
      turn: '',
      lives: 0,
      difficulty: 'easy',
      currentWord: '',
      gameMessage: '',
    };
  }

  /*
  connectToSocket = async () =>
  {
    // connect to our express server using the URL in our .env
    const socket = await io.connect(URL);

    // as soon as we 'connect'
    socket.on('connect', (payload) =>
    {
      // log our socket id
      console.log('socket id: ', socket.id);
      // log the payload of our 'connect' event
      console.log(payload);

      // socket.emit('gameStart', 'Game Starting!');
    });
    socket.on('gameStart', (payload) =>
    {
      this.setState(payload);
      console.log(payload);
      console.log('game starting');
    });
    socket.on('nextTurn', (payload) => this.setState(payload));
    socket.on('gameOver', (payload) => this.setState(payload));
    this.setState({
      socket: socket,
    });
    */

  handleStartGame = (e) => {
    console.log('clicked');
    console.log(this.state);
    this.state.socket.emit('gameStart', {
      difficulty: this.state.difficulty,
    });
  };

  joinSocket = async () => {
    if (this.props.auth0.isAuthenticated) {
      try {
        // generate a token with auth0
        // we'll use it to make a secure request with to our server
        const res = await this.props.auth0.getIdTokenClaims();

        // this is the raw token
        // note the double underscore __ in .__raw
        const jwt = res.__raw;
        console.log('jwt token: ', jwt);

        const socket = io.connect(URL, {
          auth: {
            token: jwt,
          },
        });
        // console.log(this.props.auth0.user.email);
        console.log('socket object with auth headers: ', socket);
        socket.on('connect', () => {
          console.log('socket id: ', socket.id);
          // put player stuff here
        });

        socket.on('connect_error', (err) => {
          console.log('err instanceof Error: ', err instanceof Error); // true
          console.log('err.message: ', err.message); // not authorized
          console.log('err.data: ', err.data); // { content: "Please retry later" }
        });
        socket.on('gameStart', (payload) => {
          this.setState(payload);
          console.log(payload);
          console.log('game starting');
        });
        socket.on('newRoom', (payload) => {
          console.log(payload);
          this.setState({
            rooms: payload.rooms,
            players: payload.newPlayerList,
          });
        });
        socket.on('chat', (payload) =>
          this.setState({
            chatLogs: payload,
          })
        );
        socket.on('nextTurn', (payload) => this.setState(payload));
        socket.on('gameOver', (payload) => this.setState(payload));
        this.setState({
          socket: socket,
        });
      } catch (error) {
        console.log('problem joining socket: ', error.response);
      }
    }
  };

  // this function changes state when user inputs a letter in the text box
  handleEnterLetter = (e) => {
    e.preventDefault();
    console.log('entered letter: ', e.target.value);
    this.setState({
      currentLetter: e.target.value,
    });
  };

  // this function is where we'll do socket stuff
  handleSubmitLetter = (e) => {
    e.preventDefault();
    // console.log(e.target);
    this.state.socket.emit('letterSubmit', this.state.currentLetter);
    // here, we'll use our socket model to create an event with the letter to use as a guess
  };

  // this function changes state when user inputs a letter in the text box
  handleEnterChat = (e) => {
    e.preventDefault();
    console.log('entered message: ', e.target.value);
    this.setState({
      chatMessage: e.target.value,
    });
  };

  // this function is where we'll do socket stuff
  handleSubmitChat = (e) => {
    e.preventDefault();
    this.state.socket.emit('chat', {
      room: this.state.currentRoom,
      message: `${this.props.auth0.user.name}: ${this.state.chatMessage}`,
    });
    console.log(this.state.chatMessage);
    // here, we'll use our socket model to create an event with the letter to use as a guess
  };

  handleDifficulty = (e) => {
    e.preventDefault();
    this.setState({
      difficulty: e.target.value,
    });
    // console.log(e.target.value);
  };

  handleRoomInput = (e) => {
    e.preventDefault();
    this.setState({
      roomInput: e.target.value,
    });
  };

  handleRoomSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target);
    // console.log(this.state.roomInput);
    let newRoom = this.state.roomInput;
    let oldRoom = this.state.currentRoom;

    console.log(this.props.auth0.user);
    this.setState({
      currentRoom: this.state.roomInput,
    });

    this.state.socket.emit('join', {
      newRoom,
      oldRoom,
      player: this.props.auth0.user,
    });
  };

  componentDidMount() {
    //this.connectToSocket();
    this.joinSocket();
  }

  render() {
    console.log(this.state);
    if (this.state.socket) {
      console.log(this.state.socket.id);
    }

    let chatList = this.state.chatLogs.map((str) => (
      <ListGroupItem>{str}</ListGroupItem>
    ));

    return (
      <>
        <RoomInput
          handleRoomInput={this.handleRoomInput}
          handleRoomSubmit={this.handleRoomSubmit}
        />
        <Button variant="outline-success" onClick={ this.handleStartGame }>
          Start Game
        </Button>
        <DifficultyInput handleDifficulty={this.handleDifficulty} />
        <h1>{`Word: ${this.state.currentWord}`}</h1>
        <h2>{`Lives: ${this.state.lives}`}</h2>
        <h2>{this.state.gameMessage}</h2>

        <img
          class="hangoutGuy"
          src={require(`./Images/Hangout-Guy-${this.state.lives}.png`)}
          alt="Hangout-Guy">
        </img>

        <HangoutInput
          handleEnterLetter={this.handleEnterLetter}
          handleSubmitLetter={this.handleSubmitLetter}
        />
        <HangoutChat
          handleEnterChat={this.handleEnterChat}
          handleSubmitChat={this.handleSubmitChat}
        />
        <ListGroup>{chatList}</ListGroup>
      </>
    );
  }
}

export default withAuth0(Hangout);
