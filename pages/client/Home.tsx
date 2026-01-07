
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Scissors, Star, Clock, MapPin, ChevronRight, 
  MessageCircle, Navigation, ArrowRight, ShieldCheck, 
  Sparkles, Trophy, Fingerprint, Zap, Instagram, 
  Phone, Globe, Mail, ExternalLink, Map as MapIcon
} from 'lucide-react';
import { BARBERSHOP, SERVICES, PROFESSIONALS } from '../../constants';
import { authService } from '../../services/authService';

export const ClientHome: React.FC = () => {
  const user = authService.getCurrentUser();

  return (
    <div className="space-y-32 md:space-y-64 pb-20 animate-in fade-in duration-1000 overflow-x-hidden">
      
      {/* 1. HERO - EXATAMENTE COMO NA FOTO ENVIADA */}
      <section className="relative min-h-[95vh] flex items-center justify-center -mt-4 md:-mt-12 px-4">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 overflow-hidden rounded-[3rem] md:rounded-[6rem] mx-2 md:mx-6 my-2 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          <img 
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1600" 
            className="w-full h-full object-cover opacity-15 scale-110 blur-[2px]" 
            alt="Hero Background" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
        </div>

        <div className="relative z-10 w-full max-w-6xl text-center space-y-16 py-20">
          <div className="space-y-8 px-4">
            <h1 className="text-7xl md:text-[13rem] font-black tracking-tighter text-white leading-[0.85] animate-in zoom-in-95 duration-1000">
              Mestre do <br />
              <span className="text-amber-500 italic font-serif">Corte.</span>
            </h1>
            
            <div className="space-y-2 max-w-3xl mx-auto">
              <p className="text-slate-300 text-xl md:text-3xl font-medium leading-relaxed opacity-90 drop-shadow-lg">
                Onde a técnica apurada encontra a precisão digital. 
              </p>
              <p className="text-slate-400 text-lg md:text-2xl font-medium opacity-80 italic">
                Sente-se no trono, o resto é conosco.
              </p>
            </div>
          </div>

          <div className="flex justify-center pt-10">
            <Link 
              to={user ? "/booking" : "/login"}
              className="group relative w-full max-w-[320px] bg-amber-500 text-slate-950 px-16 py-8 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_60px_rgba(245,158,11,0.3)] hover:bg-amber-400 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 pointer-events-none" />
              <span className="relative z-10">RESERVAR AGORA</span> 
              <ArrowRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Floating Accent */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 opacity-20 hidden md:block animate-bounce">
           <div className="w-[1px] h-20 bg-gradient-to-b from-amber-500 to-transparent mx-auto" />
           <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.5em] mt-4">Scroll to explore</p>
        </div>
      </section>

      {/* 2. SERVICES SECTION - CENTRALIZADO E LIMPO */}
      <section className="space-y-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-3">
            <p className="text-amber-500 font-black text-xs uppercase tracking-[0.6em] mb-2">THE PROTOCOL</p>
            <h2 className="text-6xl md:text-[9rem] font-black tracking-tighter text-white leading-none">
              Nossos Serviços.
            </h2>
          </div>
          <p className="text-slate-500 font-medium text-lg md:text-2xl max-w-2xl italic leading-relaxed opacity-80">
            Especialidade em barbas master e cortes de alta performance com acabamento digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {SERVICES.map((service, idx) => (
            <Link 
              key={service.id} 
              to="/booking"
              className={`group relative aspect-[3/4] rounded-[4.5rem] overflow-hidden border border-white/5 shadow-2xl transition-all hover:-translate-y-4 bg-slate-900 ${idx % 2 !== 0 ? 'lg:mt-16' : ''}`}
            >
              <img 
                src={service.image} 
                className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
                alt={service.name} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-12 space-y-4 text-center">
                <div className="text-amber-500 text-xl font-black tracking-widest">R$ {service.price}</div>
                <h3 className="text-3xl font-black text-white leading-tight tracking-tighter uppercase">{service.name}</h3>
                <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <Clock size={16} className="text-amber-500" /> {service.durationMinutes} MIN • PREMIUM
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. INSTAGRAM CALL-TO-ACTION - IMPACTO VISUAL */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto bg-[#0f172a] rounded-[5rem] p-16 md:p-32 relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500/10 blur-[150px] rounded-full -mr-60 -mt-60" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 blur-[150px] rounded-full -ml-60 -mb-60" />
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-16">
            <div className="p-12 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-[3.5rem] shadow-[0_30px_60px_rgba(238,42,123,0.3)] rotate-12 hover:rotate-0 transition-transform duration-700 active:scale-90 cursor-pointer">
               <Instagram size={80} className="text-white" strokeWidth={2.5} />
            </div>
            
            <div className="space-y-8">
               <p className="text-amber-500 font-black text-sm uppercase tracking-[0.8em]">CURATED STYLE</p>
               <h2 className="text-6xl md:text-[9rem] font-black text-white tracking-tighter leading-[0.8]">Visual <br /><span className="text-amber-500 italic font-serif">Journal.</span></h2>
               <p className="text-slate-400 text-xl md:text-3xl font-medium max-w-3xl mx-auto italic leading-relaxed opacity-80 px-4">
                 Siga nossa jornada diária e descubra o padrão ouro da estética masculina.
               </p>
            </div>

            <a 
              href={`https://instagram.com/${BARBERSHOP.instagram?.replace('@','')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-slate-950 px-20 py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-amber-500 hover:scale-105 transition-all flex items-center gap-4 active:scale-95"
            >
               ACESSAR PERFIL <ExternalLink size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* 4. CONTACTS & MAP - SEM SOBREPOSIÇÃO */}
      <section className="px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Contact Card */}
            <div className="lg:col-span-5 bg-[#0f172a]/80 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-12 md:p-20 space-y-20 shadow-2xl flex flex-col justify-between overflow-hidden relative">
               <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] pointer-events-none" />
               
               <div className="space-y-10 text-center md:text-left">
                  <div className="space-y-4">
                    <p className="text-amber-500 font-black text-[11px] uppercase tracking-[0.6em]">DIRECT HUB</p>
                    <h3 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">Canal <br /><span className="text-amber-500 italic font-serif">Direto.</span></h3>
                  </div>
                  <p className="text-slate-500 font-medium text-xl md:text-2xl italic opacity-80 leading-relaxed">Conexão imediata com nossa central VIP.</p>
               </div>

               <div className="space-y-8">
                  {/* WHATSAPP */}
                  <a 
                    href={`https://wa.me/${BARBERSHOP.whatsapp}`} 
                    target="_blank" 
                    className="flex items-center gap-8 p-10 bg-[#25D366]/10 border border-[#25D366]/20 rounded-[3.5rem] hover:bg-[#25D366]/20 transition-all group overflow-hidden"
                  >
                     <div className="bg-[#25D366] p-6 rounded-3xl text-white shadow-2xl group-hover:rotate-12 transition-all shrink-0">
                        <MessageCircle size={40} strokeWidth={2.5} fill="currentColor" />
                     </div>
                     <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-black text-[#25D366] uppercase tracking-[0.4em] mb-3 leading-none">WhatsApp Direct</p>
                        <p className="text-3xl font-black text-white tracking-tight break-words">{BARBERSHOP.phone}</p>
                     </div>
                  </a>

                  {/* EMAIL - FIX OVERFLOW */}
                  <div className="flex items-center gap-8 p-10 bg-white/5 border border-white/10 rounded-[3.5rem] hover:bg-white/10 transition-all group overflow-hidden">
                     <div className="bg-amber-500 p-6 rounded-3xl text-slate-950 shadow-2xl group-hover:rotate-12 transition-all shrink-0">
                        <Mail size={40} strokeWidth={2.5} />
                     </div>
                     <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] mb-3 leading-none">E-mail Corporativo</p>
                        <p className="text-xl md:text-2xl font-black text-white tracking-tight truncate break-all">vip@vintageblades.co</p>
                     </div>
                  </div>
               </div>

               <div className="pt-12 border-t border-white/5 flex flex-col items-center md:items-start gap-10">
                  <p className="text-[12px] font-black text-slate-600 uppercase tracking-[0.6em]">SIGA O PROTOCOLO</p>
                  <div className="flex gap-8">
                     <a 
                      href={`https://instagram.com/${BARBERSHOP.instagram?.replace('@','')}`}
                      target="_blank"
                      className="w-24 h-24 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-[2.5rem] flex items-center justify-center text-white hover:scale-110 transition-all shadow-2xl shadow-pink-500/20"
                     >
                        <Instagram size={40} strokeWidth={2.5} />
                     </a>
                     <a 
                      href={`https://wa.me/${BARBERSHOP.whatsapp}`} 
                      target="_blank"
                      className="w-24 h-24 bg-[#25D366] rounded-[2.5rem] flex items-center justify-center text-white hover:scale-110 transition-all shadow-2xl shadow-green-500/20"
                     >
                        <MessageCircle size={40} fill="currentColor" />
                     </a>
                  </div>
               </div>
            </div>

            {/* Map Area - CENTRALIZADO */}
            <div className="lg:col-span-7 bg-[#0f172a] border border-white/5 rounded-[4rem] overflow-hidden shadow-2xl relative group min-h-[700px]">
               <iframe 
                 src={BARBERSHOP.mapUrl} 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%) grayscale(1)" }} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-100 transition-opacity duration-1000"
               />
               <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20" />
               <div className="absolute bottom-16 left-8 right-8 flex flex-col items-center text-center space-y-12">
                  <div className="space-y-8 flex flex-col items-center">
                     <div className="bg-amber-500 p-8 rounded-[2.5rem] text-slate-950 shadow-[0_20px_60px_rgba(245,158,11,0.4)]">
                        <MapPin size={56} strokeWidth={2.5} />
                     </div>
                     <div className="space-y-3 px-6">
                        <h4 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">{BARBERSHOP.address}</h4>
                        <p className="text-amber-500 font-black text-xs uppercase tracking-[0.6em]">HEADQUARTERS VINTAGE BLADES CO.</p>
                     </div>
                  </div>
                  <button 
                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BARBERSHOP.address)}`, '_blank')}
                    className="bg-white text-slate-950 px-16 py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-amber-500 transition-all flex items-center gap-4 shadow-2xl pointer-events-auto active:scale-95"
                  >
                     ABRIR ROTA NO MAPA <Navigation size={28} />
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* FOOTER - FINAL CENTRALIZADO */}
      <footer className="max-w-7xl mx-auto px-6 pb-24">
         <div className="bg-slate-950 border border-white/5 rounded-[6rem] p-20 md:p-40 flex flex-col items-center text-center space-y-20 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-amber-500/5 blur-[250px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col items-center gap-8 relative z-10">
               <div className="bg-amber-500 p-8 rounded-[3rem] shadow-[0_20px_80px_rgba(245,158,11,0.2)]">
                  <Scissors className="text-slate-950" size={64} strokeWidth={2.5} />
               </div>
               <h3 className="text-5xl md:text-8xl font-black text-white tracking-tighter">BarberSaaS.</h3>
            </div>
            
            <p className="text-slate-500 font-medium text-2xl md:text-5xl max-w-6xl leading-relaxed relative z-10 opacity-90 px-4">
               Redefinindo a estética masculina com <br className="hidden md:block" /> precisão digital e maestria clássica. 
            </p>
            
            <div className="flex flex-wrap justify-center gap-x-24 gap-y-12 pt-12 opacity-30 grayscale relative z-10 scale-90 md:scale-100">
               <div className="flex items-center gap-6"><ShieldCheck size={48} /><span className="text-[12px] font-black uppercase tracking-[0.6em]">SECURE IDENTITY</span></div>
               <div className="flex items-center gap-6"><Fingerprint size={48} /><span className="text-[12px] font-black uppercase tracking-[0.6em]">TRUSTED NODE</span></div>
               <div className="flex items-center gap-6"><Trophy size={48} /><span className="text-[12px] font-black uppercase tracking-[0.6em]">ELITE RATED</span></div>
            </div>
            
            <div className="h-[2px] w-64 bg-slate-900 rounded-full" />
            <p className="text-[16px] font-black text-slate-800 uppercase tracking-[1.5em] relative z-10">HQ • 2025</p>
         </div>
      </footer>
    </div>
  );
};
