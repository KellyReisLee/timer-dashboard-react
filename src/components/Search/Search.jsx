import { useEffect } from 'react'
import './Search.css'

const Search = ({ search, setSearch, setInicialData, screen }) => {


  useEffect(() => {
    let storedData = localStorage.getItem('dataList');
    let storedDataList = storedData ? JSON.parse(storedData) : [];
    const filtered = storedDataList.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
    if (search) {
      setInicialData(() => filtered)
    } else {
      setInicialData(() => storedDataList)
    }

  }, [search])
  return (

    <input
      className='input-search'
      type='search'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder='Search...' />
  )
}

export default Search