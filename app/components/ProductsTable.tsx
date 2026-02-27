'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  buildProductUpdatePayload,
  createProduct,
  deleteProduct,
  emptyProductFormValues,
  ProductFormValues,
  toProductFormValues,
  updateProduct,
} from '../lib/productsApi';
import { Category, ProductsResponse } from '../types';
import ProductFormModal from './ProductFormModal';
import ProductsTableRow from './ProductsTableRow';
import { OPEN_CREATE_PRODUCT_EVENT } from './ProductAddButton';

export default function ProductsTable({
  products,
  categories,
}: Readonly<{
  products: ProductsResponse['products'];
  categories: Category[];
}>) {
  const [rows, setRows] = useState(products);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    setRows(products);
  }, [products]);

  const editingProduct = useMemo(
    () => rows.find((product) => product.id === editingProductId) ?? null,
    [rows, editingProductId],
  );

  const createInitialValues = useMemo(
    () => ({
      ...emptyProductFormValues,
      categoryId: categories[0]?.id ?? 1,
    }),
    [categories],
  );

  function handleOpenCreate() {
    setErrorMessage(undefined);
    setEditingProductId(null);
    setIsCreateOpen(true);
  }

  useEffect(() => {
    function onOpenCreateFromHeader() {
      handleOpenCreate();
    }

    globalThis.addEventListener(
      OPEN_CREATE_PRODUCT_EVENT,
      onOpenCreateFromHeader,
    );

    return () => {
      globalThis.removeEventListener(
        OPEN_CREATE_PRODUCT_EVENT,
        onOpenCreateFromHeader,
      );
    };
  }, []);

  function handleOpenEdit(product: ProductsResponse['products'][number]) {
    setErrorMessage(undefined);
    setEditingProductId(product.id);
  }

  async function handleDelete(product: ProductsResponse['products'][number]) {
    const confirmation = globalThis.prompt(
      `Type DELETE to remove "${product.title}".`
    );

    if (confirmation !== 'DELETE') {
      return;
    }

    try {
      await deleteProduct(product.id);
      setRows((previousRows) =>
        previousRows.filter(
          (previousProduct) => previousProduct.id !== product.id
        )
      );

      if (editingProductId === product.id) {
        setEditingProductId(null);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Något gick fel vid borttagning.'
      );
    }
  }

  function handleCloseModal() {
    if (isSubmitting) {
      return;
    }

    setIsCreateOpen(false);
    setEditingProductId(null);
    setErrorMessage(undefined);
  }

  async function handleSubmitCreate(values: ProductFormValues) {
    setIsSubmitting(true);
    setErrorMessage(undefined);

    try {
      const payload = buildProductUpdatePayload(values);

      const createdProduct = await createProduct(payload);
      setRows((previousRows) => {
        const selectedCategory = categories.find(
          (category) => category.id === createdProduct.categoryId,
        );

        return [
          {
            ...createdProduct,
            category: selectedCategory ?? createdProduct.category,
          },
          ...previousRows,
        ];
      });
      setIsCreateOpen(false);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'Något gick fel vid skapande.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmitEdit(values: ProductFormValues) {
    if (!editingProduct) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(undefined);

    try {
      const payload = buildProductUpdatePayload(values);
      const updatedProduct = await updateProduct(editingProduct.id, payload);
      const selectedCategory = categories.find(
        (category) => category.id === updatedProduct.categoryId,
      );

      setRows((previousRows) =>
        previousRows.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                ...updatedProduct,
                category: selectedCategory ?? updatedProduct.category,
              }
            : product,
        ),
      );

      setEditingProductId(null);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Något gick fel vid uppdatering.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <table className='w-full text-xs'>
        <thead>
          <tr className='text-center'>
            <th></th>
            <th className='px-2'>Product</th>
            <th className='px-2'>Category</th>
            <th className='px-4 text-right'>Price</th>
            <th className='px-2 text-center'>Stock</th>
            <th className='px-2 text-center'>Status</th>
            <th className='px-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((product) => (
            <ProductsTableRow
              key={product.id}
              product={product}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
      {isCreateOpen ? (
        <ProductFormModal
          mode='create'
          initialValues={createInitialValues}
          categories={categories}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          onClose={handleCloseModal}
          onSubmit={handleSubmitCreate}
        />
      ) : null}
      {editingProduct ? (
        <ProductFormModal
          mode='edit'
          initialValues={toProductFormValues(editingProduct)}
          categories={categories}
          isSubmitting={isSubmitting}
          errorMessage={errorMessage}
          onClose={handleCloseModal}
          onSubmit={handleSubmitEdit}
        />
      ) : null}
    </>
  );
}
