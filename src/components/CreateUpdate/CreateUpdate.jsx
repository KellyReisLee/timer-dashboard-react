
import './CreateUpdate.css'

const CreateUpdate = ({ onCancelBox, onCreateItem, isEdit, title, setTitle, project, setProject, onEditBox, time, setTime }) => {

  let chooseFunc = isEdit ? onEditBox : onCreateItem;

  return (
    <div className='boxes boxes-container'>
      <div className='input-box '>
        <label>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
        <label>Project</label>
        <input value={project} onChange={(e) => setProject(e.target.value)} />
        <label>Time</label>
        <input value={time} onChange={(e) => setTime(e.target.value)} />
        <div className='btns-create'>
          <button onClick={chooseFunc} className='btn-create'>{isEdit ? 'Update' : 'Create'}</button>
          <button onClick={onCancelBox} className='btn-cancel'>Cancel</button>
        </div>

      </div>
    </div>


  )
}

export default CreateUpdate