import React, {useRef} from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useBudgetsContext } from '../context/BudgetsContextProvider';

const AddBudgetModal = ( {show, handleClose} ) => {

  const nameRef = useRef()
  const maxRef = useRef()

  const {addBudget} = useBudgetsContext()

  const handleSubmit = (e) => {  
    e.preventDefault()
    addBudget(
      nameRef.current.value, // the name
      parseFloat(maxRef.current.value) // the max
    )
    handleClose()
  }
 
  return (
    <Modal show={show} onHide={handleClose}>

        <Form onSubmit={handleSubmit}>

          <Modal.Header closeButton>
            <Modal.Title>New Budget</Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" required ref={nameRef}/>
            </Form.Group>

            <Form.Group className='mb-3' controlId='max'>
              <Form.Label>Maximun Spending</Form.Label>
              <Form.Control type="number" required min={0} step={1} ref={maxRef} />
            </Form.Group>

            <div className='d-flex justify-content-end'>
              <Button variant="primary" type="submit">Add</Button>
            </div>

          </Modal.Body>

        </Form>

    </Modal>
  )
}

export default AddBudgetModal
