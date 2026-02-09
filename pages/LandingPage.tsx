
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 font-sans selection:bg-primary-500 selection:text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-900 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-600/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-2xl font-black tracking-tighter font-display">StorePulse</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-semibold text-slate-600 dark:text-slate-400">
            <button onClick={() => scrollToSection('features')} className="hover:text-primary-600 transition-colors">Fonctionnalités</button>
            <button onClick={() => scrollToSection('affiliates-info')} className="hover:text-primary-600 transition-colors">Affiliés</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-primary-600 transition-colors">Tarifs</button>
            <Link to="/auth" className="text-primary-600 font-bold">Connexion</Link>
            <Link to="/auth" className="bg-primary-600 text-white px-6 py-3 rounded-full shadow-xl shadow-primary-600/20 hover:scale-105 transition-all">Démarrer Gratuitement</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-1/4 left-0 w-[40%] h-[40%] bg-primary-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-0 w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-2 bg-primary-50 dark:bg-primary-950/30 text-primary-600 text-xs font-black uppercase tracking-widest rounded-full mb-8 border border-primary-100 dark:border-primary-900/50">
            Plateforme E-commerce #1 en Tunisie
          </span>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95] mb-8 font-display">
            Vendez plus. <br />
            <span className="text-primary-600">Sans effort.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
            La plateforme e-commerce tout-en-un pour le marché tunisien. Créez votre boutique en quelques minutes et laissez notre réseau d'affiliés vendre pour vous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth" className="bg-slate-900 dark:bg-white dark:text-slate-950 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:translate-y-[-4px] transition-all shadow-2xl shadow-slate-900/20">
              Créer ma boutique
            </Link>
            <Link to="/auth" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
              Devenir Affilié
            </Link>
          </div>

          <div className="mt-24 relative max-w-6xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-600/20 to-blue-500/20 blur-2xl opacity-50 rounded-3xl -z-10"></div>
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" alt="Preview" className="w-full rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black font-display mb-4">Tout ce dont vous avez besoin pour réussir</h2>
            <p className="text-slate-500 max-w-xl mx-auto">De la première vente à votre premier million, StorePulse fournit l'infrastructure pour propulser votre marque.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon="draw" 
              title="No-Code Builder" 
              desc="Concevez des vitrines époustouflantes avec notre éditeur intuitif. Aucune compétence technique requise."
            />
            <FeatureCard 
              icon="hub" 
              title="Système d'Affiliation" 
              desc="Recrutez des partenaires pour vendre vos produits. Suivez les commissions et gérez les paiements automatiquement."
            />
            <FeatureCard 
              icon="account_balance_wallet" 
              title="Paiements Locaux" 
              desc="Intégration native avec les solutions de paiement tunisiennes et gestion optimisée de la livraison."
            />
          </div>
        </div>
      </section>

      {/* Affiliates Info Section */}
      <section id="affiliates-info" className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <span className="text-primary-600 font-bold uppercase tracking-widest text-sm">Réseau d'Affiliés</span>
              <h2 className="text-4xl md:text-5xl font-black font-display mt-4 mb-6 leading-tight">Vendez vos produits via des milliers d'ambassadeurs.</h2>
              <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                Notre réseau d'affiliés tunisiens est prêt à promouvoir votre marque sur TikTok, Instagram et Facebook. Vous ne payez qu'une commission lorsque vous réalisez une vente.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center">
                    <i className="material-icons-round text-sm">check</i>
                  </div>
                  <span className="font-semibold">Paiement à la performance uniquement</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center">
                    <i className="material-icons-round text-sm">check</i>
                  </div>
                  <span className="font-semibold">Suivi précis des clics et conversions</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center">
                    <i className="material-icons-round text-sm">check</i>
                  </div>
                  <span className="font-semibold">Gestion automatique des commissions</span>
                </li>
              </ul>
              <Link to="/auth" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:gap-3 transition-all">
                En savoir plus sur l'affiliation
                <i className="material-icons-round">arrow_forward</i>
              </Link>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -inset-10 bg-primary-500/10 blur-3xl rounded-full -z-10"></div>
              <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070" alt="Affiliates" className="rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-primary-600 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-5xl font-black mb-2">500M+</div>
            <div className="text-primary-100 uppercase text-[10px] font-bold tracking-widest">Volume traité (DT)</div>
          </div>
          <div>
            <div className="text-5xl font-black mb-2">120K+</div>
            <div className="text-primary-100 uppercase text-[10px] font-bold tracking-widest">Affiliés actifs</div>
          </div>
          <div>
            <div className="text-5xl font-black mb-2">99.9%</div>
            <div className="text-primary-100 uppercase text-[10px] font-bold tracking-widest">Temps de disponibilité</div>
          </div>
          <div>
            <div className="text-5xl font-black mb-2">24/7</div>
            <div className="text-primary-100 uppercase text-[10px] font-bold tracking-widest">Support local</div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black font-display mb-4">Tarification Simple et Transparente</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Choisissez le forfait qui correspond à la croissance de votre entreprise.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard 
              name="Starter" 
              price="49" 
              features={["1 Boutique", "Jusqu'à 50 produits", "10 Affiliés", "Support Email"]} 
            />
            <PricingCard 
              name="Pro" 
              price="99" 
              recommended 
              features={["Boutiques illimitées", "Produits illimités", "100 Affiliés", "Support Prioritaire", "Analyses Avancées"]} 
            />
            <PricingCard 
              name="Enterprise" 
              price="249" 
              features={["Tout du pack Pro", "Affiliés illimités", "API Access", "Account Manager Dédié", "Custom Branding"]} 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-xl font-bold font-display">StorePulse</span>
          </div>
          <div className="flex gap-10 text-sm font-semibold text-slate-500">
            <a href="#" className="hover:text-primary-600 transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Conditions</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Contact</a>
          </div>
          <p className="text-xs text-slate-400">© 2024 StorePulse Inc. Fabriqué avec ❤️ pour la Tunisie.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: any) => (
  <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl border border-slate-100 dark:border-slate-700 hover:border-primary-500 transition-all hover:translate-y-[-8px] group">
    <div className="w-16 h-16 bg-primary-50 dark:bg-primary-950/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <i className="material-icons-round text-3xl text-primary-600">{icon}</i>
    </div>
    <h3 className="text-xl font-bold mb-4 font-display">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
  </div>
);

const PricingCard = ({ name, price, features, recommended = false }: any) => (
  <div className={`p-10 rounded-[2.5rem] border transition-all ${
    recommended 
      ? 'bg-slate-900 text-white border-slate-900 shadow-2xl scale-105 relative z-10' 
      : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700'
  }`}>
    {recommended && (
      <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
        Recommandé
      </span>
    )}
    <h3 className="text-xl font-bold mb-2">{name}</h3>
    <div className="flex items-baseline gap-1 mb-8">
      <span className="text-4xl font-black">{price}</span>
      <span className={recommended ? 'text-slate-400' : 'text-slate-500'}>DT/mois</span>
    </div>
    <ul className="space-y-4 mb-10">
      {features.map((f: string, i: number) => (
        <li key={i} className="flex items-center gap-3 text-sm font-medium">
          <i className="material-icons-round text-primary-500 text-lg">check_circle</i>
          {f}
        </li>
      ))}
    </ul>
    <Link 
      to="/auth" 
      className={`block w-full py-4 rounded-2xl font-bold text-center transition-all ${
        recommended 
          ? 'bg-primary-600 text-white hover:bg-primary-500 shadow-xl shadow-primary-600/20' 
          : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'
      }`}
    >
      Commencer
    </Link>
  </div>
);

export default LandingPage;
