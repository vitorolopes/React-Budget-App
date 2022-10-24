import React, { useState, useEffect } from 'react';

export default function useLocalStorage(key, defaultValue){ 
  const [value, setValue] = useState( ()=> {
// We pass an anonymous function to useState() that checks if we have something in localStorage
        const jsonValue = localStorage.getItem(key)
       // if that is the case we use it 
        if(jsonValue !== null) return JSON.parse(jsonValue)
       // otherwise we return the default value
       return defaultValue
  }) 
  
// So, this takes care of getting the value from local storage
// but we also need to update the local storage.
// Whenever any of the values of our key or value change we
// want to update the local storage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key,value])

  return [value, setValue]  
 }