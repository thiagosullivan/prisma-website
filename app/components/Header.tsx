import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

import PrismaLogo from "@/public/prisma-logo-small.png";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
    return (
        <header className="max-md:fixed w-full bg-prisma-gray z-50">
            <div className="bg-prisma-blue py-3 px-4">
                <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                    <div className="flex gap-x-2 hover:brightness-75 text-[#FFFFFF]">
                        <FaWhatsapp className="text-xl"/>
                        <Link href="https://wa.me/554384817211" rel="noopener noreferrer" target="_blank" className="text-sm">(43) 8481-7211</Link>
                    </div>
                    <div className="flex gap-x-2 hover:brightness-75 text-[#FFFFFF]">
                        <IoMdMail className="text-xl"/>
                        <Link href="mailto:email@provedor.com.br" rel="noopener noreferrer" target="_blank" className="text-sm">contato@email.com</Link>
                    </div>
                </div>                
            </div>
            <div className="max-md:hidden">
                <div className="bg-prisma-gray py-5 px-4 shadownew">
                    <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                        <Link href="/">
                            <Image src={PrismaLogo} alt="Prisma Logo" width={200} height={50}/>
                        </Link>
                        <nav>
                            <ul className="flex gap-x-8 max-lg:gap-x-5 text-prisma-blue font-semibold text-base">
                                <li><Link href="/" className="hover:text-prisma-orange duration-100">Home</Link></li>
                                <li><Link href="/sobre" className="hover:text-prisma-orange duration-100">Sobre</Link></li>
                                <li><Link href="/#servicos" className="hover:text-prisma-orange duration-100">Serviços</Link></li>
                                <li><Link href="/produtos" className="hover:text-prisma-orange duration-100">Produtos</Link></li>
                                <li><Link href="/#contato" className="hover:text-prisma-orange duration-100">Contato</Link></li>
                            </ul>
                        </nav>
                        <Link href="https://wa.me/554384817211" rel="noopener noreferrer" target="_blank" className="bg-prisma-orange text-[#FFFFFF] text-center text-base px-6 py-4 hover:bg-prisma-orange-hover duration-100 max-lg:px-3 max-lg:py-2">Fale Conosco</Link>
                    </div>
                </div>
            </div>
            <div className="flex justify-between p-4 shadownew md:hidden">
                <Link href="/">
                    <Image src={PrismaLogo} alt="Prisma" width={151} height={34}/>
                </Link>
                <Sheet>
                    <SheetTrigger>
                        <Menu size={30} className="text-prisma-blue" />
                    </SheetTrigger>
                    <SheetContent>
                        <ul className="h-3/4 flex flex-col justify-center items-center text-prisma-blue text-2xl gap-6">
                        <li>
                            <SheetTrigger asChild>
                                <Link href="/" className="hover:text-prisma-orange duration-100">Home</Link>
                            </SheetTrigger>
                        </li>
                        <li>
                            <SheetTrigger asChild>
                                <Link href="/sobre" className="hover:text-prisma-orange duration-100">Sobre</Link>
                            </SheetTrigger>
                        </li>
                        <li>
                            <SheetTrigger asChild>
                                <Link href="/#servicos" className="hover:text-prisma-orange duration-100">Serviços</Link>
                            </SheetTrigger>
                        </li>
                        <li>
                            <SheetTrigger asChild>
                                <Link href="/produtos" className="hover:text-prisma-orange duration-100">Produtos</Link>
                            </SheetTrigger>
                        </li>
                        <li>
                            <SheetTrigger asChild>
                                <Link href="/#contato" className="hover:text-prisma-orange duration-100">Contato</Link>
                            </SheetTrigger>
                        </li>
                        </ul>
                        <Link href="https://wa.me/554384817211" rel="noopener noreferrer" target="_blank" className="bg-prisma-orange text-[#FFFFFF] text-center text-base px-6 py-4 hover:bg-prisma-orange-hover duration-100 m-auto block">Fale Conosco</Link>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
 
export default Header;