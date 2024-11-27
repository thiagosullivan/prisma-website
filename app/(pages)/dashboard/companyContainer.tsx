"use client";

import { Company } from "@prisma/client";
import { useEffect, useState } from "react";
import CompanyForm from "./companyForm";

const CompanyContainer = () => {
  const [company, setCompany] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCompany = async () => {
    try {
      const response = await fetch("/api/company");
      if (response.ok) {
        const data = await response.json();
        setCompany(data.company);
      } else {
        console.error("Erro ao buscar empresa");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  console.log(company, "dados da empresa");

  return (
    <div>
      <CompanyForm fetchCompany={fetchCompany} />
      {/* <CompanyList
        company={company}
        loading={loading}
        setCompany={setCompany}
      /> */}
    </div>
  );
};

export default CompanyContainer;
