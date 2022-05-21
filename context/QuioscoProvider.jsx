import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

  const [ categorias, setCategorias ] = useState([])
  const [ categoriaActual, setCategoriaActual ] = useState({})
  const [ producto, setProducto ] = useState({})
  const [ modal, setModal ] = useState(false)
  const [ pedido, setPedido ] = useState([])

  useEffect(() => {
    obtenerCategorias()
  }, [])

  useEffect(() => {
    setCategoriaActual(categorias[0])
  }, [categorias])

  const obtenerCategorias = async () => {
    const { data } = await axios('/api/categorias')
    setCategorias(data)
  }

  const handleClickCategoria = id => {
    const categoria = categorias.filter( cat => cat.id === id )
    setCategoriaActual(categoria[0])
    // console.info(categoria[0])
  }

  const handleChangeProducto = producto => {
    setProducto(producto)
  }

  const handleChangeModal = () => {
    setModal(!modal)
  }

  const handleAgregarPedido = ({categoriaId, imagen, ...prod}) => {
    setPedido([...pedido, prod])
  }

  return (
    <QuioscoContext.Provider 
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleChangeProducto,
        modal,
        handleChangeModal,
        pedido,
        handleAgregarPedido,
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