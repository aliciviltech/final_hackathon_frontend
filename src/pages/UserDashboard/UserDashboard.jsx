import React, { useState } from 'react'
import { Tabs } from 'antd'
import { useLocation, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { postReq } from '../../api/axios'

const UserDashboard = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()
   

    // ============ setting active tab from location ===============
    const location = useLocation();
    const nestedRoute = location.pathname.replace('/user-dashboard/', '')
    const defaultActiveTab = nestedRoute == 'my-posts' ? '1' : nestedRoute == 'add-post' ? '2' : nestedRoute == 'marked-posts' ? '3' : nestedRoute == 'all-posts' ? '4': '';
    console.log(defaultActiveTab)

    // ============ setting location as per active tab ===============
    const handleTabChange = (key) => {
        const path = key == '1' ? 'my-posts' : key == '2' ? 'add-post' : key == '3' ? 'marked-posts' : 'all-posts'
        navigate(`/user-dashboard/${path}`);
    }


    // ========================== tab items =================================
    const items = [
        {
            label: 'My Posts',
            key: '1',
            children: 'My posts',
        },
        {
            label: 'Add Post',
            key: '2',
            children: 'add Posts section'
        },
        {
            label: 'Marked Posts',
            key: '3',
            children: 'marked posts section',
        }
    ]

    // if(activeUserRedux.name === 'admin'){
    //     items.push({
    //         label: 'All Posts',
    //         key: '4',
    //         children: 'all posts section',
    //     })
    // }

    return (
        <>
            <div className='UserDashboard w-[100%] mx-auto'>

                <div className="profileImage relative w-full h-40 flex items-center justify-center">
                    <img className='coverImage w-full h-full object-cover' src="/images/profile/empty_cover.png" alt="" />
                    <div className="group flex items-center justify-center  w-28 h-28 rounded-full overflow-hidden border border-black absolute sm:left-10">
                        {
                            
                                <img className='w-28 h-28  object-cover' src="/images/profile/empty_user.png" alt="" />
                        }
                        <div className="opacity-0 group-hover:opacity-70 transition-opacity cursor-pointer z-10 w-full h-full flex justify-center items-center absolute bg-black text-white " onClick={()=>document.getElementById('fileInput').click()}>Upload</div>
                    </div>
                    <input type="file" className='hidden' accept='image/*' id='fileInput' />
                </div>

                <Tabs
                    onChange={handleTabChange}
                    defaultActiveKey={defaultActiveTab}
                    items={items}

                    className=' flex justify-center items-center'
                />

            </div>
        </>
    )
}

export default UserDashboard