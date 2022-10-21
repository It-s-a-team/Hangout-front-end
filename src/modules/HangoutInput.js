import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


class HangoutInput extends React.Component
{
  render()
  {
    return (
      <>
        <Form onSubmit={ this.props.handleSubmitLetter }>
          <Form.Group
            className="mb-3"
            controlId="enterLetter"
          >
            <Form.Label>Guess. Now!</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter a letter'
              onInput={ this.props.handleEnterLetter }
              maxLength={ 1 }
            >
            </Form.Control>
            <Button 
              type="submit"
              variant="outline-info">Submit your guess</Button>
          </Form.Group>
        </Form>
      </>
    )
  }
}
export default HangoutInput;
