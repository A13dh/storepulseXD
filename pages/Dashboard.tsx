
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_ANALYTICS, CURRENCY_SYMBOL } from '../constants';
import { User } from '../types';
import { supabase, handleSupabaseError } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC<{ user: User | null }> = ({ user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [stats, setStats] = useState({
    totalSales: '0.00',
    orders: '0',
    activeAffiliates: '0',
    dailyRevenue: '0.00'
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
    } catch (err) {
      navigate('/auth');
    }
  };

  const seedTestData = async () => {
    if (!user) return;
    setIsSeeding(true);
    try {
      const testOrders = [
        { id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`, store_id: user.id, client_name: 'Ahmed Ben S.', status: 'En attente', amount: 155.00 },
        { id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`, store_id: user.id, client_name: 'Sarra K.', status: 'Expédié', amount: 89.90 },
      ];
      
      const { error } = await supabase.from('orders').insert(testOrders);
      if (error) throw error;
      
      alert("Données réelles créées avec succès !");
      fetchDashboardData();
    } catch (err: any) {
      alert("Erreur lors de la création : " + err.message);
    } finally {
      setIsSeeding(false);
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!ordersError && ordersData && ordersData.length > 0) {
        const total = ordersData.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);
        const count = ordersData.length;
        
        setStats({
          totalSales: total.toLocaleString('fr-TN', { minimumFractionDigits: 2 }),
          orders: count.toString(),
          activeAffiliates: '0',
          dailyRevenue: '0.00'
        });
        setRecentOrders(ordersData.slice(0, 5));
      } else {
        // Fallback to mock data UI if empty
        setStats({
          totalSales: '12,840.50',
          orders: '1,429',
          activeAffiliates: '324',
          dailyRevenue: '1,240.50'
        });
        setRecentOrders([
          { id: '#ORD-7234', client_name: 'James Robertson', status: 'Expédié', created_at: new Date().toISOString(), amount: 124.00 },
          { id: '#ORD-7235', client_name: 'Linda Thompson', status: 'En cours', created_at: new Date().toISOString(), amount: 89.50 },
          { id: '#ORD-7236', client_name: 'David Miller', status: 'En attente', created_at: new Date().toISOString(), amount: 210.00 }
        ]);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchDashboardData();
  }, [user]);

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-extrabold font-display">Bienvenue, {user?.name?.split(' ')[0] || 'Ami'} ! 👋</h1>
            <p className="text-slate-500 mt-1">L'état de votre commerce en temps réel.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={seedTestData}
              disabled={isSeeding}
              className="px-4 py-2 text-sm font-bold text-primary-600 bg-primary-50 border border-primary-200 rounded-xl hover:bg-primary-100 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <i className="material-icons-round text-sm">analytics</i>
              {isSeeding ? 'Création...' : 'Tester Connexion Réelle'}
            </button>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all flex items-center gap-2 border border-slate-200 dark:border-slate-800"
            >
              <i className="material-icons-round text-sm">logout</i>
              Déconnexion
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Ventes Totales" value={stats.totalSales} trend="+12.5%" icon="payments" color="blue" />
          <StatCard title="Commandes" value={stats.orders} trend="+8.2%" icon="shopping_cart" color="orange" />
          <StatCard title="Affiliés Actifs" value={stats.activeAffiliates} trend="Stable" icon="groups" color="purple" />
          <StatCard title="Revenu du jour" value={stats.dailyRevenue} trend="-2.4%" icon="trending_up" color="emerald" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Charts */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-lg">Performance des ventes</h3>
              <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-xs font-semibold py-1.5 px-3">
                <option>7 derniers jours</option>
                <option>30 derniers jours</option>
              </select>
            </div>
            <div className="w-full" style={{ height: '300px', minHeight: '300px', minWidth: '0' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_ANALYTICS}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="100%">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 12, fill: '#64748b'}} 
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{
                      borderRadius: '12px', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#0ea5e9" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorRev)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Affiliates */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Meilleurs Affiliés</h3>
              <i className="material-icons-round text-slate-300">stars</i>
            </div>
            <div className="space-y-6">
              <AffiliateItem name="Sarah Jenkins" sales={24} revenue={1240} trend="+12%" avatar="https://i.pravatar.cc/150?u=1" />
              <AffiliateItem name="Moez Gharbi" sales={18} revenue={940} trend="+5%" avatar="https://i.pravatar.cc/150?u=2" />
              <AffiliateItem name="Amira Ben Ali" sales={15} revenue={720} trend="-2%" avatar="https://i.pravatar.cc/150?u=3" />
              <button className="w-full py-3 text-sm font-semibold text-primary-600 bg-primary-50 dark:bg-primary-900/20 rounded-xl hover:bg-primary-100 transition-colors mt-4">
                Voir tous les affiliés
              </button>
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-lg">Commandes Récentes</h3>
            <button className="text-sm font-semibold text-primary-600 hover:underline">Tout voir</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">ID Commande</th>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Statut</th>
                  <th className="px-6 py-4 text-right">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentOrders.map((order, idx) => (
                  <OrderRow 
                    key={idx}
                    id={order.id} 
                    client={order.client_name || order.client} 
                    status={order.status} 
                    date={new Date(order.created_at).toLocaleDateString()} 
                    amount={typeof order.amount === 'number' ? order.amount.toFixed(2) : parseFloat(order.amount).toFixed(2)} 
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const StatCard = ({ title, value, trend, icon, color }: any) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-primary-500/50 transition-colors">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${color}-50 text-${color}-600 dark:bg-${color}-900/20`}>
        <i className="material-icons-round">{icon}</i>
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend?.startsWith('+') ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'text-slate-400 bg-slate-50 dark:bg-slate-800'}`}>
        {trend}
      </span>
    </div>
    <p className="text-slate-500 text-sm font-medium">{title}</p>
    <p className="text-2xl font-bold mt-1 font-display">{value} <span className="text-xs font-normal text-slate-400">{CURRENCY_SYMBOL}</span></p>
  </div>
);

const AffiliateItem = ({ name, sales, revenue, trend, avatar }: any) => (
  <div className="flex items-center gap-4 group cursor-pointer">
    <img src={avatar} alt={name} className="w-10 h-10 rounded-full grayscale group-hover:grayscale-0 transition-all" />
    <div className="flex-1 min-w-0">
      <p className="text-sm font-bold truncate group-hover:text-primary-600 transition-colors">{name}</p>
      <p className="text-xs text-slate-500">{sales} ventes · {revenue} {CURRENCY_SYMBOL}</p>
    </div>
    <span className={`text-xs font-bold ${trend?.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{trend}</span>
  </div>
);

const OrderRow = ({ id, client, status, amount }: any) => (
  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors text-sm">
    <td className="px-6 py-4 font-semibold text-primary-600">{id}</td>
    <td className="px-6 py-4 font-medium">{client}</td>
    <td className="px-6 py-4">
      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
        status === 'Expédié' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
        status === 'En cours' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
        'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
      }`}>
        {status}
      </span>
    </td>
    <td className="px-6 py-4 text-right font-bold font-display">{amount} {CURRENCY_SYMBOL}</td>
  </tr>
);

export default Dashboard;
