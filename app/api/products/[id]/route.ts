import { products } from '@/app/utils/models/products';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Product, RequestParams, ProductUpdate } from '@/app/utils/types';

const filePath = path.join(process.cwd(), 'app/utils/models/products.ts');

export async function GET(
  req: Request,
  { params }: { params: RequestParams },
): Promise<NextResponse> {
  const { id } = params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ product }, { status: 200 });
}

export async function PUT(
  req: Request,
  { params }: { params: RequestParams },
): Promise<NextResponse> {
  const { id } = params;
  const { name, description, price, category, inStock }: ProductUpdate =
    await req.json();

  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  // Update only the fields that are provided
  products[index] = {
    ...products[index],
    name: name ?? products[index].name,
    description: description ?? products[index].description,
    price: price ?? products[index].price,
    category: category ?? products[index].category,
    inStock: inStock ?? products[index].inStock,
  };

  const updatedProductsJSON = JSON.stringify(products, null, 2);

  fs.writeFileSync(
    filePath,
    `export const products = ${updatedProductsJSON};`,
    'utf-8',
  );

  return NextResponse.json(
    { result: 'Product updated successfully' },
    { status: 200 },
  );
}

export async function DELETE(
  req: Request,
  { params }: { params: RequestParams },
): Promise<NextResponse> {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  products.splice(index, 1);

  const updatedProductsJSON = JSON.stringify(products, null, 2);

  fs.writeFileSync(
    filePath,
    `export const products = ${updatedProductsJSON};`,
    'utf-8',
  );

  return NextResponse.json(
    { result: 'Product deleted successfully' },
    { status: 200 },
  );
}
