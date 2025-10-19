import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  useEffect(() => {
    console.log("USEEFFECT");
    // fetch("http://localhost:8000/api/books/")
    //   .then((res) => console.log(res.json)
    //   .catch((error) => console.log(error));
    fetch("http://localhost:8000/api/books/")
      .then((res) => res.json()) // Call the function
      .then((data) => console.log(data)) // Log the actual JSON data
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to eload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
