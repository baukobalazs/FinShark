import React, { useEffect, useState } from 'react'
import { CompanyBalanceSheet } from '../../company';
import { useOutletContext } from 'react-router-dom';
import { getBalanceSheet } from '../../api';
import RatioList from '../RatioList/RatioList';
import Spinner from '../Spinner/Spinner';
import { formatLargeMonetaryNumber } from '../../Helpers/NumberFormatting';

type Props = {}

const config = [
    {
        label: <div className="font-bold">Total Assets</div>,
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.totalAssets ?? 0),
    },
    {
        label: "Current Assets",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.totalCurrentAssets ?? 0),
    },
    {
        label: "Total Cash",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.cashAndCashEquivalents ?? 0),
    },
    {
        label: "Property & Equipment",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.propertyPlantEquipmentNet ?? 0),
    },
    {
        label: "Intangible Assets",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.intangibleAssets ?? 0),
    },
    {
        label: "Long Term Debt",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.longTermDebt ?? 0),
    },
    {
        label: "Total Debt",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.totalDebt ?? 0),
    },
    {
        label: <div className="font-bold">Total Liabilities</div>,
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.totalLiabilities ?? 0),
    },
    {
        label: "Current Liabilities",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.totalCurrentLiabilities ?? 0),
    },
    {
        label: "Long-Term Debt",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.longTermDebt ?? 0),
    },
    {
        label: "Long-Term Income Taxes",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.otherLiabilities ?? 0),
    },
    {
        label: "Stakeholder's Equity",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.totalStockholdersEquity ?? 0),
    },
    {
        label: "Retained Earnings",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.retainedEarnings ?? 0),
    },
    // Extra mezők a teljes lefedettséghez
    {
        label: "Short Term Investments",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.shortTermInvestments ?? 0),
    },
    {
        label: "Cash + Short Term Investments",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.cashAndShortTermInvestments ?? 0),
    },
    {
        label: "Net Receivables",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.netReceivables ?? 0),
    },
    {
        label: "Inventory",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.inventory ?? 0),
    },
    {
        label: "Total Non-Current Assets",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.totalNonCurrentAssets ?? 0),
    },
    {
        label: "Total Non-Current Liabilities",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.totalNonCurrentLiabilities ?? 0),
    },
    {
        label: "Total Equity",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.totalEquity ?? 0),
    },
    {
        label: "Net Debt",
        render: (company: CompanyBalanceSheet) =>
            formatLargeMonetaryNumber(company.netDebt ?? 0),
    },
];

const BalanceSheet = (props: Props) => {
    const ticker = useOutletContext<string>();
    const [balanceSheet, setBalanceSheet] = useState<CompanyBalanceSheet>();
    useEffect(() => {
        const getData = async () => {
            const value = await getBalanceSheet(ticker!);
            setBalanceSheet(value?.data[0]);
        }
        getData();
    }, []);

    return (
        <>
            {balanceSheet ? (
                <RatioList config={config} data={balanceSheet} />
            ) : (
                <Spinner />
            )}
        </>
    )
}

export default BalanceSheet