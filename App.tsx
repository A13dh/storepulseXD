
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import StoreBuilder from './pages/StoreBuilder';
import AffiliatesPage from './pages/AffiliatesPage';
import AuthPage from './pages/AuthPage';
import StorefrontPreview from './pages/StorefrontPreview';
import Layout from './components/Layout';
import { User, UserRole } from './types';
import { supabase, handleSupabaseError } from './lib/supabase';

const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <Layout>
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
        <i className="material-icons-round text-3xl text-slate-400">construction</i>
      </div>
      <h1 className="text-2xl font-bold font-display">{title}</h1>
      <p className="text-slate-500 mt-2">Cette fonctionnalité arrive bientôt sur StorePulse.</p>
    </div>
  </Layout>
);

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (sessionUser: any) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', sessionUser.id)
        .single();

      if (!error && data) {
        setUser({
          id: sessionUser.id,
          email: sessionUser.email || '',
          name: data.full_name || sessionUser.user_metadata?.name || 'User',
          role: data.role || sessionUser.user_metadata?.role || UserRole.OWNER,
          avatar: data.avatar_url || sessionUser.user_metadata?.avatar_url
        });
      } else {
        // Fallback to metadata if profiles table is missing or entry doesn't exist
        setUser({
          id: sessionUser.id,
          email: sessionUser.email || '',
          name: sessionUser.user_metadata?.name || 'User',
          role: sessionUser.user_metadata?.role || UserRole.OWNER,
          avatar: sessionUser.user_metadata?.avatar_url
        });
      }
    } catch (err) {
      console.error("Auth sync error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-bold text-slate-500 animate-pulse">Connexion à StorePulse...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <AuthPage onAuth={(u) => setUser(u)} />} />
          <Route path="/preview" element={<StorefrontPreview />} />
          <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/auth" />} />
          <Route path="/builder" element={user ? <StoreBuilder /> : <Navigate to="/auth" />} />
          <Route path="/affiliates" element={user ? <AffiliatesPage /> : <Navigate to="/auth" />} />
          <Route path="/analytics" element={<PlaceholderPage title="Statistiques" />} />
          <Route path="/settings" element={<PlaceholderPage title="Paramètres" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
