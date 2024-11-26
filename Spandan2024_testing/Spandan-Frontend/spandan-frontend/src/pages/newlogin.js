import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const history = useNavigate();
  const [loginType, setLoginType] = useState('student');

  const handleStudentClick = () => {
    // Set the login type to student and navigate to /login
    setLoginType('student');
    history.push('/login');
  };

  const handleAlumniClick = () => {
    // Set the login type to alumni and navigate to /login
    setLoginType('alumni');
    history.push('/login');
  };

  return (
    <div>
      {/* Your login form and other components */}
      {loginType === 'student' && (
        <div>
          Student Login Content
          {/* Additional student login components */}
        </div>
      )}

      {loginType === 'alumni' && (
        <div>
          Alumni Login Content
          {/* Additional alumni login components */}
        </div>
      )}

      <button onClick={handleStudentClick}>Student Login</button>
      <button onClick={handleAlumniClick}>Alumni Login</button>
    </div>
  );
};

export default Login;
