import { InfiniteScroll } from "./components/InfiniteScroll"
import { Header } from "./components/Navbar"
import About from "./sections/About"
import BusinessAdvice from "./sections/Advice"
import Contact from "./sections/Contact"
import Courses from "./sections/Courses"
import Discounts from "./sections/Discount"
import { Footer } from "./sections/Footer"
import { Hero } from "./sections/Hero"
import Teachers from "./sections/Teachers"

import WhyChooseUs from "./sections/WhyChooseUs"


export const App=()=>{
  return(
   <div>
    <Header/>
    <Hero/>
    <WhyChooseUs/>
    <Courses/>
    <Teachers/>
    <BusinessAdvice/>
    <InfiniteScroll/>
    <Discounts/>
    <About/>
    <Contact/>
    <Footer/>

   </div>
  )
}