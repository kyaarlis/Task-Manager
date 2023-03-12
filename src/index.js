import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TaskListPage from './TaskList';
import AddTaskPage from './TaskAdd';
import SignUpPage from './login/SignUp';
import LoginPage from './login/LogIn';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="tasks" element={<TaskListPage />} />
          <Route path="addtask" element={<AddTaskPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <App />  
  </React.StrictMode>
);

reportWebVitals();
