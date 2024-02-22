import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const Hero = () => {
    return (
        <section className="bg-hero-img bg-no-repeat bg-cover py-44">
            <div className="max-w-screen-xl mx-auto pl-36">
                <div className="bg-prisma-gray px-12 py-20 max-w-[650px]">
                    <p className="text-prisma-orange text-sm">Quality work. Trustable service. Dedicated team</p>
                    <h2 className="text-prisma-blue text-6xl mt-6 font-bold">We provide your <br/> Industrial solution</h2>
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