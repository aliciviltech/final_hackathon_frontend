import React, { useState } from 'react'
import { Tabs } from 'antd'
import { useLocation, useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { postReq } from '../../api/axios'
import './UserDashboard.css'
import CheckBeneficiary from './CheckBeneficiary/CheckBeneficiary'
import AddNewBeneficiary from './AddNewBeneficiary/AddNewBeneficiary'
import AllBeneficiaries from './AllBeneficiaries/AllBeneficiaries'
import ViewBeneficiary from './ViewBeneficiary/ViewBeneficiary'
import FitButton from '../../components/Buttons/FitButton'
import { clearUser } from '../../redux/reducers/userReducer'
import toast from 'react-hot-toast'

const UserDashboard = () => {

    // common variables
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // params
    const param = useParams()
    const { id } = param;
    console.log(id)


    // =========== get active user ===============
    const activeUserRedux = useSelector(state => state.user.activeUser)
    console.log(activeUserRedux)

    // =========== handle logout =================
    const handleLogout = () => {
        dispatch(clearUser())
        localStorage.clear('user')
        navigate('/')
        toast('Logout successful')
        localStorage.removeItem("persist:root"); // Remove persisted state
        persistor.purge(); // Optional: clear Redux-persist state
    }

    // ============ setting active tab from location ===============
    const location = useLocation();
    const nestedRoute = location.pathname.replace('/user-dashboard/', '')
    const defaultActiveTab = nestedRoute == 'all-beneficiaries' ? '1' : nestedRoute == 'activity' ? '2' : nestedRoute == 'check-beneficiary' ? '3' : nestedRoute == 'add-beneficiary' ? '4' : '';
    console.log(defaultActiveTab)

    // ============ setting location as per active tab ===============
    const handleTabChange = (key) => {
        const path = key == '1' ? 'all-beneficiaries' : key == '2' ? 'activity' : key == '3' ? 'check-beneficiary' : 'add-beneficiary'
        navigate(`/user-dashboard/${path}`);
    }


    // ========================== tab items =================================
    const items = []

    if (activeUserRedux?.name === 'admin') {
        items.push(
            {
                label: 'All Benificiaries',
                key: '1',
                children: <AllBeneficiaries />,
            },
            {
                label: 'Activities',
                key: '2',
                children: 'Deparmental Activities',
            }
        )
    } else if (activeUserRedux?.name === 'receptionist') {
        items.push(
            {
                label: 'Check Beneficiary',
                key: '3',
                children: <CheckBeneficiary />,
            },
            {
                label: 'Add New Beneficiary',
                key: '4',
                children: <AddNewBeneficiary />,
            }
        )
    }

    return (
        <>
            <div className='UserDashboard w-[100%] mx-auto'>

                <div className="dashboardCover  bg-[var(--primaryColor)] text-white relative w-full h-40 flex flex-col gap-2 items-center justify-center">
                    <p className='headingH2'> {activeUserRedux?.name?.toUpperCase()}  Dashboard </p>
                    <div className='w-fit' onClick={handleLogout}>
                        <FitButton text={'Logout'} bgColor='black'/>
                    </div>
                </div>

                {
                    id ?
                        <ViewBeneficiary />
                        :
                        <Tabs
                            onChange={handleTabChange}
                            defaultActiveKey={defaultActiveTab}
                            items={items}

                            className=' flex justify-center items-center'
                        />
                }

            </div>
        </>
    )
}

export default UserDashboard