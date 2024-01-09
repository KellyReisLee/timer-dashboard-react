import { useEffect } from 'react'
import { FaSearch } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import './Header.css'
import Search from '../Search/Search';



const Header = ({ onCreateBox, onOpenInput, openInput, search, setSearch, setInicialData, setOpenInput, width }) => {
  useEffect(() => {
    setTimeout(() => {
      setOpenInput(false)
    }, 2000);

  }, [])





  return (
    <header className='header'>

      <h1>Timer Dashboard</h1>

      <div className='header_icons'>
        {!openInput ? (

          <div className='search-icon'>
            {(width > 950) && <FaSearch className='search-icon' size={37} onClick={onOpenInput} />}

          </div>) : (
          <Search screen={true} setInicialData={setInicialData} search={search} setSearch={setSearch} />
        )}

        <IoIosAdd onClick={onCreateBox} className='header_icons-plus' size={50} />
      </div>
    </header>
  )
}

export default Header