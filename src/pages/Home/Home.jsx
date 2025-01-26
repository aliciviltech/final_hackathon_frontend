import React, { useEffect } from 'react'
import FullButton from '../../components/Buttons/FullButton'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { clearUser } from '../../redux/reducers/userReducer'

const Home = () => {
  
  // variables
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // ========== handle logout ===========
    const handleLogout = ()=>{
      dispatch(clearUser())
      localStorage.clear('user')
  }

  useEffect(()=>{
    handleLogout()
  },[])

  return (
    <div className='Home flex flex-col lg:flex-row'>

      {/* left col */}
      <div className="col1 bg-[var(--primaryColor)] text-white w-full lg:w-[50%] h-[50vh] lg:h-screen flex flex-col gap-5 justify-center items-center">
        <img className='w-[50%]' src="/images/smit_logo.png" alt="" />
        <h1 className='headingH2 text-center'>Saylani Beneficiery Management</h1>
      </div>

      {/* right col */}
      <div className="col2 w-full lg:w-[50%] h-[50vh] lg:h-screen flex flex-col gap-4 justify-center items-center">
        <div className="btn" onClick={()=>navigate('/register-login?tab=login&type=admin')}>
          <FullButton text={'Go As Admin'} />
        </div>
        <div className="btn" onClick={()=>navigate('/register-login?tab=login&type=receptionist')}>
          <FullButton text={'Go As Receptionist'} />
        </div>
        <div className="btn" onClick={()=>navigate('/register-login?tab=login&type=dm')}>
          <FullButton text={'Go As Department Manager'} />
        </div>
      </div>
    </div>
  )
}

export default Home