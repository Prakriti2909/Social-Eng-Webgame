/*import Navbar  from "@/components/navbar";
import Hero from "@/components/hero"
import Recs from "@/components/recs";
import { Mail, Link } from "lucide-react";
import ProgressCard from "@/components/ProgressCard";

export default function HomePage(){
  return (
    <>
    <Navbar />
    <Hero />
    <Recs />
    <div className="p-8 bg-black min-h-screen">
      
      <h2 className="text-white text-2xl mb-6">
        Training Progress
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProgressCard
          title="Phishing"
          percentage={90}
          color="blue"
          icon={<Mail className="w-5 h-5 text-blue-400" />}
        />

        <ProgressCard
          title="Social Engineering"
          percentage={60}
          color="green"
          icon={<Link className="w-5 h-5 text-green-400" />}
        />
      </div>

    </div>
    </>
  )
} */

import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Recs from "@/components/recs";
import ProgressCard from "@/components/ProgressCard";
import Protection from "@/components/Protection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Recs />
      <ProgressCard />
      <Protection />
      <CTA />
      <Footer />
    </main>
  );
}