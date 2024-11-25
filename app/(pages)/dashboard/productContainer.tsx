"use client";

import ProductForm from "@/app/components/forms/productForm";
import React, { useEffect, useState } from "react";
import ProductsList from "./productsList";
import { Product } from "@prisma/client";

const ProductContainer = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/product");
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      } else {
        console.error("Erro ao buscar produtos");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products, "PRODS");

  return (
    <div>
      <ProductForm fetchProducts={fetchProducts} />
      <ProductsList
        products={products}
        loading={loading}
        setProducts={setProducts}
      />
    </div>
  );
};

export default ProductContainer;
