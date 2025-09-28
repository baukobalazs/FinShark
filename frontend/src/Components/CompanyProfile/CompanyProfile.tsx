import React, { useEffect, useState } from 'react'
import { CompanyKeyMetrics } from '../../company';
import { useOutletContext } from 'react-router-dom';
import { getKeyMetrics } from '../../api';
import RatioList from '../RatioList/RatioList';
import Spinner from '../Spinner/Spinner';
import { formatLargeNonMonetaryNumber, formatRatio } from '../../Helpers/NumberFormatting';

type Props = {}

const tableConfig = [
    {
        label: "Market Cap",
        render: (company: CompanyKeyMetrics) =>
            formatLargeNonMonetaryNumber(company.marketCap),
        subTitle: "Total value of all a company's shares of stock",
    },
    {
        label: "Current Ratio",
        render: (company: CompanyKeyMetrics) =>
            formatRatio(company.currentRatioTTM),
        subTitle:
            "Measures the company's ability to pay short term debt obligations",
    },
    {
        label: "Return On Equity",
        render: (company: CompanyKeyMetrics) =>
            formatRatio(company.returnOnEquityTTM),
        subTitle:
            "Return on equity is the measure of a company's net income divided by its shareholder's equity",
    },
    {
        label: "Return On Assets",
        render: (company: CompanyKeyMetrics) =>
            formatRatio(company.returnOnTangibleAssetsTTM),
        subTitle:
            "Return on assets is the measure of how effective a company is using its assets",
    },
    {
        label: "Free Cashflow Per Share",
        render: (company: CompanyKeyMetrics) =>
            formatRatio(company.freeCashFlowToEquityTTM),
        subTitle:
            "Free cash flow available to equity holders per share",
    },
    {
        label: "Book Value Per Share TTM",
        render: (company: CompanyKeyMetrics) =>
            formatRatio(company.tangibleAssetValueTTM),
        subTitle:
            "Book value per share indicates a firm's net asset value (total assets - total liabilities) on per share basis",
    },
    {
        label: "Dividend Yield TTM",
        render: (company: CompanyKeyMetrics) =>
            formatRatio(company.freeCashFlowYieldTTM), // Ha nincs konkrét dividendYieldTTM mező
        subTitle: "Shows how much a company pays each year relative to stock price",
    },
    {
        label: "Capex Per Share TTM",
        render: (company: CompanyKeyMetrics) =>
            formatRatio(company.capexToOperatingCashFlowTTM),
        subTitle:
            "Capex is used by a company to acquire, upgrade, and maintain physical assets",
    },
    {
        label: "Graham Number",
        render: (company: CompanyKeyMetrics) =>
            formatRatio(company.grahamNumberTTM),
        subTitle:
            "This is the upper bound of the price range that a defensive investor should pay for a stock",
    },
    {
        label: "PE Ratio",
        render: (company: CompanyKeyMetrics) =>
            formatRatio(company.earningsYieldTTM ? 1 / company.earningsYieldTTM : 0),
        subTitle:
            "Price to Earnings ratio based on trailing twelve months earnings",
    },
];



const CompanyProfile = (props: Props) => {
    const ticker = useOutletContext<string>();
    const [companyData, setCompanyData] = useState<CompanyKeyMetrics>();
    useEffect(() => {
        const getCompanyKeyMetrics = async () => {
            const value = await getKeyMetrics(ticker);
            setCompanyData(value?.data[0])
        };
        getCompanyKeyMetrics();
    }, []);
    return (
        <>
            {companyData ? (
                <>
                    <RatioList data={companyData} config={tableConfig} />

                </>

            ) : (
                <Spinner />
            )}
        </>
    )
}

export default CompanyProfile