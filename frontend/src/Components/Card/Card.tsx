import React, { SyntheticEvent } from 'react'
import './Card.css'
import { JSX } from 'react/jsx-runtime'
import { CompanySearch } from '../../company'
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortfolio'

interface Props  {
  id : string
  searchResult: CompanySearch;
  onPortFolioCreate: (e: SyntheticEvent) => void;
}

const Card : React.FC<Props> = ({id, searchResult, onPortFolioCreate}: Props)  : JSX.Element=> {
  return (
  <div key={id} id={id} className = "card" >
    <div
        className="details" >
            <h2>{searchResult.name} ({searchResult.symbol})
            </h2> 
            <p>{searchResult.currency}</p>
    </div>
    <p className= "info"> 
        {searchResult.exchangeFullName} - {searchResult.exchange}
       
    </p>

    <AddPortfolio onPortfolioCreate={onPortFolioCreate} symbol={searchResult.symbol}  />
    
    </div>
  )
}

export default Card