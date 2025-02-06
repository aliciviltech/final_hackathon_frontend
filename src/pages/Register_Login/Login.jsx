import React, { useEffect, useState, useTransition } from 'react'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { postReq } from '../../api/axios';
import { clearUser, storeUser } from '../../redux/reducers/userReducer';
import { persistor } from '../../redux/store/store';


const Login = () => {

    // ========== getting user Role ============
    const userRole = useSelector(state=>state.user.userRole);

    // =========== navigate =========
    const navigate = useNavigate();

    // ============ redux functions ==========
    // const userInRedux = useSelector(state=>state.userReducer);
    const dispatch = useDispatch()

    // ============ user login data =============
    const userInStorage = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null
    const [user, setUser] = useState(userInStorage);


    // ============ Api / handle login ==============
    const handleLogin = async (data) => {
        try {
            const response = await postReq('/auth/login', data)
            toast.success('Login successful')
            console.log('login success')

            setUser(response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            dispatch(storeUser(response.data.user))
            navigate('/user-dashboard')

        } catch (error) {
            console.log('Error in login:', error.message)
            toast.error(error.message)
        }
    }

    // =============== login default values set ===================
    let defaulEmail;
    let defaulPassword;
    const setLoginValues = ()=>{
        if(userRole=='admin'){
            defaulEmail='ali@gmail.com'
            defaulPassword='111111'
        } else if(userRole == 'dm'){
            defaulEmail='shahid@gmail.com'
            defaulPassword='111111'
        } else{
            defaulEmail='shafiq@gmail.com'
            defaulPassword='111111'
        }
    }
    setLoginValues()

    // ========== handle logout ===========
    const handleLogout = () => {
        dispatch(clearUser())
        localStorage.clear('user')
        toast('Logout successful')
        setUser(null)
        localStorage.removeItem("persist:root"); // Remove persisted state
        persistor.purge(); // Optional: clear Redux-persist state
    }

    // ============ hook form ==============
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => handleLogin(data)


    return (
        <div className='Login'>

            {
                user ?
                    <p>{user.name} is already logged in. <span className='underline text-blue-600 cursor-pointer' onClick={handleLogout}>Logout</span></p>
                    :
                    <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
                        <input value={defaulEmail} {...register("email")} placeholder='Email' className='p-2 border border-gray-300 rounded-md' />
                        <input value={defaulPassword} {...register("password")} placeholder='Password' type='password' className='p-2 border border-gray-300 rounded-md' />
                        <label >Role:</label>
                        <input value={userRole} {...register("selectedRole")} disabled className='bg-gray-200 p-2 border border-gray-300 rounded-md' />
                        {/* {errors.exampleRequired && <span>This field is required</span>} */}
                        <input type="submit" value={'Login'} className='cursor-pointer bg-[var(--primaryColor)] p-2 rounded-md text-white border-none' />
                    </form>
            }

        </div>
    )
}

export default Login