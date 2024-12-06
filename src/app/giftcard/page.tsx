import { GiftCardRedemptionForm } from "./redeem-giftcard";

export default function Page() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Canjear GiftCard</h1>
            <div className='w-full max-w-[800px]'>
          <GiftCardRedemptionForm/>
            </div>
        </div>
    )
}

