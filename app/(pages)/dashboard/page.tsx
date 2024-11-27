import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ProductContainer from "./productContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServicesContainer from "./servicesContainer";
import CompanyContainer from "./companyContainer";
import TeamContainer from "./teamContainer";

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

  console.log(session, "SESSSIIIOOOOOOOOON");
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-12 flex flex-col mainnew max-md:pt-40">
      <h1 className="text-prisma-blue text-center text-5xl font-semibold mb-12">
        Dashboard
      </h1>
      <p className="mb-12 text-xl">
        {" "}
        Seja bem-vindo,{" "}
        <span className="text-prisma-orange">{session?.user.username}</span>!
      </p>
      <Tabs
        defaultValue="products"
        className="w-full flex flex-col items-center"
      >
        <TabsList className="flex justify-center bg-gray-300 gap-1 px-2 py-1 rounded-md">
          <TabsTrigger
            className="text-prisma-blue px-14 py-1 rounded-sm data-[state=active]:bg-prisma-blue data-[state=active]:text-white"
            value="products"
          >
            Produtos
          </TabsTrigger>
          <TabsTrigger
            className="text-prisma-blue px-14 py-1 rounded-sm data-[state=active]:bg-prisma-blue data-[state=active]:text-white"
            value="services"
          >
            Serviços
          </TabsTrigger>
          <TabsTrigger
            className="text-prisma-blue px-14 py-1 rounded-sm data-[state=active]:bg-prisma-blue data-[state=active]:text-white"
            value="company"
          >
            Empresa
          </TabsTrigger>
          <TabsTrigger
            className="text-prisma-blue px-14 py-1 rounded-sm data-[state=active]:bg-prisma-blue data-[state=active]:text-white"
            value="team"
          >
            Time
          </TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <ProductContainer />
        </TabsContent>
        <TabsContent value="services">
          <ServicesContainer />
        </TabsContent>
        <TabsContent value="company">
          <CompanyContainer />
        </TabsContent>
        <TabsContent value="team">
          <TeamContainer />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Dashboard;
