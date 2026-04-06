import React from 'react'

export default function LoadingSkeleton(){
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-bg-light rounded-xl" />
      <div className="h-4 bg-bg-light rounded mt-4 w-3/4" />
      <div className="h-4 bg-bg-light rounded mt-2 w-1/2" />
    </div>
  )
}
