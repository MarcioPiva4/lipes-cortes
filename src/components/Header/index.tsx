"use client";

import Link from "next/link";
import { Scissors, Menu, User } from "lucide-react";

export default function Header() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // previne o comportamento padrão do link
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <header className="fixed top-0 left-0 w-full bg-[var(--color-dark)]/80 backdrop-blur-sm text-white py-4 px-6 z-50 shadow-lg border-b border-[var(--color-gray-medium)]">
      <div className="container mx-auto flex justify-center items-center">
        <div className="text-2xl font-bold">
          <Link
            href="/"
            className="hover:text-[var(--color-gold)] transition-colors duration-300 flex items-center gap-2">
            <Scissors className="w-6 h-6 text-yellow-500" />
            Lipe Cortes
          </Link>
        </div>

        <nav className="flex ml-[5em]">
          <ul className="flex space-x-6 items-center">
            <li>
              <Link
                href="#inicio"
                onClick={(e) => handleScroll(e, "inicio")}
                className="relative font-medium text-gray-200 
              after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 
              after:bottom-[-5px] after:h-[2px] after:w-0 
              after:bg-yellow-500 after:transition-all after:duration-300 
              hover:text-yellow-500 hover:after:w-full"
              >
                Início
              </Link>
            </li>
            <li>
              <Link
                href="#servicos"
                onClick={(e) => handleScroll(e, "servicos")}
                className="relative font-medium text-gray-200 
              after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 
              after:bottom-[-5px] after:h-[2px] after:w-0 
              after:bg-yellow-500 after:transition-all after:duration-300 
              hover:text-yellow-500 hover:after:w-full"
              >
                Serviços
              </Link>
            </li>
            <li>
              <Link
                href="#produtos"
                onClick={(e) => handleScroll(e, "produtos")}
                className="relative font-medium text-gray-200 
              after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 
              after:bottom-[-5px] after:h-[2px] after:w-0 
              after:bg-yellow-500 after:transition-all after:duration-300 
              hover:text-yellow-500 hover:after:w-full"
              >
                Produtos
              </Link>
            </li>
            <li>
              <Link
                href="#sobre"
                onClick={(e) => handleScroll(e, "sobre")}
                className="relative font-medium text-gray-200 
              after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 
              after:bottom-[-5px] after:h-[2px] after:w-0 
              after:bg-yellow-500 after:transition-all after:duration-300 
              hover:text-yellow-500 hover:after:w-full"
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link
                href="#contato"
                onClick={(e) => handleScroll(e, "contato")}
                className="relative font-medium text-gray-200 
              after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 
              after:bottom-[-5px] after:h-[2px] after:w-0 
              after:bg-yellow-500 after:transition-all after:duration-300 
              hover:text-yellow-500 hover:after:w-full"
              >
                Contato
              </Link>
            </li>
          </ul>

          {/* Botão Login */}
          <div className="flex items-center ml-[8em] transition-transform duration-600 hover:-translate-y-1">
            <Link
              href="/login"
              className="group flex items-center gap-2 border border-[var(--color-gray-medium)] text-white px-4 py-2 rounded-md hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors h-[2.8em] w-[8em] justify-center"
            >
              <User className="w-6 h-6 text-white group-hover:text-[var(--color-gold)] transition-colors" />
              Entrar
            </Link>
          </div>

          {/* Botão Agendar */}
          <div className="flex items-center ml-[1em] transition-transform duration-600 hover:-translate-y-1">
            <Link
              href="/signup"
              className="group flex items-center gap-2 border border-[var(--color-gold)] text-black font-bold px-4 py-2 rounded-md bg-[var(--color-gold)] hover:shadow-[0_4px_15px_rgba(238,189,43,0.5)] hover:text-[var(--color-dark)] transition-shadow transition-colors"
            >
              Agendar Agora
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
