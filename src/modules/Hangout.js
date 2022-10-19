import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import HangoutInput from "./HangoutInput";
import HangoutChat from "./HangoutChat";
//import io from 'socket.io-client';
//const socket = io.connect('http://localhost:3001');

class Hangout extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      currentLetter: '',
      chatMessage: ''
    }
  }

  // this function changes state when user inputs a letter in the text box
  handleEnterLetter = e =>
  {
    e.preventDefault();
    console.log('entered letter: ', e.target.value);
    this.setState({
      currentLetter: e.target.value,
    });
  }

  // this function is where we'll do socket stuff
  handleSubmitLetter = e =>
  {
    e.preventDefault();
    // here, we'll use our socket model to create an event with the letter to use as a guess
  }

  // this function changes state when user inputs a letter in the text box
  handleEnterChat = e =>
  {
    e.preventDefault();
    console.log('entered message: ', e.target.value);
    this.setState({
      chatMessage: e.target.value,
    });
  }

  // this function is where we'll do socket stuff
  handleSubmitChat = e =>
  {
    e.preventDefault();
    // here, we'll use our socket model to create an event with the letter to use as a guess
  }

  render()
  {
    return (
      <>
        <HangoutInput
          handleEnterLetter={ this.handleEnterLetter }
          handleSubmitLetter={ this.handleSubmitLetter }
        />
        <HangoutChat
          handleEnterChat={ this.handleEnterChat }
          handleSubmitChat={ this.handleSubmitChat }
        />
      </>
    )
  }
}
export default withAuth0(Hangout);
