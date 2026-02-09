
import React from 'react';
import Layout from '../components/Layout';
import { MOCK_AFFILIATES, CURRENCY_SYMBOL } from '../constants';

const AffiliatesPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold font-display">Réseau d'Affiliés</h1>
            <p className="text-slate-500 mt-1">Gérez vos partenaires et suivez leurs performances de vente.</p>
          </div>
          <button className="px-6 py-3 bg-primary-600 text-white font-bold rounded-2xl shadow-xl shadow-primary-600/20 hover:opacity-90 flex items-center gap-2">
            <i className="material-icons-round text-sm">add</i>
            Inviter un Partenaire
          </button>
        </header>

        {/* Top 3 Affiliates Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AffiliatePodium rank={2} affiliate={MOCK_AFFILIATES[0]} color="slate" />
          <AffiliatePodium rank={1} affiliate={MOCK_AFFILIATES[1]} color="primary" />
          <AffiliatePodium rank={3} affiliate={MOCK_AFFILIATES[2]} color="orange" />
        </div>

        {/* Table List */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <h2 className="font-bold text-lg">Partenaires Actifs</h2>
            <div className="flex gap-4">
              <div className="relative">
                <i className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</i>
                <input type="text" placeholder="Rechercher..." className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-primary-600/20" />
              </div>
              <button className="px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                <i className="material-icons-round text-sm">filter_list</i>
                Filtres
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100 dark:border-slate-800">
                  <th className="px-8 py-4">Affilié</th>
                  <th className="px-8 py-4">Statut</th>
                  <th className="px-8 py-4 text-right">Commission</th>
                  <th className="px-8 py-4 text-right">Total Généré</th>
                  <th className="px-8 py-4 text-right">Gains</th>
                  <th className="px-8 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {MOCK_AFFILIATES.map(a => (
                  <tr key={a.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <img src={`https://i.pravatar.cc/150?u=${a.id}`} alt={a.name} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-sm">{a.name}</p>
                          <p className="text-xs text-slate-500">{a.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-tight ${
                        a.status === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {a.status === 'active' ? 'Actif' : 'En attente'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right font-medium text-sm text-slate-600 dark:text-slate-300">15%</td>
                    <td className="px-8 py-5 text-right font-bold text-sm">{a.revenueGenerated} {CURRENCY_SYMBOL}</td>
                    <td className="px-8 py-5 text-right font-bold text-sm text-emerald-500">{a.commissionEarned} {CURRENCY_SYMBOL}</td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-slate-400 hover:text-primary-600">
                        <i className="material-icons-round">more_horiz</i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const AffiliatePodium = ({ rank, affiliate, color }: any) => {
  const isPrimary = color === 'primary';
  return (
    <div className={`p-8 rounded-[2rem] flex flex-col items-center relative overflow-hidden transition-all hover:translate-y-[-8px] ${
      isPrimary ? 'bg-primary-600 text-white shadow-2xl shadow-primary-600/30' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm'
    }`}>
      <div className={`absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
        isPrimary ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
      }`}>
        {rank}
      </div>
      {isPrimary && (
        <div className="absolute top-4 right-4 text-white/50 animate-bounce">
          <i className="material-icons-round">emoji_events</i>
        </div>
      )}
      <img src={`https://i.pravatar.cc/150?u=${affiliate.id}`} alt={affiliate.name} className={`w-24 h-24 rounded-2xl object-cover mb-4 ring-4 ${isPrimary ? 'ring-white/20' : 'ring-slate-50 dark:ring-slate-800'}`} />
      <h3 className="font-bold text-lg">{affiliate.name}</h3>
      <p className={`text-xs mb-6 ${isPrimary ? 'text-primary-100' : 'text-slate-500'}`}>{affiliate.email}</p>
      <div className="grid grid-cols-2 gap-4 w-full px-4">
        <div className={`text-center py-3 rounded-2xl border ${isPrimary ? 'bg-white/10 border-white/10' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`}>
          <p className={`text-[10px] uppercase font-black tracking-widest ${isPrimary ? 'text-primary-100' : 'text-slate-400'}`}>Ventes</p>
          <p className="font-black text-xl">{affiliate.sales}</p>
        </div>
        <div className={`text-center py-3 rounded-2xl border ${isPrimary ? 'bg-white/10 border-white/10' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`}>
          <p className={`text-[10px] uppercase font-black tracking-widest ${isPrimary ? 'text-primary-100' : 'text-slate-400'}`}>Gains</p>
          <p className={`font-black text-xl ${isPrimary ? 'text-white' : 'text-emerald-500'}`}>{affiliate.commissionEarned}</p>
        </div>
      </div>
    </div>
  );
};

export default AffiliatesPage;
