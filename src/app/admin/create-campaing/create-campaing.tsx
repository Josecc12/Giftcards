'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
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

import { X } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

const formSchema = z.object({
  code: z.string().min(4, {
    message: "El código debe tener al menos 4 caracteres.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  country: z.string({
    required_error: "Por favor seleccione un país.",
  }),
  startDate: z.string({
    required_error: "La fecha de inicio es requerida.",
  }),
  endDate: z.string({
    required_error: "La fecha de fin es requerida.",
  }),
  giftCards: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })),
})

export function CampaignCreationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [availableGiftCards, setAvailableGiftCards] = useState([
    { id: 'gc1', name: 'Gift Card 1' },
    { id: 'gc2', name: 'Gift Card 2' },
    { id: 'gc3', name: 'Gift Card 3' },
    { id: 'gc4', name: 'Gift Card 4' },
  ])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      description: "",
      country: "",
      startDate: "",
      endDate: "",
      giftCards: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "giftCards",
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log(values)
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Campaña creada",
        description: "La campaña ha sido creada exitosamente.",
      })
      form.reset()
    }, 1000)
  }

  const addGiftCard = (giftCard: { id: string; name: string }) => {
    append(giftCard)
    setAvailableGiftCards(availableGiftCards.filter(gc => gc.id !== giftCard.id))
  }

  const removeGiftCard = (index: number) => {
    const removedGiftCard = form.getValues().giftCards[index]
    remove(index)
    setAvailableGiftCards([...availableGiftCards, removedGiftCard])
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Código de la Campaña</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el código de la campaña" {...field} />
              </FormControl>
              <FormDescription>
                Ingrese un código único para la campaña.
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
                  placeholder="Ingrese la descripción de la campaña" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Proporcione una descripción detallada de la campaña.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>País</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un país" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="GT">Guatemala</SelectItem>
                  <SelectItem value="HN">Honduras</SelectItem>
                  <SelectItem value="SV">El Salvador</SelectItem>
                  <SelectItem value="NI">Nicaragua</SelectItem>
                  <SelectItem value="CR">Costa Rica</SelectItem>
                  <SelectItem value="PA">Panamá</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Seleccione el país donde se llevará a cabo la campaña.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de Inicio</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>
                Seleccione la fecha de inicio de la campaña.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha de Fin</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>
                Seleccione la fecha de fin de la campaña.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <h3 className="text-lg font-medium mb-2">Gift Cards Asociadas</h3>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2 mb-2">
              <span>{field.name}</span>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                onClick={() => removeGiftCard(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Agregar Gift Cards</h3>
          <div className="flex flex-wrap gap-2">
            {availableGiftCards.map((giftCard) => (
              <Button
                key={giftCard.id}
                type="button"
                variant="outline"
                onClick={() => addGiftCard(giftCard)}
              >
                {giftCard.name}
              </Button>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creando..." : "Crear Campaña"}
        </Button>
      </form>
    </Form>
  )
}

