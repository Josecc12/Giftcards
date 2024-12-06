import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
       <div className="flex flex-col gap-4 max-w-[500px] w-full items-center">
        <h1 className="font-bold text-xl">Sistema de GiftsCards</h1>
        <div className="flex gap-2 flex-wrap w-full max-w-[500px]">
          <Button asChild>
           <Link href="/admin/create-campaing">
           Crear campaña
           </Link>
          </Button>
          <Button>
          <Link href="/admin/create-product">
            Crear producto
            </Link>
          </Button>
          <Button>
          <Link href="/admin/create-gift-card">
            Crear GiftCard
            </Link>
          </Button>

          <Button>
          <Link href="/giftcard">
            Canjear GiftCard
            </Link>
          </Button>

          <Button>
          <Link href="/giftcard/testasda123">
           Historial de GiftCard
           </Link>
          </Button>
          

        </div>
       </div>
      </main>
    
    </div>
  );
}
