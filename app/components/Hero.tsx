import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const Hero = () => {
    return (
        <section className="bg-hero-img bg-no-repeat bg-cover py-44">
            <div className="max-w-screen-xl mx-auto pl-36">
                <div className="bg-prisma-gray px-12 py-20 max-w-[720px]">
                    <p className="text-prisma-orange text-sm border-b border-prisma-orange w-max">Trabalho de qualidade, serviço confiável e equipe qualificada!</p>
                    <h2 className="text-prisma-blue text-5xl mt-6 font-bold">Nós oferecemos a <span className="text-prisma-orange">melhor</span> <br/> solução para o seu <span className="text-prisma-orange">revestimento</span>.</h2>
                    <Link href="https://wa.me/554384817211" rel="noopener noreferrer" target="_blank" className="bg-prisma-orange px-6 py-4 inline-flex items-center gap-x-2 mt-9 hover:bg-prisma-orange-hover duration-100 text-[#FFFFFF]">
                        <FaWhatsapp className="text-base" />
                        <p className="font-light">Whatsapp</p>
                    </Link>
                </div>

            </div>
        </section>
    );
}
 
export default Hero;