import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './view/Login/LoginPage';
import DrawerPage from './Layout/DrawerPage/DrawerPage';
import HomePage from './view/Students/HomePage';
import StudentsPage from './view/Admin/StudentsPage';
import RegisterPage from './view/Register/RegisterPage';
import DevIndicate from './view/DevIndicate';
import ForgotPasswordPage from './view/ForgotPassword/ForgotPasswordPage';
import Footer from './Layout/Footer/Footer';
import ProfilePage from './view/ProfilePage';
import AddStudentPage from './view/Admin/AddStudentPage';


function DrawerLayout() {
  return (
    <>
      <DrawerPage />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgotPassword' element={<ForgotPasswordPage />} />
          
         
          <Route path='/' element={<DrawerLayout />}>
            <Route path='home' element={<HomePage />} />
            <Route path='students' element={<StudentsPage />} />
            <Route path='devIndicate' element={<DevIndicate />} />
            <Route path='addStudent' element={<AddStudentPage />} />
            <Route path='profile' element={<ProfilePage />} />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
