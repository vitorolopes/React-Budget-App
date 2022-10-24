import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const BudgetsContext = createContext()

export const BudgetsContextProvider = ({children}) => {

  const dummyValue = "Dummy Value"

  // A budget object is going to look like this
  // {id: , name: , max: }
  // An expense object is going to look like this
  // {id: , budgetId: , amount: , description: }
  
  console.log(uuidv4())
  
  const [budgets, setBudgets] = useState([])
  const [expenses, setExpenses] = useState([])
  
  // const addBudget = () => {  }
  // const addExpense = () => {  }
  // const deleteBudget = () => {  }
  // const deleteExpense = () => {  }


  return(
      <BudgetsContext.Provider
        value={{
          dummyValue
        }}
      >
        {children}
      </BudgetsContext.Provider>
  )
  
}

export const useBudgetsContext = () => useContext(BudgetsContext)