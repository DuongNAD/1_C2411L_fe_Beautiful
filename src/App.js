
import React, { useState, useRef } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group'; 
import './App.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import OtpForm from './OtpForm';
import ForgotPasswordForm from './ForgotPasswordForm';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('login');
  
  const nodeRef = useRef(null);
  
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
  };
  const handleRegisterSuccess = () => setCurrentView('otp');
  const handleOtpVerification = (otpCode) => {
    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    setCurrentView('login');
  };

  const handleForgotPassword = () => {
    setCurrentView('forgot-password');
  };

  const handleResetPassword = (email) => {
    console.log(`Sending password reset link to: ${email}`);
    alert(`Một liên kết đặt lại mật khẩu đã được gửi đến ${email}.`);
    setCurrentView('login');
  };

  if (isAuthenticated) {
    return (
      <div className='app-container'>
        <div className='welcome-container'>
          <h1>Xin chào đến với Beautiful Beach</h1>
          <button onClick={handleLogout} className='submit-btn'>Logout</button>
        </div>
      </div>
    );
  }

  const renderAuthView = () => {
    let componentToRender;
    switch (currentView) {
      case 'forgot-password':
        componentToRender = (
          <ForgotPasswordForm
            onResetPassword={handleResetPassword}
            onBackToLogin={() => setCurrentView('login')}
          />
        );
        break;
      case 'register':
        componentToRender = (
          <>
            <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
            <button onClick={() => setCurrentView('login')} className="toggle-link">
              Bạn đã có tài khoản? Đăng nhập
            </button>
          </>
        );
        break;
      case 'otp':
        componentToRender = <OtpForm onVerify={handleOtpVerification} />;
        break;
      case 'login':
      default:
        componentToRender = (
          <>
            <LoginForm
              onLogin={handleLogin}
              onForgotPassword={handleForgotPassword}
            />
            <button onClick={() => setCurrentView('register')} className="toggle-link">
              Bạn chưa có tài khoản? Đăng ký
            </button>
          </>
        );
        break;
    }

    return (
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={currentView}
          nodeRef={nodeRef}
          timeout={300}
          classNames="fade"
        >
          <div ref={nodeRef}>{componentToRender}</div>
        </CSSTransition>
      </SwitchTransition>
    );
  };

  return (
    <div className='app-container'>
      <div className='auth-container'>
        {renderAuthView()}
      </div>
    </div>
  );
}

export default App;