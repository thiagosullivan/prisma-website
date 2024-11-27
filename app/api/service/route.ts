import { supabase } from "@/app/utils/supabaseClient";
import prisma, { db } from "@/lib/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  console.log(token, "TOKEN");

  if (!token) {
    console.log("NÃO AUTENTICADO");
    return NextResponse.json(
      { message: "You're a unauthorized user" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { title, content, imgUrl } = body;

    const data = await prisma.service.create({
      data: {
        title: title,
        content: content,
        imageUrl: imgUrl,
      },
    });

    return NextResponse.json(
      { data, message: "Service created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // return NextResponse.json({ message: "SUCESS" });
  try {
    const services = await db.service.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ services }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    return NextResponse.json(
      { error: "Erro ao buscar serviços" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID do serviço não fornecido." },
        { status: 400 }
      );
    }

    // Recupera o serviço para obter a URL da imagem antes de deletar
    const service = await db.service.findUnique({
      where: { id },
    });

    if (!service) {
      return NextResponse.json(
        { message: "Serviço não encontrado." },
        { status: 404 }
      );
    }

    // Extrai o caminho da imagem a partir da URL pública
    const imagePath = service.imageUrl
      ? service.imageUrl.replace(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/prisma-imgs/`,
          ""
        )
      : null;

    // Deleta o arquivo do Supabase Storage (se existir)
    if (imagePath) {
      const { error: storageError } = await supabase.storage
        .from("prisma-imgs")
        .remove([imagePath]);

      if (storageError) {
        console.error("Erro ao deletar imagem do storage:", storageError);
        return NextResponse.json(
          { message: "Erro ao deletar imagem do storage." },
          { status: 500 }
        );
      }
    }

    // Deleta o serviço do banco de dados
    await db.service.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Serviço deletado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar serviço:", error);
    return NextResponse.json(
      { message: "Erro ao deletar serviço." },
      { status: 500 }
    );
  }
}
