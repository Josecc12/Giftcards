import { CampaignCreationForm } from "./create-campaing";

export default function Page() {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Crear Nuevo GiftCard</h1>
            <div className='w-full max-w-[800px]'>
               <CampaignCreationForm />
            </div>
        </div>
    )
}

