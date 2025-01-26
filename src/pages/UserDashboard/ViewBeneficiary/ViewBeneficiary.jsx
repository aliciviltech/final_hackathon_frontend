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
  const deleteBeneficiaryF = async()=>{
    try{
      await deleteReq(`/beneficiary/delete-beneficiary/${id}`);
      toast.success('Deleted successfully')
      dispatch(deleteBeneficiary(id))
      navigate('/user-dashboard')
    } catch(error){
      toast.error(error.message)
    }
  }

  return (
    <div className='p-2 '>
      <div onClick={() => navigate('/user-dashboard')}>
        <FitButton text={'Back'} />
      </div>

      {/* view beneficiary */}
      {
        isEdit ?
          <EditBeneficiary beneficiaryData={{
            name: currentBeneficiary?.name,
            cnic: currentBeneficiary?.cnic,
            contact: currentBeneficiary?.contact,
            address: currentBeneficiary?.address,
            query: currentBeneficiary?.query,
            department: currentBeneficiary?.department,
          }} id={id} />
          :
          <div className="beneficiaryContainer md:w-[50%] my-10 mx-auto border border-[var(--primaryColor)] p-4">
            <h1 className='text-center'>Beneficiary Details</h1>
            <div className='my-4'>
              <p>Name: {currentBeneficiary?.name}</p>
              <p>CNIC: {currentBeneficiary?.cnic}</p>
              <p>Contact: {currentBeneficiary?.contact}</p>
              <p>Address: {currentBeneficiary?.address}</p>
              <p>Query: {currentBeneficiary?.query}</p>
              <p>Department: {currentBeneficiary?.department}</p>
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