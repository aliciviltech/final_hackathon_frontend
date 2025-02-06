import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { postReq, putReq } from '../../../api/axios'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';



const EditBeneficiary = ({ beneficiaryData, id }) => {


  // =========== get active user ===============
  const activeUserRedux = useSelector(state => state.user.activeUser)
  console.log(activeUserRedux)
  useEffect(() => {
    if (!activeUserRedux.name) {
      navigate('/')
    }
  }, [])


  // ============ hook form ==============
  const {
    register,
    handleSubmit,
    reset,
  } = useForm()

  // ========== reset hook form ============
  useEffect(() => {
    if (beneficiaryData) {
      reset(beneficiaryData);
      console.log(beneficiaryData)
    }
  }, [])

  // ========== Edit beneficiary ==========
  const editBeneficiary = async (data) => {
    try {
      await putReq(`/beneficiary/update-beneficiary/${id}`, data)
      toast.success('Beneficiary Updated')

    } catch (error) {
      toast.error(`Sorry Beneficiary was not updated. Error: ${error.message}`)
    }
  }




  // ========== Update beneficiary ==========
  const updateBeneficiary = async (data) => {
    try {
      await putReq(`/beneficiary/update-beneficiary/${id}`, data)
      toast.success('Beneficiary Updated')

    } catch (error) {
      toast.error(`Sorry Beneficiary was not updated. Error: ${error.message}`)
    }
  }


  
  const onSubmit = (data) => {
    if (activeUserRedux.role == 'dm' || activeUserRedux.role == 'admin') {
      const updatedData = {
        status:data.status,
        progress: data.progress,
        departmentOfficer: activeUserRedux.name,
        isUpdated: true,  // Direct update
        $push: { remarks: { comment: data.remarksComment, by: activeUserRedux.name } }  // Append new remark
      };
      updateBeneficiary(updatedData)
    } else {
      editBeneficiary(data)
    }
  }




  return (
    <div className='EditBeneficiary px-4 w-screen flex justify-center'>
      <form className='flex w-[100%] sm:w-[350px] flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
        <input type='date' {...register("appointmentDate", { required: true })} className='p-2 border border-gray-300 rounded-md' />
        <input {...register("name", { required: true })} placeholder='Name' className='p-2 border border-gray-300 rounded-md' />
        <input {...register("cnic", { required: true })} placeholder='CNIC' className='p-2 border border-gray-300 rounded-md' />
        <input {...register("contact", { required: true })} placeholder='Contact' className='p-2 border border-gray-300 rounded-md' />
        <input {...register("address", { required: true })} placeholder='Address' className='p-2 border border-gray-300 rounded-md' />
        <input {...register("query", { required: true })} placeholder='Query' className='p-2 border border-gray-300 rounded-md' />
        <select {...register("department", { required: true })} className='p-2 border border-gray-300 rounded-md'>
          <option value="" selected disabled >Select Department</option>
          <option value="medical">Medical</option>
          <option value="finanace">Finance</option>
          <option value="Rashan">Rashan</option>
          <option value="it">IT</option>
        </select>
        <select {...register("priority", { required: true })} className='p-2 border border-gray-300 rounded-md'>
          <option value="" selected disabled >Select Priority</option>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <input {...register("progress", { required: true })} placeholder='Progress' className='p-2 border border-gray-300 rounded-md' />
        <input {...register("remarksComment", { required: true })} placeholder='Remarks' className='p-2 border border-gray-300 rounded-md' />
        <select {...register("status", { required: true })} className='p-2 border border-gray-300 rounded-md'>
          <option value="" selected disabled >Select status</option>
          <option value="pending">pending</option>
          <option value="rejected">rejected</option>
          <option value="completed">completed</option>
        </select>

        <input type="submit" value={'Update'} className='cursor-pointer bg-[var(--primaryColor)] p-2 rounded-md text-white border-none' />


      </form>
    </div>
  )
}

export default EditBeneficiary