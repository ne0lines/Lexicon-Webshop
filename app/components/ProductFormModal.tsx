"use client";

import { useEffect, useState } from "react";
import { ProductFormValues } from "../lib/productsApi";
import { Category } from "../types";

type ProductFormModalProps = {
  mode: "create" | "edit";
  initialValues: ProductFormValues;
  categories: Category[];
  isSubmitting: boolean;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (values: ProductFormValues) => Promise<void>;
};

export default function ProductFormModal({
  mode,
  initialValues,
  categories,
  isSubmitting,
  errorMessage,
  onClose,
  onSubmit,
}: Readonly<ProductFormModalProps>) {
  const [formValues, setFormValues] = useState<ProductFormValues>(initialValues);

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = event.target;

    setFormValues((previousValues) => ({
      ...previousValues,
      [name]: name === "price" || name === "stock" || name === "categoryId" ? Number(value) : value,
    }));
  }

  const title = mode === "edit" ? "Redigera produkt" : "Lägg till produkt";
  const submitLabel = mode === "edit" ? "Spara ändringar" : "Skapa produkt";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
          >
            Stäng
          </button>
        </div>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            void onSubmit(formValues);
          }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm">
              <span>Titel</span>
              <input
                required
                name="title"
                value={formValues.title}
                onChange={handleChange}
                className="rounded-md border border-gray-300 px-3 py-2"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span>Varumärke</span>
              <input
                required
                name="brand"
                value={formValues.brand}
                onChange={handleChange}
                className="rounded-md border border-gray-300 px-3 py-2"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span>Pris</span>
              <input
                required
                min={0}
                step="0.01"
                type="number"
                name="price"
                value={formValues.price}
                onChange={handleChange}
                className="rounded-md border border-gray-300 px-3 py-2"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm">
              <span>Lager</span>
              <input
                required
                min={0}
                type="number"
                name="stock"
                value={formValues.stock}
                onChange={handleChange}
                className="rounded-md border border-gray-300 px-3 py-2"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm md:col-span-2">
              <span>Kategori</span>
              <select
                required
                name="categoryId"
                value={formValues.categoryId}
                onChange={handleChange}
                className="rounded-md border border-gray-300 px-3 py-2"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-1 text-sm pt-4">
            <span>Bild (thumbnail URL)</span>
            <input
              required
              name="thumbnail"
              value={formValues.thumbnail}
              onChange={handleChange}
              className="rounded-md border border-gray-300 px-3 py-2"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm pt-4">
            <span>Beskrivning</span>
            <textarea
              required
              rows={4}
              name="description"
              value={formValues.description}
              onChange={handleChange}
              className="rounded-md border border-gray-300 px-3 py-2"
            />
          </label>

          {errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
            >
              Avbryt
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-60"
            >
              {isSubmitting ? "Sparar..." : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
