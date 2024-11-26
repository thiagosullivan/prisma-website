import { supabase } from "@/app/utils/supabaseClient";
import prisma, { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("ENTROU NO REQ POST");
  try {
    const body = await req.json();
    const {
      mainPhone,
      secondPhone,
      ThirdPhone,
      mainEmail,
      secondEmail,
      address,
      facebookLink,
      instagramLink,
      linkedinLink,
      twitterLink,
      workinHoursOne,
      workinHoursTwo,
      workinHoursThree,
      companyStory,
      companyStoryImg,
    } = body;
    console.log(body, "BODY ON POST");

    const data = await db.company.create({
      data: {
        mainPhone: mainPhone,
        secondPhone: secondPhone,
        ThirdPhone: ThirdPhone,
        mainEmail: mainEmail,
        secondEmail: secondEmail,
        address: address,
        facebookLink: facebookLink,
        instagramLink: instagramLink,
        linkedinLink: linkedinLink,
        twitterLink: twitterLink,
        workinHoursOne: workinHoursOne,
        workinHoursTwo: workinHoursTwo,
        workinHoursThree: workinHoursThree,
        companyStory: companyStory,
        companyStoryImg: companyStoryImg,
      },
    });
    console.log(data, "DATA ON POST");

    return NextResponse.json(
      { data, message: "Company created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("CAIU NO CATCH", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

// return NextResponse.json({ message: "SUCESS" });
export async function GET() {
  try {
    // Buscando apenas o primeiro objeto
    const company = await prisma.company.findFirst(); // findFirst pega o primeiro item
    return NextResponse.json({ company });
  } catch (error) {
    console.error("Erro ao buscar empresas:", error);
    return NextResponse.json(
      { error: "Erro ao buscar empresas" },
      { status: 500 }
    );
  }
}
