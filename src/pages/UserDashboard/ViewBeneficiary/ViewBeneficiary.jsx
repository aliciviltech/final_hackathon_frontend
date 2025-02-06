import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router'
import FitButton from '../../../components/Buttons/FitButton';
import EditBeneficiary from '../EditBeneficiary/EditBeneficiary';
import { deleteReq } from '../../../api/axios';
import toast from 'react-hot-toast';
import { deleteBeneficiary } from '../../../redux/reducers/beneficiaryReducer';

const ViewBeneficiary = () => {

  const [isEdit, setIsEdit] = useState(false)
  const param = useParams();
  const { id } = param;

  // common variables
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // ============= get current beneficiary ===============
  const allBeneficiariesRedux = useSelector(state => state.beneficiary.allBeneficiaries);
  const currentBeneficiary = allBeneficiariesRedux.find((benef) => benef._id == id)
  console.log(currentBeneficiary)


  // ============= delete current beneficiary ===============
  const deleteBeneficiaryF = async () => {
    try {
      await deleteReq(`/beneficiary/delete-beneficiary/${id}`);
      toast.success('Deleted successfully')
      dispatch(deleteBeneficiary(id))
      navigate('/user-dashboard')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='p-2 '>
      <div onClick={() => navigate(-1)}>
        <FitButton text={'Back'} />
      </div>

      {/* view beneficiary */}
      {
        isEdit ?
          <EditBeneficiary beneficiaryData={{
            appointmentDate: new Date(currentBeneficiary?.appointmentDate).toISOString().split('T')[0],
            name: currentBeneficiary?.name,
            cnic: currentBeneficiary?.cnic,
            contact: currentBeneficiary?.contact,
            address: currentBeneficiary?.address,
            query: currentBeneficiary?.query,
            department: currentBeneficiary?.department,
            priority: currentBeneficiary?.priority,
          }} id={id} />
          :
          <div className="beneficiaryContainer md:w-[50%] my-10 mx-auto border border-[var(--primaryColor)] p-4">
            <h1 className='text-center headingH4'>Beneficiary Details</h1>
            <div className='my-4'>
              <p className='flex gap-4 justify-center'> Status: {currentBeneficiary?.status ? <p className={` w-fit ${currentBeneficiary.status == 'completed' ? 'bg-[#adf7e6] text-[#008767] border border-[#00B087]' : currentBeneficiary.status == 'rejected' ? 'bg-[#FFC5C5] text-[#DF0404] border border-[#DF0404]' : 'bg-[#fda40028] text-[#fda400] border border-[#fda400]'} px-1 rounded-sm`}>{currentBeneficiary.status}</p> : <Skeleton highlightColor='#757575' />} </p>
              <p className='flex mt-5 border border-gray-400 my-2 p-1 '><span className=' paragraphP1'>Name:</span> {currentBeneficiary?.name}</p>
              <p className='flex border border-gray-400 my-2 p-1 '><span className=' paragraphP1' >CNIC:</span> {currentBeneficiary?.cnic}</p>
              <p className='flex border border-gray-400 my-2 p-1'><span className=' paragraphP1' >Contact:</span> {currentBeneficiary?.contact}</p>
              <p className='flex border border-gray-400 my-2 p-1'><span className=' paragraphP1' >Address:</span> {currentBeneficiary?.address}</p>
              <p className='flex border border-gray-400 my-2 p-1'><span className=' paragraphP1' >Query:</span> {currentBeneficiary?.query}</p>
              <p className='flex border border-gray-400 my-2 p-1'><span className=' paragraphP1' >Department:</span> {currentBeneficiary?.department}</p>
              <p className='flex border border-gray-400 my-2 p-1'><span className=' paragraphP1' >Department Officer:</span> {currentBeneficiary?.departmentOfficer ? currentBeneficiary?.departmentOfficer : 'Not attended by department yet'}</p>
              <p className='flex border border-gray-400 my-2 p-1'><span className=' paragraphP1' >Appointment date:</span> {new Date(currentBeneficiary?.appointmentDate).toLocaleDateString()}</p>
            </div>

            <div className="controls flex gap-2">
              <div onClick={() => setIsEdit(true)}>
                <FitButton text={'Edit'} />
              </div>
              <div onClick={deleteBeneficiaryF}>
                <FitButton text={'Delete'} bgColor='red' />
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default ViewBeneficiary