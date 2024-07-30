import React from 'react'
import Hero from '../components.jsx/LandingPage/Hero'
import AvatarBadge from '../components.jsx/LandingPage/AvatarBadge'
import ProblemSection from '../components.jsx/LandingPage/ProblemSection'
import Features from '../components.jsx/LandingPage/Features'
import CTA from '../components.jsx/LandingPage/CTA'
import FAQ from '../components.jsx/LandingPage/FAQ'
import Footer from '../components.jsx/LandingPage/Footer'
import Pricing from '../components.jsx/LandingPage/Pricing'

const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-2 pb-24">
      <Hero />
      <AvatarBadge />
      <ProblemSection />
      <Features />
      <CTA />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}

export default HomePage