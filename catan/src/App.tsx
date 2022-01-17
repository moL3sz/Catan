import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import GamePage from './Pages/GamePage/GamePage';
import { initFirebase } from './Misc/firebase';
import HomePage from './Pages/HomePage/HomePage';
initFirebase()
function App() {

  const [goh, setGoH] = useState<boolean>(false) //Game or Home
  window.addEventListener("resize", () => {
    document.getElementsByTagName("body")[0].style.height = window.innerHeight + "px";

  })
  useEffect(() => {
    if (window.location.pathname === "/game") {

      setGoH(true)
    }
  }, [window.location.pathname])
  return (
    <div className="app">
      {
        goh ? <GamePage /> : <HomePage />
      }
    </div>
  )
}
export default App;
