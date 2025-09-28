import React, { useEffect, useState } from 'react'
import { CompanyIncomeStatement } from '../../company';
import { useOutletContext } from 'react-router-dom';
import { getIncomeStatement } from '../../api';
import Table from '../Table/Table';
import Spinner from '../Spinner/Spinner';
import { formatLargeMonetaryNumber, formatRatio } from '../../Helpers/NumberFormatting';

type Props = {}

const configs = [
    {
        label: "Date",
        render: (company: CompanyIncomeStatement) => company.date?.toString() || "N/A",
    },
    {
        label: "Revenue",
        render: (company: CompanyIncomeStatement) =>
            formatLargeMonetaryNumber(company.revenue ?? 0),
    },
    {
        label: "Cost Of Revenue",
        render: (company: CompanyIncomeStatement) =>
            formatLargeMonetaryNumber(company.costOfRevenue ?? 0),
    },
    {
        label: "Gross Profit",
        render: (company: CompanyIncomeStatement) =>
            formatLargeMonetaryNumber(company.grossProfit ?? 0),
    },
    {
        label: "R&D Expenses",
        render: (company: CompanyIncomeStatement) =>
            formatLargeMonetaryNumber(company.researchAndDevelopmentExpenses ?? 0),
    },
    {
        label: "G&A Expenses",
        render: (company: CompanyIncomeStatement) =>
            formatLargeMonetaryNumber(company.generalAndAdministrativeExpenses ?? 0),
    },
    {
        label: "SG&A Expenses",
        render: (company: CompanyIncomeStatement) =>
            formatLargeMonetaryNumber(company.sellingGeneralAndAdministrativeExpenses ?? 0),
    },
    {
        label: "Other Expenses",
        render: (company: CompanyIncomeStatement) =>
            formatLargeMonetaryNumber(company.otherExpenses ?? 0),
    },
    {
        label: "Operating Expenses",
        render: (company: CompanyIncomeStatement) =>
            formatLargeMonetaryNumber(company.operatingExpenses ?? 0),
    },
    {
        label: "Depreciation & Amortization",
        render: (company: CompanyIncomeStatement) =>
            formatLargeMonetaryNumber(company.depreciationAndAmortization ?? 0),
    },
    {
        label: "EBITDA",
        render: (company: CompanyIncomeStatement) =>
            formatLargeMonetaryNumber(company.ebitda ?? 0),
    },
    {
        label: "Operating Income",
        render: (company: CompanyIncomeStatement) =>
            formatLargeMonetaryNumber(company.operatingIncome ?? 0),
    },
    {
        label: "Income Before Taxes",
        render: (company: CompanyIncomeStatement) =>
            formatLargeMonetaryNumber(company.incomeBeforeTax ?? 0),
    },
    {
        label: "Net Income",
        render: (company: CompanyIncomeStatement) =>
            formatLargeMonetaryNumber(company.netIncome ?? 0),
    },
    {
        label: "Net Income Ratio",
        render: (company: CompanyIncomeStatement) =>
            formatRatio(company.netIncome / (company.revenue || 1)),
    },
    {
        label: "EPS",
        render: (company: CompanyIncomeStatement) =>
            formatRatio(company.eps ?? 0),
    },
    {
        label: "EPS Diluted",
        render: (company: CompanyIncomeStatement) =>
            formatRatio(company.epsDiluted ?? 0),
    },
    {
        label: "Gross Profit Ratio",
        render: (company: CompanyIncomeStatement) =>
            formatRatio((company.grossProfit ?? 0) / (company.revenue || 1)),
    },
    {
        label: "Operating Income Ratio",
        render: (company: CompanyIncomeStatement) =>
            formatRatio((company.operatingIncome ?? 0) / (company.revenue || 1)),
    },
    {
        label: "Income Before Taxes Ratio",
        render: (company: CompanyIncomeStatement) =>
            formatRatio((company.incomeBeforeTax ?? 0) / (company.revenue || 1)),
    },
];



const IncomeStatement = (props: Props) => {
    const ticker = useOutletContext<string>();
    const [incomeStatement, setIncomeStatament] = useState<CompanyIncomeStatement[]>()
    useEffect(() => {

        const incomeStatementFetch = async () => {
            const result = await getIncomeStatement(ticker);
            setIncomeStatament(result!.data)
        }
        incomeStatementFetch();
    }, [])
    return (
        <>
            {incomeStatement ? <><Table config={configs} data={incomeStatement} /></>
                : <Spinner />}
        </>
    )
}

export default IncomeStatement