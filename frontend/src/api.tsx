import axios, { isAxiosError } from "axios";
import { CompanyBalanceSheet, CompanyCashFlow, CompanyDCF, CompanyIncomeStatement, CompanyKeyRatios, CompanyProfile, CompanySearch } from "./company";
import { CompanyKeyMetrics } from './company.d';

interface SearchResponse {
    data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
    try {
        const data = await axios.get<SearchResponse>(
            `https://financialmodelingprep.com/stable/search-symbol?query=${query}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error);
            return "An unexpected error occurred";
        }
    }
};
export const getCompanyProfile = async (query: string) => {
    try {
        const data = await axios.get<CompanyProfile[]>(
            `https://financialmodelingprep.com/stable/profile?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    } catch (error: any) {
        console.log("error message from api: ", error.message);
    }
};

export const getKeyMetrics = async (query: string) => {
    try {
        const data = await axios.get<CompanyKeyMetrics[]>(
            `https://financialmodelingprep.com/stable/key-metrics-ttm?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    } catch (error: any) {
        console.log("error message from api: ", error.message);
    }
};

export const getIncomeStatement = async (query: string) => {
    try {
        const data = await axios.get<CompanyIncomeStatement[]>(
            `https://financialmodelingprep.com/stable/income-statement?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    } catch (error: any) {
        console.log("error message from api: ", error.message);
    }
};

export const getBalanceSheet = async (query: string) => {
    try {
        const data = await axios.get<CompanyBalanceSheet[]>(
            `https://financialmodelingprep.com/stable/balance-sheet-statement?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    } catch (error: any) {
        console.log("error message from api: ", error.message);
    }
};

export const getCashflowStatement = async (query: string) => {
    try {
        const data = await axios.get<CompanyCashFlow[]>(
            `https://financialmodelingprep.com/stable/cash-flow-statement-growth?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    } catch (error: any) {
        console.log("error message from api: ", error.message);
    }
};

export const getDCF = async (query: string) => {
    try {
        const data = await axios.get<CompanyDCF[]>(
            `https://financialmodelingprep.com/stable/discounted-cash-flow?symbol=${query}&apikey=${process.env.REACT_APP_API_KEY}`
        );
        return data;
    } catch (error: any) {
        console.log("error message from api: ", error.message);
    }
};

