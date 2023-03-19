import React from 'react'

const WorkAbility = (props) => {
  return (
    <div className={`flex flex-col w-auto px-10 py-5 h-10 bg-[#eeeeee]  items-center justify-center `}>
        <h1 className="text-md text-[#656565] ">{props.work}</h1>
    </div>
  )
}

export default WorkAbility