import { createContext, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = createContext()

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
  // const addExpense = () => {  }
  // const deleteBudget = () => {  }
  // const deleteExpense = () => {  }


  return(
      <BudgetsContext.Provider
        value={{
          addBudget
        }}
      >
        {children}
      </BudgetsContext.Provider>
  )
  
}

export const useBudgetsContext = () => useContext(BudgetsContext)