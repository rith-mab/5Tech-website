import { AdminCategoryList } from "@/components/admin-category-list";
import { AdminCategoryForm } from "@/components/admin-category-form";
import { getCategories } from "@/lib/products";

export default async function AdminCategoriesPage() {
  const categoryList = await getCategories();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Categories</h1>
        <p className="text-sm text-gray-500 mt-1">Add, update, or delete categories.</p>
      </div>
      
      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <AdminCategoryForm />
        <AdminCategoryList categories={categoryList} />
      </div>
    </div>
  );
}
