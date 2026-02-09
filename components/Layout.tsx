
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  userRole?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, userRole = 'OWNER' }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden lg:flex flex-col sticky top-0 h-screen z-40">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <span className="font-bold text-xl tracking-tight font-display">StorePulse</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <SidebarLink to="/dashboard" icon="dashboard" label="Tableau de bord" active={isActive('/dashboard')} />
          <SidebarLink to="/builder" icon="store" label="Ma Boutique" active={isActive('/builder')} />
          <SidebarLink to="/affiliates" icon="groups" label="Affiliés" active={isActive('/affiliates')} />
          <SidebarLink to="/analytics" icon="bar_chart" label="Statistiques" active={isActive('/analytics')} />
          <SidebarLink to="/settings" icon="settings" label="Paramètres" active={isActive('/settings')} />
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <img src="https://i.pravatar.cc/150?u=alex" alt="User" className="w-10 h-10 rounded-full" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Alex Rivera</p>
              <p className="text-xs text-slate-500 truncate">Store Owner</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6">
          <div className="lg:hidden flex items-center gap-2">
            <span className="font-bold text-primary-600">SP</span>
          </div>
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <i className="material-icons-round text-sm">search</i>
              </span>
              <input type="text" placeholder="Rechercher..." className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <i className="material-icons-round">notifications_none</i>
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-semibold shadow-md shadow-primary-600/20 hover:opacity-90 transition-opacity">
              <i className="material-icons-round text-sm">add</i>
              <span className="hidden sm:inline">Nouveau</span>
            </button>
          </div>
        </header>
        <main className="p-6 md:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label, active }: { to: string, icon: string, label: string, active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
      active
        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`}
  >
    <i className="material-icons-round">{icon}</i>
    <span className="text-sm">{label}</span>
  </Link>
);

export default Layout;
