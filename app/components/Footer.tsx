import Image from "next/image";
import Link from "next/link";
import FooterImg from '@/public/prisma-logo-small.png'
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="shadownew">
            <div className="max-w-screen-xl mx-auto px-4 py-14 flex justify-between max-md:flex-col max-md:items-center max-md:gap-y-10">
                <div className="max-w-[300px] max-lg:max-w-[250px]">
                    <Link href="/">
                        <Image src={FooterImg} alt="Prisma Logo" width={215} height={50}/>
                    </Link>
                    <p className="text-prisma-blue text-xs mt-5 text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took.</p>

                    <div className="mt-16 flex gap-x-5 max-md:justify-center">
                        <Link href="/">
                            <FaFacebookSquare className="text-3xl hover:text-prisma-orange-hover duration-100" />
                        </Link>
                        <Link href="/">
                            <FaInstagram className="text-3xl hover:text-prisma-orange-hover duration-100" />
                        </Link>
                        <Link href="/">
                            <FaLinkedin className="text-3xl hover:text-prisma-orange-hover duration-100" />
                        </Link>
                    </div>
                </div>
                <nav className="text-prisma-blue">
                    <p className="text-xl font-bold">Site</p>
                    <ul className="mt-4 font-light flex flex-col gap-y-3">
                        <li>
                            <Link className="hover:text-prisma-orange-hover duration-100" href="/">Home</Link>
                        </li>
                        <li>
                            <Link className="hover:text-prisma-orange-hover duration-100" href="/sobre">Sobre</Link>
                        </li>
                        <li>
                            <Link className="hover:text-prisma-orange-hover duration-100" href="/#servicos">Serviços</Link>
                        </li>
                        <li>
                            <Link className="hover:text-prisma-orange-hover duration-100" href="/#time">Time</Link>
                        </li>
                        <li>
                            <Link className="hover:text-prisma-orange-hover duration-100" href="/produtos">Produtos</Link>
                        </li>
                        <li>
                            <Link className="hover:text-prisma-orange-hover duration-100" href="/#contato">Contato</Link>
                        </li>
                    </ul>
                </nav>
                <div className="max-w-[300px] w-full max-lg:max-w-[250px] max-md:max-w-[300px] max-md:text-center">
                    <p className="text-xl font-bold">Contato</p>
                    <form className="">
                        <div>
                            <input className="border-prisma-blue border mt-2 w-full text-sm py-1 px-3 outline-none text-prisma-blue" placeholder="Nome" />
                        </div>
                        <div>
                            <input className="border-prisma-blue border mt-2 w-full text-sm py-1 px-3 outline-none text-prisma-blue" placeholder="E-mail" />
                        </div>
                        <div>
                            <input className="border-prisma-blue border mt-2 w-full text-sm py-1 px-3 outline-none text-prisma-blue" placeholder="Telefone" />
                        </div>
                        <div>
                            <textarea className="border-prisma-blue border mt-2 w-full text-sm py-1 px-3 outline-none text-prisma-blue resize-none h-36" placeholder="Mensagem" />
                        </div>
                        <button className="bg-prisma-blue text-[#FFFFFF] px-3 py-1 hover:bg-prisma-orange-hover duration-100">Enviar</button>
                    </form>
                </div>
            </div>
            <div className="bg-prisma-blue p-4">
                <p className="text-[#AAAAAA] text-xs text-center">Copyright ©2024 Todos os Direitos Reservados | <span className="text-prisma-orange">PRISMA REVESTIMENTOS</span></p>
            </div>
        </footer>
    );
}
 
export default Footer;