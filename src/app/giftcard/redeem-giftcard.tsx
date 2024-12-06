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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { toast } from '@/hooks/use-toast'


const formSchema = z.object({
  code: z.string().min(4, {
    message: "El código de la gift card debe tener al menos 4 caracteres.",
  }),
})

type GiftCardInfo = {
  code: string;
  productName: string;
  value: string;
  expirationDate: string;
}

export function GiftCardRedemptionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [giftCardInfo, setGiftCardInfo] = useState<GiftCardInfo | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {

      const response = await new Promise<GiftCardInfo>((resolve) => 
        setTimeout(() => resolve({
          code: values.code,
          productName: "Kit Gamer",
          value: "Q500.00",
          expirationDate: "2023-12-31"
        }), 1000)
      );
      setGiftCardInfo(response)
      toast({
        title: "Gift Card verificada",
        description: "La información de la gift card ha sido cargada.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo verificar la gift card. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleRedeem() {
    setIsSubmitting(true)

    try {
     
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Gift Card canjeada",
        description: "La gift card ha sido canjeada exitosamente.",
      })
      setGiftCardInfo(null)
      form.reset()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo canjear la gift card. Por favor, intente de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de la Gift Card</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese el código de la gift card" {...field} />
                </FormControl>
                <FormDescription>
                  Ingrese el código de la gift card que desea canjear.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Verificando..." : "Verificar Gift Card"}
          </Button>
        </form>
      </Form>

      {giftCardInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Información de la Gift Card</CardTitle>
            <CardDescription>Detalles de la gift card a canjear</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Código:</strong> {giftCardInfo.code}</p>
              <p><strong>Producto:</strong> {giftCardInfo.productName}</p>
              <p><strong>Valor:</strong> {giftCardInfo.value}</p>
              <p><strong>Fecha de expiración:</strong> {giftCardInfo.expirationDate}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleRedeem} disabled={isSubmitting}>
              {isSubmitting ? "Canjeando..." : "Canjear Gift Card"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

