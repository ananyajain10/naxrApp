import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import TestimonialCard from "@/components/TestimonialCard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] bg-grid-white/[0.2] antialiased">
        <HeroSection/>
        <Services/>
        <TestimonialCard/>
        <Footer/>
    </main>
  );
}
