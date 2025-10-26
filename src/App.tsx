import { Header } from "./components/Navbar"
import Courses from "./sections/Courses"
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

   </div>
  )
}