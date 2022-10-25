import React from 'react'
import { Form, Modal, Button } from 'react-bootstrap'

const AddExpenseModal = ({show}) => {
  return (
    <Modal show={show}>

      <Form onSubmit={()=> console.log("test submit") }  />

      <Modal.Header closeButton>
        <Modal.Title>New Expense</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        <Form.Group className='mb-3' >
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" required/>
        </Form.Group>

        <Form.Group className='mb-3' >
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" min={0} step={1} required/>
        </Form.Group>

        <Form.Group className='mb-3' >
          <Form.Label>Budget</Form.Label>
          <Form.Select>
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
          </Form.Select>
        </Form.Group>

        <div className='d-flex justify-content-end'>
              <Button variant="primary" type="submit">Add</Button>
        </div>


      </Modal.Body>

    </Modal>
  )
}

export default AddExpenseModal