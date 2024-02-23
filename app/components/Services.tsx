import Image from "next/image";
import ServicesImg from '@/public/services.jpg'

const Services = () => {
    return (
        <section className="max-w-screen-xl mx-auto px-4 text-prisma-blue mt-10" id="servicos">
            <div>
                <div className="flex flex-col items-center">
                    <h2 className="text-center text-sm text-prisma-orange">Nossos Serviços</h2>
                    <p className="text-center text-5xl mt-5">Serviços que oferecemos <br/> com o selo <span className="text-prisma-orange font-semibold">Prisma</span> de qualidade</p>
                </div>
                <div className="grid grid-cols-3 gap-x-3 gap-y-8 justify-items-center mt-24">
                    <div className="max-w-[360px]">
                        <Image src={ServicesImg} alt="Serviços" width={360} height={310}/>
                        <h3 className="font-semibold text-2xl mt-7">Industrial construction</h3>
                        <p className="mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, officiis?</p>
                    </div>
                    <div className="max-w-[360px]">
                        <Image src={ServicesImg} alt="Serviços" width={360} height={310}/>
                        <h3 className="font-semibold text-2xl mt-7">Industrial construction</h3>
                        <p className="mt-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius eum minima rem voluptatibus assumenda nihil possimus labore sunt consequuntur incidunt!</p>
                    </div>
                    <div className="max-w-[360px]">
                        <Image src={ServicesImg} alt="Serviços" width={360} height={310}/>
                        <h3 className="font-semibold text-2xl mt-7">Industrial construction</h3>
                        <p className="mt-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea quibusdam modi sequi, harum esse aliquam?</p>
                    </div>
                    <div className="max-w-[360px]">
                        <Image src={ServicesImg} alt="Serviços" width={360} height={310}/>
                        <h3 className="font-semibold text-2xl mt-7">Industrial construction</h3>
                        <p className="mt-5">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Services;