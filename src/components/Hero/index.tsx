"use client";

import Link from "next/link";
import { Scissors, Menu, User, ArrowRight, Play } from "lucide-react";

export default function Header() {
    const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
    return (
        <>
            <section id="inicio" className="hero-section relative h-screen flex justify-center items-center text-center overflow-hidden">

                {/* Background */}
                <div className="hero-background absolute top-0 left-0 w-full h-full z-0">
                    <img
                        src="/hero-barbershop.jpg"
                        alt="Barbeiro profissional cortando cabelo com precisão"
                        className="hero-image w-full h-full object-cover grayscale-[80%]"
                    />
                    <div className="hero-overlay-dark absolute top-0 left-0 w-full h-full bg-black/75"></div>
                    <div className="hero-overlay-bottom absolute bottom-0 left-0 w-full h-1/5 bg-gradient-to-t from-[#121212] to-transparent"></div>
                </div>

                {/* Content */}
                <div className="hero-content relative z-10 max-w-3xl px-4 flex flex-col items-center">
                    <div className="hero-headline-container animate-fade-in">
                        <h1 className="hero-headline text-5xl md:text-6xl font-bold leading-tight">
                            <span className="block">Corte na</span>
                            <span className="block text-[var(--color-gold)] text-shadow-luxury">régua.</span>
                            <span className="block">Estilo garantido.</span>
                        </h1>

                        <p className="hero-subtitle text-lg md:text-xl mt-5 max-w-xl opacity-80 animate-fade-in">
                            Profissionalismo e estilo em cada corte. A melhor experiência em barbearia premium da cidade.
                        </p>

                        {/* CTA Buttons */}
                        <div className="hero-cta-buttons flex gap-4 justify-center flex-wrap mt-8 animate-fade-in">
                            <button
                                className="btn-hero flex items-center cursor-pointer gap-2 px-6 py-3 bg-[var(--color-gold)] text-black font-bold rounded-md hover:shadow-[0_4px_15px_rgba(238,189,43,0.5)] transition-transform duration-600 hover:-translate-y-1"
                                onClick={() => scrollTo("servicos")}
                            >
                                Agendar Agora <ArrowRight className="w-5 h-5" />
                            </button>

                            <button
                                className="btn-secondary flex items-center gap-2 px-6 py-3 cursor-pointer border border-[var(--color-gray-medium)] text-white rounded-md hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors transition-transform duration-600 hover:-translate-y-1"
                                onClick={() => scrollTo("sobre")}
                            >
                                <Play className="w-5 h-5" /> 
                                Conheça o Espaço
                            </button>
                        </div>

                        {/* Indicators */}
                        <div className="hero-indicators hidden md:flex gap-8 mt-12 animate-fade-in">
                            <div className="indicator-item flex items-center gap-2 text-white">
                                <div className="indicator-dot w-3 h-3 bg-[var(--color-gold)] shadow-[0_4px_15px_rgba(238,189,43,0.5)]  rounded-full"></div>
                                <span>+500 clientes satisfeitos</span>
                            </div>
                            <div className="indicator-item flex items-center gap-2 text-white">
                                <div className="indicator-dot w-3 h-3 bg-[var(--color-gold)] shadow-[0_0px_10px_rgba(238,189,43,0.5)] rounded-full"></div>
                                <span>5 anos de experiência</span>
                            </div>
                            <div className="indicator-item flex items-center gap-2 text-white">
                                <div className="indicator-dot w-3 h-3 bg-[var(--color-gold)] shadow-[0_0px_10px_rgba(238,189,43,0.5)]  rounded-full"></div>
                                <span>Produtos premium</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="scroll-indicator absolute bottom-8 w-full flex justify-center animate-bounce">
                    <div className="scroll-dot-wrapper w-8 h-12 border-2 border-white rounded-full flex justify-center pt-2">
                        <div className="scroll-dot w-2 h-2 bg-white rounded-full"></div>
                    </div>
                </div>
            </section>
        </>
    );
}
