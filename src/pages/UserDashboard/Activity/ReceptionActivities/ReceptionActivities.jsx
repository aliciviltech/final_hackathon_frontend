import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import FitButton from '../../../../components/Buttons/FitButton';

const ReceptionActivities = () => {

  const navigate = useNavigate()

  // ============= get all beneficiaries from redux ===============
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
    <div className='ReceptionActivities p-2 md:p-4 '>
      <h1 className='headingH5 bg-[black] text-white pl-4 py-1 text-center md:text-left'> Reception Activities </h1>


      <div className='AllBeneficiaries text-[clamp(6px,2vmin,16px)] mt-4  flex flex-col gap-5 md:px-10 overflow-x-auto'>
        <h1 className=''> Recently added beneficiaries: </h1>

        <table className=''>
          <tr className='bg-[var(--primaryColor)] text-white paragraphP3 font-light'>
            <td className='max-w-[30px] text-left px-1 py-2 border border-gray-300'>Sr.</td>
            <td className='text-left px-2 py-2 border border-gray-300'>BENEFICIARY NAME</td>
            <td className='text-left px-2 py-2 border border-gray-300'>CNIC</td>
            <td className='text-left px-2 py-2 border border-gray-300'>Added at</td>
            <td className='text-left px-2 py-2 border border-gray-300'>Status</td>
          </tr>

          {
            allBeneficiaries?.slice(0, 5).map((beneficiary, index) => {
              return (
                <tr key={index} className="beneficiary cursor-pointer hover:bg-gray-300" onClick={() => navigate(`/user-dashboard/view-beneficiary/${beneficiary._id}`)}>
                  <td className="srNo bg-[var(--primaryColor)] border border-gray-300 text-white text-center">{beneficiary?.name ? index + 1 : <Skeleton highlightColor='#757575' />}</td>
                  <td className='px-2 py-2 border border-gray-300'>{beneficiary?.name ? beneficiary.name : <Skeleton highlightColor='#757575' />}</td>
                  <td className='px-2 py-2 border border-gray-300'>{beneficiary?.cnic ? beneficiary.cnic : <Skeleton highlightColor='#757575' />} </td>
                  <td className='px-2 py-2 border border-gray-300'>
                    {
                      timeDifference(beneficiary.createdAt).hours > 0 && timeDifference(beneficiary.createdAt).hours <= 2 ?
                        `${timeDifference(beneficiary.createdAt).hours} hrs ago`
                        :
                        timeDifference(beneficiary.createdAt).hours > 2 ?
                          `${new Date(beneficiary.createdAt).toLocaleString()}`
                          :
                          `Added: ${timeDifference(beneficiary.createdAt).minutes} mins ago`
                    }
                  </td>
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

export default ReceptionActivities