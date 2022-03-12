// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';


function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState({
    "name": "",
    "reps": 0,
    "weight": 0,
    "unit": "",
    "date": ""
});

  return (
      <div className="App">
        <Router>
          <Nav />
          <Header />
          <div className="App-header">
            <Route path="/" exact>
              <HomePage setExerciseToEdit={setExerciseToEdit}/>
            </Route>
            <Route path="/add-exercise">
              <AddExercisePage />
            </Route>
            <Route path="/edit-exercise">
              <EditExercisePage exerciseToEdit={exerciseToEdit} />
            </Route>
          </div>
        </Router>

        <footer>
            <p>&copy; Michelle Myers-Cusick 2022</p>
        </footer>
      </div>
  );
}

export default App;
