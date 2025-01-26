import React from 'react'

const FullButton = ({text, bgColor='var(--primaryColor)', textColor='white'}) => {
  return (
    <div className='FullButton w-full py-2 px-4 rounded-sm cursor-pointer text-center' style={{backgroundColor:bgColor, color:textColor}}>
        {text}
    </div>
  )
}

export default FullButton