
import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  Camera,
  Save,
  CheckCircle2,
  Fingerprint,
  History,
  Activity
} from 'lucide-react';

import { authService } from '../../services/authService';
import { User as UserType } from '../../types';

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
    smsNotifications: true,
    emailMarketing: false
  });

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone || '',
        avatar: currentUser.avatar || '',
        smsNotifications: true,
        emailMarketing: false
      });
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Imagem muito grande! Máximo 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        avatar: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise(r => setTimeout(r, 1200));

    const updated = authService.updateUser(formData);
    if (updated) {
      setUser(updated);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }

    setLoading(false);
  };

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-32 animate-in fade-in duration-1000">

      {/* HEADER: IDENTITY CORE STATUS */}
      <div className="flex flex-col gap-6 px-4">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-1.5 rounded-full flex items-center gap-2">
            <Fingerprint size={12} className="text-amber-500" />
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em]">
              Identity Matrix v4.0
            </span>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">
              Protocolo Ativo
            </span>
          </div>
        </div>

        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none">
          Perfil do <br />
          <span className="text-amber-500 italic font-serif">Mestre.</span>
        </h1>
      </div>

      {/* CONTENT MODULES */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 px-4">

        {/* LEFT COLUMN: VISUAL IDENTITY */}
        <div className="xl:col-span-4 space-y-10">
          <div className="bg-[#0f172a]/40 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-10 flex flex-col items-center text-center space-y-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
            
            <div className="relative">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-[3.5rem] overflow-hidden border-8 border-slate-900 shadow-2xl relative z-10">
                <img
                  src={formData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                  alt={user.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <label className="absolute -bottom-4 -right-4 bg-amber-500 p-5 rounded-3xl shadow-2xl text-slate-950 border-8 border-[#0f172a] cursor-pointer hover:bg-amber-400 hover:scale-110 transition-all active:scale-95 z-20">
                <Camera size={24} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-black text-white tracking-tighter">
                {formData.name || 'Agente Desconhecido'}
              </h3>
              <p className="text-amber-500 text-xs font-black uppercase tracking-[0.4em] mt-2">
                Protocolo VIP
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full relative z-10">
              <div className="bg-slate-950/50 p-6 rounded-3xl border border-white/5 text-center group/stat transition-all hover:bg-white/5">
                <Activity size={20} className="text-amber-500 mx-auto mb-2" />
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Frequência</p>
                <p className="font-black text-slate-200">15 dias</p>
              </div>

              <div className="bg-slate-950/50 p-6 rounded-3xl border border-white/5 text-center group/stat transition-all hover:bg-white/5">
                <History size={20} className="text-amber-500 mx-auto mb-2" />
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Visitas</p>
                <p className="font-black text-white">42 Atend.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DATA TERMINAL */}
        <div className="xl:col-span-8">
          <form
            onSubmit={handleSave}
            className="bg-[#0f172a]/40 backdrop-blur-3xl border border-white/5 rounded-[4rem] p-10 md:p-16 shadow-2xl space-y-12"
          >
            <div className="space-y-10">
              <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                <div className="bg-white/5 p-3 rounded-2xl text-amber-500">
                   <User size={24} />
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">Dados Cadastrais</h3>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">
                    Nome Completo
                  </label>
                  <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-amber-500 transition-colors" size={20} />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-20 rounded-3xl bg-slate-950/60 border border-white/5 pl-16 pr-8 text-white font-black text-lg focus:outline-none focus:border-amber-500/40 focus:ring-4 focus:ring-amber-500/5 transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Email Identity</label>
                    <div className="relative group">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-amber-500 transition-colors" size={20} />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-20 rounded-3xl bg-slate-950/60 border border-white/5 pl-16 pr-8 text-white font-black text-lg focus:outline-none focus:border-amber-500/40 focus:ring-4 focus:ring-amber-500/5 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em] ml-2">Contato Direct</label>
                    <div className="relative group">
                      <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700 group-focus-within:text-amber-500 transition-colors" size={20} />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(00) 00000-0000"
                        className="w-full h-20 rounded-3xl bg-slate-950/60 border border-white/5 pl-16 pr-8 text-white font-black text-lg focus:outline-none focus:border-amber-500/40 focus:ring-4 focus:ring-amber-500/5 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="pt-10 flex flex-col md:flex-row gap-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] h-20 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-3xl text-sm uppercase tracking-[0.3em] shadow-2xl shadow-amber-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-4 group disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-7 h-7 border-4 border-slate-950/20 border-t-slate-950 rounded-full animate-spin" />
                ) : success ? (
                  <><CheckCircle2 size={24} className="animate-in zoom-in" /> DADOS SINCRONIZADOS</>
                ) : (
                  <>SALVAR PROTOCOLO <Save size={20} className="group-hover:rotate-12 transition-transform" /></>
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  setFormData({
                    name: user.name,
                    email: user.email,
                    phone: user.phone || '',
                    avatar: user.avatar || '',
                    smsNotifications: true,
                    emailMarketing: false
                  })
                }
                className="flex-1 h-20 bg-white/5 hover:bg-white/10 text-slate-500 hover:text-white rounded-3xl font-black text-[10px] uppercase tracking-widest border border-white/5 transition-all"
              >
                RESETAR ALTERAÇÕES
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center opacity-20 pt-10">
         <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.6em]">BarberSaaS Protocol • Identity Center • 2025</p>
      </div>
    </div>
  );
};
