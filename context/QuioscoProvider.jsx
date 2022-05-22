import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

  const [ categorias, setCategorias ] = useState([])
  const [ categoriaActual, setCategoriaActual ] = useState({})
  const [ producto, setProducto ] = useState({})
  const [ modal, setModal ] = useState(false)
  const [ pedido, setPedido ] = useState([])
  const [ paso, setPaso ] = useState(1)
  const [ nombre, setNombre ] = useState('')
  const [ total, setTotal ] = useState(0)

  const router = useRouter()

  useEffect(() => {
    obtenerCategorias()
  }, [])

  useEffect(() => {
    setCategoriaActual(categorias[0])
  }, [categorias])

  useEffect(() => {
    const nuevoTotal = pedido.reduce( 
      (total, producto) => (producto.precio * producto.cantidad) + total, 0 )
    
    setTotal(nuevoTotal)
  }, [pedido])

  const obtenerCategorias = async () => {
    const { data } = await axios('/api/categorias')
    setCategorias(data)
  }

  const handleClickCategoria = id => {
    const categoria = categorias.filter( cat => cat.id === id )
    setCategoriaActual(categoria[0])
    router.push('/')
  }

  const handleChangeProducto = producto => {
    setProducto(producto)
  }

  const handleChangeModal = () => {
    setModal(!modal)
  }

  const handleAgregarPedido = ({categoriaId, ...prod}) => {
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

  const handleChangePaso = paso => {
    setPaso(paso)
  }

  const handleChangeEditarCantidad = id => {
    const productoActualizar = pedido.filter( producto => producto.id === id)
    setProducto(productoActualizar[0])
    setModal(!modal)
  }

  const handleChangeEliminar = id => {
    const pedidoActualizado = pedido.filter( producto => producto.id !== id)
    setPedido(pedidoActualizado)
    toast.success('Producto eliminado correctamente')
  }

  const handleSubmitTotal = async e => {
    e.preventDefault()
    
    try {
      const { data } = await axios.post('/api/ordenes', { nombre, pedido, total, fecha: Date.now().toString() })  
      //console.info(data)

      setCategoriaActual(categorias[0])
      setPedido([])
      setNombre('')
      setTotal(0)

      toast.success('Pedido realizado correctamente')

      setTimeout(() => {
        router.push('/')
      }, 3000);
    } catch (error) {
      console.error(error)
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
        handleChangePaso,
        handleChangeEditarCantidad,
        handleChangeEliminar,
        nombre,
        setNombre,
        handleSubmitTotal,
        total,
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