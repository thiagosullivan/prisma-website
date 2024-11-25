"use client";

import { supabase } from "@/app/utils/supabaseClient";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "O título é obrigatório.",
  }),
  content: z.string().min(10, {
    message: "A descrição do serviço é obrigatório.",
  }),
  imgUrl: z.string().optional(),
  servImg: z
    .instanceof(File, { message: "A imagem é obrigatória." })
    .refine((file) => file.size > 0, { message: "A imagem é obrigatória." }),
});

interface AddServiceProps {
  fetchServices: () => void;
}

const ServiceForm: React.FC<AddServiceProps> = ({ fetchServices }) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      imgUrl: "",
      servImg: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const imageFile = values.servImg; // Campo com o arquivo
      let imageUrl = "";

      if (imageFile) {
        // Upload da imagem
        const { data, error } = await supabase.storage
          .from("prisma-imgs")
          .upload(`services/${Date.now()}-${imageFile.name}`, imageFile);

        if (error) {
          throw new Error("Erro ao fazer upload da imagem.");
        }

        // Obtenção da URL pública
        if (data && data.path) {
          console.log("Caminho do arquivo no Supabase:", data.path);

          const { data: publicData } = supabase.storage
            .from("prisma-imgs")
            .getPublicUrl(data.path);

          console.log("URL pública gerada:", publicData?.publicUrl);
          imageUrl = publicData?.publicUrl || "";
        }
      }
      console.log("ANTES DO FETCH");
      const response = await fetch("/api/service", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          content: values.content,
          imgUrl: imageUrl, // URL gerada
        }),
      });

      console.log("DEPOIS DO FETCH");
      if (response.ok) {
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Limpa o input de arquivo
        }
        console.log("Serviço salvo com sucesso!");
        fetchServices();
        toast.success("Serviço cadastrado com sucesso!");
        form.reset();
        setPreview(null); // Remove pré-visualização
      } else {
        throw new Error("Erro ao salvar serviço.");
      }
    } catch (error) {
      console.error("Erro durante o envio:", error);
      toast.error("Alguma coisa deu errado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={(e) => {
            console.log("Formulário enviado!");
            form.handleSubmit(onSubmit)(e);
          }}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do serviço</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Nome do serviço"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Adicione um nome para o serviço.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Descrição"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Adicione uma descrição para o serviço.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="servImg"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Imagem do serviço</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    disabled={loading}
                    onChange={(event) => {
                      const file = event.target.files?.[0]; // Obter o arquivo selecionado
                      if (file) {
                        const imageUrl = URL.createObjectURL(file); // Gerar URL de pré-visualização
                        setPreview(imageUrl); // Armazenar a URL no estado local
                      } else {
                        setPreview(null); // Remover pré-visualização se não houver arquivo
                      }
                      onChange(file); // Atualizar o valor do campo no formulário
                    }}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
                {/* Pré-visualização da Imagem */}
                {preview && (
                  <div className="mt-4">
                    <Image
                      src={preview}
                      alt="Pré-visualização"
                      className="max-w-xs rounded shadow-md"
                      width={300}
                      height={300}
                    />
                  </div>
                )}
              </FormItem>
            )}
          />
          <Button type="submit" className="min-w-[100px]" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Enviar "}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ServiceForm;
