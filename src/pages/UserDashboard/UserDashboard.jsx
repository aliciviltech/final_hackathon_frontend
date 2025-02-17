import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd'
import {Info} from 'lucide-react'
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
import Activities from './Activity/Activities'
import InfoModal from '../../components/Modals/InfoModal'

const UserDashboard = () => {

    // common variables
    const navigate = useNavigate();
    const dispatch = useDispatch()

    // params
    const param = useParams()
    const { id } = param;
    console.log(id)

    // ===============  info modal =================
    const [infoModa, setInfoModal]=useState(false)
    const jobInfo = {
        receptionist : 'The receptionist can add a new beneficiary or check and generate the token of already existing beneficiary',
        admin : 'The admin have all the access of beneficiary management system and can also see the other account holders of this system.',
        dm : 'The department manager can see all the beneficiries added by receptionist and will further process the applications to accomplish the beneficiary requests.'
    }


    // =========== get active user ===============
    const activeUserRedux = useSelector(state => state.user.activeUser)
    console.log(activeUserRedux)
    useEffect(()=>{
        if(!activeUserRedux.name){
            navigate('/')
        }
    },[])

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
    const defaultActiveTab = nestedRoute == 'all-beneficiaries' ? '1' : nestedRoute == 'activities' ? '2' : nestedRoute == 'check-beneficiary' ? '3' : nestedRoute == 'add-beneficiary' ? '4' : '';
    console.log(defaultActiveTab)

    // ============ setting location as per active tab ===============
    const handleTabChange = (key) => {
        const path = key == '1' ? 'all-beneficiaries' : key == '2' ? 'activities' : key == '3' ? 'check-beneficiary' : 'add-beneficiary'
        navigate(`/user-dashboard/${path}`);
    }


    // ========================== tab items =================================
    const items = []

    if (activeUserRedux?.role === 'admin') {
        items.push(
            {
                label: 'All Benificiaries',
                key: '1',
                children: <AllBeneficiaries />,
            },
            {
                label: 'Activities',
                key: '2',
                children: <Activities/>,
            },
            {
                label: 'Search Beneficiary',
                key: '3',
                children: <CheckBeneficiary/>,
            },
            {
                label: 'Add Beneficiary',
                key: '4',
                children: <AddNewBeneficiary/>,
            }
        )
    } else if (activeUserRedux?.role === 'receptionist') {
        items.push(
            {
                label: 'Generate Token',
                key: '5',
                children: <CheckBeneficiary />,
            },
            {
                label: 'Add New Beneficiary',
                key: '6',
                children: <AddNewBeneficiary />,
            }
        )
    } else if (activeUserRedux?.role === 'dm') {
        items.push(
            {
                label: 'Search Beneficiary',
                key: '7',
                children: <CheckBeneficiary />,
            },
            {
                label: 'All Beneficiaries',
                key: '8',
                children: <AllBeneficiaries />,
            }
        )
    }

    return (
        <>
            <div className='UserDashboard w-[100%] mx-auto'>

                <div className="dashboardCover   bg-[var(--primaryColor)] text-white relative w-full h-40 flex flex-col gap-2 items-center justify-center">
                    <p className='headingH2 px-2 text-center'> {activeUserRedux?.role == 'dm'? 'Department Manager':  activeUserRedux?.role?.toUpperCase()}  Dashboard </p>
                    <div className='w-fit' onClick={handleLogout}>
                        <FitButton text={'Logout'} bgColor='black' textSize='12px'/>
                    </div>
                    <div className="info absolute top-6 right-6" onClick={()=>setInfoModal(true)}><Info /></div>
                    {
                        infoModa &&
                        <InfoModal text={jobInfo[activeUserRedux?.role]} setInfoModal={setInfoModal}/>
                    }
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