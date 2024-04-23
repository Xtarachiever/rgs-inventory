import Link from 'next/link';
import {useSession} from 'next-auth/react';

export default function Home() {
  const {data: session} = useSession();
  return (
    <main
      className={`flex min-h-screen font-montserrat`}
    >
      <div className="w-[90%] guest-page-container p-4">
        <div className="flex items-center">
          <div className={`h-full img-container`}>
            <img src={'/rgs-landing-image.jpeg'} alt="rgs-image"/>
          </div>
          <div className="pl-8 text-center welcome-details">
            <p className="text-4xl text-primary py-4 mb-4">WELCOME!</p>
            <div className="mt-[50px]">
              <p className="px-6 pb-4">Welcome to RGS, your premier destination for high-quality, sustainable agricultural products straight from the farm to your table.</p>
              <div className="buttons">
                <Link href="https://www.royalgroceryshoppa.com/"><button className="px-4 py-4">RGS Website</button></Link>
                <Link href="/login"><button className="bg-primary text-white px-4 py-4">Login to RGS Inventory</button></Link>
              </div>
            </div>
            <span className="absolute bottom-0 italics right-0 ps">Only authorized users can login to inventory</span>
          </div>
        </div>
      </div>
    </main>
  );
}


