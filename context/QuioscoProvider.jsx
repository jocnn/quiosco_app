import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

  const [ categorias, setCategorias ] = useState([])

  useEffect(() => {
    
    obtenerCategorias()

  }, [])

  const obtenerCategorias = async () => {
    const { data } = await axios('/api/categorias')

    setCategorias(data)

  }

  return (
    <QuioscoContext.Provider 
      value={{
        categorias,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  )
}

export {
  QuioscoProvider
}

export default QuioscoContext