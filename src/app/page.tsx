"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Products from "@/components/Products";
import About from "@/components/About";
import Link from "next/link";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Services />
      <Products />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
