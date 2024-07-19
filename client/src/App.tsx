import React from "react";
// import "./App.css";
import styles from "./App.module.css";
import GameContainer from "./components/index";

function App() {
  return (
    <div className={styles.App}>
      <GameContainer />
    </div>
  );
}

export default App;
