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
import imageCompression from "browser-image-compression";

const formSchema = z.object({
  workerName: z.string().min(1, {
    message: "O título é obrigatório.",
  }),
  workerRole: z.string().min(1, {
    message: "O título é obrigatório.",
  }),
  imgUrl: z.string().optional(),
  workerImg: z
    .instanceof(File, { message: "A imagem é obrigatória." })
    .refine((file) => file.size > 0, { message: "A imagem é obrigatória." }),
  // workerImg: z.instanceof(File).refine((file) => file.size < 700000000, {
  //   message: "Sua imagem deve ter menos de 7MB.",
  // }),
});

interface AddTeamProps {
  fetchTeam: () => void;
}

const TeamForm: React.FC<AddTeamProps> = ({ fetchTeam }) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workerName: "",
      workerRole: "",
      imgUrl: "",
      workerImg: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log(values, "VALUES");
    try {
      const imageFile = values.workerImg; // Campo com o arquivo
      let imageUrl = "";

      if (imageFile) {
        // Configurações para compressão
        const options = {
          maxSizeMB: 2, // Tamanho máximo em MB
          maxWidthOrHeight: 1024, // Largura ou altura máxima
          useWebWorker: true, // Usa WebWorker para melhorar a performance
        };

        // Comprimir a imagem
        const compressedImage = await imageCompression(imageFile, options);
        console.log("Imagem comprimida:", compressedImage);

        // Upload da imagem
        const { data, error } = await supabase.storage
          .from("prisma-imgs")
          .upload(
            `team/${Date.now()}-${compressedImage.name}`,
            compressedImage
          );

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

      const response = await fetch("/api/team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          workerName: values.workerName,
          workerRole: values.workerRole,
          workerImg: imageUrl, // URL gerada
        }),
      });

      if (response.ok) {
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Limpa o input de arquivo
        }
        console.log("Trabalhador salvo com sucesso!");
        fetchTeam();
        toast.success("Trabalhador cadastrado com sucesso!");
        form.reset();
        setPreview(null); // Remove pré-visualização
      } else {
        throw new Error("Erro ao salvar trabalhador.");
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
            name="workerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do funcionário</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="João da Silva"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Adicione um nome para o funcionário.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workerRole"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Função</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder="Gerente" {...field} />
                </FormControl>
                <FormDescription>
                  Adicione uma função para o funcionário.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workerImg"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Imagem do Funcionário</FormLabel>
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

export default TeamForm;
