import Link from "next/link";
import { BsClockFill } from "react-icons/bs";
import { IoIosPin, IoMdMail } from "react-icons/io";

const Contact = () => {
    return (
        <section className="bg-prisma-blue mt-24" id="contato">
            <div className="max-w-screen-xl mx-auto px-4 py-24 flex justify-around max-md:py-12 max-md:flex-col max-md:gap-y-12">
                <div className="flex flex-col items-center gap-y-2 text-center">
                    <IoIosPin className="text-8xl max-md:text-4xl text-[#AAAAAA]"/>
                    <div className="flex flex-col gap-y-2">
                        <h4 className="font-semibold text-2xl max-md:text-xl text-[#FFFFFF]">Nossa Localização</h4>
                        <p className="text-[#AAAAAA]">Av Higienópolis, 1111, <br/>
                        Londrina - PR, 86000-100</p>
                        <Link className="text-prisma-orange hover:text-prisma-orange-hover" href="/">Direção</Link>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-y-2 text-center">
                    <BsClockFill className="text-8xl max-md:text-4xl text-[#AAAAAA]"/>
                    <div className="flex flex-col gap-y-2">
                        <h4 className="font-semibold text-2xl max-md:text-xl text-[#FFFFFF]">Horário de Atendimento</h4>
                        <p className="text-[#AAAAAA]">Seg-Qui (8:00 - 18:00) <br/>
                        Sexta (8:00 - 17:00) <br/>
                        Sab-Dom <span className="text-prisma-orange">(Fechado)</span></p>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-y-2 text-center">
                    <IoMdMail className="text-8xl max-md:text-4xl text-[#AAAAAA]"/>
                    <div className="flex flex-col gap-y-2">
                        <h4 className="font-semibold text-2xl max-md:text-xl text-[#FFFFFF]">Entre em Contato</h4>                        
                        <Link className="text-[#AAAAAA]" href="mailto:revestimentoprisma@gmail.com" rel="noopener noreferrer" target="_blank">revestimentoprisma@gmail.com</Link>
                        <Link className="text-[#AAAAAA]" href="https://wa.me/554384817211" rel="noopener noreferrer" target="_blank">(43) 8481-7211</Link>
                        <Link href="/" className="text-prisma-orange hover:text-prisma-orange-hover">Contate</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default Contact;