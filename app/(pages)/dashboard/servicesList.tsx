"use client";

import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

interface Service {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
}

interface ServiceListProps {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  loading: boolean;
}

const ServicesList: React.FC<ServiceListProps> = ({
  services,
  setServices,
  loading,
}) => {
  const deleteService = async (serviceId: string) => {
    try {
      const response = await fetch(`/api/service?id=${serviceId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar o serviço.");
      }

      // Atualiza a lista local de serviços
      setServices((prevServices: Service[]) =>
        prevServices.filter((service) => service.id !== serviceId)
      );

      toast.success("serviço deletado com sucesso!");
    } catch (error) {
      console.error("Erro durante exclusão:", error);
      toast.error("Não foi possível deletar o serviço.");
    }
  };

  if (loading) {
    return (
      <div className="mt-12 text-xl">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl text-prisma-blue font-bold text-center">
        Lista de Serviços
      </h3>
      <div className="grid grid-cols-2 gap-6 mt-14 max-sm:grid-cols-1">
        {services.map((product) => (
          <div
            key={product.id}
            className="border border-prisma-blue rounded-md overflow-hidden flex items-center p-4 max-lg:flex-col relative"
          >
            <button
              className="bg-red-600 text-white rounded-2xl p-1 absolute top-2 right-2 z-10"
              onClick={() => deleteService(product.id)}
            >
              <X size={20} />
            </button>
            <div className="h-[260px] w-full relative mr-5 max-lg:h-[200px] max-lg:mr-0 max-lg:mb-5 max-sm:w-[250px]">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="h-[250px] max-lg:h-[200px] w-full rounded-md"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="flex flex-col border-l border-prisma-blue pl-6 w-11/12 max-lg:w-full max-lg:border-l-0 max-lg:border-t max-lg:pt-5 max-lg:pl-0">
              <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
              <p className="text-sm text-justify mb-8">{product.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
