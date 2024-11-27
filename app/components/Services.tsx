import { db } from "@/lib/db";
import Image from "next/image";

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
        <div className="grid grid-cols-3 gap-12 justify-center justify-items-center mt-24 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {services.map((service) => {
            return (
              <div
                className="max-w-[300px] flex flex-col items-center max-sm:max-w-[100%]"
                key={service.id}
              >
                <div className="w-[300px] h-[250px] max-md:w-[250px] max-md:h-[200px] relative">
                  <Image
                    src={service.imageUrl}
                    alt="Serviços"
                    fill
                    className="rounded-md object-cover"
                  />
                </div>
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
