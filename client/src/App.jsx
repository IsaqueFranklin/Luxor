import { useState } from 'react';
import {Route, Routes} from 'react-router-dom';
import axios from 'axios';

import { UserContextProvider } from './UserContext';

import Layout from './Layout';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/auth/RegisterPage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/auth/LoginPage';
import ModulePage from './pages/getContent/ModulePage';
import ContentPage from './pages/getContent/ContentPage';
import CreateGroup from './pages/create/CreateGroup';
import EditGroup from './pages/edit/EditGroup';
import ProfilePage from './pages/general/ProfilePage';
import CustomerSupportPage from './pages/general/CustomerSupportPage';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={ <HomePage /> } />
          <Route path='/perfil' element={ <ProfilePage /> } />
          <Route path='/dashboard' element={ <Dashboard /> } />
          <Route path='/suporte' element={ <CustomerSupportPage /> } />
          <Route path='/modulo/:id' element={ <ModulePage /> } />
          <Route path='/conteudo/:id' element={ <ContentPage /> } />
          <Route path='/edit-group/:id' element={ <EditGroup /> } />
        </Route>
        <Route path='/cadastro' element={ <RegisterPage /> } />
        <Route path='/login' element={ <LoginPage /> } />
      </Routes>
    </UserContextProvider>
  )
}

export default App
