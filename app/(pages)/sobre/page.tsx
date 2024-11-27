import { db } from "@/lib/db";
import Image from "next/image";

const Sobre = async () => {
  const company = await db.company.findFirst();
  console.log(company?.companyStoryImg, "STORY IMAGE");

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-12 flex flex-col justify-center mainnew max-md:pt-40">
      <h1 className="text-prisma-blue text-center text-5xl font-semibold mb-8">
        Sobre a <span className="text-prisma-orange">Prisma</span>
      </h1>
      <p className="text-prisma-blue text-lg text-justify mb-10">
        {company?.companyStory}
      </p>
      <div className="max-w-[700px]  w-full h-[400px] relative mx-auto">
        <Image
          src={`${company?.companyStoryImg}`}
          fill
          alt="Empresa Prisma"
          className="object-cover"
        />
      </div>
    </main>
  );
};

export default Sobre;
