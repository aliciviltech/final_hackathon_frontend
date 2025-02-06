import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';

const DepartmentActivities = () => {

  const navigate = useNavigate()

  // ============= get all beneficiaries from redux ===============
  let countZero = 0
  const dummyArray = [1, 2, 3, 4, 5]
  const [allBeneficiaries, setAllBeneficiaries] = useState(dummyArray);
  const allBeneficiariesRedux = useSelector(state => state.beneficiary.allBeneficiaries);
  const sortedData = [...allBeneficiariesRedux].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  useEffect(() => {
    setAllBeneficiaries(sortedData)
  }, [])


  const getNewer = () => {
    const newer = allBeneficiaries[0]?.name ? new Date(allBeneficiaries[0].createdAt).toLocaleTimeString() < new Date(allBeneficiaries[1].createdAt).toLocaleTimeString() : null
    console.log(newer)
  }
  useEffect(() => {
    getNewer()
  }, [allBeneficiaries])



  // get difference of time
  const currentDate = new Date();
  const timeDifference = (activiytDate) => {
    const activityTime = new Date(activiytDate)
    const diffInSeconds = Math.abs((currentDate - activityTime) / 1000); // Get total difference in seconds
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = Math.floor(diffInSeconds % 60);
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    console.log(formattedTime); // Output: 02:20:00
    return { hours, minutes, seconds }
  }


  return (
    <div className='DepartmentActivities p-2 md:p-4 '>
      <h1 className='headingH5 bg-[black] text-white pl-4 py-1 text-center md:text-left'> Department Activities </h1>

      <div className='AllBeneficiaries text-[clamp(6px,2vmin,16px)] mt-4  flex flex-col gap-5 md:px-10 overflow-x-auto'>
        <h1 className=''> Recently updated beneficiaries: </h1>

        <table className=''>
          <tr className='bg-[var(--primaryColor)] text-white paragraphP3 font-light'>
            <td className='max-w-[30px] text-left px-1 py-2 border border-gray-300'>Sr.</td>
            <td className='text-left px-2 py-2 border border-gray-300'>BENEFICIARY NAME</td>
            <td className='text-left px-2 py-2 border border-gray-300'>Updated at</td>
            <td className='text-left px-2 py-2 border border-gray-300'>Updated by</td>
            <td className=' text-left px-2 py-2 border border-gray-300'>Remarks</td>
            <td className='text-left px-2 py-2 border border-gray-300'>Status</td>
          </tr>

          {
            allBeneficiaries?.map((beneficiary, index) => {
              return (
                beneficiary.isUpdated == true &&
                <tr key={index} className="beneficiary cursor-pointer hover:bg-gray-300" onClick={() => navigate(`/user-dashboard/view-beneficiary/${beneficiary._id}`)}>
                  <td className="srNo bg-[var(--primaryColor)] border border-gray-300 text-white text-center">{beneficiary?.name ? ++countZero : <Skeleton highlightColor='#757575' />}</td>
                  <td className='px-2 py-2 border border-gray-300 whitespace-nowrap'>{beneficiary?.name ? beneficiary.name : <Skeleton highlightColor='#757575' />}</td>
                  <td className='px-2 py-2 border border-gray-300 whitespace-nowrap'>
                    {
                      timeDifference(beneficiary.updatedAt).hours > 0 && timeDifference(beneficiary.updatedAt).hours <= 2 ?
                        `${timeDifference(beneficiary.updatedAt).hours} hrs ago`
                        :
                        timeDifference(beneficiary.updatedAt).hours > 2 ?
                          `${new Date(beneficiary.updatedAt).toLocaleString()}`
                          :
                          `${timeDifference(beneficiary.updatedAt).minutes} mins ago`
                    }
                  </td>
                  <td className='px-2 py-2 border border-gray-300 whitespace-nowrap'>{beneficiary?.departmentOfficer ? beneficiary.departmentOfficer : <Skeleton highlightColor='#757575' />} </td>
                  <td className='px-2 py-2 border border-gray-300 whitespace-nowrap'>{beneficiary?.remarks ? beneficiary.remarks[1].comment : <Skeleton highlightColor='#757575' />} </td>
                  <td className='px-2 py-2 border border-gray-300 '> {beneficiary?.status ? <p className={` w-fit ${beneficiary.status == 'completed' ? 'bg-[#adf7e6] text-[#008767] border border-[#00B087]' : beneficiary.status == 'rejected' ? 'bg-[#FFC5C5] text-[#DF0404] border border-[#DF0404]' : 'bg-[#fda40028] text-[#fda400] border border-[#fda400]'} px-1 rounded-sm`}>{beneficiary.status}</p> : <Skeleton highlightColor='#757575' />} </td>
                </tr>

              )
            })
          }

        </table>

        <div>
          <Link to={'/user-dashboard/all-beneficiaries'} > {'>'} <span className='underline '>See all beneficiaries list</span></Link>
        </div>
      </div>
    </div>
  )
}

export default DepartmentActivities