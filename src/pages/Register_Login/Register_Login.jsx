import React from 'react'
import { useSearchParams } from 'react-router-dom';
import './Register_Login.css'
import { Tabs } from "antd";
import Register from './Register';
import Login from './Login';

const Register_Login = () => {

  // =========== setting default tab on navigation =============
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') === 'login' ? '2' : '1'; 
  // Update URL when tab changes
  const handleTabChange = (key)=>{
    setSearchParams({ tab: key === '2' ? 'login' : 'register' });
  }

  // =========== tab properties =============
    const items = [
        {
          key: '1',
          label: 'Register',
          children: <Register/>,
        },
        {
          key: '2',
          label: 'Login',
          children: <Login/>,
        },
      ];


  return (
    <>
    <div className='Register_Login min-h-[calc(100vh-120px)] flex items-center'>
        <div className="content w-[600px] mx-auto shadow-2xl rounded-lg p-4">
        <Tabs defaultActiveKey={defaultTab} items={items} animated={true} onChange={handleTabChange} />
        </div>
    </div>
    </>
  )
}

export default Register_Login