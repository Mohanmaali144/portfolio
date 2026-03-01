import React from 'react';
import { Card, HeroCard, FooterCard } from './components/ui/Card';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { TechStack } from './components/TechStack';
import { Projects } from './components/Projects';
import { BentoAbout } from './components/BentoAbout';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <WhatsAppButton />
      <Navbar />

      <div className="max-w-full mx-auto">
        <HeroCard className="relative overflow-hidden shadow-sm border border-zinc-200/60 ring-1 ring-white/40 !bg-[#EBEBEB] !max-w-none !pt-32">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.92),rgba(255,255,255,0)_55%)]" />
            <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(0,0,0,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.18)_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white/40 to-transparent" />
          </div>
          <Hero />
        </HeroCard>

        <TrustBar />

        <div className="max-w-full mx-auto p-4 md:p-10">  
          <div className="space-y-2">
            <Services />
            <Process />
            <TechStack />
            <Projects />
            <BentoAbout />
            <Resume />
          </div>
        </div>

        <div className="px-4 md:px-10 mb-8">
          <Contact />
        </div>

        <FooterCard className="relative overflow-hidden !max-w-none !bg-[#EBEBEB] !pb-12 !pt-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.75),rgba(255,255,255,0)_60%)]" />
            <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(0,0,0,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.16)_1px,transparent_1px)] [background-size:32px_32px]" />
          </div>
          <Footer />
        </FooterCard>
      </div>
    </div>
  );
}
