import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from "@/lib/db";
import Image from "next/image";

const Team = async () => {
  const teamWorkers = await db.team.findMany();
  console.log(teamWorkers, "TEAM WORKERS");

  return (
    <>
      {teamWorkers.length > 0 ? (
        <section className="bg-prisma-blue mt-24" id="time">
          <div className="max-w-screen-xl mx-auto px-4 py-24 flex justify-around max-lg:flex-col max-lg:items-center">
            <div className="text-[#FFFFFF] max-w-[300px]  max-lg:max-w-none max-lg:text-center">
              <h2 className="text-5xl font-semibold">
                O nosso time de profissionais
              </h2>
              <p className="mt-8">
                Conheça o nossos profissionais especializados que atenderão à
                sua demanda
              </p>
            </div>
            <div className="flex w-3/5 max-lg:mt-10 max-lg:w-4/5 max-xl:w-[60%] max-lg:ml-4 max-md:ml-12 max-md-w-[90%] max-sm-ml-2">
              <Carousel className="max-w-[90%] max-md-[100%]">
                <CarouselContent className="flex gap-x-2 ml-0">
                  {teamWorkers.map((worker) => {
                    return (
                      <CarouselItem
                        key={worker.id}
                        className="md:basis-1/1 lg:basis-1/2 max-w-[250px] min-w-[250px] w-full border border-prisma-orange p-2"
                      >
                        <Image
                          src={worker.workerImg}
                          alt="Funcionário"
                          width={235}
                          height={190}
                          className="h-[190px] object-contain"
                        />
                        <p className="text-prisma-orange mt-6">
                          {worker.workerRole}
                        </p>
                        <h4 className="text-prisma-gray text-2xl font-semibold mt-4">
                          {worker.workerName}
                        </h4>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="max-md:hidden" />
                <CarouselNext className="max-md:hidden" />
              </Carousel>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default Team;
