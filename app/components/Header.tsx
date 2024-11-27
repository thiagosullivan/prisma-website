import Image from "next/image";
import Link from "next/link";
import { FaFacebookSquare, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";

import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import PrismaLogo from "@/public/prisma-logo-small.png";
import { Menu } from "lucide-react";
import { getServerSession } from "next-auth";
import { FaLinkedin } from "react-icons/fa6";
import RedirectToHome from "./redirectToHome";
import SignOutBtn from "./signOutBtn";

const Header = async () => {
  const session = await getServerSession(authOptions);
  const company = await db.company.findFirst();

  console.log(company, "fetch");

  const formatPhoneNumberShow = (phone: string | undefined) => {
    if (phone?.includes("_")) {
      return phone.replace(/[_-]/g, "").replace(/(\d{4})(\d{4})$/, "$1-$2");
    }

    return phone;
  };

  // const formattedPhone1 = formatPhoneNumberShow(company?.mainPhone);

  const formatPhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber) return "";

    return phoneNumber.replace(/\D/g, "");
  };

  const formattedmainPhone = formatPhoneNumber(company?.mainPhone || "");
  const formattedSecondPhone = formatPhoneNumber(company?.secondPhone || "");
  const formattedThirdPhone = formatPhoneNumber(company?.thirdPhone || "");

  return (
    <header className="max-md:fixed w-full bg-prisma-gray z-50">
      <div className="bg-prisma-blue py-3 px-4 max-md:hidden">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            <div className="flex gap-x-1 hover:brightness-75 text-[#FFFFFF]">
              <FaWhatsapp className="text-xl" />
              <Link
                href={`https://wa.me/55${formattedmainPhone}`}
                rel="noopener noreferrer"
                target="_blank"
                className="text-sm"
              >
                {formatPhoneNumberShow(company?.mainPhone)}
                {/* (43) 8481-7211 */}
              </Link>
            </div>
            {formattedSecondPhone.length > 0 && (
              <div className="flex gap-x-1 hover:brightness-75 text-[#FFFFFF]">
                <FaWhatsapp className="text-xl" />
                <Link
                  href={`https://wa.me/55${formattedSecondPhone}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-sm"
                >
                  {formatPhoneNumberShow(company?.secondPhone)}
                </Link>
              </div>
            )}
            {formattedThirdPhone.length > 0 && (
              <div className="flex gap-x-1 hover:brightness-75 text-[#FFFFFF]">
                <FaWhatsapp className="text-xl" />
                <Link
                  href={`https://wa.me/55${formattedThirdPhone}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-sm"
                >
                  {formatPhoneNumberShow(company?.thirdPhone)}
                </Link>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-4 max-md:flex-col max-md:gap-1">
            <div className="flex gap-x-1 hover:brightness-75 text-[#FFFFFF] max-md:justify-end">
              <IoMdMail className="text-xl" />
              <Link
                href={`mailto:${company?.mainEmail}`}
                rel="noopener noreferrer"
                target="_blank"
                className="text-sm"
              >
                {/* revestimentoprisma@gmail.com{" "} */}
                {company?.mainEmail}
              </Link>
            </div>
            {company?.secondEmail != "" && (
              <div className="flex gap-x-1 hover:brightness-75 text-[#FFFFFF] max-md:justify-end">
                <IoMdMail className="text-xl" />
                <Link
                  href={`mailto:${company?.secondEmail}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-sm"
                >
                  {company?.secondEmail}{" "}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="max-md:hidden">
        <div className="bg-prisma-gray py-5 px-4 shadownew">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between">
            <RedirectToHome
              PrismaLogo={PrismaLogo}
              widthNumber={200}
              heightNumber={50}
            />
            <nav className="px-8">
              <ul className="flex gap-x-8 max-lg:gap-x-5 text-prisma-blue font-semibold text-base">
                <li>
                  <Link
                    href="/"
                    className="hover:text-prisma-orange duration-100"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sobre"
                    className="hover:text-prisma-orange duration-100"
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#servicos"
                    className="hover:text-prisma-orange duration-100"
                  >
                    Serviços
                  </Link>
                </li>
                <li>
                  <Link
                    href="/produtos"
                    className="hover:text-prisma-orange duration-100"
                  >
                    Produtos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contato"
                    className="hover:text-prisma-orange duration-100"
                  >
                    Contato
                  </Link>
                </li>
              </ul>
            </nav>

            {session?.user ? (
              <div className="flex gap-x-6 items-center">
                <Link href="/dashboard">Dashboard</Link>
                <SignOutBtn />
              </div>
            ) : (
              <Link
                href={`https://wa.me/55${formattedmainPhone}`}
                rel="noopener noreferrer"
                target="_blank"
                className="bg-prisma-orange text-[#FFFFFF] text-center text-base px-6 py-4 hover:bg-prisma-orange-hover duration-100 max-lg:px-3 max-lg:py-2"
              >
                Fale Conosco
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between p-4 shadownew md:hidden">
        <Link href="/">
          <Image src={PrismaLogo} alt="Prisma" width={151} height={34} />
        </Link>
        <Sheet>
          <SheetTrigger>
            <Menu size={30} className="text-prisma-blue" />
          </SheetTrigger>
          <SheetContent>
            <ul className="h-3/5 flex flex-col justify-center items-center text-prisma-blue text-2xl gap-6">
              <li>
                <SheetTrigger asChild>
                  <Link
                    href="/"
                    className="hover:text-prisma-orange duration-100"
                  >
                    Home
                  </Link>
                </SheetTrigger>
              </li>
              <li>
                <SheetTrigger asChild>
                  <Link
                    href="/sobre"
                    className="hover:text-prisma-orange duration-100"
                  >
                    Sobre
                  </Link>
                </SheetTrigger>
              </li>
              <li>
                <SheetTrigger asChild>
                  <Link
                    href="/#servicos"
                    className="hover:text-prisma-orange duration-100"
                  >
                    Serviços
                  </Link>
                </SheetTrigger>
              </li>
              <li>
                <SheetTrigger asChild>
                  <Link
                    href="/produtos"
                    className="hover:text-prisma-orange duration-100"
                  >
                    Produtos
                  </Link>
                </SheetTrigger>
              </li>
              <li>
                <SheetTrigger asChild>
                  <Link
                    href="/#contato"
                    className="hover:text-prisma-orange duration-100"
                  >
                    Contato
                  </Link>
                </SheetTrigger>
              </li>
            </ul>
            <Link
              href={`https://wa.me/55${formattedmainPhone}`}
              rel="noopener noreferrer"
              target="_blank"
              className="bg-prisma-orange text-[#FFFFFF] text-center text-base px-6 py-4 hover:bg-prisma-orange-hover duration-100 m-auto block mb-12"
            >
              Fale Conosco
            </Link>
            <Separator className="mb-3" />
            <div className="flex flex-col gap-1 mb-3">
              <div className="flex text-prisma-blue">
                <FaWhatsapp className="text-xl" />
                <Link
                  href={`https://wa.me/55${formattedmainPhone}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-md"
                >
                  {formatPhoneNumberShow(company?.mainPhone)}
                  {/* (43) 8481-7211 */}
                </Link>
              </div>
              {formattedSecondPhone.length > 0 && (
                <div className="flex gap-x-1 hover:brightness-75 text-prisma-blue">
                  <FaWhatsapp className="text-xl" />
                  <Link
                    href={`https://wa.me/55${formattedSecondPhone}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-md"
                  >
                    {formatPhoneNumberShow(company?.secondPhone)}
                  </Link>
                </div>
              )}
              {formattedThirdPhone.length > 0 && (
                <div className="flex gap-x-1 hover:brightness-75 text-prisma-blue">
                  <FaWhatsapp className="text-xl" />
                  <Link
                    href={`https://wa.me/55${formattedThirdPhone}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-md"
                  >
                    {formatPhoneNumberShow(company?.thirdPhone)}
                  </Link>
                </div>
              )}
            </div>
            <Separator className="mb-3" />
            <div className="flex flex-col gap-1 mb-3">
              <div className="flex gap-x-1 hover:brightness-75 text-prisma-blue">
                <IoMdMail className="text-xl" />
                <Link
                  href={`mailto:${company?.mainEmail}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-md"
                >
                  {/* revestimentoprisma@gmail.com{" "} */}
                  {company?.mainEmail}
                </Link>
              </div>
              {company?.secondEmail != "" && (
                <div className="flex gap-x-1 hover:brightness-75 text-prisma-blue">
                  <IoMdMail className="text-xl" />
                  <Link
                    href={`mailto:${company?.secondEmail}`}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-md"
                  >
                    {company?.secondEmail}{" "}
                  </Link>
                </div>
              )}
            </div>
            <Separator className="mb-3" />
            <div className="flex gap-x-6 justify-center mt-12">
              <Link
                href="https://www.facebook.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaFacebookSquare className="text-3xl hover:text-prisma-orange-hover duration-100" />
              </Link>
              <Link
                href="https://www.instagram.com/revestimentoprisma/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaInstagram className="text-3xl hover:text-prisma-orange-hover duration-100" />
              </Link>
              <Link
                href="https://www.linkedin.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <FaLinkedin className="text-3xl hover:text-prisma-orange-hover duration-100" />
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
