"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const SignOutBtn = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: "/",
        })
      }
    >
      Sair
    </Button>
  );
};

export default SignOutBtn;
