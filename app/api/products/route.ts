import { products } from '@/app/utils/models/products';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Product, ProductUpdate } from '@/app/utils/types';

const filePath = path.join(process.cwd(), 'app/utils/models/products.ts');

// Retrieve all products
export function GET(): NextResponse {
  const data = products;
  return NextResponse.json({ data }, { status: 200 });
}

// Create product
export async function POST(req: Request): Promise<NextResponse> {
  const { name, description, price, category, inStock }: ProductUpdate =
    await req.json();

  if (!name || !price || !category || typeof inStock !== 'boolean') {
    return NextResponse.json(
      { Result: 'Missing some fields' },
      { status: 400 },
    );
  }

  const ids = products.map((product) => Number(product.id));
  const nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

  const newProduct: Product = {
    id: String(nextId),
    name,
    description: description || '',
    price,
    category,
    inStock,
  };

  products.push(newProduct);

  const updatedProductsJSON = JSON.stringify(products, null, 2);
  fs.writeFileSync(
    filePath,
    `export const products = ${updatedProductsJSON};`,
    'utf-8',
  );

  return NextResponse.json(
    { Result: 'Product added successfully' },
    { status: 201 },
  );
}
