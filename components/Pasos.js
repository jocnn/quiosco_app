const pasos = [
  {pasos: 1, nombre: 'Menú', url: '/'},
  {pasos: 2, nombre: 'Resumen', url: '/resumen'},
  {pasos: 3, nombre: 'Total', url: '/total'},
]

const Pasos = () => {
  return (
    <>
      <div className="flex justify-between mb-5">
        {
          pasos.map( paso => (
            <button
              key={paso.id}
              className="text-2xl font-bold"
            >
              {paso.nombre}
            </button>
          ))
        }
      </div>
    </>
  )
}

export default Pasos