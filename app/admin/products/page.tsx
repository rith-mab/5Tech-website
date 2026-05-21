import { AdminProductList } from "@/components/admin-product-list";
import { AdminProductForm } from "@/components/admin-product-form";
import { getCategories, getProducts } from "@/lib/products";

export default async function AdminProductsPage({
  searchParams
}: Readonly<{
  searchParams: Promise<{ id?: string }>;
}>) {
  const params = await searchParams;
  const { id } = params;
  const [productList, categoryList] = await Promise.all([getProducts(), getCategories()]);
  const productToEdit = id ? productList.find((p) => p.id === id) : undefined;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {productToEdit ? `Edit Product: ${productToEdit.name}` : "Manage Products"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {productToEdit ? "Modify product details and save changes." : "Add, update, or delete products."}
        </p>
      </div>
      
      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <AdminProductForm
          product={productToEdit}
          categories={categoryList.map((c) => ({ id: c.id, name: c.name }))}
        />
        <AdminProductList products={productList} />
      </div>
    </div>
  );
}
