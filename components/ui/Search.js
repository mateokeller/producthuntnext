import React from 'react'

const Search = () => {
return (
    <form className='input-nav-container'>
        <input type="text" placeholder='Buscar Productos' className='search-input'/>
        <button type='submit' className='submit-input'></button>
    </form>
)
}

export default Search;