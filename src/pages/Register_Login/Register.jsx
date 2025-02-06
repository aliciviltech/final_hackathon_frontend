import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'
import { postReq } from '../../api/axios'
import { useSelector } from 'react-redux'


const Register = () => {

        // ========== recieving user Role ============
        const userRole = useSelector(state=>state.user.userRole);

    // ============ Api ==============
    const [loader, setLoader] = useState(false)
    const handleRegister = async(data)=>{
        setLoader(true)
        try{
            await postReq('/auth/register', data)
            toast.success('User registered successfully')
            setLoader(false)
            console.log(data)
        }catch(error){
            console.log('error in frontend posting register request: ', error.message)
            toast.error(error.message)
            setLoader(false)
        }
    }

    // ============ hook form ==============
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => handleRegister(data);


    return (
        <div className='Register'>

            <form className='flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name",{ required: true })} placeholder='Name' className='p-2 border border-gray-300 rounded-md'/>
                <input {...register("email", { required: true })}  placeholder='Email' className='p-2 border border-gray-300 rounded-md'/>
                <input {...register("password", { required: true })} placeholder='Password' type='password' className='p-2 border border-gray-300 rounded-md'  />
                <select {...register("role", { required: true })} className='p-2 border border-gray-300 rounded-md'>
                    <option value="" selected disabled>Select Role</option>
                    <option value={userRole}>{userRole=='dm'? 'department manager': userRole}</option>
                </select>
                {/* {errors.exampleRequired && <span>This field is required</span>} */}
                <input type="submit" value={loader?'Loading . . .' :'Register'} className='cursor-pointer bg-[var(--primaryColor)] p-2 rounded-md text-white border-none' />
            </form>

        </div>
    )
}

export default Register