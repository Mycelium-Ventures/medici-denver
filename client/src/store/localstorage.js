export const loadLocalStorage = key => {
  try {
    const serializedState = localStorage.getItem(key)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    console.log(err)
    return undefined
  }
}

export const saveLocalStorage = (data, key) => {
  try {
    const serializedState = JSON.stringify(data)
    localStorage.setItem(key, serializedState)
  } catch (err) {
    console.log(err)
  }
}
