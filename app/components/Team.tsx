import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import TeamImg from '@/public/team-img.jpg'
  
const Team = () => {
    return (
        <section className="bg-prisma-blue mt-24" id="time">
            <div className="max-w-screen-xl mx-auto px-4 py-24 flex justify-between">
                <div className="text-[#FFFFFF] max-w-[400px]">
                    <h2 className="text-5xl font-semibold">O nosso time de profissionais</h2>
                    <p className="mt-8">Conheça o nossos profissionais especializados que atenderão à sua demanda</p>
                </div>
                <div className="flex w-3/5">
                    <Carousel>
                        <CarouselContent>
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3 max-w-[300px]">
                                <Image src={TeamImg} alt="Funcionário" width={330} height={270} />
                                <p className="text-prisma-orange mt-6">Industrial construction</p>
                                <h4 className="text-prisma-gray text-2xl font-semibold mt-4">João Frederico de Souza</h4>
                            </CarouselItem>                            
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3 max-w-[300px]">
                                <Image src={TeamImg} alt="Funcionário" width={330} height={270} />
                                <p className="text-prisma-orange mt-6">Industrial construction</p>
                                <h4 className="text-prisma-gray text-2xl font-semibold mt-4">Pedro Ferreira da Silva</h4>
                            </CarouselItem>                            
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3 max-w-[300px]">
                                <Image src={TeamImg} alt="Funcionário" width={330} height={270} />
                                <p className="text-prisma-orange mt-6">Industrial construction</p>
                                <h4 className="text-prisma-gray text-2xl font-semibold mt-4">José Vicente dos Santos</h4>
                            </CarouselItem>                            
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3 max-w-[300px]">
                                <Image src={TeamImg} alt="Funcionário" width={330} height={270} />
                                <p className="text-prisma-orange mt-6">Industrial construction</p>
                                <h4 className="text-prisma-gray text-2xl font-semibold mt-4">Matheus Garcia Lopes</h4>
                            </CarouselItem>                            
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </section>
    );
}
 
export default Team;