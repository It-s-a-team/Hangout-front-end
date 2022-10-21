import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class RoomInput extends React.Component {
  render() {
    return (
      <>
        <Form onSubmit={this.props.handleRoomSubmit}>
          <Form.Group className='mb-3' controlId='RoomInput'>
            <Form.Label>Room</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter room name'
              onInput={this.props.handleRoomInput}
            ></Form.Control>
            <Button type='submit'>Enter Room</Button>
          </Form.Group>
        </Form>
      </>
    );
  }
}
export default RoomInput;
