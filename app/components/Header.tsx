import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

import PrismaLogo from "@/public/prisma-logo-small.png";

const Header = () => {
    return (
        <header>
            <div className="bg-prisma-blue py-3 px-4">
                <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                    <div className="flex gap-x-2 hover:brightness-75 text-[#FFFFFF]">
                        <FaWhatsapp className="text-xl"/>
                        <Link href="https://wa.me/554384817211" rel="noopener noreferrer" target="_blank" className="text-sm">(43) 84817211</Link>
                    </div>
                    <div className="flex gap-x-2 hover:brightness-75 text-[#FFFFFF]">
                        <IoMdMail className="text-xl"/>
                        <Link href="mailto:email@provedor.com.br" rel="noopener noreferrer" target="_blank" className="text-sm">contato@email.com</Link>
                    </div>
                </div>                
            </div>
            <div>
            <div className="bg-prisma-gray py-5 px-4 shadownew">
                <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                    <Link href="/">
                        <Image src={PrismaLogo} alt="Prisma Logo" width={200} height={50}/>
                    </Link>
                    <nav>
                        <ul className="flex gap-x-12 text-prisma-blue font-semibold text-base">
                            <li><Link href="/" className="hover:text-prisma-orange duration-100">Home</Link></li>
                            <li><Link href="/sobre" className="hover:text-prisma-orange duration-100">Sobre</Link></li>
                            <li><Link href="/#servicos" className="hover:text-prisma-orange duration-100">Serviços</Link></li>
                            <li><Link href="/produtos" className="hover:text-prisma-orange duration-100">Produtos</Link></li>
                            <li><Link href="/#contato" className="hover:text-prisma-orange duration-100">Contato</Link></li>
                        </ul>
                    </nav>
                    <Link href="https://wa.me/554384817211" rel="noopener noreferrer" target="_blank" className="bg-prisma-orange text-[#FFFFFF] text-base px-6 py-4 hover:bg-prisma-orange-hover duration-100">Fale Conosco</Link>
                </div>

            </div>
            </div>
        </header>
    );
}
 
export default Header;