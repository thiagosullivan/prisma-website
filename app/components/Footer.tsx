import { db } from "@/lib/db";
import FooterImg from "@/public/prisma-logo-small.png";
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import RedirectToHome from "./redirectToHome";

const Footer = async () => {
  const company = await db.company.findFirst();

  // const [nome, setNome] = useState("");
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  // const [message, setMessage] = useState("");

  // async function handleSubmit(event: any) {
  //   event.preventDefault();

  //   if (!nome || !email || !phone || !message) {
  //     toast.error("Preencha todos os campos para enviar sua mensagem!");
  //     toast('Preencha todos os campos para enviar sua mensagem!', {
  //       style: {
  //         background: theme.error,
  //         color: theme.white
  //       }
  //     });
  //     console.log("CAMPOS VAZIOS");
  //     return;
  //   }

  //   const formData = new FormData(event.target);

  //   const response = await fetch('/api/contact', {
  //       method: 'post',
  //       body: formData,
  //      });

  //   console.log(formData);
  // }

  const currentTime = new Date();
  const year = currentTime.getFullYear();

  return (
    <footer className="shadownew">
      <div className="max-w-screen-xl mx-auto px-4 py-14 flex justify-between max-md:flex-col max-md:items-center max-md:gap-y-10">
        <div className="max-w-[300px] max-lg:max-w-[250px]">
          <RedirectToHome
            PrismaLogo={FooterImg}
            widthNumber={215}
            heightNumber={50}
          />
          {/* <Link href="/">
            <Image src={FooterImg} alt="Prisma Logo" width={215} height={50} />
          </Link> */}
          <p className="text-prisma-blue text-xs mt-5 text-justify">
            Prisma, excelência em acessórios plásticos para construção,
            destaca-se pelos Niveladores de Piso que unem qualidade, rapidez e
            confiança.
          </p>

          <div className="mt-16 flex gap-x-5 max-md:justify-center">
            <Link
              href={`${company?.facebookLink}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaFacebookSquare className="text-3xl hover:text-prisma-orange-hover duration-100" />
            </Link>
            <Link
              // href="https://www.instagram.com/revestimentoprisma/"
              href={`${company?.instagramLink}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaInstagram className="text-3xl hover:text-prisma-orange-hover duration-100" />
            </Link>
            <Link
              // href="https://www.linkedin.com/"
              href={`${company?.linkedinLink}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaLinkedin className="text-3xl hover:text-prisma-orange-hover duration-100" />
            </Link>
            <Link
              // href="https://www.linkedin.com/"
              href={`${company?.twitterLink}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <BsTwitterX className="text-3xl hover:text-prisma-orange-hover duration-100" />
            </Link>
          </div>
        </div>
        <nav className="text-prisma-blue">
          <p className="text-xl font-bold">Site</p>
          <ul className="mt-4 font-light flex flex-col gap-y-3">
            <li>
              <Link
                className="hover:text-prisma-orange-hover duration-100"
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-prisma-orange-hover duration-100"
                href="/sobre"
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-prisma-orange-hover duration-100"
                href="/#servicos"
              >
                Serviços
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-prisma-orange-hover duration-100"
                href="/#time"
              >
                Time
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-prisma-orange-hover duration-100"
                href="/produtos"
              >
                Produtos
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-prisma-orange-hover duration-100"
                href="/#contato"
              >
                Contato
              </Link>
            </li>
          </ul>
        </nav>
        <div className="max-w-[300px] w-full max-lg:max-w-[250px] max-md:max-w-[300px] max-md:text-center">
          <p className="text-xl font-bold">Contato</p>
          <form className="">
            <div>
              <input
                className="border-prisma-blue border mt-2 w-full text-sm py-1 px-3 outline-none text-prisma-blue"
                placeholder="Nome"
                // onChange={({ target }) => setNome(target.value)}
                // value={nome}
              />
            </div>
            <div>
              <input
                className="border-prisma-blue border mt-2 w-full text-sm py-1 px-3 outline-none text-prisma-blue"
                placeholder="E-mail"
                // onChange={({ target }) => setEmail(target.value)}
                // value={email}
              />
            </div>
            <div>
              <input
                className="border-prisma-blue border mt-2 w-full text-sm py-1 px-3 outline-none text-prisma-blue"
                placeholder="Telefone"
                // onChange={({ target }) => setPhone(target.value)}
                // value={phone}
              />
            </div>
            <div>
              <textarea
                className="border-prisma-blue border mt-2 w-full text-sm py-1 px-3 outline-none text-prisma-blue resize-none h-36"
                placeholder="Mensagem"
                // onChange={({ target }) => setMessage(target.value)}
                // value={message}
              />
            </div>
            <button
              className="bg-prisma-blue text-[#FFFFFF] px-3 py-1 hover:bg-prisma-orange-hover duration-100"
              type="submit"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
      <div className="bg-prisma-blue p-4">
        <p className="text-[#AAAAAA] text-xs text-center">
          Desenvolvido por
          <Link
            href="https://thiagosullivanportfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-prisma-orange"
          >
            <span> Thiago Sullivan </span>
          </Link>
          e
          <Link
            href="https://thiagosullivanportfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-prisma-orange"
          >
            <span> ATS Web Solutions </span>
          </Link>
          | Copyright ©{year} Todos os Direitos Reservados |
          <span className="text-prisma-orange uppercase">
            {" "}
            Prisma Revestimento
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
