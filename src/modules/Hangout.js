import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import HangoutInput from './HangoutInput';
import HangoutChat from './HangoutChat';
import io from 'socket.io-client';

const URL = process.env.URL || 'http://localhost:3002/hangout';

class Hangout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLetter: '',
      chatMessage: '',
      socket: null,
      turn: '',
      lives: 0,
      currentWord: '',
      gameMessage: '',
    };
  }

  connectToSocket = async () => {
    const socket = await io.connect(URL);
    socket.on('connect', (payload) => {
      console.log('socket id: ', socket.id);
      console.log(payload);
      socket.emit('gameStart', 'Game Starting!');
    });
    socket.on('gameStart', (payload) => this.setState(payload));
    socket.on('nextTurn', (payload) => this.setState(payload));
    socket.on('gameOver', (payload) => this.setState(payload));
    this.setState({
      socket: socket,
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
        socket.on('connect', () => {
          console.log('socket id: ', socket.id);
          // put player stuff here
        });

        socket.on('connect_error', (err) => {
          console.log('err instanceof Error: ', err instanceof Error); // true
          console.log('err.message: ', err.message); // not authorized
          console.log('err.data: ', err.data); // { content: "Please retry later" }
        });
        const payload = {
          playerId: socket.id,
          message: 'hey there',
          jwt: jwt,
        };

        socket.emit('hello', payload);
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
    // here, we'll use our socket model to create an event with the letter to use as a guess
  };

  componentDidMount() {
    this.connectToSocket();
    // this.joinSocket();
    // /* we know this works!
    // const socket = io.connect(URL);
    // socket.on('connect', () =>
    // {
    //   console.log('socket id: ', socket.id);
    // });
  }

  render() {
    console.log(this.state);
    if (this.state.socket) {
      console.log(this.state.socket.id);
    }

    return (
      <>
        <h1>{`Word: ${this.state.currentWord}`}</h1>
        <h2>{`Lives: ${this.state.lives}`}</h2>
        <h2>{this.state.gameMessage}</h2>

        <HangoutInput
          handleEnterLetter={this.handleEnterLetter}
          handleSubmitLetter={this.handleSubmitLetter}
        />
        <HangoutChat
          handleEnterChat={this.handleEnterChat}
          handleSubmitChat={this.handleSubmitChat}
        />
      </>
    );
  }
}
export default withAuth0(Hangout);
