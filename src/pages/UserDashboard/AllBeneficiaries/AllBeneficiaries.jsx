import React, { useEffect, useState } from 'react'
import { getReq } from '../../../api/axios'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { storeAllBeneficiaries } from '../../../redux/reducers/beneficiaryReducer';

const AllBeneficiaries = () => {

  // common variables
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // ============= get all beneficiaries from data base ================
  const [allBeneficiaries, setAllBeneficiaries]=useState();
  const getAllBeneficiaries = async()=>{
    const response = await getReq('/beneficiary')
    console.log(response.data.data)
    setAllBeneficiaries(response.data.data)
    dispatch(storeAllBeneficiaries(response.data.data))
  }
  useEffect(()=>{
    getAllBeneficiaries()
  },[])

  return (
    <div className='AllBeneficiaries w-screen sm:w-[500px] px-4 flex flex-col gap-5 '>
      {
        allBeneficiaries?.map((beneficiary,index)=>{
          return(
          <div key={index} className="beneficiary flex gap-5  shadow-lg rounded-md" onClick={()=>navigate(`/user-dashboard/view-beneficiary/${beneficiary._id}`)}>
            <div className="sr bg-[var(--primaryColor)] w-5 flex justify-center items-center text-white">{index+1}</div>
            <div className='flex flex-col gap-2 p-2'>
              <p>{beneficiary.name}</p>
              <p>{beneficiary.cnic}</p>
            </div>
          </div>
          )
        })
      }
    </div>
  )
}

export default AllBeneficiaries