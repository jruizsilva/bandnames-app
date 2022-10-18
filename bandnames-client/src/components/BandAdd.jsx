import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext'

const BandAdd = () => {
  const [value, setValue] = useState('second')
  const { socket } = useContext(SocketContext)

  const onSubmit = e => {
    e.preventDefault()

    if (value.trim().length > 0) {
      socket.emit('crear-banda', { bandName: value })
      setValue('')
    }
  }
  return (
    <>
      <h3>Agregar banda</h3>

      <form onSubmit={onSubmit}>
        <input
          type='text'
          className='form-control'
          placeholder='Nuevo nombre de banda'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    </>
  )
}

export default BandAdd
