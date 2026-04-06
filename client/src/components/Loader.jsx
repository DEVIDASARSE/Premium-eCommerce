import React from 'react'

export default function Loader(){
  return (
    <div className="w-full flex items-center justify-center py-8">
      <div className="h-8 w-8 rounded-full border-4 border-accent border-t-transparent animate-spin" />
    </div>
  )
}
