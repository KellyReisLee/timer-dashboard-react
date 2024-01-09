
import './TimerBox.css'
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import TimerButton from '../TimerButton/TimerButton';

const TimerBox = ({ onEditBox, onDelete, inicialData, startAndStop, onStart, onStop, idRef }) => {
  function millisecondsToHuman(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);

    const conditionsMin = minutes <= 9 ? '0' + minutes : minutes;
    const conditionsSec = seconds <= 9 ? '0' + seconds : seconds;

    return conditionsMin + ':' + conditionsSec
  }

  return (
    <section key={crypto.randomUUID()} className='boxes' >
      {inicialData.map((item, index) => {
        return (
          <div key={item.id} className='box-main'>
            <div key={item.id} className='timer-box'>
              <div className='title'>
                <h2>{item.title}</h2>
                <h4>{item.project}</h4>
              </div>

              <h1>{millisecondsToHuman(item.time)}</h1>

              <div className='timer_icons'>
                <MdDeleteOutline onClick={() => onDelete(item.id)} size={35} />
                <FaEdit onClick={() => onEditBox(item.id)} size={30} />
              </div>

            </div>

            <TimerButton startAndStop={startAndStop} onStart={onStart} onStop={onStop} id={item.id} time={item.time} idRef={idRef} index={index} />
          </div>
        )
      })
      }

    </section >
  )

}


export default TimerBox