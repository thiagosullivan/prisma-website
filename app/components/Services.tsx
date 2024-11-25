import Image from "next/image";
import ServicesImg from "@/public/services.jpg";
import { db } from "@/lib/db";

const Services = async () => {
  const services = await db.service.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section
      className="max-w-screen-xl mx-auto px-4 text-prisma-blue mt-10"
      id="servicos"
    >
      <div>
        <div className="flex flex-col items-center">
          <h2 className="text-center text-sm text-prisma-orange max-lg:text-2xl">
            Nossos Serviços
          </h2>
          <p className="text-center text-5xl mt-5 max-lg:text-3xl">
            Serviços que oferecemos <br /> com o selo{" "}
            <span className="text-prisma-orange font-semibold">Prisma</span> de
            qualidade
          </p>
        </div>
        <div className="grid grid-cols-3 gap-x-3 gap-y-8 justify-center justify-items-center mt-24 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {services.slice(0, 3).map((service) => {
            return (
              <div className="max-w-[360px]" key={service.id}>
                <Image
                  src={service.imageUrl}
                  alt="Serviços"
                  width={360}
                  height={310}
                  className="rounded-md"
                />
                <h3 className="font-semibold text-2xl mt-7">{service.title}</h3>
                <p className="mt-5 text-justify">{service.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
