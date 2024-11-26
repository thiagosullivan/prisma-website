"use client";

import React, { useEffect, useState } from "react";
import { Company } from "@prisma/client";
import CompanyForm from "./companyForm";
import CompanyList from "./companyList";

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
