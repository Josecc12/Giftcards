'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

type GiftCardState = 'Generada' | 'Entregada' | 'Canjeada' | 'Anulada'

interface StateChange {
  date: Date
  from: GiftCardState
  to: GiftCardState
  details?: string
}

interface GiftCardDetails {
  code: string
  productName: string
  value: string
  currentState: GiftCardState
  campaign: string
  creationDate: Date
  expirationDate: Date
  stateHistory: StateChange[]
  redemptionDetails?: {
    date: Date
    location: string
    employeeId: string
  }
}

export function GiftCardHistory({ giftCardCode }: { giftCardCode: string }) {
  const [giftCardDetails, setGiftCardDetails] = useState<GiftCardDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {

    const fetchGiftCardDetails = async () => {
      setIsLoading(true)
      try {

        await new Promise(resolve => setTimeout(resolve, 1000))
        const mockData: GiftCardDetails = {
          code: giftCardCode,
          productName: "Kit Gamer",
          value: "Q500.00",
          currentState: "Canjeada",
          campaign: "Día del Padre 2023",
          creationDate: new Date(2023, 4, 1), 
          expirationDate: new Date(2023, 11, 31), 
          stateHistory: [
            { date: new Date(2023, 4, 1), from: "Generada", to: "Generada", details: "Gift card creada en el sistema" },
            { date: new Date(2023, 5, 15), from: "Generada", to: "Entregada", details: "Enviada al cliente por correo electrónico" },
            { date: new Date(2023, 6, 1), from: "Entregada", to: "Canjeada", details: "Canjeada en tienda" },
          ],
          redemptionDetails: {
            date: new Date(2023, 6, 1),
            location: "Tienda Central, Ciudad de Guatemala",
            employeeId: "EMP001",
          },
        }
        setGiftCardDetails(mockData)
      } catch (error) {
        console.error("Error fetching gift card details:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGiftCardDetails()
  }, [giftCardCode])

  if (isLoading) {
    return <div>Cargando detalles de la gift card...</div>
  }

  if (!giftCardDetails) {
    return <div>No se encontraron detalles para la gift card con código {giftCardCode}</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Detalles de la Gift Card</CardTitle>
          <CardDescription>Información general de la gift card</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Código:</p>
              <p>{giftCardDetails.code}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Producto:</p>
              <p>{giftCardDetails.productName}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Valor:</p>
              <p>{giftCardDetails.value}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Estado Actual:</p>
              <Badge variant={giftCardDetails.currentState === 'Canjeada' ? 'default' : 'secondary'}>
                {giftCardDetails.currentState}
              </Badge>
            </div>
            <div>
              <p className="text-sm font-medium">Campaña:</p>
              <p>{giftCardDetails.campaign}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Fecha de Creación:</p>
              <p>{format(giftCardDetails.creationDate, 'dd/MM/yyyy', { locale: es })}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Fecha de Expiración:</p>
              <p>{format(giftCardDetails.expirationDate, 'dd/MM/yyyy', { locale: es })}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Estados</CardTitle>
          <CardDescription>Cambios de estado de la gift card a lo largo del tiempo</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>De</TableHead>
                <TableHead>A</TableHead>
                <TableHead>Detalles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {giftCardDetails.stateHistory.map((change, index) => (
                <TableRow key={index}>
                  <TableCell>{format(change.date, 'dd/MM/yyyy HH:mm', { locale: es })}</TableCell>
                  <TableCell>{change.from}</TableCell>
                  <TableCell>{change.to}</TableCell>
                  <TableCell>{change.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {giftCardDetails.redemptionDetails && (
        <Card>
          <CardHeader>
            <CardTitle>Detalles de Canje</CardTitle>
            <CardDescription>Información sobre el canje de la gift card</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Fecha de Canje:</p>
                <p>{format(giftCardDetails.redemptionDetails.date, 'dd/MM/yyyy HH:mm', { locale: es })}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Ubicación:</p>
                <p>{giftCardDetails.redemptionDetails.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium">ID del Empleado:</p>
                <p>{giftCardDetails.redemptionDetails.employeeId}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

