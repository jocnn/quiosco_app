import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

  const [ categorias, setCategorias ] = useState([])
  const [ categoriaActual, setCategoriaActual ] = useState({})

  useEffect(() => {
    
    obtenerCategorias()

  }, [])

  const obtenerCategorias = async () => {
    const { data } = await axios('/api/categorias')
    setCategorias(data)
  }

  const handleClickCategoria = id => {
    const categoria = categorias.filter( cat => cat.id === id )
    setCategoriaActual(categoria[0])
    console.info(categoria[0])
  }

  return (
    <QuioscoContext.Provider 
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
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