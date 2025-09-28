import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CompanyProfile } from "../../company";
import { getCompanyProfile, getDCF } from "../../api";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CompanyDashboard from "../../Components/CompanyDashboard/CompanyDashboard";
import Tile from "../../Components/Tile/Tile";
import Spinner from "../../Components/Spinner/Spinner";

interface Props { }

const CompanyPage = (props: Props) => {
  let { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();
  const [dcf, setDcf] = useState<number | null>(null);
  useEffect(() => {
    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker!);
      setCompany(result?.data[0]);
    }
    getProfileInit();
  }, [])

  useEffect(() => {
    const dcf = async () => {
      const result = await getDCF(ticker!);
      setDcf(result!.data[0].dcf);
    }
    dcf();
  }, [])

  return <>
    {company ? (
      <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
        <Sidebar />
        <CompanyDashboard ticker={ticker!}>
          <Tile title="Company Name" subTitle={"$" + company.companyName?.toString() || "0"} />
          <Tile title="Price" subTitle={"$" + company.price?.toString() || "0"} />
          <Tile title="DCF" subTitle={dcf?.toString() || "0"} />
          <Tile title="Sector" subTitle={"$" + company.sector?.toString() || "0"} />

          <p className="bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-4">
            {company.description}
          </p>
        </CompanyDashboard>

      </div>


    ) : (
      <Spinner />
    )
    }
  </>
};

export default CompanyPage;
