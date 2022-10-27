import { createContext, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = createContext()

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized"

export const BudgetsContextProvider = ({children}) => {

  // A budget object is going to look like this
  // {id: , name: , max: }
  // An expense object is going to look like this
  // {id: , budgetId: , amount: , description: }
  
  const [budgets, setBudgets] = useLocalStorage("budgets", [])
  const [expenses, setExpenses] = useLocalStorage("expenses",[])
  
  const addBudget = (name,max) => { 
    setBudgets(prevBudgets => {
      if(prevBudgets.find(budget => budget.name === name)){
        return prevBudgets
      }
      return [...prevBudgets, {id: uuidv4(), name: name, max: max}]
    })
   }

   const getBudgetExpenses = (budgetId) => { 
    console.log(budgetId)
    console.log(expenses.filter(expense => expense.budgetId === budgetId));
     return expenses.filter(expense => expense.budgetId === budgetId)
   }

   const addExpense = ({description, amount, budgetId}) => { 
      setExpenses(prevExpenses => {
        return [...prevExpenses, {id:uuidv4(), description, amount, budgetId}]
      })
   }
  
   const deleteExpense = (id) => { 
    setExpenses(prevExpenses => {
      return prevExpenses.filter(expense => expense.id !== id)
  })
    }
  
    const deleteBudget = (id) => { 
      setExpenses( prevExpenses => {
        // I want to take all of the expenses associated with this budget 
        // I want to delete and move them to uncategorized.         
                  return prevExpenses.map(expense => {
        // If this particular expense does not pertain to the budget
        // we are dealing with (the budget with the id that is passed 
        // as a parameter in deleteBudget()) then return the expense without
        // any change. Just don't deal with it
                      if (expense.budgetId !== id) return expense
        // otherwise i want to take my entire expense i want to keep everything
        // exactly the same but i want to change the budget id to that uncategorized budget id
                      return {...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
                    })
                })
      // and here I delete the budget
      setBudgets(prevBudgets => {
          return prevBudgets.filter(budget => budget.id !== id)
      })

    }
  


  return(
      <BudgetsContext.Provider
        value={{
          addBudget,
          budgets,
          getBudgetExpenses,
          addExpense,
          expenses,
          deleteExpense,
          deleteBudget
        }}
      >
        {children}
      </BudgetsContext.Provider>
  )
  
}

export const useBudgetsContext = () => useContext(BudgetsContext)