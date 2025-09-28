import React from 'react'
import Table from '../../Components/Table/Table'
import RatioList from '../../Components/RatioList/RatioList'
import { testIncomeStatementData } from '../../Components/Table/testData'

type Props = {}
const tableConfig = [
    {
        label: "Market Cap",
        render: (company: any) => company.marketCap,
        subTitle: "Total value of all a company's shares of stock",
    }
]
const DesignPage = (props: Props) => {
    return (
        <>
            <h1>FinShark Design Page</h1>
            <RatioList data={testIncomeStatementData} config={tableConfig} />
            <h2>This is Finsharks design page, this is where we will house various design aspects of the app</h2>

            <Table config={tableConfig} data={testIncomeStatementData} />
        </>
    )
}

export default DesignPage