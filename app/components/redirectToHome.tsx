"use client";
import Image, { StaticImageData } from "next/image";
import { redirect, useRouter } from "next/navigation";
import React from "react";

interface RedirectProps {
  PrismaLogo: StaticImageData;
  widthNumber?: number;
  heightNumber?: number;
}

const RedirectToHome = ({
  PrismaLogo,
  widthNumber,
  heightNumber,
}: RedirectProps) => {
  const router = useRouter();
  function redirectToHomeFunction() {
    router.push("/");
    router.refresh();
  }

  return (
    <div onClick={redirectToHomeFunction} className="cursor-pointer">
      <Image
        src={PrismaLogo}
        alt="Prisma Logo"
        width={widthNumber}
        height={heightNumber}
      />
    </div>
  );
};

export default RedirectToHome;
