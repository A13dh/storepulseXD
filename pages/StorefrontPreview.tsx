
import React from 'react';
import { MOCK_PRODUCTS, CURRENCY_SYMBOL } from '../constants';

const REVIEWS = [
  {
    id: 1,
    name: "Anis Mansour",
    rating: 5,
    comment: "Qualité exceptionnelle ! La montre est encore plus belle en vrai. Livraison rapide sur Tunis.",
    date: "Il y a 2 jours",
    avatar: "https://i.pravatar.cc/150?u=anis"
  },
  {
    id: 2,
    name: "Meriam Ben Salem",
    rating: 4,
    comment: "Les écouteurs ont un son incroyable. Très satisfaite de mon achat chez NexusStore.",
    date: "Il y a 1 semaine",
    avatar: "https://i.pravatar.cc/150?u=meriam"
  },
  {
    id: 3,
    name: "Yassine Dridi",
    rating: 5,
    comment: "Service client au top et produits authentiques. Je recommande vivement !",
    date: "Il y a 3 jours",
    avatar: "https://i.pravatar.cc/150?u=yassine"
  }
];

const StorefrontPreview: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen font-sans">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
              <i className="material-icons-round text-xl">shopping_bag</i>
            </div>
            <span className="font-bold text-xl tracking-tight uppercase">NexusStore</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-500">
            <span className="text-slate-900 dark:text-white border-b-2 border-primary-500 pb-1">Boutique</span>
            <span>Collections</span>
            <span>Journal</span>
            <span>À Propos</span>
          </nav>
          <div className="flex gap-5 items-center">
             <i className="material-icons-round">search</i>
             <div className="relative">
                <i className="material-icons-round">shopping_cart</i>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-600 text-[10px] text-white flex items-center justify-center rounded-full">0</span>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-extrabold font-display mb-4">Essentiels Curatés</h1>
          <p className="text-slate-500 max-w-lg">Une collection de produits de haute qualité conçus pour le style de vie moderne. L'esthétique minimaliste rencontre l'excellence fonctionnelle.</p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24">
          {MOCK_PRODUCTS.map(p => (
            <div key={p.id} className="group cursor-pointer">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 mb-4 relative shadow-sm hover:shadow-xl transition-all duration-300">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest">Achat Rapide</button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm mb-1 group-hover:text-primary-600 transition-colors">{p.name}</h3>
                  <p className="text-xs text-slate-500">{p.category}</p>
                </div>
                <p className="font-bold text-sm">{p.price} {CURRENCY_SYMBOL}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Section */}
        <section className="border-t border-slate-100 dark:border-slate-800 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-black font-display mb-2">Ce que disent nos clients</h2>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="material-icons-round text-lg">star</i>
                  ))}
                </div>
                <span className="text-sm font-bold">4.9/5 basé sur 120+ avis</span>
              </div>
            </div>
            <button className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">
              Donner mon avis
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-transparent hover:border-primary-500/30 transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800" />
                  <div>
                    <h4 className="font-bold text-sm">{review.name}</h4>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{review.date}</p>
                  </div>
                </div>
                <div className="flex text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`material-icons-round text-sm ${i < review.rating ? 'text-amber-400' : 'text-slate-300'}`}>
                      star
                    </i>
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 py-12 text-center text-slate-400 text-xs">
        © 2024 NexusStore. Propulsé par StorePulse Tunisia.
      </footer>
    </div>
  );
};

export default StorefrontPreview;
