import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ctheme from './utils/theme'
import Homepage from "./pages/Homepage";
import Login from './pages/Login';
import Main from './pages/main/main';
import Alumni from './pages/Alumni_login';
import Signup from './pages/Signup'
import ForgotPwd from './pages/ForgotPassword'
import ChangePassword from './pages/ChangePassword';
import Profile from './pages/Profile';
import Events from './pages/Events';
import Event from './pages/Event';
import About from './pages/About';
import Fixtures from "./pages/Fixtures"

function App() {
  return (
    <ChakraProvider theme={ctheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/Alumnilogin" element={<Alumni />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<ForgotPwd />} />
          <Route path="/change/:token" element={<ChangePassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:sport_id" element={<Event />} />
          <Route path="/about" element={<About />} />
          <Route path="/fixtures" element={<Fixtures />} />
          {/* Add support for "/me" url too */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
