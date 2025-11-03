"use client";

interface ProductProps {
  id: string;
}

export default function Product({ id }: ProductProps) {
  return (
    <div>
      <h1>Товар №{id}</h1>
      <p>Описание товара с ID {id}</p>
    </div>
  );
}
