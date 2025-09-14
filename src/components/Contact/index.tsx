"use client";

import { MapPin, Phone, Clock, Instagram, MessageCircle } from "lucide-react";

export default function Contact() {
    return (
        <section id="contato" className="py-20 bg-[var(--color-gray-dark)] text-white">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <MessageCircle className="w-10 h-10 text-yellow-500" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">
                        Entre em <span className="text-yellow-500">Contato</span>
                    </h2>
                    <p className="text-gray-300">
                        Pronto para transformar seu visual? Entre em contato e agende seu horário.
                    </p>
                </div>

                {/* Content */}
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Contact Info */}
                    <div className="flex-1 space-y-8 flex flex-col justify-center items-center bg-[var(--color-dark)] p-10 rounded-lg">
                        <div className="space-y-6 ">
                            <div className="flex items-start gap-4 mb-10">
                                <MapPin className="w-6 h-6 text-yellow-500 mt-1" />
                                <div>
                                    <div className="font-bold">Endereço</div>
                                    <div>Rua das Flores, 123 - Centro</div>
                                    <div className="text-gray-400">São Paulo, SP - CEP: 01234-567</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Phone className="w-6 h-6 text-yellow-500 mt-1" />
                                <div>
                                    <div className="font-bold">Telefone</div>
                                    <div>(11) 99999-9999</div>
                                    <div className="text-gray-400">WhatsApp disponível</div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="font-bold text-lg mb-2 mt-5">Nos siga nas redes sociais</h3>
                            <div className="flex gap-4 justify-center">
                                <a
                                    href="https://instagram.com/lipecortes"
                                    target="_blank"
                                    className="flex items-center gap-2 text-[var(--color-gold-light)] hover:underline"
                                >
                                    <Instagram className="w-5 h-5" /> @lipecortes
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Map + CTA */}
                    <div className="flex-1 flex flex-col gap-8">

                        {/* CTA Card */}
                        

                        {/* Horário de Funcionamento */}
                        <div className="bg-[var(--color-dark)] p-6 rounded-lg">
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className="w-5 h-5 text-yellow-500" />
                                <h4 className="font-bold text-lg">Horário de Funcionamento</h4>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Segunda - Sexta</span>
                                    <span>9h às 18h</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sábado</span>
                                    <span>8h às 16h</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Domingo</span>
                                    <span className="text-red-500">Fechado</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[var(--color-dark)] p-6 rounded-lg text-center space-y-4">
                            <h3 className="text-xl font-bold">Agende já seu horário!</h3>
                            <p>Atendimento rápido pelo WhatsApp. Confirme sua disponibilidade em segundos.</p>
                            <a
                                href="https://wa.me/5511999999999?text=Oi!%20Gostaria%20de%20agendar%20um%20hor%C3%A1rio.%20Quando%20voc%C3%AA%20tem%20disponibilidade%3F"
                                target="_blank"
                                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 bg-[var(--color-gold)] text-[var(--color-dark)] font-bold rounded-md hover:shadow-[0_4px_15px_rgba(238,189,43,0.5)] hover:text-[var(--color-dark)] transition-transform duration-500 hover:-translate-y-1 transition-colors"
                            >
                                <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
