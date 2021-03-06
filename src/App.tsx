import React from 'react';
import Layout from './Layout/Layout';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import RockPaperScissors from './components/RockPaperScissors';

import Connect4 from "./components/Connect4";
import Memory from "./components/Memory/Memory";
import Home from "./components/Home";
import TicTacToe from './components/TicTacToe/TicTacToe';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route  index element={<Home/>}/>
            <Route path = "/rockpaperscissors" element={<RockPaperScissors/>}/>
            <Route path = "/connect4" element={<Connect4/>}/>
            <Route path = "/memory" element={<Memory/>}/>
            <Route path = "/tictactoe" element={<TicTacToe/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
