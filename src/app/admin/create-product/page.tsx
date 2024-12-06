import { ProductCreationForm } from '@/components/product-creation-form'

export default function CreateProductPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Crear Nuevo Producto</h1>
      <div className='w-full max-w-[800px]'>
      <ProductCreationForm />
      </div>
    </div>
  )
}

