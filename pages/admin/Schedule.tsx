
import React, { useState, useEffect } from 'react';
import { Clock, Coffee, Moon, Sun, Save, CheckCircle2, XCircle, AlertCircle, Sparkles, ChevronRight, Calendar } from 'lucide-react';
import { OperatingDay } from '../../types';

const DAYS_OF_WEEK = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

const DEFAULT_SCHEDULE: Record<string, OperatingDay> = {
  "Segunda": { isOpen: true, openTime: "09:00", closeTime: "19:00", hasLunchBreak: true, lunchStart: "12:00", lunchEnd: "13:00" },
  "Terça": { isOpen: true, openTime: "09:00", closeTime: "19:00", hasLunchBreak: true, lunchStart: "12:00", lunchEnd: "13:00" },
  "Quarta": { isOpen: true, openTime: "09:00", closeTime: "19:00", hasLunchBreak: true, lunchStart: "12:00", lunchEnd: "13:00" },
  "Quinta": { isOpen: true, openTime: "09:00", closeTime: "19:00", hasLunchBreak: true, lunchStart: "12:00", lunchEnd: "13:00" },
  "Sexta": { isOpen: true, openTime: "09:00", closeTime: "21:00", hasLunchBreak: true, lunchStart: "12:00", lunchEnd: "13:00" },
  "Sábado": { isOpen: true, openTime: "08:00", closeTime: "20:00", hasLunchBreak: true, lunchStart: "12:00", lunchEnd: "13:00" },
  "Domingo": { isOpen: false, openTime: "09:00", closeTime: "17:00", hasLunchBreak: false, lunchStart: "12:00", lunchEnd: "13:00" },
};

export const AdminSchedule: React.FC = () => {
  const [schedule, setSchedule] = useState<Record<string, OperatingDay>>(DEFAULT_SCHEDULE);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('barbershop_schedule');
    if (saved) {
      setSchedule(JSON.parse(saved));
    }
  }, []);

  const handleUpdate = (day: string, field: keyof OperatingDay, value: any) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    localStorage.setItem('barbershop_schedule', JSON.stringify(schedule));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-32">
      
      {/* Header Centralizado e Responsivo */}
      <div className="flex flex-col items-center text-center space-y-8 px-4">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 bg-amber-500/10 border border-amber-500/20 px-6 py-2 rounded-full mx-auto">
             <Clock size={14} className="text-amber-500" />
             <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em]">Operations Management</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none">
            Horários de <br />
            <span className="text-amber-500 italic font-serif">Expediente.</span>
          </h1>
          <p className="text-slate-500 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Configure o fluxo operacional da unidade. Defina janelas de atendimento e intervalos estratégicos.
          </p>
        </div>
        
        <button 
          onClick={handleSave}
          disabled={loading}
          className="w-full sm:w-auto bg-amber-500 text-slate-950 px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-amber-500/20 hover:bg-amber-400 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-4 border-slate-950/20 border-t-slate-950 rounded-full animate-spin" />
          ) : success ? (
            <><CheckCircle2 size={24} /> SINCRONIZADO</>
          ) : (
            <><Save size={24} /> SALVAR PROTOCOLO</>
          )}
        </button>
      </div>

      {/* Lista de Dias Otimizada */}
      <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto px-4">
        {DAYS_OF_WEEK.map((day) => {
          const config = schedule[day];
          return (
            <div 
              key={day}
              className={`bg-slate-900/40 border transition-all duration-700 rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-2xl relative ${config.isOpen ? 'border-white/10' : 'border-red-500/10 grayscale-[0.5] opacity-60'}`}
            >
              <div className="p-8 md:p-14 flex flex-col xl:flex-row xl:items-center gap-10 md:gap-16">
                
                {/* Lado Esquerdo: Dia e Status */}
                <div className="xl:w-80 flex flex-col sm:flex-row xl:flex-col items-center sm:justify-between xl:justify-start gap-8">
                  <div className="text-center sm:text-left xl:text-center space-y-3">
                    <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">{day}</h3>
                    <div className="flex items-center justify-center sm:justify-start xl:justify-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${config.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                      <span className={`text-[11px] font-black uppercase tracking-[0.3em] ${config.isOpen ? 'text-emerald-500' : 'text-red-500'}`}>
                        {config.isOpen ? 'UNIDADE ATIVA' : 'AGENDA BLOQUEADA'}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleUpdate(day, 'isOpen', !config.isOpen)}
                    className={`w-full sm:w-auto xl:w-full py-5 px-8 rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all border flex items-center justify-center gap-3 shadow-lg active:scale-95 ${
                      config.isOpen 
                      ? 'bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white' 
                      : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                    }`}
                  >
                    {config.isOpen ? <><Moon size={18} /> MARCAR FOLGA</> : <><Sun size={18} /> ABRIR DIA</>}
                  </button>
                </div>

                {/* Centro: Configuração de Horas */}
                <div className={`flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 transition-all duration-700 ${!config.isOpen && 'pointer-events-none opacity-10 blur-sm translate-y-4'}`}>
                  
                  {/* Horário Principal */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 border-l-4 border-amber-500 pl-4 py-1">
                       <Clock size={18} className="text-amber-500" />
                       <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Funcionamento</label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-slate-950 border border-white/5 rounded-3xl p-6 flex flex-col gap-2 group hover:border-amber-500/30 transition-all shadow-inner">
                          <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Abertura</span>
                          <input 
                            type="time" 
                            value={config.openTime}
                            onChange={(e) => handleUpdate(day, 'openTime', e.target.value)}
                            className="bg-transparent border-none text-white font-black text-2xl focus:ring-0 p-0 cursor-pointer"
                          />
                       </div>
                       <div className="bg-slate-950 border border-white/5 rounded-3xl p-6 flex flex-col gap-2 group hover:border-amber-500/30 transition-all shadow-inner">
                          <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Fechamento</span>
                          <input 
                            type="time" 
                            value={config.closeTime}
                            onChange={(e) => handleUpdate(day, 'closeTime', e.target.value)}
                            className="bg-transparent border-none text-white font-black text-2xl focus:ring-0 p-0 cursor-pointer"
                          />
                       </div>
                    </div>
                  </div>

                  {/* Intervalo Estratégico */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-l-4 border-blue-500 pl-4 py-1">
                       <div className="flex items-center gap-3">
                         <Coffee size={18} className="text-blue-500" />
                         <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Intervalo</label>
                       </div>
                       <button 
                        onClick={() => handleUpdate(day, 'hasLunchBreak', !config.hasLunchBreak)}
                        className={`text-[9px] font-black px-4 py-2 rounded-xl transition-all border ${config.hasLunchBreak ? 'bg-blue-500 border-blue-500 text-slate-950' : 'bg-white/5 border-white/10 text-slate-600'}`}
                       >
                         {config.hasLunchBreak ? 'ATIVO' : 'DESL.'}
                       </button>
                    </div>
                    <div className={`grid grid-cols-2 gap-4 transition-all duration-500 ${!config.hasLunchBreak && 'opacity-20 pointer-events-none scale-95'}`}>
                       <div className="bg-slate-950 border border-white/5 rounded-3xl p-6 flex flex-col gap-2 group hover:border-blue-500/30 transition-all shadow-inner">
                          <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Saída</span>
                          <input 
                            type="time" 
                            value={config.lunchStart}
                            onChange={(e) => handleUpdate(day, 'lunchStart', e.target.value)}
                            className="bg-transparent border-none text-white font-black text-2xl focus:ring-0 p-0 cursor-pointer"
                          />
                       </div>
                       <div className="bg-slate-950 border border-white/5 rounded-3xl p-6 flex flex-col gap-2 group hover:border-blue-500/30 transition-all shadow-inner">
                          <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Retorno</span>
                          <input 
                            type="time" 
                            value={config.lunchEnd}
                            onChange={(e) => handleUpdate(day, 'lunchEnd', e.target.value)}
                            className="bg-transparent border-none text-white font-black text-2xl focus:ring-0 p-0 cursor-pointer"
                          />
                       </div>
                    </div>
                  </div>
                </div>

                {/* Direita: Insight */}
                <div className="hidden 2xl:flex flex-col justify-center items-center gap-6 bg-white/5 border border-white/10 rounded-[3rem] p-10 text-center w-56 shrink-0 transition-all group hover:bg-white/[0.08]">
                   <div className="p-4 bg-amber-500/10 rounded-2xl text-amber-500 group-hover:scale-110 transition-transform shadow-xl">
                      <Sparkles size={28} />
                   </div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-relaxed px-2">
                     {config.isOpen 
                       ? `Slot operacional configurado para o mestre.`
                       : "Bloqueio automático de nova reserva."}
                   </p>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Alerta de Segurança e Feedback */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-950/80 backdrop-blur-2xl border border-white/5 p-10 md:p-14 rounded-[4rem] flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Calendar size={120} className="text-amber-500" />
           </div>
           <div className="bg-amber-500/10 p-6 rounded-[2.5rem] text-amber-500 shrink-0 shadow-2xl border border-amber-500/20">
             <AlertCircle size={48} />
           </div>
           <div className="space-y-4 text-center md:text-left relative z-10">
              <h4 className="text-2xl md:text-3xl font-black text-white tracking-tight">Protocolo de Sincronização</h4>
              <p className="text-slate-500 text-lg font-medium leading-relaxed italic opacity-80">
                Alterações de escala não cancelam horários já confirmados, mas fecham janelas futuras para novos agendamentos imediatamente.
              </p>
           </div>
        </div>
      </div>

    </div>
  );
};
