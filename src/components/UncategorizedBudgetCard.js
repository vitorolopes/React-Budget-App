import { UNCATEGORIZED_BUDGET_ID, useBudgetsContext } from "../context/BudgetsContextProvider";
import BudgetCard from "./BudgetCard";

                                            //! props
export default function UncategorizedBudgetCard( props  ){

  const {getBudgetExpenses} = useBudgetsContext();

  console.log(UNCATEGORIZED_BUDGET_ID);

  const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
    (total, expense) => total + expense.amount, 0
  )
 // const amount = 111
  console.log(amount);

  if(amount === 0) return null
                                                           //! {...props}
  return <BudgetCard amount={amount} name="Uncategorized" gray {...props}  />
}