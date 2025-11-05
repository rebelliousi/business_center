import React, { Suspense, lazy } from "react"
import { FaSpinner } from "react-icons/fa"

const InfiniteScroll = lazy(() => import("../src/components/InfiniteScroll").then(m => ({ default: m.InfiniteScroll })))
const Header = lazy(() => import("../src/components/Navbar").then(m => ({ default: m.Header })))
const About = lazy(() => import("./sections/About"))
const BusinessAdvice = lazy(() => import("./sections/Advices"))
const Contact = lazy(() => import("./sections/Contact"))
const Courses = lazy(() => import("./sections/Courses"))
const Discounts = lazy(() => import("./sections/Discount"))
const Footer = lazy(() => import("./sections/Footer").then(m => ({ default: m.Footer })))
const Hero = lazy(() => import("./sections/Hero").then(m => ({ default: m.Hero })))
const Teachers = lazy(() => import("./sections/Teachers"))
const WhyChooseUs = lazy(() => import("./sections/WhyChooseUs"))

const Spinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
    <FaSpinner className="animate-spin text-blue-500" size={48} />
  </div>
)

export const App = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <div>
        <Header />
        <Hero />
        <WhyChooseUs />
        <Courses />
        <Teachers />
        <BusinessAdvice />
        {/* <InfiniteScroll /> */}
        <Discounts />
        <About />
        <Contact />
        <Footer />
      </div>
    </Suspense>
  )
}