// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { TaskListContainer } from "./components/TaskListContainer";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <TaskListContainer />;
    
      {/* <Button >Add Task   </Button>
      <Button variant={"secondary"}>Cancel  </Button>
      <IconButton icon={<Calendar/>} label={"Today"}></IconButton>
      <IconButton icon={<Calendar/>} label={"Today"} variant="outlined"> </IconButton> */}
    </>
  );
}

export default App;
