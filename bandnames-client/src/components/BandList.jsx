import React, {
  useContext,
  useEffect,
  useState
} from 'react'
import { SocketContext } from '../context/SocketContext'

const BandList = () => {
  const [bands, setBands] = useState([])
  const { socket } = useContext(SocketContext)

  useEffect(() => {
    socket.on('current-bands', bands => {
      setBands(bands)
    })
    return () => socket.off('current-bands')
  }, [socket])

  const onChange = (e, id) => {
    const newName = e.target.value
    setBands(bands =>
      bands.map(band =>
        band.id === id ? { ...band, name: newName } : band
      )
    )
  }

  const onBlur = (id, newName) => {
    socket.emit('cambiar-nombre-banda', { id, newName })
  }

  const increaseVoteByBandId = id => {
    socket.emit('votar-banda', { id })
  }

  const removeBandById = id => {
    socket.emit('borrar-banda', { id })
  }

  const crearRows = () => {
    return (
      <>
        {bands.map(band => (
          <tr key={band.id}>
            <td>
              <button
                className='btn btn-primary'
                onClick={() =>
                  increaseVoteByBandId(band.id)
                }
              >
                +1
              </button>
            </td>
            <td>
              <input
                type='text'
                className='form-control'
                value={band.name}
                onChange={e => onChange(e, band.id)}
                onBlur={e => onBlur(band.id, band.name)}
              />
            </td>
            <td>
              <h3>{band.votes}</h3>
            </td>
            <td>
              <button
                className='btn btn-danger'
                onClick={() => removeBandById(band.id)}
              >
                Borrar
              </button>
            </td>
          </tr>
        ))}
      </>
    )
  }

  return (
    <>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </table>
    </>
  )
}

export default BandList
