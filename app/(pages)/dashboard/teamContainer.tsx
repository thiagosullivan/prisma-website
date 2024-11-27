"use client";

import React, { useEffect, useState } from "react";
import { Team } from "@prisma/client";
import CompanyForm from "./companyForm";
import CompanyList from "./companyList";
import TeamForm from "@/app/components/forms/teamForm";
import { useSession } from "next-auth/react";
import { useCookies } from "next-client-cookies";
import TeamList from "./teamList";

const TeamContainer = () => {
  const [team, setTeam] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTeam = async () => {
    try {
      const response = await fetch("/api/team");
      if (response.ok) {
        const data = await response.json();
        console.log(data, "DATA TEAM");
        setTeam(data.teamMembers);
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
    fetchTeam();
  }, []);

  console.log(team, "dados da empresa");

  return (
    <div>
      <TeamForm fetchTeam={fetchTeam} />
      <TeamList team={team} loading={loading} setTeam={setTeam} />
    </div>
  );
};

export default TeamContainer;
