import { GiftCardHistory } from "./history";


export default function Page() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Historial de la GiftCard</h1>
            <div className='w-full max-w-[800px]'>
         <GiftCardHistory giftCardCode="1234M1234567890"/>
            </div>
        </div>
    )
}

