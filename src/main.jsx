import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import AuthProvider from './provider/AuthProvider';
import TaskBoard from './components/TaskBoard';
import PrivateRoute from './routes/PrivateRoute';


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
   <BrowserRouter>
   <Routes>
   <Route path="/" element={<MainLayout/>}>
   <Route index element={<Home/>} />
   <Route path="login" element={<Login />} />
   <Route path="taskBoard" element={<PrivateRoute><TaskBoard/></PrivateRoute>} /> 
  </Route>
   </Routes>
   
  </BrowserRouter>
   </AuthProvider>
  </StrictMode>,
)
