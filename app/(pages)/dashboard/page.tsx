import ProductForm from "@/app/components/forms/productForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ProductContainer from "./productContainer";

interface Product {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
}

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-12 flex flex-col mainnew max-md:pt-40">
      <h1 className="text-prisma-blue text-center text-5xl font-semibold mb-12">
        Dashboard
      </h1>
      <p className="mb-12"> Seja bem-vindo, {session?.user.username}.</p>

      <ProductContainer />
    </main>
  );
};

export default Dashboard;
