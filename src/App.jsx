
import { useState, useRef, useEffect } from 'react';
import Header from './components/Header/Header';
import TimerBox from './components/TimerBox/TimerBox';
import CreateUpdate from './components/CreateUpdate/CreateUpdate';
import './App.css'
import Search from './components/Search/Search';
const data = [
  {
    id: crypto.randomUUID(),
    title: 'Mow the Lawn',
    project: 'House Chores',
    time: 900000
  },
  {
    id: crypto.randomUUID(),
    title: 'Clear Paper Jam',
    project: 'Office Chores',
    time: 1200000
  },
  {
    id: crypto.randomUUID(),
    title: 'Project Management',
    project: 'Dummy Data',
    time: 900000
  }
]

const setDataFrom = localStorage.setItem('dataList', JSON.stringify(data));

let isEdit = false;
let idItem = 0;

// Retrieve the array JSON string from local storage
const getDataFrom = localStorage.getItem('dataList');

// Parse JSON string to array
const arrayFromStorage = JSON.parse(getDataFrom);


function App() {
  const [inicialData, setInicialData] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [title, setTitle] = useState('Title');
  const [project, setProject] = useState('Project');
  const [time, setTime] = useState('time in minutes');
  const [search, setSearch] = useState('');
  const [openInput, setOpenInput] = useState(false);
  const [startAndStop, setStartAndStop] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const intervalRef = useRef();
  const idRef = useRef();





  useEffect(() => {

    setInicialData(() => arrayFromStorage)
    const handleResize = () => {
      setWidth(window.innerWidth);

    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };


  }, [])


  function handleOpenCreate() {
    setOpenCreate(true)
  }

  function handleCreateBox() {
    const newItem = { id: crypto.randomUUID(), title, project, time }
    setInicialData((prevData) => {
      return [
        newItem, ...prevData
      ]
    })
    setOpenCreate(false)
    let storedData = localStorage.getItem('dataList');
    let storedDataList = storedData ? JSON.parse(storedData) : [];
    storedDataList.unshift(newItem)
    localStorage.setItem('dataList', JSON.stringify(storedDataList))


  }

  function handleEditOpenBox(id) {
    setOpenCreate(true)
    isEdit = true;
    idItem = id


    setInicialData((prevState) => {

      const elemento = prevState.filter((item) => item.id === id)
      setTitle(elemento[0].title)
      setProject(elemento[0].project)
      setTime(elemento[0].time / 60 / 1000)
      const novaLista = prevState.filter((item) => item.id !== id)
      if (openCreate === true) {
        return [
          elemento, ...novaLista
        ]
      } else {
        return [
          ...prevState
        ]
      }
    })

  }

  function handleEditBox() {

    setInicialData((prevState) => {

      const newList = prevState.filter((item) => item.id !== idItem)
      const newItem = { id: crypto.randomUUID(), title, project, time: time * 60 * 1000 }
      let storedData = localStorage.getItem('dataList');
      let storedDataList = storedData ? JSON.parse(storedData) : [];
      const restItemSelect = storedDataList.filter((item) => item.id !== idItem);
      restItemSelect.push(newItem)
      localStorage.setItem('dataList', JSON.stringify(restItemSelect))


      return [
        newItem, ...newList
      ]
    })
    isEdit = false
    setTitle('Title')
    setProject('Project')
    setTime('900000')
    setOpenCreate(false)



  }

  // Delete Item
  function handleDelete(id) {
    setInicialData((prevState) => {
      const elemento = prevState.filter((item) => item.id !== id)
      return [...elemento]

    })

    let storedData = localStorage.getItem('dataList');
    let storedDataList = storedData ? JSON.parse(storedData) : [];
    const newList = storedDataList.filter((item) => item.id !== id)
    localStorage.setItem('dataList', JSON.stringify(newList))
  }

  function openInputFunc() {
    setOpenInput(true)
  }

  // Cancel Edit
  function handleCancel() {
    isEdit = false
    setOpenCreate(false)
    setTitle('Title')
    setProject('Project')
    setTime('900000')
  }

  // Function -  Start Timer
  function handleStartTimer(id, index) {
    idRef.current = id
    setStartAndStop(true)

    intervalRef.current = setInterval(() => {
      setInicialData(prevData => {
        if (prevData[index].id && prevData[index].time > 0) {

          return prevData.map((item, i) => ({
            ...item,
            time: i === index ? item.time - 1000 : item.time
          }))
        } else if (!prevData[index].time) {
          clearInterval(intervalRef.current)
          setStartAndStop(false)

          return prevData.map((item, i) => ({
            ...item,
            time: i === index ? 10000 : item.time
          }))
        }

      }
      );
    }, 1000)

  };

  // Function -  Stop Timer
  function handleStopTimer() {
    setStartAndStop(false)
    clearInterval(intervalRef.current)
  }

  return (
    <>
      <Header
        setInicialData={setInicialData}
        inicialData={inicialData}
        openInput={openInput}
        onCreateBox={handleOpenCreate}
        setOpenInput={setOpenInput}
        onOpenInput={openInputFunc}
        search={search}
        setSearch={setSearch}
        width={width}
      />



      <hr />

      {(width < 950) && (<div className='searchBox-app'><Search width={width} setInicialData={setInicialData} search={search} setSearch={setSearch} /></div>)}

      {
        openCreate && <CreateUpdate
          title={title}
          setTitle={setTitle}
          project={project}
          setProject={setProject}
          time={time}
          setTime={setTime}
          isEdit={isEdit}
          onCancelBox={handleCancel}
          onCreateItem={handleCreateBox}
          onEditBox={handleEditBox}


        />
      }
      <TimerBox
        inicialData={inicialData}
        onEditBox={handleEditOpenBox}
        onDelete={handleDelete}
        setInicialData={setInicialData}
        startAndStop={startAndStop}
        onStart={handleStartTimer}
        onStop={handleStopTimer}
        idRef={idRef}

      />

    </>
  )
}

export default App
