import React, { useEffect, useState } from 'react'
import { CompanyCashFlow } from '../../company';
import { useOutletContext } from 'react-router-dom';
import { getCashflowStatement } from '../../api';
import Table from '../Table/Table';
import Spinner from '../Spinner/Spinner';
import { formatLargeMonetaryNumber } from '../../Helpers/NumberFormatting';

type Props = {}

const config = [
    {
        label: "Date",
        render: (company: CompanyCashFlow) => company.date?.toString() || "N/A",
    },
    {
        label: "Operating Cashflow (Growth)",
        render: (company: CompanyCashFlow) =>
            formatLargeMonetaryNumber(company.growthNetCashProvidedByOperatingActivites ?? 0),
    },
    {
        label: "Investing Cashflow (Growth)",
        render: (company: CompanyCashFlow) =>
            formatLargeMonetaryNumber(company.growthNetCashUsedForInvestingActivites ?? 0),
    },
    {
        label: "Financing Cashflow (Growth)",
        render: (company: CompanyCashFlow) =>
            formatLargeMonetaryNumber(company.growthNetCashUsedProvidedByFinancingActivities ?? 0),
    },
    {
        label: "Cash At End of Period (Growth)",
        render: (company: CompanyCashFlow) =>
            formatLargeMonetaryNumber(company.growthCashAtEndOfPeriod ?? 0),
    },
    {
        label: "CapEX (Growth)",
        render: (company: CompanyCashFlow) =>
            formatLargeMonetaryNumber(company.growthCapitalExpenditure ?? 0),
    },
    {
        label: "Issuance Of Stock (Growth)",
        render: (company: CompanyCashFlow) =>
            formatLargeMonetaryNumber(company.growthCommonStockIssued ?? 0),
    },
    {
        label: "Free Cash Flow (Growth)",
        render: (company: CompanyCashFlow) =>
            formatLargeMonetaryNumber(company.growthFreeCashFlow ?? 0),
    },
];



const CashFlowStatement = (props: Props) => {
    const ticker = useOutletContext<string>()
    const [cashflowData, setCashFlow] = useState<CompanyCashFlow[]>()

    useEffect(() => {
        const fetchCashFlow = async () => {
            const result = await getCashflowStatement(ticker!);
            setCashFlow(result!.data)
        }
        fetchCashFlow();

    }, [])
    return (
        <>
            {cashflowData ? (
                <Table config={config} data={cashflowData} />
            ) : (
                <Spinner />
            )

            }
        </>
    )
}

export default CashFlowStatement