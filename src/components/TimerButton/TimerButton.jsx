import React from 'react'
import './TimerButton.css'

const TimerButton = ({ startAndStop, onStart, onStop, id, idRef, index }) => {

  return (
    <button id={idRef.current === id && startAndStop ? 'redBox' : ''
    } className='btn-start ' onClick={() => { !startAndStop ? onStart(id, index) : onStop() }} > {id === idRef.current && startAndStop ? 'Stop' : 'Start'}</button >
  )
}

export default TimerButton