"use client";

import React, { useEffect, useState } from "react";
import { Service } from "@prisma/client";
import ServiceForm from "@/app/components/forms/serviceForm";
import ServicesList from "./servicesList";

const ServicesContainer = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/service");
      if (response.ok) {
        const data = await response.json();
        setServices(data.services);
      } else {
        console.error("Erro ao buscar serviços");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  console.log(services, "SERVS");
  return (
    <div>
      <ServiceForm fetchServices={fetchServices} />
      <ServicesList
        services={services}
        loading={loading}
        setServices={setServices}
      />
    </div>
  );
};

export default ServicesContainer;
