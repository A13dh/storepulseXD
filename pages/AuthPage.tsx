
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, UserRole } from '../types';
import { supabase } from '../lib/supabase';

interface AuthPageProps {
  onAuth: (user: User) => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onAuth }) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [role, setRole] = useState<UserRole>(UserRole.OWNER);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        // 1. Sign up user in Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: `${firstName} ${lastName}`,
              role: role,
            }
          }
        });
        
        if (authError) throw authError;

        // 2. Create entry in 'profiles' table explicitly
        if (authData.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              full_name: `${firstName} ${lastName}`,
              role: role
            });
          
          if (profileError) console.warn("Profile creation failed, might need SQL script run:", profileError.message);

          onAuth({
            id: authData.user.id,
            email: authData.user.email!,
            name: `${firstName} ${lastName}`,
            role: role
          });
        }
      } else {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        if (data.user) {
          onAuth({
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.name || 'User',
            role: data.user.user_metadata?.role || UserRole.OWNER
          });
        }
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-[500px] bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <i className="material-icons-round">bolt</i>
            </div>
            <span className="text-2xl font-black font-display tracking-tighter">StorePulse</span>
          </Link>
          <h2 className="text-2xl font-bold">{isSignUp ? 'Créer votre compte' : 'Bon retour parmi nous'}</h2>
          <p className="text-slate-500 text-sm mt-1">
            {isSignUp ? 'Commencez votre essai gratuit de 14 jours.' : 'Accédez à votre tableau de bord StorePulse.'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 text-sm rounded-xl font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-6">
          {isSignUp && (
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Je souhaite rejoindre en tant que...</label>
              <div className="grid grid-cols-2 gap-4">
                <RoleCard 
                  active={role === UserRole.OWNER} 
                  onClick={() => setRole(UserRole.OWNER)}
                  icon="storefront"
                  title="Commerçant"
                  desc="Vendez vos produits."
                />
                <RoleCard 
                  active={role === UserRole.AFFILIATE} 
                  onClick={() => setRole(UserRole.AFFILIATE)}
                  icon="campaign"
                  title="Affilié"
                  desc="Gagnez des commissions."
                />
              </div>
            </div>
          )}

          {isSignUp && (
            <div className="grid grid-cols-2 gap-4">
              <Input label="Prénom" placeholder="John" value={firstName} onChange={(e: any) => setFirstName(e.target.value)} required />
              <Input label="Nom" placeholder="Doe" value={lastName} onChange={(e: any) => setLastName(e.target.value)} required />
            </div>
          )}

          <Input label="Email" placeholder="nom@entreprise.tn" icon="mail_outline" value={email} onChange={(e: any) => setEmail(e.target.value)} required />
          <Input label="Mot de passe" placeholder="••••••••" type="password" icon="lock_open" value={password} onChange={(e: any) => setPassword(e.target.value)} required />

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary-600/20 hover:opacity-95 transform active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Traitement...' : isSignUp ? "S'inscrire" : 'Se connecter'}
            {!loading && <i className="material-icons-round text-sm">arrow_forward</i>}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500 text-sm">
          {isSignUp ? "Vous avez déjà un compte ?" : "Nouveau sur StorePulse ?"} 
          <button 
            onClick={() => setIsSignUp(!isSignUp)} 
            className="text-primary-600 font-bold ml-1 hover:underline"
          >
            {isSignUp ? 'Connexion' : 'S\'inscrire'}
          </button>
        </p>
      </div>
    </div>
  );
};

const RoleCard = ({ active, onClick, icon, title, desc }: any) => (
  <div 
    onClick={onClick}
    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
      active ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/20' : 'border-slate-100 dark:border-slate-800 hover:border-slate-300'
    }`}
  >
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${active ? 'bg-white text-primary-600' : 'bg-slate-100 text-slate-400'}`}>
      <i className="material-icons-round">{icon}</i>
    </div>
    <h3 className="font-bold text-sm">{title}</h3>
    <p className="text-[10px] text-slate-500 mt-1 leading-tight">{desc}</p>
  </div>
);

const Input = ({ label, placeholder, type = 'text', icon, ...props }: any) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">{label}</label>
    <div className="relative">
      {icon && <i className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">{icon}</i>}
      <input 
        type={type} 
        placeholder={placeholder} 
        {...props}
        className={`w-full py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 transition-all ${icon ? 'pl-11 pr-4' : 'px-4'}`}
      />
    </div>
  </div>
);

export default AuthPage;
