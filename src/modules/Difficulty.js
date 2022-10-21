import React from 'react';
import Form from 'react-bootstrap/Form';

class DifficultyInput extends React.Component
{
  render()
  {
    return (
      <>
        <Form onSubmit={ this.props.handleSubmitLetter }>
          <Form.Group className='mb-3' controlId='enterLetter'>
            <Form.Label>Difficulty</Form.Label>
            <Form.Select
              onChange={ this.props.handleDifficulty }
            >
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </>
    );
  }
}
export default DifficultyInput;
