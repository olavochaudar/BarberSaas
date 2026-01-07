
import React, { useState } from 'react';
import { Camera, MapPin, Phone, Globe, Image as ImageIcon, Save, Scissors, Palette } from 'lucide-react';
import { BARBERSHOP } from '../../constants';

export const AdminSettings: React.FC = () => {
  const [shopName, setShopName] = useState(BARBERSHOP.name);
  const [address, setAddress] = useState(BARBERSHOP.address);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-[0.3em]">
             <Palette size={14} /> Brand Identity
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white">Unidade.</h1>
          <p className="text-slate-500 font-medium text-lg">Personalize a identidade visual da sua barbearia para o cliente.</p>
        </div>
        <button className="bg-amber-500 text-slate-950 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center gap-3">
          <Save size={20} /> SALVAR ALTERAÇÕES
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Visual Customization */}
        <div className="xl:col-span-8 space-y-8">
          <div className="bg-slate-900/40 border border-white/10 rounded-[3.5rem] overflow-hidden shadow-2xl">
             <div className="p-8 border-b border-white/5 flex items-center gap-4">
                <div className="bg-white/5 p-3 rounded-2xl text-amber-500"><ImageIcon size={24} /></div>
                <h3 className="text-xl font-black text-white">Imagens da Vitrine</h3>
             </div>
             
             <div className="p-10 space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Banner de Capa</label>
                  <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-white/10 group">
                    <img src={BARBERSHOP.image} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-sm cursor-pointer">
                       <div className="bg-white text-slate-950 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2">
                          <Camera size={16} /> TROCAR CAPA
                       </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Logotipo Principal</label>
                      <div className="w-48 h-48 bg-slate-800 rounded-[2.5rem] border border-dashed border-white/10 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:bg-slate-700/50 transition-all">
                        <div className="bg-amber-500 p-4 rounded-2xl text-slate-950"><Scissors size={32} /></div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Upload PNG</span>
                      </div>
                   </div>
                   <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome da Barbearia</label>
                        <input 
                          type="text" 
                          value={shopName} 
                          onChange={(e) => setShopName(e.target.value)}
                          className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-amber-500/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Telefone de Contato</label>
                        <input 
                          type="text" 
                          value={BARBERSHOP.phone} 
                          className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-amber-500/30"
                        />
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="xl:col-span-4 space-y-8">
           <div className="bg-slate-900/40 border border-white/10 rounded-[3.5rem] p-10 space-y-8 shadow-2xl">
              <div className="flex items-center gap-4">
                 <div className="bg-white/5 p-3 rounded-2xl text-amber-500"><MapPin size={24} /></div>
                 <h3 className="text-xl font-black text-white">Endereço Física</h3>
              </div>
              <div className="space-y-6">
                 <textarea 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 text-white font-medium text-sm min-h-[120px] focus:outline-none focus:border-amber-500/30"
                 />
                 <div className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl flex items-center gap-4">
                   <Globe className="text-amber-500" size={20} />
                   <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Este endereço será usado para o Pin no Google Maps do cliente.</p>
                 </div>
              </div>
           </div>

           <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-[3rem] p-10 text-slate-950 space-y-6 shadow-2xl shadow-amber-500/20">
              <h4 className="text-2xl font-black leading-tight">Plano BarberSaaS <br />Pro Active</h4>
              <p className="text-slate-950/70 text-sm font-bold">Sua unidade está operando no modo Premium com recursos ilimitados.</p>
              <div className="h-[1px] bg-slate-950/10" />
              <button className="w-full py-4 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all">Ver Faturamento</button>
           </div>
        </div>
      </div>
    </div>
  );
};
