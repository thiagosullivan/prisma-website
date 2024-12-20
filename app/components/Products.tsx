import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

const Products = async () => {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <section className="max-w-screen-xl mx-auto px-4 text-prisma-blue mt-10">
      <div>
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-center text-sm text-prisma-orange max-lg:text-2xl">
            Nossos Produtos
          </h2>
          <p className="text-center text-5xl mt-5 max-lg:text-3xl mx-lg:mb-6">
            Oferecemos uma
            <span className="text-prisma-orange font-semibold">
              {" "}
              variedade{" "}
            </span>
            de produtos <br /> de alta
            <span className="text-prisma-orange font-semibold">
              {" "}
              qualidade{" "}
            </span>
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-x-3 gap-y-8 justify-items-center :grid-cols-1">
          {products.slice(0, 4).map((product) => {
            return (
              <div
                key={product.id}
                className="flex flex-col items-center max-w-[400px] lg:max-w-[600px] w-full gap-x-7 max-sm:flex-col max-sm:mt-6"
              >
                <div className="h-[300px] w-full relative max-sm:mb-6">
                  <Image
                    src={product.imageUrl}
                    alt="Produtos"
                    fill
                    className="h-[250px] w-full rounded-md border border-gray-400"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="w-full">
                  <h4 className="font-semibold mt-4 text-2xl text-prisma-blue">
                    {product.title}
                  </h4>
                  <p className="mt-5 text-prisma-blue text-justify">
                    {product.content}
                  </p>
                  {/* <p className="mt-5 text-prisma-blue">
                    Waters make fish every without firmament saw had. Morning
                    air subdue. Waters make fish every without firmament saw
                    had. Morning air subdue. Waters make fish every without
                    firmament saw had. Morning air subdue.
                  </p> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Link
        href="/produtos"
        className="bg-prisma-orange text-center mt-14 max-w-[200px] w-full flex justify-center m-auto p-4 text-[#FFFFFF] hover:bg-prisma-orange-hover"
      >
        Confira mais produtos
      </Link>
    </section>
  );
};

export default Products;
