export const load = (key, fallback) => {
  try{
    const s = localStorage.getItem(key)
    return s ? JSON.parse(s) : fallback
  }catch(e){
    return fallback
  }
}

export const save = (key, val) => {
  try{
    localStorage.setItem(key, JSON.stringify(val))
  }catch(e){ }
}
