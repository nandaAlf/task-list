// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect } from "react";
import "./App.css";
import { TaskListContainer } from "./components/TaskListContainer";
import { login } from "./api/api";

function App() {
  // const [count, setCount] = useState(0)
  useEffect(() => {
    async function fakeLoginForTest() {
      try {
        await login("alice", "password1234");
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fakeLoginForTest();
  }, []);

  return (
    <>
      <TaskListContainer />;
    </>
  );
}

export default App;
