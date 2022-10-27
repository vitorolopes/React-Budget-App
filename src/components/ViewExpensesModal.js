import React from 'react';
import { Modal, Stack, Button } from 'react-bootstrap';
import { UNCATEGORIZED_BUDGET_ID, useBudgetsContext } from '../context/BudgetsContextProvider';


const ViewExpensesModal = ({budgetId, handleClose}) => {

  const {budgets} = useBudgetsContext();

  const budget = 
      budgetId === UNCATEGORIZED_BUDGET_ID
      ? 
        {name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID}
      :
        budgets.find(budget=> budget.id === budgetId) 

  return (
    //! If I used !== this Modal would show on load
    // console.log(undefined !== null) --> true
    // console.log(undefined != null) --> false
    // So, at the beggining, when budgetId is undefined,
    // budgetId != null returns false and the modal is not shown 
    <Modal show={budgetId != null} onHide={handleClose}>

      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction='horizontal' gap="2">
{/* //! I am going to put a question mark here to make sure if our budget is defined.
    //! we are going to get the name, otherwise, if name is not defined, we can ignore it*/}
            <div>Expenses - {budget?.name}</div>
{/* //! We do not want the Uncategorized budget to have a delete button, so ... */}
            { budgetId !== UNCATEGORIZED_BUDGET_ID &&
                  (  <Button
                      variant="outline-danger"
                    >
                      Delete
                    </Button>)
            }
          </Stack>
        </Modal.Title>

      </Modal.Header>

    </Modal>
  )
}

export default ViewExpensesModal