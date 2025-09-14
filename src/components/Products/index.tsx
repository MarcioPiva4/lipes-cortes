"use client";

import { ShoppingBag, Package } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Pomada Modeladora",
    price: "R$ 45,00",
    image: "https://i.ibb.co/XYZ/pomada.jpg",
  },
  {
    id: 2,
    name: "Shampoo Premium",
    price: "R$ 55,00",
    image: "https://i.ibb.co/XYZ/shampoo.jpg",
  },
  {
    id: 3,
    name: "Condicionador",
    price: "R$ 50,00",
    image: "https://i.ibb.co/XYZ/condicionador.jpg",
  },
];

export default function Products() {
  return (
    <section id="produtos" className="section-products py-20 bg-[var(--color-gray-dark)] text-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <ShoppingBag className="w-8 h-8 text-[var(--color-gold)]" />
          </div>
          <h2 className="text-4xl font-bold mb-2">
            Nossos <span className="text-[var(--color-gold)]">Produtos</span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Produtos premium selecionados especialmente para o cuidado masculino. Qualidade profissional para usar em casa.
          </p>
        </div>

        {/* CTA Banner */}
        <div className="cta-banner bg-[var(--color-dark)] rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-8">Delivery e Retirada na Loja</h3>
          <div className="grid md:grid-cols-2 gap-10 text-gray-300">
            <div className="info-item">
              <h4 className="flex items-center gap-2 justify-center text-lg font-semibold mb-2">
                <ShoppingBag className="w-6 h-6 text-[var(--color-gold)]" /> Entrega
              </h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Entrega rápida em toda a região</li>
                <li>Frete grátis para compras acima de R$ 80</li>
                <li>Embalagem premium para presente</li>
              </ul>
            </div>
            <div className="info-item">
              <h4 className="flex items-center gap-2 justify-center text-lg font-semibold mb-2">
                <Package className="w-6 h-6 text-[var(--color-gold)]" /> Retirada
              </h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Retire na loja sem custo adicional</li>
                <li>Horário: Segunda a Sábado, 9h às 19h</li>
                <li>Produto reservado por até 3 dias</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
