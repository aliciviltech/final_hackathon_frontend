import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import './Register_Login.css'
import { Tabs } from "antd";
import Register from './Register';
import Login from './Login';

const Register_Login = () => {

  // =========== setting default tab on navigation =============
  const [defaultTab, setDefaultTab]=useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams.get("type"); // e.g., 'admin' or 'user'
  console.log(type)

  // update tab when URL changes
  useEffect(()=>{
    const checkTab = searchParams.get('tab') === 'login' ? '2' : '1';
    setDefaultTab(checkTab)
    console.log(checkTab)
  },[searchParams])
  
  // Update URL when tab changes
  const handleTabChange = (key) => {
    // setSearchParams({ tab: key === '2' ? 'login' : 'register' });
    const tab = key === '2' ? 'login' : 'register';
    // const searchType = type ;
    setSearchParams({ tab:tab, type:type });


  }

  // =========== tab properties =============
  const items = [
    {
      key: '1',
      label: 'Register',
      children: <Register />,
    },
    {
      key: '2',
      label: 'Login',
      children: <Login />,
    },
  ];


  return (
    <>
      <div className='Register_Login min-h-[calc(100vh-120px)]  flex flex-col justify-center items-center'>
        <h1 className='my-10'>Welcome to {type == 'dm' ? <span className='headingH4'>Department Manager</span> : <span className='headingH4'>{type?.toUpperCase()}</span>} Portal</h1>
        <div className="content w-[600px] mx-auto shadow-2xl rounded-lg p-4">
          <Tabs defaultActiveKey={defaultTab} items={items} animated={true} onChange={handleTabChange} />
        </div>
      </div>
    </>
  )
}

export default Register_Login