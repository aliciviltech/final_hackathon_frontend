import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { postReq } from '../../api/axios';
import { clearUser, storeUser } from '../../redux/reducers/userReducer';
import { persistor } from '../../redux/store/store';


const Login = () => {

    // =========== navigate =========
    const navigate = useNavigate();

    // ============ redux functions ==========
    // const userInRedux = useSelector(state=>state.userReducer);
    const dispatch = useDispatch()

    // ============ user login data =============
    const userInStorage = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null
    const [user, setUser] = useState(userInStorage);


    // ============ Api ==============
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
        <div className='Login '>

            {
                user ?
                    <p>{user.name} is already logged in. <span className='underline text-blue-600 cursor-pointer' onClick={handleLogout}>Logout</span></p>
                    :
                    <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("email")} placeholder='Email' className='p-2 border border-gray-300 rounded-md' />
                        <input {...register("password")} placeholder='Password' type='password' className='p-2 border border-gray-300 rounded-md' />
                        {/* {errors.exampleRequired && <span>This field is required</span>} */}
                        <input type="submit" value={'Login'} className='cursor-pointer bg-[var(--primaryColor)] p-2 rounded-md text-white border-none' />
                    </form>
            }

        </div>
    )
}

export default Login