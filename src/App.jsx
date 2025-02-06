import React from 'react'
import { useSelector } from 'react-redux'
import {Routes, Route} from 'react-router'
import Register_Login from './pages/Register_Login/Register_Login'
import { Toaster } from 'react-hot-toast'
import UserDashboard from './pages/UserDashboard/UserDashboard'
import Home from './pages/Home/Home'
import CheckBeneficiary from './pages/UserDashboard/CheckBeneficiary/CheckBeneficiary'
import AllBeneficiaries from './pages/UserDashboard/AllBeneficiaries/AllBeneficiaries'
import ViewBeneficiary from './pages/UserDashboard/ViewBeneficiary/ViewBeneficiary'
import AddNewBeneficiary from './pages/UserDashboard/AddNewBeneficiary/AddNewBeneficiary'
import EditBeneficiary from './pages/UserDashboard/EditBeneficiary/EditBeneficiary'
import Activities from './pages/UserDashboard/Activity/Activities'

const App = () => {
  
  return (

    <>

    <Toaster/>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register-login' element={<Register_Login/>}/>
      <Route path='/user-dashboard' element={<UserDashboard/>}>
        <Route path='/user-dashboard/all-beneficiaries' element={<AllBeneficiaries/>}/>
        <Route path='/user-dashboard/activities' element={<Activities/>}/>
        <Route path='/user-dashboard/check-beneficiary' element={<CheckBeneficiary/>}/>
        <Route path='/user-dashboard/add-beneficiary' element={<AddNewBeneficiary/>}/>
        <Route path='/user-dashboard/view-beneficiary/:id' element={<ViewBeneficiary/>}/>
        {/* <Route path='/user-dashboard/edit-beneficiary' element={<EditBeneficiary/>}/> */}
      </Route>
    </Routes>
    </>

  )
}

export default App