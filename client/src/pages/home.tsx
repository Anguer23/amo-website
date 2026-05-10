import { Navbar } from "@/components/am-ops/navbar";
import { Hero } from "@/components/am-ops/hero";
import { Mission } from "@/components/am-ops/mission";
import { Advantage } from "@/components/am-ops/advantage";
import { Reach } from "@/components/am-ops/reach";
import { Dashboard } from "@/components/am-ops/dashboard";
import { Tiers } from "@/components/am-ops/tiers";
import { Footer } from "@/components/am-ops/footer";
import { CursorAura } from "@/components/am-ops/cursor-aura";

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-white/20">
      <CursorAura />
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <Advantage />
        <Reach />
        <Dashboard />
        <Tiers />
      </main>
      <Footer />
    </div>
  );
}
