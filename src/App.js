import React, { useState } from 'react'
import { Container, Stack, Button } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from './components/AddExpenseModal';
import BudgetCard from "./components/BudgetCard";
import TotalBudgetCard from './components/TotalBudgetCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import ViewExpensesModal from './components/ViewExpensesModal';
import { UNCATEGORIZED_BUDGET_ID, useBudgetsContext } from "./context/BudgetsContextProvider";


function App() {

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  // When I open the Add Expense Modal from the Add Expense Button on the top right corner
  // I want the default option for the budget select to be Uncategorized
  // When I open the Add Expense Modal from the a Budget Card
  // I want the default option for the budget select to be that budget
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()

  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()

  const {budgets, getBudgetExpenses} = useBudgetsContext();

  const openAddExpenseModal = (budgetId) => { 
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>

          <Button variant="primary"
                  onClick={()=> setShowAddBudgetModal(true)}
          >
              Add a Budget
          </Button>

          <Button variant="outline-primary"
                   onClick={openAddExpenseModal}   
          >
            Add Expense
          </Button>

        </Stack>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start"
        }}>
          { budgets.map(budget=> {
             // console.log(budget)
              const amount = getBudgetExpenses(budget.id)
                                  .reduce(
                                    (total, expense) => {
                                      return  total + expense.amount
                                    }
                                    ,0)
              console.log(amount);

              return (
                <BudgetCard
                  key={budget.id}
                  name={budget.name}
                  amount={amount}
                  max={budget.max}
                  onAddExpenseClick={()=>openAddExpenseModal(budget.id)}

                  onViewExpensesClick={()=>setViewExpensesModalBudgetId(budget.id)}

                />

              )
          })}

          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal}

                                   onViewExpensesClick={()=>setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)}
          
          />

          <TotalBudgetCard/>
        </div>
      
      </Container>

      <AddBudgetModal show={showAddBudgetModal}
                      handleClose={() => setShowAddBudgetModal(false)}
      />
      <AddExpenseModal show={showAddExpenseModal} 
                       handleClose={()=> setShowAddExpenseModal(false)}
                       defaultBudgetId={addExpenseModalBudgetId}                 
      />
      <ViewExpensesModal 
          budgetId={viewExpensesModalBudgetId}
          //! here we set up the state variable viewExpensesModalBudgetId to its initial value(undefined)
          handleClose={()=>setViewExpensesModalBudgetId()}
      />

    </>
  );
}

export default App;
