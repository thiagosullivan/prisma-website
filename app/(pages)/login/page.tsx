"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "A senha é obrigatória")
    .min(6, "A senha precisa ter ao menos 6 caracteres"),
});

const Login = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (signInData?.error) {
      console.log(signInData.error);
      toast.error("Oops! Algo deu errado!");
    } else {
      toast.success("Login realizado com sucesso!");
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-12 flex flex-col justify-center mainnew max-md:pt-40">
      <h1 className="text-prisma-blue text-center text-5xl font-semibold mb-8">
        Login
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col mx-auto gap-3 max-w-[400px] w-full mb-8"
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-prisma-blue rounded-md overflow-hidden w-full p-2"
                      placeholder="email@examplo.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-prisma-blue rounded-md overflow-hidden w-full p-2"
                      type="password"
                      placeholder="Insira sua senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="bg-prisma-blue rounded-sm p-2 text-white hover:bg-prisma-orange transition"
            type="submit"
          >
            Sign in
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default Login;
