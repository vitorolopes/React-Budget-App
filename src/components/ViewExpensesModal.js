import React from 'react';
import { Modal, Stack, Button } from 'react-bootstrap';
import { UNCATEGORIZED_BUDGET_ID, useBudgetsContext } from '../context/BudgetsContextProvider';
import { currencyFormatter } from "../utils"


const ViewExpensesModal = ({budgetId, handleClose}) => {

  const {budgets, getBudgetExpenses, deleteExpense} = useBudgetsContext();

  const expenses = getBudgetExpenses(budgetId)

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

      <Modal.Body>
{/* //! HERE 1b imported currencyFormatter from utils*/}
              <Stack direction="vertical" gap="3">
                 {expenses.map(expense => (
                    <Stack direction="horizontal" gap="2" key={expense.id}>
                        <div className='me-auto fs-4'> {expense.description}</div>
                        <div className='fs-5'>{currencyFormatter.format(expense.amount)}</div>
                        <Button size="sm" variant="outline-danger"
                                onClick={() => deleteExpense(expense.id)}
                        > 
                            &times; 
                            {/* //! &times; gives us a cross */}
                        </Button>
                    </Stack>
                 ))}
              </Stack>

            </Modal.Body>



    </Modal>
  )
}

export default ViewExpensesModal