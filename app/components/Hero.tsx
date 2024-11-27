import { db } from "@/lib/db";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const Hero = async () => {
  const company = await db.company.findFirst();
  const formatPhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber) return "";

    return phoneNumber.replace(/\D/g, "");
  };

  const formattedmainPhone = formatPhoneNumber(company?.mainPhone || "");

  return (
    <section className="bg-hero-img bg-no-repeat bg-cover py-44">
      <div className="max-w-screen-xl mx-auto pl-36 max-lg:pl-0">
        <div className="bg-prisma-gray px-12 py-20 max-w-[720px] max-lg:max-w-[480px] max-sm:max-w-[380px] max-lg:block max-lg:m-auto max-lg:px-6 max-lg:py-10 max-lg:text-center">
          <p className="text-prisma-orange text-sm border-b border-prisma-orange w-max max-lg:text-center max-lg:w-full">
            Trabalho de qualidade, serviço confiável e equipe qualificada!
          </p>
          <h2 className="text-prisma-blue text-5xl mt-6 font-bold max-lg:text-3xl">
            Nós oferecemos a <span className="text-prisma-orange">melhor</span>{" "}
            <br /> solução para o seu{" "}
            <span className="text-prisma-orange">revestimento</span>.
          </h2>
          <Link
            href={`https://wa.me/55${formattedmainPhone}`}
            rel="noopener noreferrer"
            target="_blank"
            className="bg-prisma-orange px-6 py-4 inline-flex items-center gap-x-2 mt-9 hover:bg-prisma-orange-hover duration-100 text-[#FFFFFF]"
          >
            <FaWhatsapp className="text-base" />
            <p className="font-light">Whatsapp</p>
          </Link>
          {/* <p>554384817211</p> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
