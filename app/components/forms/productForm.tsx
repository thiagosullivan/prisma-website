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
    message: "A descrição do produto é obrigatória.",
  }),
  imgUrl: z.string().optional(),
  prodImg: z.any(),
  // prodImg: z.instanceof(File).refine((file) => file.size < 700000000, {
  //   message: "Sua imagem deve ter menos de 7MB.",
  // }),
});

interface AddProductProps {
  fetchProducts: () => void;
}

const ProductForm: React.FC<AddProductProps> = ({ fetchProducts }) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      imgUrl: "",
      prodImg: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const imageFile = values.prodImg; // Campo com o arquivo
      let imageUrl = "";

      if (imageFile) {
        // Upload da imagem
        const { data, error } = await supabase.storage
          .from("prisma-imgs")
          .upload(`products/${Date.now()}-${imageFile.name}`, imageFile);

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

      const response = await fetch("/api/product", {
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

      if (response.ok) {
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Limpa o input de arquivo
        }
        console.log("Produto salvo com sucesso!");
        fetchProducts();
        toast.success("Produto cadastrado com sucesso!");
        form.reset();
        setPreview(null); // Remove pré-visualização
      } else {
        throw new Error("Erro ao salvar produto.");
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
                <FormLabel>Nome do produto</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Nome do produto"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Adicione um nome para o produto.
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
                  Adicione uma descrição para o produto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="prodImg"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Imagem do Produto</FormLabel>
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

export default ProductForm;
