import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class UserInput extends React.Component
{
  render()
  {
    return (
      <>
        <Form onSubmit={ this.props.submitData }>
          <Form.Group controlId="idea">
            <Form.Label>Tell us your idea!</Form.Label>
            <Form.Control name="idea" />
            <Button type='submit'>Submit</Button>
          </Form.Group>
        </Form>
      </>)
  }
}

export default UserInput;
