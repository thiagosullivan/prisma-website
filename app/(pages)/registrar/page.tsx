import RegisterForm from "@/app/components/forms/registerForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Register = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-12 flex flex-col justify-center mainnew max-md:pt-40">
      <h1 className="text-prisma-blue text-center text-5xl font-semibold mb-8">
        Registrar
      </h1>
      <RegisterForm />
    </main>
  );
};

export default Register;
