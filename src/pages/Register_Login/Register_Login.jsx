import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import './Register_Login.css'
import { Tabs } from "antd";
import Register from './Register';
import Login from './Login';
import { useSelector } from 'react-redux';
import InfoModal from '../../components/Modals/InfoModal';

const Register_Login = () => {

  // modal
  const [modal, setModal] = useState(true);

  // extracting role
  const userRole = useSelector(state => state.user.userRole);

  // =========== setting default tab on navigation =============
  const [searchParams, setSearchParams] = useSearchParams();

  // update tab when URL changes
  const checkTab = searchParams.get('tab') === 'login' ? '2' : '1';
  const defaultTab = checkTab


  // Update URL when tab changes
  const handleTabChange = (key) => {
    setSearchParams({ tab: key === '2' ? 'login' : 'register' });
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
        <h1 className='my-10'>Welcome to {userRole == 'dm' ? <span className='headingH4'>Department Manager</span> : <span className='headingH4'>{userRole?.toUpperCase()}</span>} Portal</h1>
        <div className="content w-[100%] sm:w-[600px] mx-auto shadow-2xl rounded-lg p-4">
          <Tabs className='max-w-screen'  defaultActiveKey={defaultTab} items={items} animated={true} onChange={handleTabChange} />
        </div>
      </div>
      {
        modal &&
        <InfoModal text={'Continue login with default email and password OR register with your own credentials.'} setInfoModal={setModal} position={''}/>
      }
    </>
  )
}

export default Register_Login