
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { generateProductDescription } from '../services/geminiService';
import { MOCK_PRODUCTS, CURRENCY_SYMBOL } from '../constants';
import { supabase, handleSupabaseError } from '../lib/supabase';

const StoreBuilder: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'design' | 'inventory' | 'settings'>('design');
  const [generatedText, setGeneratedText] = useState('');
  
  // Real state for persistence
  const [storeConfig, setStoreConfig] = useState({
    name: 'NexusStore',
    theme: 'Minimalist',
    primaryColor: '#0ea5e9',
    font: 'Inter'
  });

  useEffect(() => {
    const fetchStore = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('owner_id', user.id)
        .single();

      if (!error && data) {
        setStoreConfig({
          name: data.name || 'NexusStore',
          theme: data.theme || 'Minimalist',
          primaryColor: data.primary_color || '#0ea5e9',
          font: data.font_family || 'Inter'
        });
      }
    };
    fetchStore();
  }, []);

  const saveStore = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('stores')
        .upsert({
          owner_id: user.id,
          name: storeConfig.name,
          theme: storeConfig.theme,
          primary_color: storeConfig.primaryColor,
          font_family: storeConfig.font,
          updated_at: new Date()
        });

      handleSupabaseError(error, "saving store");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAIDescription = async (productName: string) => {
    setIsGenerating(true);
    const desc = await generateProductDescription(productName, ["Premium", "Eco-friendly", "Handmade in Tunisia"]);
    setGeneratedText(desc || '');
    setIsGenerating(false);
  };

  return (
    <Layout>
      <div className="flex h-full gap-8">
        {/* Left Sidebar - Editor Tools */}
        <div className="w-80 space-y-8 h-[calc(100vh-140px)] overflow-y-auto pr-4 no-scrollbar">
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {(['design', 'inventory', 'settings'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  activeTab === tab ? 'bg-white dark:bg-slate-700 shadow-sm text-primary-600' : 'text-slate-500'
                }`}
              >
                {tab === 'design' ? 'Design' : tab === 'inventory' ? 'Produits' : 'Réglages'}
              </button>
            ))}
          </div>

          {activeTab === 'design' && (
            <div className="space-y-6 animate-in fade-in duration-300">
               <div>
                <h3 className="text-xs font-bold uppercase text-slate-400 mb-4">Nom de la boutique</h3>
                <input 
                  type="text" 
                  value={storeConfig.name}
                  onChange={(e) => setStoreConfig({...storeConfig, name: e.target.value})}
                  className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                  placeholder="NexusStore"
                />
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase text-slate-400 mb-4">Thème de la boutique</h3>
                <div className="grid grid-cols-2 gap-3">
                  <ThemeOption 
                    name="Minimalist" 
                    active={storeConfig.theme === 'Minimalist'} 
                    onClick={() => setStoreConfig({...storeConfig, theme: 'Minimalist'})}
                    image="https://picsum.photos/seed/theme1/200/150" 
                  />
                  <ThemeOption 
                    name="Bold Modern" 
                    active={storeConfig.theme === 'Bold Modern'} 
                    onClick={() => setStoreConfig({...storeConfig, theme: 'Bold Modern'})}
                    image="https://picsum.photos/seed/theme2/200/150" 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase text-slate-400 mb-4">Typographie</h3>
                <select 
                  value={storeConfig.font}
                  onChange={(e) => setStoreConfig({...storeConfig, font: e.target.value})}
                  className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm"
                >
                  <option>Inter</option>
                  <option>Plus Jakarta Sans</option>
                  <option>Cairo</option>
                </select>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase text-slate-400 mb-4">Couleur Principale</h3>
                <div className="flex gap-2">
                  <ColorCircle color="#0ea5e9" active={storeConfig.primaryColor === '#0ea5e9'} onClick={() => setStoreConfig({...storeConfig, primaryColor: '#0ea5e9'})} />
                  <ColorCircle color="#4F46E5" active={storeConfig.primaryColor === '#4F46E5'} onClick={() => setStoreConfig({...storeConfig, primaryColor: '#4F46E5'})} />
                  <ColorCircle color="#f59e0b" active={storeConfig.primaryColor === '#f59e0b'} onClick={() => setStoreConfig({...storeConfig, primaryColor: '#f59e0b'})} />
                  <ColorCircle color="#10b981" active={storeConfig.primaryColor === '#10b981'} onClick={() => setStoreConfig({...storeConfig, primaryColor: '#10b981'})} />
                </div>
              </div>

              <button 
                onClick={saveStore}
                disabled={isSaving}
                className="w-full py-3 bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-600/20 flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
              >
                {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                <i className="material-icons-round text-sm">save</i>
              </button>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase text-slate-400">Inventaire</h3>
                <button className="text-primary-600 text-xs font-bold">+ Ajouter</button>
              </div>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center hover:border-primary-500 cursor-pointer group transition-all">
                <i className="material-icons-round text-3xl text-slate-300 group-hover:text-primary-500 mb-2">cloud_upload</i>
                <p className="text-xs text-slate-500">Ajouter des produits</p>
              </div>
              <div className="space-y-3">
                {MOCK_PRODUCTS.map(p => (
                  <div key={p.id} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center gap-3 group">
                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{p.name}</p>
                      <p className="text-[10px] text-slate-500">{p.price} {CURRENCY_SYMBOL} · {p.stock} en stock</p>
                    </div>
                    <button 
                      onClick={() => handleAIDescription(p.name)}
                      className="p-1.5 text-primary-600 hover:bg-primary-50 rounded-lg"
                    >
                      <i className="material-icons-round text-sm">bolt</i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right - Live Preview Container */}
        <div className="flex-1 bg-slate-200 dark:bg-slate-950 rounded-[2.5rem] p-4 border-8 border-slate-300 dark:border-slate-900 relative shadow-2xl transition-all">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-4 z-10">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-[10px] font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              APERÇU : {storeConfig.name.toUpperCase()}
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 w-full h-full rounded-[1.5rem] overflow-y-auto shadow-inner no-scrollbar">
            {/* Mock Storefront */}
            <div className="p-8" style={{ fontFamily: storeConfig.font }}>
              <nav className="flex items-center justify-between mb-16">
                <div className="text-2xl font-black tracking-tighter uppercase font-display" style={{ color: storeConfig.primaryColor }}>{storeConfig.name}</div>
                <div className="flex gap-8 text-sm font-semibold text-slate-400">
                  <span className="text-slate-900 dark:text-white border-b-2 pb-1" style={{ borderColor: storeConfig.primaryColor }}>Boutique</span>
                  <span>Catégories</span>
                  <span>À propos</span>
                </div>
                <div className="flex gap-4">
                  <i className="material-icons-round">search</i>
                  <i className="material-icons-round">shopping_bag</i>
                </div>
              </nav>

              <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
                <div className="flex-1 space-y-6">
                  <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Nouveauté</span>
                  <h2 className="text-5xl font-extrabold leading-tight font-display">
                    Design pour le <span style={{ color: storeConfig.primaryColor }} className="italic">Minimalisme.</span>
                  </h2>
                  <p className="text-slate-500 text-lg leading-relaxed">
                    {generatedText || "Découvrez notre collection d'essentiels quotidiens conçus avec soin et fabriqués pour durer."}
                  </p>
                  <button 
                    className="text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl"
                    style={{ backgroundColor: storeConfig.primaryColor, boxShadow: `0 20px 25px -5px ${storeConfig.primaryColor}33` }}
                  >
                    Explorer la collection
                  </button>
                </div>
                <div className="flex-1 w-full">
                  <div className="aspect-[4/5] bg-slate-100 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                    <img src="https://picsum.photos/seed/store/600/800" alt="Hero" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold font-display">Produits Vedettes</h3>
                  <span className="text-sm font-bold underline" style={{ color: storeConfig.primaryColor }}>Tout voir</span>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  {MOCK_PRODUCTS.slice(0, 2).map(p => (
                    <div key={p.id} className="group cursor-pointer">
                      <div className="aspect-[4/5] bg-slate-100 rounded-2xl mb-4 overflow-hidden relative">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur py-3 rounded-xl text-center font-bold text-xs opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">Ajouter au panier</div>
                      </div>
                      <h4 className="font-bold text-sm">{p.name}</h4>
                      <p className="text-slate-500 font-bold mt-1">{p.price} {CURRENCY_SYMBOL}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Processing Overlay */}
        {isGenerating && (
          <div className="fixed inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center">
             <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4 max-w-sm">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto animate-bounce">
                  <i className="material-icons-round text-3xl text-primary-600">bolt</i>
                </div>
                <h3 className="text-xl font-bold">L'IA StorePulse travaille...</h3>
                <p className="text-slate-500 text-sm">Génération de contenu persuasif pour vos produits tunisiens.</p>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-primary-600 h-full w-1/2 animate-shimmer"></div>
                </div>
             </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

const ThemeOption = ({ name, active, image, onClick }: any) => (
  <div 
    onClick={onClick}
    className={`p-1 rounded-xl cursor-pointer transition-all ${active ? 'ring-2 ring-primary-500 bg-primary-50' : 'bg-slate-50 border border-slate-100 dark:bg-slate-800 dark:border-slate-700'}`}
  >
    <div className="aspect-video rounded-lg overflow-hidden bg-white">
      <img src={image} alt={name} className={`w-full h-full object-cover ${active ? 'opacity-100' : 'opacity-40 grayscale'}`} />
    </div>
    <p className={`text-[10px] text-center mt-2 font-bold ${active ? 'text-primary-600' : 'text-slate-400'}`}>{name}</p>
  </div>
);

const ColorCircle = ({ color, active, onClick }: any) => (
  <div 
    onClick={onClick}
    className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-transform active:scale-90 ${active ? 'border-primary-500 p-0.5' : 'border-transparent'}`}
  >
    <div className="w-full h-full rounded-full" style={{ backgroundColor: color }}></div>
  </div>
);

export default StoreBuilder;
