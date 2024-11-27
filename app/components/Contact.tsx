import { db } from "@/lib/db";
import Link from "next/link";
import { BsClockFill } from "react-icons/bs";
import { IoIosPin, IoMdMail } from "react-icons/io";

const Contact = async () => {
  const company = await db.company.findFirst();
  const mainPhone = company?.mainPhone;
  const onlyNumbers = mainPhone?.replace(/\D/g, "");

  return (
    <section className="bg-prisma-blue mt-24" id="contato">
      <div className="max-w-screen-xl mx-auto px-4 py-24 flex justify-around max-md:py-12 max-md:flex-col max-md:gap-y-12">
        <div className="flex flex-col items-center gap-y-2 text-center">
          <IoIosPin className="text-8xl max-md:text-4xl text-[#AAAAAA]" />
          <div className="flex flex-col gap-y-2">
            <h4 className="font-semibold text-2xl max-md:text-xl text-[#FFFFFF]">
              Nossa Localização
            </h4>
            <p className="text-[#AAAAAA] max-w-[200px] mx-auto">
              {/* {company?.address} */}
              {company?.streetAddress}, {company?.numberAddress}, <br />
              {company?.cityAddress}, {company?.stateAddress} -{" "}
              {company?.zipcodeAddress}
            </p>
            <Link
              className="text-prisma-orange hover:text-prisma-orange-hover"
              href={`${company?.googleMapsAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Direção
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-2 text-center">
          <BsClockFill className="text-8xl max-md:text-4xl text-[#AAAAAA]" />
          <div className="flex flex-col gap-y-2">
            <h4 className="font-semibold text-2xl max-md:text-xl text-[#FFFFFF]">
              Horário de Atendimento
            </h4>
            <div className="text-[#AAAAAA]">
              <p>
                {company?.workinHoursDayOne} ({company?.workinHoursOpenOne}{" "}
                <span> - </span>
                {company?.workinHoursCloseOne})
              </p>
              <p>
                {company?.workinHoursDayTwo} ({company?.workinHoursOpenTwo}{" "}
                <span> - </span>
                {company?.workinHoursCloseTwo})
              </p>
              <p>
                {company?.workinHoursDayThree}{" "}
                <span className="text-prisma-orange">
                  ({company?.workinHoursCloseThree})
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-2 text-center">
          <IoMdMail className="text-8xl max-md:text-4xl text-[#AAAAAA]" />
          <div className="flex flex-col gap-y-2">
            <h4 className="font-semibold text-2xl max-md:text-xl text-[#FFFFFF]">
              Entre em Contato
            </h4>
            <Link
              className="text-[#AAAAAA]"
              href={`mailto:${company?.mainEmail}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {company?.mainEmail}
            </Link>
            <Link
              className="text-[#AAAAAA]"
              href={`https://wa.me/55${onlyNumbers}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {company?.mainPhone}
              {/* (43) 8481-7211 */}
            </Link>
            <Link
              href={`https://wa.me/55${onlyNumbers}`}
              className="text-prisma-orange hover:text-prisma-orange-hover"
            >
              Contate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
