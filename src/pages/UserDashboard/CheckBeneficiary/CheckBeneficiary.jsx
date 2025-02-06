import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import { postReq } from '../../../api/axios'
import FullButton from '../../../components/Buttons/FullButton';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import toast from 'react-hot-toast';





const CheckBeneficiary = () => {

  // handle print token
  const tokenContainer = useRef();
  const handlePrint = async () => {
    const inputData = tokenContainer.current;
    if (inputData) {
      try {

        const qrImage = inputData.querySelector("img");

        // Ensure the image is loaded before capturing
        if (qrImage && !qrImage.complete) {
          await new Promise((resolve) => {
            qrImage.onload = resolve;
            qrImage.onerror = resolve; // Avoid breaking if the image fails to load
          });
        }

        // Capture the content with html2canvas
        const canvas = await html2canvas(inputData, {
          scale: 4, // No additional scaling by html2canvas
        });

        const imgData = canvas.toDataURL('image/png')

        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: 'a4',
        })

        const width = doc.internal.pageSize.getWidth();
        const height = (canvas.height * width) / canvas.width;

        doc.addImage(imgData, 'PNG', 0, 0, width, height);
        doc.save('token.pdf');

      } catch (error) {
        console.log(error)
      }
    }
  }

  // ============ search beneficiary in data base =================
  const [beneficiary, setBeneficiary] = useState();
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const searchBeneficiary = async (data) => {
    try {
      const response = await postReq('/beneficiary/find-beneficiary', data)
      console.log(response.data.beneficiary);
      setBeneficiary(response.data.beneficiary)
      const generateQRCode = () => {
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(response.data.beneficiary.cnic)}`;
        setQrCodeUrl(url);
      };
      generateQRCode()

    } catch (error) {
      toast.error(error.message)
    }
  }


  // ============ hook form ==============
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => searchBeneficiary({ cnic: Number(data.cnic) })



  return (
    <div className='CheckBeneficiary px-2 w-screen my-10 flex flex-col justify-center items-center'>

      <form className='flex w-[100%] sm:w-[350px] flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
        <p className='paragraphP2'>Search already existing beneficiary:</p>
        <input type='number' {...register("cnic", { required: true })} placeholder='CNIC' className='p-2 border border-gray-300 rounded-md' />
        <input type="submit" value={'Search'} className='cursor-pointer bg-[var(--primaryColor)] p-2 rounded-md text-white border-none' />
      </form>


      {
        beneficiary?.name &&
        <div className="beneficiaryContainer mt-10 border border-[var(--primaryColor)] p-4">
          <h1 className='text-center'>Beneficiary Details</h1>
          <div ref={tokenContainer} className='my-4'>
            <p>Name: {beneficiary.name}</p>
            <p>CNIC: {beneficiary.cnic}</p>
            <p>Contact: {beneficiary.contact}</p>
            <p>Address: {beneficiary.address}</p>
            <p>Query: {beneficiary.query}</p>
            <p>Department: {beneficiary.department}</p>
            <div className='text-center flex justify-center mt-4'>
              <img src={qrCodeUrl} crossOrigin="anonymous" alt="" />
            </div>
          </div>

          <div onClick={handlePrint}>
            <FullButton text={'Generate Token'} />
          </div>
        </div>
      }

    </div>
  )
}

export default CheckBeneficiary