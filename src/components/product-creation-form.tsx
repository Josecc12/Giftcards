'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from '@/hooks/use-toast'


const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre del producto debe tener al menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  type: z.enum(["product", "money"], {
    required_error: "Por favor seleccione el tipo de producto.",
  }),
  value: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "El valor debe ser un número positivo.",
  }),
  productCode: z.string().optional(),
})

export function ProductCreationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      type: undefined,
      value: "",
      productCode: "",
    },
  })

  const productType = form.watch("type")

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    console.log(values)

    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Producto creado",
        description: "El nuevo producto ha sido añadido al catálogo.",
        duration: 5000,
      })
      form.reset()
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Producto</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el nombre del producto" {...field} />
              </FormControl>
              <FormDescription>
                El nombre del producto como aparecerá en el catálogo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ingrese la descripción del producto"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Proporcione una descripción detallada del producto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Producto</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione el tipo de producto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="product">Producto Específico</SelectItem>
                  <SelectItem value="money">Monto de Dinero</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Seleccione si este producto representa un artículo específico o un monto de dinero.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{productType === "money" ? "Monto" : "Precio"}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder={productType === "money" ? "Ingrese el monto" : "Ingrese el precio del producto"}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {productType === "money" 
                  ? "Ingrese el monto en la moneda local."
                  : "Ingrese el precio del producto en la moneda local."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {productType === "product" && (
          <FormField
            control={form.control}
            name="productCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código del Producto</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese el código del producto" {...field} />
                </FormControl>
                <FormDescription>
                  Ingrese el código único del producto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creando..." : "Crear Producto"}
        </Button>
      </form>
    </Form>
  )
}

