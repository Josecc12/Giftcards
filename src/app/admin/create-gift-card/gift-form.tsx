'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
    message: "El nombre de la gift card debe tener al menos 2 caracteres.",
  }),
  code: z.string().min(4, {
    message: "El código debe tener al menos 4 caracteres.",
  }),
  productId: z.string({
    required_error: "Por favor seleccione un producto.",
  }),
})

export function GiftCardCreationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      code: "",
      productId: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log(values)
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Gift Card creada",
        description: "La gift card ha sido creada exitosamente.",
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
              <FormLabel>Nombre de la Gift Card</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el nombre de la gift card" {...field} />
              </FormControl>
              <FormDescription>
                Ingrese un nombre descriptivo para la gift card.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el código de la gift card" {...field} />
              </FormControl>
              <FormDescription>
                Ingrese un código único para la gift card.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Producto</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un producto" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="KS22">Kit Gamer (KS22)</SelectItem>
                  <SelectItem value="S325">Audífonos (S325)</SelectItem>
                  <SelectItem value="M500">Gift Card Q500.00</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Seleccione el producto asociado a la gift card.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creando..." : "Crear Gift Card"}
        </Button>
      </form>
    </Form>
  )
}

