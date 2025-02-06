import React, { useEffect, useState } from 'react'
import './AllBeneficiaries.css'
import { getReq } from '../../../api/axios'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { addBeneficiaryRedux, storeAllBeneficiaries } from '../../../redux/reducers/beneficiaryReducer';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const AllBeneficiaries = () => {

  const [loader, setLoader] = useState(false);

  // common variables
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // ============= get all beneficiaries from data base ================
  const dummyArray = [1, 2, 3, 4, 5]
  const [allBeneficiaries, setAllBeneficiaries] = useState(dummyArray);
  const allBeneficiariesRedux = useSelector(state => state.beneficiary.allBeneficiaries)

  const getAllBeneficiaries = async () => {
    setLoader(true)
    const response = await getReq('/beneficiary')
    console.log(response.data.data)
    setAllBeneficiaries(response.data.data)
    dispatch(storeAllBeneficiaries(response.data.data))
    setLoader(false)
  }
  useEffect(() => {
    getAllBeneficiaries()
  }, [addBeneficiaryRedux])

  return (
    <div className='AllBeneficiaries w-screen px-4 flex flex-col gap-5 overflow-x-auto '>

      <table className='text-[clamp(6px,2vmin,16px)]'>
        <tr className='bg-[var(--primaryColor)] text-white paragraphP3 font-light'>
          <td className='w-[30px] text-left px-1 py-2 border border-gray-300'>Sr.</td>
          <td className='text-left px-2 py-2 border border-gray-300'>BENEFICIARY NAME</td>
          <td className='text-left px-2 py-2 border border-gray-300'>CNIC</td>
          <td className='text-left px-2 py-2 border border-gray-300'>CONCERNED DPT</td>
          <td className='text-left px-2 py-2 border border-gray-300'>STATUS</td>
        </tr>

        {
          allBeneficiaries?.map((beneficiary, index) => {
            return (
              <tr key={index} className="beneficiary cursor-pointer hover:bg-gray-300" onClick={() => navigate(`/user-dashboard/view-beneficiary/${beneficiary._id}`)}>
                <td className="srNo bg-[var(--primaryColor)] border border-gray-300 text-white text-center">{beneficiary?.name ? index + 1 : <Skeleton highlightColor='#757575' />}</td>
                <td className='px-2 py-2 border border-gray-300'>{beneficiary?.name ? beneficiary.name : <Skeleton highlightColor='#757575' />}</td>
                <td className='px-2 py-2 border border-gray-300'>{beneficiary?.cnic ? beneficiary.cnic : <Skeleton highlightColor='#757575' />} </td>
                <td className='px-2 py-2 border border-gray-300'>{beneficiary?.department ? beneficiary.department : <Skeleton highlightColor='#757575' />} </td>
                <td className='px-2 py-2 border border-gray-300 '> {beneficiary?.status ? <p className={` w-fit ${beneficiary.status == 'completed' ? 'bg-[#adf7e6] text-[#008767] border border-[#00B087]' : beneficiary.status == 'rejected' ? 'bg-[#FFC5C5] text-[#DF0404] border border-[#DF0404]' : 'bg-[#fda40028] text-[#fda400] border border-[#fda400]'} px-1 rounded-sm`}>{beneficiary.status}</p> : <Skeleton highlightColor='#757575' />} </td>

              </tr>
            )
          })
        }

      </table>

      {/* {
        loader &&
        <div className="loader"></div>
      } */}
    </div>
  )
}

export default AllBeneficiaries