import React from 'react'
import ReceptionActivities from './ReceptionActivities/ReceptionActivities'
import DepartmentActivities from './DepartmentActivities/DepartmentActivities'

const Activities = () => {
  return (
    <div className='Activities w-screen px-2 '>
      <div className="activityContainer  min-h-100 ">
      <ReceptionActivities/>
      </div>
      <div className="activityContainer  min-h-100 ">
      <DepartmentActivities/>
      </div>
    </div>
  )
}

export default Activities