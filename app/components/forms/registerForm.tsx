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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const FormSchema = z
  .object({
    username: z.string().min(1, "O username é obrigatório").max(100),
    email: z.string().min(1, "O e-mail é obrigatório").email("E-mail inválido"),
    password: z
      .string()
      .min(1, "A senha é obrigatória")
      .min(6, "A senha precisa possuir ao menos 6 caracteres"),
    confirmPassword: z.string().min(1, "A confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não combinam",
  });

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      router.push("/login");
      toast.success("Usuário registrado com sucesso!");
      setLoading(false);
    } else {
      toast.error("Oops. Algo deu errado!");
      console.error("Falha ao registrar");
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col mx-auto gap-3 max-w-[400px] mb-8 relative p-6"
      >
        <div className="space-y-2 flex flex-col">
          {loading && (
            <div className="min-h-[420px] w-full flex justify-center items-center bg-black bg-opacity-50 absolute top-0 left-0 rounded-sm">
              <Loader2 className="animate-spin" />
            </div>
          )}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe"
                    {...field}
                    className="border border-prisma-blue rounded-md overflow-hidden w-full p-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    placeholder="exemplo@email.com"
                    {...field}
                    className="border border-prisma-blue rounded-md overflow-hidden w-full p-2"
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
              <FormItem className="w-full">
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Digite sua senha"
                    {...field}
                    className="border border-prisma-blue rounded-md overflow-hidden w-full p-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Confirme sua senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirme sua senha"
                    type="password"
                    {...field}
                    className="border border-prisma-blue rounded-md overflow-hidden w-full p-2"
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
          Registrar
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
