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
      thirdPhone,
      mainEmail,
      secondEmail,
      streetAddress,
      numberAddress,
      cityAddress,
      stateAddress,
      zipcodeAddress,
      googleMapsAddress,
      facebookLink,
      instagramLink,
      linkedinLink,
      twitterLink,
      workinHoursDayOne,
      workinHoursOpenOne,
      workinHoursCloseOne,
      workinHoursDayTwo,
      workinHoursOpenTwo,
      workinHoursCloseTwo,
      workinHoursDayThree,
      workinHoursCloseThree,
      companyStory,
      companyStoryImg,
    } = body;
    console.log(body, "BODY ON POST");

    const data = await db.company.create({
      data: {
        mainPhone: mainPhone,
        secondPhone: secondPhone,
        thirdPhone: thirdPhone,
        mainEmail: mainEmail,
        secondEmail: secondEmail,
        streetAddress: streetAddress,
        numberAddress: numberAddress,
        cityAddress: cityAddress,
        stateAddress: stateAddress,
        zipcodeAddress: zipcodeAddress,
        googleMapsAddress,
        facebookLink: facebookLink,
        instagramLink: instagramLink,
        linkedinLink: linkedinLink,
        twitterLink: twitterLink,
        workinHoursDayOne,
        workinHoursOpenOne,
        workinHoursCloseOne,
        workinHoursDayTwo,
        workinHoursOpenTwo,
        workinHoursCloseTwo,
        workinHoursDayThree,
        workinHoursCloseThree,
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

// export async function PUT(req: Request) {
//   return NextResponse.json({ message: "ENTROU NO PUT" });

//   try {
//     // Buscando apenas o primeiro objeto
//     // const updateUser = await prisma.company.update({
//     //   where: {
//     //     email: 'viola@prisma.io',
//     //   },
//     //   data: {
//     //     name: 'Viola the Magnificent',
//     //   },
//     // })
//     return NextResponse.json({ message: "ENTROU NO TRY" });
//   } catch (error) {
//     console.error("Erro ao buscar empresas:", error);
//     return NextResponse.json(
//       { error: "Erro ao buscar empresas" },
//       { status: 500 }
//     );
//   }
// }

export async function PUT(req: Request) {
  console.log("ENTROU NO REQ PUT");

  try {
    // Extraindo o id da query string
    const url = new URL(req.url);
    const companyId = url.searchParams.get("id"); // Obtendo o valor de "id" da URL

    if (!companyId) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const {
      mainPhone,
      secondPhone,
      thirdPhone,
      mainEmail,
      secondEmail,
      streetAddress,
      numberAddress,
      cityAddress,
      stateAddress,
      zipcodeAddress,
      googleMapsAddress,
      facebookLink,
      instagramLink,
      linkedinLink,
      twitterLink,
      workinHoursDayOne,
      workinHoursOpenOne,
      workinHoursCloseOne,
      workinHoursDayTwo,
      workinHoursOpenTwo,
      workinHoursCloseTwo,
      workinHoursDayThree,
      workinHoursCloseThree,
      companyStory,
      companyStoryImg,
    } = body;

    // Verificando se a empresa com o ID fornecido existe
    const existingCompany = await prisma.company.findUnique({
      where: { id: companyId }, // Usando o id como string
    });

    if (!existingCompany) {
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 }
      );
    }

    // Atualizando os dados da empresa
    const updatedCompany = await prisma.company.update({
      where: { id: companyId },
      data: {
        mainPhone: mainPhone,
        secondPhone: secondPhone,
        thirdPhone: thirdPhone,
        mainEmail: mainEmail,
        secondEmail: secondEmail,
        streetAddress: streetAddress,
        numberAddress: numberAddress,
        cityAddress: cityAddress,
        stateAddress: stateAddress,
        zipcodeAddress: zipcodeAddress,
        googleMapsAddress,
        facebookLink: facebookLink,
        instagramLink: instagramLink,
        linkedinLink: linkedinLink,
        twitterLink: twitterLink,
        workinHoursDayOne,
        workinHoursOpenOne,
        workinHoursCloseOne,
        workinHoursDayTwo,
        workinHoursOpenTwo,
        workinHoursCloseTwo,
        workinHoursDayThree,
        workinHoursCloseThree,
        companyStory: companyStory,
        companyStoryImg: companyStoryImg,
      },
    });

    console.log(updatedCompany, "UPDATED DATA");

    return NextResponse.json(
      { updatedCompany, message: "Company updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("CAIU NO CATCH", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
