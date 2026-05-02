import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LeadForm } from "@/components/LeadForm";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-surface">
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[min(70vh,520px)] bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(80,80,95,0.35),transparent)]"
        aria-hidden
      />
      <Header />
      <main className="relative z-10">
        <Hero />
        <Pricing />
        <Process />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
