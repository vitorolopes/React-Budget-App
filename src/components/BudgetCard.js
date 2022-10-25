import React from 'react';
import { Card, ProgressBar, Stack, Button } from 'react-bootstrap';
import {currencyFormatter} from '../utils';

const getProgressBarVariant = (amount,max) => { 
  const ratio = amount/max;
  if(ratio<0.5) return "primary"
  if(ratio<0.75) return "warning"
  return "danger"
}

const BudgetCard = ({name,amount, max, gray, onAddExpenseClick, hideButtons}) => {

  const classNames=[]

  if(amount > max){
    classNames.push("bg-danger", "bg-opacity-10")
  } else if(gray){
    classNames.push("bg-light")
  }
  // console.log(hideButtons);

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>

        <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
          <div className='me-2'>{name}</div>
          <div className='d-flex align-items-baseline'>{currencyFormatter.format(amount)}
            {/* //!  We do not need a max for Uncategorized*/}
             { 
              max && <span className='text-muted fs-6 ms-1'> 
                        / {currencyFormatter.format(max)}
                     </span> 
             }
          </div>
        </Card.Title>
    {/* //!  We do not need a ProgressBar for Uncategorized*/}
      {  
        max &&  <ProgressBar
                  className='rounded-pill'
                  variant={getProgressBarVariant(amount, max)}
                  min={0}
                  max={max}
                  now={amount}
                />
        }
   {/* //!  We do not need the Add Expense or View Expenses buttons for Total Budget*/}
   {/* console.log(hideButtons) --> true when in <BudgetCard hideButtons> we have this property => !hideButtons = false
       console.log(hideButtons) --> undefined when in <BudgetCard > we do not have this property => !hideButtons = true  */}
        { 
          !hideButtons && <Stack direction='horizontal' gap="2" className='mt-4'>
                            <Button variant='outline-primary' className='ms-auto'
                                    onClick={onAddExpenseClick}
                            >
                              Add Expense
                            </Button>

                            <Button variant='outline-secondary'>
                              View Expenses
                            </Button>
                        </Stack>
        }

      </Card.Body>
    </Card>
  )
}

export default BudgetCard