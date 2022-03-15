import React from 'react';
import Layout from './Layout/Layout';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import RockPaperScissors from './components/RockPaperScissors';
import Connect4 from "./components/Connect4"
import TicTacToe from './components/TicTacToe';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Layout />} />
          <Route path = "/rockpaperscissors" element={<RockPaperScissors/>}/>
          <Route path = "/connect4" element={<Connect4/>}/>
          <Route path = "/tictactoe" element={<TicTacToe/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
