import React from 'react'

const FitButton = ({text, bgColor='var(--primaryColor)', textColor='white'}) => {
  return (
    <div className='FitButton px-2 py-1 rounded-sm w-fit cursor-pointer' style={{backgroundColor:bgColor, color:textColor}}>{text}</div>
  )
}

export default FitButton