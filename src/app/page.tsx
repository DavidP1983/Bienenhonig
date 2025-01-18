import { HomePage } from "@/components/HomePage";
import Carousel from "@/components/UI/carousel/Carousel";
import { EmblaOptionsType } from 'embla-carousel';
import { Footer } from "@/components/Footer";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Home - Page',
}


const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


export default function Home() {
  return (
    <>
      <main style={{ minHeight: 500 }}>
        <HomePage />
        <Carousel slides={SLIDES} options={OPTIONS} />
      </main>
      <Footer />
    </>
  );
}
