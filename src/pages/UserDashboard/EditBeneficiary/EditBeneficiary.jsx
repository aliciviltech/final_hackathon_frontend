import React, { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { postReq, putReq } from '../../../api/axios'
import toast from 'react-hot-toast';



const EditBeneficiary = ({ beneficiaryData, id }) => {

  // ============ hook form ==============
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  // ========== reset hook form ============
  useEffect(() => {
    if (beneficiaryData) {
      reset(beneficiaryData);
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
  const onSubmit = (data) => editBeneficiary(data)



  return (
    <div className='EditBeneficiary px-4 w-screen flex justify-center'>
      <form className='flex w-[100%] sm:w-[350px] flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
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
        <input type="submit" value={'Update'} className='cursor-pointer bg-[var(--primaryColor)] p-2 rounded-md text-white border-none' />
      </form>
    </div>
  )
}

export default EditBeneficiary