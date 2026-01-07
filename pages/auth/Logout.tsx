
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, LogIn, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { authService } from '../../services/authService';

export const Logout: React.FC = () => {
  // Garantir que a sessão seja limpa ao montar este componente
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      authService.logout();
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-6 relative overflow-hidden selection:bg-amber-500/30">
      {/* Atmosphere Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[100vw] h-[100vw] md:w-[600px] md:h-[600px] bg-amber-600/5 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[100vw] h-[100vw] md:w-[600px] md:h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Content Card */}
      <div className="w-full max-w-[480px] bg-[#0f172a]/30 backdrop-blur-3xl rounded-[3.5rem] border border-white/5 p-12 md:p-16 text-center space-y-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] relative z-10 animate-in fade-in zoom-in-95 duration-1000">
        
        {/* Master Icon Section - Styled like the image */}
        <div className="relative w-fit mx-auto">
          {/* Subtle Glow behind icon */}
          <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full scale-150" />
          
          <div className="relative z-10 bg-amber-500 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl">
            <Scissors size={44} className="text-slate-950" strokeWidth={2.5} />
            
            {/* Top Right Mini Badge */}
            <div className="absolute -top-1 -right-1 bg-[#020617] border border-white/10 p-1.5 rounded-xl text-amber-500 shadow-xl">
              <Sparkles size={16} fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Security Badge - Pill style */}
        <div className="flex items-center justify-center gap-2.5 text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 w-fit mx-auto px-6 py-3 rounded-full">
           <ShieldCheck size={16} className="shrink-0" />
           <span className="text-[10px] font-black uppercase tracking-[0.25em]">Sessão encerrada com segurança</span>
        </div>

        {/* Message Content */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
            Até logo, <span className="text-amber-500">Mestre.</span>
          </h1>
          <p className="text-slate-500 font-medium text-base leading-relaxed max-w-[320px] mx-auto opacity-80">
            Sua jornada de estilo e gestão foi salva em nossa nuvem segura.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <Link 
            to="/login"
            className="group w-full bg-amber-500 hover:bg-amber-400 text-slate-950 py-5 rounded-[2rem] font-black text-sm uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgba(245,158,11,0.3)] active:scale-[0.97]"
          >
            ACESSAR NOVAMENTE 
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* System Info Footer */}
        <div className="pt-4 opacity-30">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">
            BarberSaaS Protocol • Sec-Exit 2025
           </p>
        </div>
      </div>

      {/* Background Watermark Text */}
      <div className="absolute bottom-12 left-0 right-0 text-center opacity-[0.03] select-none pointer-events-none">
         <h2 className="text-[12vw] font-black tracking-tighter uppercase leading-none">BarberSaaS</h2>
      </div>
    </div>
  );
};
