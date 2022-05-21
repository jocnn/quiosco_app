import { useRouter } from "next/router"

const pasos = [
  {pasos: 1, nombre: 'Menú', url: '/'},
  {pasos: 2, nombre: 'Resumen', url: '/resumen'},
  {pasos: 3, nombre: 'Total', url: '/total'},
]

const Pasos = () => {
  
  const router = useRouter()
  
  return (
    <>
      <div className="flex justify-between mb-5">
        {
          pasos.map( paso => (
            <button
              onClick={() => {
                router.push(paso.url)
              }}
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