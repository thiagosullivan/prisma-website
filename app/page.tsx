import Image from "next/image";
import PrismaLogo from '@/public/prisma-logo-2.jpg';

export default function Home() {
  return (
    <main className="bg-[#F3F5F7] h-svh flex flex-col items-center justify-center">
      <h1 className="text-[#031A36] font-bold text-4xl mt-10">Em Breve...</h1>
      <Image src={PrismaLogo} alt="Prisma Logo" width={1000} height={1000} />
    </main>
  );
}
