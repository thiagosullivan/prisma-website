import prisma, { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, imgUrl } = body;

    const data = await prisma.product.create({
      data: {
        title: title,
        content: content,
        imageUrl: imgUrl,
      },
    });

    return NextResponse.json(
      { data, message: "Product created successfully" },
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
    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
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
        { message: "ID do produto não fornecido." },
        { status: 400 }
      );
    }

    await db.product.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Produto deletado com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao deletar produto:", error);
    return NextResponse.json(
      { message: "Erro ao deletar produto." },
      { status: 500 }
    );
  }
}
