import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { load, save } from '../utils/localStorage'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

const initial = load('cart_v1', { items: [] })

function reducer(state, action){
  switch(action.type){
    case 'ADD':{
      const existing = state.items.find(i=>i.id===action.payload.id)
      let items
      if(existing){
        items = state.items.map(i=> i.id===action.payload.id ? { ...i, qty: i.qty+1 } : i)
      } else {
        items = [...state.items, { ...action.payload, qty: 1 }]
      }
      return { ...state, items }
    }
    case 'REMOVE':{
      const items = state.items.filter(i=>i.id!==action.payload)
      return { ...state, items }
    }
    case 'SET_QTY':{
      const items = state.items.map(i=> i.id===action.payload.id ? { ...i, qty: Math.max(1, action.payload.qty) } : i)
      return { ...state, items }
    }
    case 'CLEAR': return { items: [] }
    default: return state
  }
}

export function CartProvider({ children }){
  const [state, dispatch] = useReducer(reducer, initial)

  useEffect(()=>{
    save('cart_v1', state)
  }, [state])

  useEffect(()=>{
    const addHandler = (e)=> dispatch({ type: 'ADD', payload: e.detail })
    window.addEventListener('addToCart', addHandler)
    const clearHandler = ()=> dispatch({ type: 'CLEAR' })
    window.addEventListener('clearCart', clearHandler)
    return ()=>{
      window.removeEventListener('addToCart', addHandler)
      window.removeEventListener('clearCart', clearHandler)
    }
  }, [])

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = ()=> useContext(CartStateContext)
export const useDispatchCart = ()=> useContext(CartDispatchContext)
