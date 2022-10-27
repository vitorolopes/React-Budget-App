import React from 'react';
import { Modal, Stack, Button } from 'react-bootstrap';



const ViewExpensesModal = ({budgetId, handleClose}) => {
  return (
    <Modal show={true} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction='horizontal' gap="2">

            <div>Expenses - Budget Name</div>
            <Button
              variant="outline-danger"
            >
               Delete
            </Button>

          </Stack>
        </Modal.Title>

      </Modal.Header>

    </Modal>
  )
}

export default ViewExpensesModal