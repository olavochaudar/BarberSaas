
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scissors, Mail, Lock, Chrome, ArrowRight, ShieldCheck, Sparkles, Zap, ShieldAlert } from 'lucide-react';
import { authService } from '../../services/authService';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = isLogin 
        ? await authService.login(email)
        : await authService.signup("Novo Mestre", email);
      
      if (user) {
        navigate(user.role === 'ADMIN' ? '/admin' : '/');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const user = await authService.login('cliente@google.com', undefined, true);
      if (user) navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-4 md:p-10 relative overflow-hidden selection:bg-amber-500/30">
      {/* Background Atmosphere - Enhanced Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-amber-600/10 blur-[150px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 bg-[#0f172a]/20 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 overflow-hidden shadow-[0_80px_150px_-30px_rgba(0,0,0,0.9)] z-10 animate-in fade-in zoom-in-95 duration-1000">
        
        {/* Left Visual Section: CINEMATIC IMAGE IMPACT */}
        <div className="hidden lg:flex flex-col justify-between p-20 relative overflow-hidden border-r border-white/5 group">
          
          {/* Background Image with Slow Pan Animation */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover opacity-40 scale-105 group-hover:scale-110 transition-transform duration-[10s] ease-linear brightness-[0.6] sepia-[0.3]" 
              alt="Barber Shop Atmosphere"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#020617]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
          </div>

          <div className="relative z-10">
             <div className="flex items-center gap-4 mb-12 animate-in slide-in-from-left-4 duration-700">
                <div className="bg-amber-500 p-3 rounded-2xl shadow-xl shadow-amber-500/20">
                  <Scissors className="text-slate-950" size={28} />
                </div>
                <div className="min-w-0">
                  <span className="text-3xl font-black tracking-tighter text-white block leading-none">BarberSaaS.</span>
                  <span className="text-[9px] text-amber-500/60 font-black uppercase tracking-[0.4em] mt-1.5 block">Identity Core</span>
                </div>
             </div>

             <div className="space-y-8 pt-10 animate-in slide-in-from-bottom-8 duration-1000">
                <h2 className="text-6xl font-black leading-[0.9] tracking-tighter text-white">
                  A elite <br />
                  da gestão <br />
                  está <span className="text-amber-500 italic font-serif">aqui.</span>
                </h2>
                <p className="text-slate-100/60 font-medium text-lg leading-relaxed max-w-sm">
                  Acesse o protocolo master e assuma o controle total da sua jornada estética e operacional.
                </p>
             </div>
          </div>

          <div className="relative z-10 flex items-center gap-10 opacity-60">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <ShieldCheck className="text-amber-500" size={18} />
              </div>
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Protocolo Sec-Auth</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <Zap className="text-amber-500" size={18} />
              </div>
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Real-time Sync</span>
            </div>
          </div>
        </div>

        {/* Right Form Section: Refined Experience */}
        <div className="p-8 md:p-20 flex flex-col justify-center space-y-12">
          <div className="space-y-4">
            <div className="lg:hidden flex items-center gap-4 mb-10">
              <div className="bg-amber-500 p-2.5 rounded-xl">
                <Scissors className="text-slate-950" size={22} />
              </div>
              <span className="text-2xl font-black tracking-tighter">BarberSaaS.</span>
            </div>
            
            <div className="flex items-center gap-3 text-amber-500 bg-amber-500/5 border border-amber-500/10 w-fit px-4 py-1.5 rounded-full mb-2">
               <Sparkles size={12} fill="currentColor" />
               <span className="text-[9px] font-black uppercase tracking-widest">Acesso Restrito</span>
            </div>
            
            <h1 className="text-5xl font-black tracking-tighter text-white">
              {isLogin ? 'Bem-vindo,' : 'Crie sua'} <span className="text-amber-500">{isLogin ? 'Mestre.' : 'Conta.'}</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
               {isLogin ? 'Sua jornada master continua a partir daqui.' : 'Comece a operar com o sistema líder de mercado.'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] ml-1">Autenticação por E-mail</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-amber-500 transition-colors" size={24} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@protocolo.com"
                  className="w-full h-20 bg-slate-950/40 border border-white/5 rounded-3xl pl-16 pr-8 text-white text-lg focus:outline-none focus:border-amber-500/30 focus:ring-4 focus:ring-amber-500/5 transition-all placeholder:text-slate-800 font-bold"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between mx-1">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Credencial de Segurança</label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-amber-500 transition-colors" size={24} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••••••"
                  className="w-full h-20 bg-slate-950/40 border border-white/5 rounded-3xl pl-16 pr-8 text-white text-lg focus:outline-none focus:border-amber-500/30 focus:ring-4 focus:ring-amber-500/5 transition-all placeholder:text-slate-800 font-bold"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full h-20 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-3xl transition-all active:scale-[0.98] shadow-2xl shadow-amber-500/20 flex items-center justify-center gap-4 text-sm uppercase tracking-widest"
            >
              {loading ? (
                <div className="w-7 h-7 border-4 border-slate-950/20 border-t-slate-950 rounded-full animate-spin" />
              ) : (
                <>{isLogin ? 'ENTRAR NO SISTEMA' : 'FINALIZAR REGISTRO'} <ArrowRight size={22} /></>
              )}
            </button>
          </form>

          <div className="flex items-center gap-6 py-4">
            <div className="h-[1px] flex-1 bg-white/5" />
            <span className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">Alternativa Master</span>
            <div className="h-[1px] flex-1 bg-white/5" />
          </div>

          <div className="space-y-6">
            <button 
              onClick={handleGoogleLogin}
              className="w-full h-18 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black rounded-3xl transition-all flex items-center justify-center gap-4 active:scale-95 text-xs uppercase tracking-widest"
            >
              <Chrome size={24} className="text-blue-500" /> ACESSAR VIA GOOGLE
            </button>
            
            <div className="text-center pt-2">
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="group text-slate-500 text-sm font-bold hover:text-white transition-colors"
              >
                {isLogin ? 'Ainda não é um mestre?' : 'Já possui credenciais?'} 
                <span className="text-amber-500 font-black ml-2 uppercase tracking-tighter border-b border-transparent group-hover:border-amber-500 transition-all pb-0.5">
                  {isLogin ? 'Iniciar Agora' : 'Acessar Conta'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 text-center opacity-20 flex flex-col items-center gap-3">
         <ShieldAlert size={20} className="text-amber-500" />
         <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em]">BarberSaaS High Performance Architecture • Sec-Auth v4.0</p>
      </div>
    </div>
  );
};
