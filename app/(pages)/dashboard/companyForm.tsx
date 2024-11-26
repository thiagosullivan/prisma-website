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
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import InputMask from "react-input-mask";

const formSchema = z.object({
  mainPhone: z.string().min(1, {
    message: "O telefone é obrigatório.",
  }),
  secondPhone: z.string().optional(),
  thirdPhone: z.string().optional(),
  mainEmail: z
    .string()
    .min(1, {
      message: "O telefone é obrigatório.",
    })
    .toLowerCase(),
  secondEmail: z.string().toLowerCase().optional(),
  street: z.string().min(1, {
    message: "O endereço é obrigatório.",
  }),
  streetNumber: z.string().min(1, {
    message: "O endereço é obrigatório.",
  }),
  city: z.string().min(1, {
    message: "O endereço é obrigatório.",
  }),
  state: z.string().max(2, {
    message: "Inserir apenas as siglas do estado.",
  }),
  zipcode: z.string().min(1, {
    message: "O endereço é obrigatório.",
  }),
  facebookLink: z.string().optional(),
  instagramLink: z.string().optional(),
  linkedinLink: z.string().optional(),
  twitterLink: z.string().optional(),
  workinHourDayOne: z.string().min(1, {
    message: "O dia é obrigatório.",
  }),
  workinHourOpenOne: z.string().min(1, {
    message: "O horário de abertura é obrigatório.",
  }),
  workinHourCloseOne: z.string().min(1, {
    message: "O de fechamento é obrigatório.",
  }),
  workinHourDayTwo: z.string().optional(),
  workinHourOpenTwo: z.string().optional(),
  workinHourCloseTwo: z.string().optional(),
  workinHourDayThree: z.string().optional(),
  workinHourCloseThree: z.string().optional(),
  companyStory: z.string().min(1, {
    message: "O texto é obrigatório.",
  }),
  imgUrl: z.string().optional(),
  companyImg: z
    .instanceof(File, { message: "A imagem é obrigatória." })
    .refine((file) => file.size > 0, { message: "A imagem é obrigatória." }),
  // prodImg: z.instanceof(File).refine((file) => file.size < 700000000, {
  //   message: "Sua imagem deve ter menos de 7MB.",
  // }),
});

interface AddCompanyProps {
  fetchCompany: () => void;
}

const CompanyForm: React.FC<AddCompanyProps> = ({ fetchCompany }) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mainPhone: "",
      secondPhone: "",
      thirdPhone: "",
      mainEmail: "",
      secondEmail: "",
      street: "",
      streetNumber: "",
      city: "",
      state: "",
      zipcode: "",
      facebookLink: "",
      instagramLink: "",
      linkedinLink: "",
      twitterLink: "",
      workinHourDayOne: "",
      workinHourOpenOne: "",
      workinHourCloseOne: "",
      workinHourDayTwo: "",
      workinHourOpenTwo: "",
      workinHourCloseTwo: "",
      companyStory: "",
      imgUrl: "",
      companyImg: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    console.log(values, "VALUES");

    const address = `${values.street}, ${values.streetNumber}, ${values.city} - ${values.state}, ${values.zipcode}`;
    const workinHoursOne = `${values.workinHourDayOne} (${values.workinHourOpenOne} - ${values.workinHourCloseOne})`;
    const workinHoursTwo = `${values.workinHourDayTwo} (${values.workinHourOpenTwo} - ${values.workinHourCloseTwo})`;
    const workinHoursThree = `${values.workinHourDayThree} (${values.workinHourCloseThree})`;

    try {
      const imageFile = values.companyImg; // Campo com o arquivo
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
            `company/${Date.now()}-${compressedImage.name}`,
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

      console.log(imageUrl, "IMAGE URL");

      const response = await fetch("/api/company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mainPhone: values.mainPhone,
          secondPhone: values.secondPhone,
          ThirdPhone: values.thirdPhone,
          mainEmail: values.mainEmail,
          secondEmail: values.secondEmail,
          address: address,
          facebookLink: values.facebookLink,
          instagramLink: values.instagramLink,
          linkedinLink: values.linkedinLink,
          twitterLink: values.twitterLink,
          workinHoursOne: workinHoursOne,
          workinHoursTwo: workinHoursTwo,
          workinHoursThree: workinHoursThree,
          companyStory: values.companyStory,
          companyStoryImg: imageUrl, // URL gerada
        }),
      });

      if (response.ok) {
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Limpa o input de arquivo
        }
        console.log("Dados salvos com sucesso!");
        // fetchCompany();
        toast.success("Dados salvos com sucesso!");
        form.reset();
        setPreview(null); // Remove pré-visualização
      } else {
        throw new Error("Erro ao salvar dados da empresa.");
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
          className="space-y-8 mt-10"
        >
          <Separator />
          <div className="">
            <h3 className="text-2xl text-prisma-orange">Telefones</h3>
            <div className="grid grid-cols-3 gap-3">
              <FormField
                control={form.control}
                name="mainPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone principal</FormLabel>
                    <FormControl>
                      <InputMask
                        {...field}
                        mask="(99) 99999-9999"
                        disabled={loading}
                      >
                        {(inputProps: any) => (
                          <Input
                            {...inputProps}
                            placeholder="(99) 99999-9999"
                          />
                        )}
                      </InputMask>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Segundo telefone</FormLabel>
                    <FormControl>
                      <InputMask
                        {...field}
                        mask="(99) 99999-9999"
                        disabled={loading}
                      >
                        {(inputProps: any) => (
                          <Input
                            {...inputProps}
                            placeholder="(99) 99999-9999"
                          />
                        )}
                      </InputMask>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thirdPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Terceiro telefone</FormLabel>
                    <FormControl>
                      <InputMask
                        {...field}
                        mask="(99) 99999-9999"
                        disabled={loading}
                      >
                        {(inputProps: any) => (
                          <Input
                            {...inputProps}
                            placeholder="(99) 99999-9999"
                          />
                        )}
                      </InputMask>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Separator />
          <h3 className="text-2xl text-prisma-orange">E-mails</h3>
          <div className="grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="mainEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail principal</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="exemplo@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Segundo e-mail</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="exemplo@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <h3 className="text-2xl text-prisma-orange">Endereço</h3>
          <div className="grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Rua" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="streetNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Número" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  {/* <FormControl>
                    <Input disabled={loading} placeholder="Estado" {...field} />
                  </FormControl> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecionar o estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AC">AC</SelectItem>
                      <SelectItem value="AL">AL</SelectItem>
                      <SelectItem value="AP">AP</SelectItem>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="BA">BA</SelectItem>
                      <SelectItem value="CE">CE</SelectItem>
                      <SelectItem value="DF">DF</SelectItem>
                      <SelectItem value="ES">ES</SelectItem>
                      <SelectItem value="GO">GO</SelectItem>
                      <SelectItem value="MA">MA</SelectItem>
                      <SelectItem value="MT">MT</SelectItem>
                      <SelectItem value="MS">MS</SelectItem>
                      <SelectItem value="MG">MG</SelectItem>
                      <SelectItem value="PA">PA</SelectItem>
                      <SelectItem value="PB">PB</SelectItem>
                      <SelectItem value="PR">PR</SelectItem>
                      <SelectItem value="PE">PE</SelectItem>
                      <SelectItem value="PI">PI</SelectItem>
                      <SelectItem value="RR">RR</SelectItem>
                      <SelectItem value="RO">RO</SelectItem>
                      <SelectItem value="RJ">RJ</SelectItem>
                      <SelectItem value="RN">RN</SelectItem>
                      <SelectItem value="RS">RS</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      <SelectItem value="SP">SP</SelectItem>
                      <SelectItem value="SE">SE</SelectItem>
                      <SelectItem value="TO">TO</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <InputMask {...field} mask="99999-999" disabled={loading}>
                      {(inputProps: any) => (
                        <Input {...inputProps} placeholder="99999-999" />
                      )}
                    </InputMask>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <h3 className="text-2xl text-prisma-orange">Mídias Sociais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <FormField
              control={form.control}
              name="facebookLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Insira o link do seu Facebook (opcional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagramLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Insira o link do seu Instagram (opcional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedinLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Linkedin</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Insira o link do seu Linkedin (opcional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitterLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Insira o link do seu Twitter (opcional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <h3 className="text-2xl text-prisma-orange">
            Horário de funcionamento
          </h3>
          <p>Opção 1:</p>
          <div className="grid grid-cols-3 gap-3 justify-self-start mt-3">
            <FormField
              control={form.control}
              name="workinHourDayOne"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dia</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecionar dia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Seg-Qui">Seg-Qui</SelectItem>
                      <SelectItem value="Seg-Sex">Seg-Sex</SelectItem>
                      <SelectItem value="Seg-Sab">Seg-Sab</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workinHourOpenOne"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horário de Abertura</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Horário de Abertura"
                      {...field}
                      type="time"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workinHourCloseOne"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horário de fechamento</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Horário de fechamento"
                      {...field}
                      type="time"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p>Opção 2:</p>
          <div className="grid grid-cols-3 gap-3 justify-self-start mt-3">
            <FormField
              control={form.control}
              name="workinHourDayTwo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dia</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecionar dia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Sexta">Sexta</SelectItem>
                      <SelectItem value="Sábado">Sábado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workinHourOpenTwo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horário de Abertura</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Horário de Abertura"
                      {...field}
                      type="time"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workinHourCloseTwo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horário de fechamento</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Horário de fechamento"
                      {...field}
                      type="time"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p>Opção 3:</p>
          <div className="grid grid-cols-3 gap-3 justify-self-start mt-3">
            <FormField
              control={form.control}
              name="workinHourDayThree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dia</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecionar dia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Sab-Dom">Sab-Dom</SelectItem>
                      <SelectItem value="Dom">Dom</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="workinHourCloseThree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horário de Abertura</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecionar dia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="fechado">Fechado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <h3 className="text-2xl text-prisma-orange">
            Informações da empresa
          </h3>
          <div>
            <FormField
              control={form.control}
              name="companyStory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>História da Prisma</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="História da Prisma"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="companyImg"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Imagem da Empresa</FormLabel>
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

export default CompanyForm;
