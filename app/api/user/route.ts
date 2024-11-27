import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod";

const userSchema = z.object({
  username: z.string().min(1, "O username é obrigatório").max(100),
  email: z.string().min(1, "O e-mail é obrigatório").email("E-mail inválido"),
  password: z
    .string()
    .min(1, "A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);

    const existingUserByEmail = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists!" },
        { status: 409 }
      );
    }

    const existingUserByUsername = await db.user.findUnique({
      where: {
        username: username,
      },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "User with this username already exists!" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
    console.log(error);
  }
}
