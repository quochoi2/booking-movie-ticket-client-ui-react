import React, { createContext, useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const LoaderContext = createContext()

const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setTimeout(() => setIsLoading(false), 1000)
  
    handleStart()
    handleComplete()
  }, [useLocation()])

  return (
    <LoaderContext.Provider value={{ isLoading }}>
      {isLoading ? <div className="loader"></div> : children}
    </LoaderContext.Provider>
  )
}

const useLoader = () => useContext(LoaderContext)

export { LoaderProvider, useLoader }

