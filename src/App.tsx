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
  <div className="flex items-center justify-center py-8">
    <FaSpinner className="animate-spin text-blue-500" size={32} />
  </div>
)

export const App = () => {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <Header />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <WhyChooseUs />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Courses />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Teachers />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <BusinessAdvice />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <InfiniteScroll />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Discounts />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <About />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Footer />
      </Suspense>
    </div>
  )
}