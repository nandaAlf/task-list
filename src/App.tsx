// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect, useState } from "react";
import "./App.css";
import { TaskListContainer } from "./components/TaskListContainer";
import { login } from "./api/api";

function App() {
  // const [count, setCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    async function fakeLoginForTest() {
      try {
        await login("alice", "password1234");
        setIsLoggedIn(true); // login exitoso
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fakeLoginForTest();
  }, []);
  if (!isLoggedIn) return <p>Iniciando sesión de prueba...</p>;
  return (
    <>
      <TaskListContainer />;
    </>
  );
}

export default App;
