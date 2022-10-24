import { Container, Stack, Button } from "react-bootstrap";
import AddBudgetModal from "./components/AddBudgetModal";
import BudgetCard from "./components/BudgetCard";
import { useBudgetsContext } from "./context/BudgetsContextProvider";


function App() {

  const {dummyValue} = useBudgetsContext()
  console.log(dummyValue);

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary">Add a Budget</Button>
          <Button variant="outline-primary">Add Expense</Button>
        </Stack>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1rem",
          alignItems: "flex-start"
        }}>
          <BudgetCard
            name="Entertainment"
            amount={600}
            max={1000}
            gray
          >

          </BudgetCard>

        </div>
      
      </Container>

      <AddBudgetModal show={true} handleClose={() => console.log("test close")}/>
    </>
  );
}

export default App;
