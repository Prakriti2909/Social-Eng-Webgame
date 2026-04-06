/*import Navbar  from "@/components/navbar";
import Hero from "@/components/hero"
import Recs from "@/components/recs";
import { Mail, Link } from "lucide-react";
import ProgressCard from "@/components/ProgressCard";

export default function HomePage(){
  return (
    <>
    <Hero />
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