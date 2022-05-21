import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

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
    if ( pedido.some( productoState => productoState.id === prod.id )) {
      //actualizar cantidad
      const pedidoActualizado = pedido.map(
        productoState => productoState.id === prod.id ? prod : productoState
      )
      setPedido(pedidoActualizado)
      toast.success('Guardado Correctamente')
    } else {
      setPedido([...pedido, prod])
      toast.success('Agregado al Pedido')
    }
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