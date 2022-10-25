import React, {useRef} from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { UNCATEGORIZED_BUDGET_ID, useBudgetsContext } from '../context/BudgetsContextProvider';

const AddExpenseModal = ({show, handleClose, defaultBudgetId}) => {

  const descriptionRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef()

  const {addExpense, budgets} = useBudgetsContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value
    })
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}  >

        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form.Group className='mb-3' controlId='description' >
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" required ref={descriptionRef} />
          </Form.Group>

          <Form.Group className='mb-3' controlId='amount'>
            <Form.Label>Amount</Form.Label>
            <Form.Control type="number" min={0} step={1} required ref={amountRef}/>
          </Form.Group>

          <Form.Group className='mb-3' controlId='budgetId' >
            <Form.Label>Budget</Form.Label>
            <Form.Select 
              ref={budgetIdRef}
              defaultValue={defaultBudgetId}
            >
              <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map(budget=>(
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className='d-flex justify-content-end'>
                <Button variant="primary" type="submit">Add</Button>
          </div>

        </Modal.Body>

      </Form>
    </Modal>
  )
}

export default AddExpenseModal