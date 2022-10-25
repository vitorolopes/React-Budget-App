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

  // const deleteBudget = () => {  }
  // const deleteExpense = () => {  }


  return(
      <BudgetsContext.Provider
        value={{
          addBudget,
          budgets,
          getBudgetExpenses,
          addExpense,
          expenses
        }}
      >
        {children}
      </BudgetsContext.Provider>
  )
  
}

export const useBudgetsContext = () => useContext(BudgetsContext)