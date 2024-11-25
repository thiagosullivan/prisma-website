import Image from "next/image";
import Link from "next/link";

const data = [
    {
        'img': 'https://cdn.leroymerlin.com.br/products/revestimento_de_parede_galicia_cinza_34x50cm_artens_89881050_6201_600x600.jpg',
        'title': 'Industrial construction',
        'description': 'Waters make fish every without firmament saw had. Morning air subdue. Waters make fish every without firmament saw had. Morning air subdue. Waters make fish every without firmament saw had. Morning air subdue.'
    },
    {
        'img': 'https://cdn.leroymerlin.com.br/products/revestimento_de_parede_galicia_cinza_34x50cm_artens_89881050_6201_600x600.jpg',
        'title': 'Industrial construction Industrial construction',
        'description': 'Waters make fish every without firmament saw had. Morning air subdue. Waters make fish every without firmament saw had. Morning air subdue.'
    },
    {
        'img': 'https://cdn.leroymerlin.com.br/products/revestimento_de_parede_galicia_cinza_34x50cm_artens_89881050_6201_600x600.jpg',
        'title': 'Industrial construction',
        'description': 'Waters make fish every without firmament saw had. Morning air subdue. Waters make fish every without firmament saw had. Morning air subdue. Waters make fish every without firmament saw had. Morning air subdue. Waters make fish every without firmament saw had. Morning air subdue. Waters make fish every without firmament saw had. Morning air subdue. Waters make fish every without firmament saw had. Morning air subdue.'
    },
    {
        'img': 'https://cdn.leroymerlin.com.br/products/revestimento_de_parede_galicia_cinza_34x50cm_artens_89881050_6201_600x600.jpg',
        'title': 'Industrial',
        'description': 'Waters make fish every without firmament saw had. Morning air subdue. Waters make fish every without firmament saw had. Morning air subdue. Waters make fish every without firmament saw had. Morning air subdue.'
    },
]

const Produtos = () => {
    return (
        <main className="max-w-screen-xl mx-auto px-4 py-12 flex flex-col items-center mainnew mb-10">
            <div className="mt-24">
                <h1 className="text-prisma-blue text-center text-5xl font-semibold mb-8">
                    Os produtos da <span className="text-prisma-orange">Prisma</span>
                </h1>
                <p className="text-prisma-blue text-lg text-center">
                    A nossa lista de produtos de alta qualidade que oferecemos para você!
                </p>

                <div className="grid grid-cols-2 gap-6 mt-14 max-sm:grid-cols-1">
                    {data.map((product, index) => {
                        return (
                            <div key={index} className="border border-prisma-blue rounded-md overflow-hidden flex items-center p-4 max-lg:flex-col">
                                <div className="h-[260px] w-full relative mr-5 max-lg:h-[200px] max-lg:mr-0 max-lg:mb-5 max-sm:w-[250px]">
                                    <Image
                                        src={product.img}
                                        alt={product.title}
                                        fill
                                        className="h-[250px] max-lg:h-[200px] w-full rounded-md"
                                        style={{
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col border-l border-prisma-blue pl-6 w-11/12 max-lg:w-full max-lg:border-l-0 max-lg:border-t max-lg:pt-5 max-lg:pl-0">
                                    <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                                    <p className="text-sm text-justify mb-8">{product.description}</p>
                                    <Link href="https://wa.me/554384817211" rel="noopener noreferrer" target="_blank" className="bg-prisma-orange m-auto text-[#FFFFFF] px-6 py-3 hover:bg-prisma-orange-hover inline-block max-lg:mt-auto">Compre Agora</Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    );
}
 
export default Produtos;