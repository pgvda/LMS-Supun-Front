import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './view/Login/LoginPage';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
