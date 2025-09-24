import React, { ChangeEvent, use, useState, MouseEvent, SyntheticEvent } from 'react'
import { JSX } from 'react/jsx-runtime'

interface Props  {
    onSearchSubmit: (e: SyntheticEvent) => void;
    search: string;
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<Props> = ({onSearchSubmit, search, handleSearchChange}: Props): JSX.Element => {
    
    return (
       <>
       <form onSubmit={onSearchSubmit}>
        <input value={search} onChange={handleSearchChange} />
       </form>
       </>
    )
}

export default Search