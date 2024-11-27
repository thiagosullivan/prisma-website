"use client";

import { db } from "@/lib/db";
import { Product, Team } from "@prisma/client";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// interface Product {
//   id: string;
//   title: string;
//   content: string;
//   imageUrl: string;
//   createdAt: string;
//   updatedAt: string;
// }

interface TeamListProps {
  team: Team[];
  setTeam: React.Dispatch<React.SetStateAction<Team[]>>;
  loading: boolean;
}

const TeamList: React.FC<TeamListProps> = ({ team, setTeam, loading }) => {
  const deleteTeam = async (teamId: string) => {
    try {
      const response = await fetch(`/api/team?id=${teamId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar o funcionário.");
      }

      // Atualiza a lista local de funcionários
      setTeam((prevTeam: Team[]) =>
        prevTeam.filter((team) => team.id !== teamId)
      );

      toast.success("Funcionário deletado com sucesso!");
    } catch (error) {
      console.error("Erro durante exclusão:", error);
      toast.error("Não foi possível deletar o funcionário.");
    }
  };

  if (loading) {
    return (
      <div className="mt-12 text-xl w-full">
        <p className="w-full">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl text-prisma-blue font-bold text-center">
        Lista de Funcionários
      </h3>
      <div className="grid grid-cols-2 gap-6 mt-14 max-sm:grid-cols-1">
        {team.map((team) => (
          <div className="relative" key={team.id}>
            <button
              className="bg-red-600 text-white rounded-2xl p-1 absolute top-[-10px] right-2 z-10"
              onClick={() => deleteTeam(team.id)}
            >
              <X size={20} />
            </button>
            <div
              key={team.id}
              className="border border-prisma-blue rounded-md overflow-hidden flex items-center p-4 max-lg:flex-col relative"
            >
              <div className="h-[260px] w-full relative mr-5 max-lg:h-[200px] max-lg:mr-0 max-lg:mb-5 max-sm:w-[250px]">
                <Image
                  src={team.workerImg}
                  alt={team.workerName}
                  fill
                  className="h-[250px] max-lg:h-[200px] w-full rounded-md"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="flex flex-col border-l border-prisma-blue pl-6 w-11/12 max-lg:w-full max-lg:border-l-0 max-lg:border-t max-lg:pt-5 max-lg:pl-0">
                <h3 className="font-semibold text-lg mb-2">
                  {team.workerName}
                </h3>
                <p className="text-sm text-justify mb-8">{team.workerRole}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
