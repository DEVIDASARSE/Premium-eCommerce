import React, { useEffect, useState } from 'react'

export default function DarkToggle(){
  const [dark, setDark] = useState(localStorage.getItem('theme')==='dark')
  useEffect(()=>{
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])
  return (
    <button onClick={()=>setDark(s=>!s)} className="px-2 py-1 border rounded">{dark? 'Dark' : 'Light'}</button>
  )
}
