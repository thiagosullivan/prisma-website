import { supabase } from "@/app/utils/supabaseClient";
import { db } from "@/lib/db";
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
    console.log(body, "BODY");
    const { workerName, workerRole, workerImg } = body;

    const data = await db.team.create({
      data: {
        workerName: workerName,
        workerRole: workerRole,
        workerImg: workerImg,
      },
    });

    return NextResponse.json(
      { data, message: "Team created successfully" },
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
    const teamMembers = await db.team.findMany();
    return NextResponse.json({ teamMembers }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar funcionários:", error);
    return NextResponse.json(
      { error: "Erro ao buscar funcionários" },
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
        { message: "ID do funcionário não fornecido." },
        { status: 400 }
      );
    }

    // Recupera o funcionário para obter a URL da imagem antes de deletar
    const team = await db.team.findUnique({
      where: { id },
    });

    if (!team) {
      return NextResponse.json(
        { message: "Funcionário não encontrado." },
        { status: 404 }
      );
    }

    // Extrai o caminho da imagem a partir da URL pública
    const imagePath = team.workerImg
      ? team.workerImg.replace(
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

    // Deleta o funcionário do banco de dados
    await db.team.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Funcionário deletado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar funcionário:", error);
    return NextResponse.json(
      { message: "Erro ao deletar funcionário." },
      { status: 500 }
    );
  }
}
