import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class HangoutChat extends React.Component
{
  render()
  {
    return(
      <>
        <Form onSubmit={ this.props.handleSubmitChat }>
          <Form.Group
            className="mb-3"
            controlId="enterChat"
          >
            <Form.Label>Honey Smacks</Form.Label>
            <Form.Control
              as="textarea"
              rows={ 8 }
              placeholder="Talk smack!"
              onInput={ this.props.handleEnterChat }
              maxLength={ 280 }
            >
            </Form.Control>
            <Button type="submit">Chat</Button>
          </Form.Group>
        </Form>
      </>
    )
  }
}
export default HangoutChat;
