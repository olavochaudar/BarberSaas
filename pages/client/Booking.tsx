
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, User, Scissors, Check, ChevronRight, ChevronLeft, Bell } from 'lucide-react';
import { SERVICES, PROFESSIONALS } from '../../constants';

type Step = 'service' | 'professional' | 'time' | 'confirm';

export const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we are coming from a reschedule action
  const preSelected = location.state as { serviceId: string; proId: string } | null;

  const [step, setStep] = useState<Step>(preSelected ? 'time' : 'service');
  const [selectedService, setSelectedService] = useState<string | null>(preSelected?.serviceId || null);
  const [selectedPro, setSelectedPro] = useState<string | null>(preSelected?.proId || null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const service = SERVICES.find(s => s.id === selectedService);
  const professional = PROFESSIONALS.find(p => p.id === selectedPro);

  const times = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const handleBooking = () => {
    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      service,
      professional,
      date: selectedDate,
      time: selectedTime,
      status: 'confirmed',
      reminderEnabled: true // Padrão ativo
    };
    const existing = JSON.parse(localStorage.getItem('my_bookings') || '[]');
    localStorage.setItem('my_bookings', JSON.stringify([...existing, booking]));
    
    // Simulate toast
    alert("Agendamento Confirmado! Você receberá um lembrete em seu dispositivo 1h antes.");
    navigate('/my-bookings');
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <h1 className="font-display text-3xl font-bold mb-8">Agendar Atendimento</h1>

      <div className="flex items-center justify-between mb-12 relative px-4">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0" />
        {['service', 'professional', 'time', 'confirm'].map((s, i) => {
          const isActive = step === s;
          const isDone = ['service', 'professional', 'time', 'confirm'].indexOf(step as string) > i;
          return (
            <div key={s} className="relative z-10 flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                ${isActive ? 'bg-amber-500 border-amber-500 scale-110' : isDone ? 'bg-green-500 border-green-500' : 'bg-slate-900 border-slate-800'}
              `}>
                {isDone ? <Check size={18} className="text-slate-950" /> : <span className={`font-bold ${isActive ? 'text-slate-950' : 'text-slate-500'}`}>{i+1}</span>}
              </div>
              <span className={`text-[10px] uppercase tracking-wider font-bold mt-2 ${isActive ? 'text-amber-500' : 'text-slate-500'}`}>
                {s === 'service' ? 'Serviço' : s === 'professional' ? 'Profissional' : s === 'time' ? 'Horário' : 'Confirmar'}
              </span>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 min-h-[400px]">
        {step === 'service' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Scissors className="text-amber-500" /> Qual o serviço de hoje?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SERVICES.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSelectedService(s.id); setStep('professional'); }}
                  className={`
                    flex items-center gap-4 p-3 rounded-2xl border transition-all text-left group
                    ${selectedService === s.id ? 'bg-amber-500 border-amber-500 text-slate-950' : 'bg-slate-800/50 border-slate-700 hover:border-amber-500/50'}
                  `}
                >
                  <img src={s.image} alt={s.name} className="w-16 h-16 rounded-xl object-cover shadow-lg" />
                  <div className="flex-1">
                    <h4 className="font-bold">{s.name}</h4>
                    <p className={`text-xs ${selectedService === s.id ? 'text-slate-800' : 'text-slate-500'}`}>{s.durationMinutes} min • R$ {s.price}</p>
                  </div>
                  <ChevronRight size={20} className={selectedService === s.id ? 'text-slate-950' : 'text-slate-600'} />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'professional' && (
          <div className="space-y-4">
             <button onClick={() => setStep('service')} className="flex items-center gap-1 text-slate-500 hover:text-white transition-colors text-sm mb-4">
              <ChevronLeft size={16} /> Voltar
            </button>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
              <User className="text-amber-500" /> Com qual profissional?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROFESSIONALS.map(p => (
                <button
                  key={p.id}
                  onClick={() => { setSelectedPro(p.id); setStep('time'); }}
                  className={`
                    flex items-center gap-4 p-4 rounded-2xl border transition-all text-left
                    ${selectedPro === p.id ? 'bg-amber-500 border-amber-500 text-slate-950' : 'bg-slate-800/50 border-slate-700 hover:border-amber-500/50'}
                  `}
                >
                  <img src={p.avatar} alt={p.name} className="w-14 h-14 rounded-full object-cover border-2 border-slate-700 shadow-lg" />
                  <div className="flex-1">
                    <h4 className="font-bold">{p.name}</h4>
                    <p className={`text-xs ${selectedPro === p.id ? 'text-slate-800' : 'text-slate-500'}`}>{p.specialty}</p>
                  </div>
                  <ChevronRight size={20} className={selectedPro === p.id ? 'text-slate-950' : 'text-slate-600'} />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'time' && (
          <div className="space-y-6">
             <button 
                onClick={() => setStep(preSelected ? 'service' : 'professional')} 
                className="flex items-center gap-1 text-slate-500 hover:text-white transition-colors text-sm mb-4"
             >
              <ChevronLeft size={16} /> Voltar
            </button>
            <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Calendar className="text-amber-500" /> Quando podemos te receber?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-800/30 p-4 rounded-2xl border border-slate-800 shadow-inner">
                <input 
                  type="date" 
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-transparent border-none text-white focus:ring-0 cursor-pointer"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {times.map(t => (
                  <button
                    key={t}
                    onClick={() => { setSelectedTime(t); setStep('confirm'); }}
                    disabled={!selectedDate}
                    className={`
                      py-3 rounded-xl border text-sm font-bold transition-all disabled:opacity-30
                      ${selectedTime === t ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-800/50 border-slate-700 hover:border-amber-500/50'}
                    `}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 'confirm' && (
          <div className="space-y-8 flex flex-col items-center text-center">
             <button onClick={() => setStep('time')} className="self-start flex items-center gap-1 text-slate-500 hover:text-white transition-colors text-sm">
              <ChevronLeft size={16} /> Voltar
            </button>
            <div className="bg-amber-500/10 p-6 rounded-full ring-8 ring-amber-500/5">
              <Check className="text-amber-500" size={48} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Tudo pronto!</h3>
              <p className="text-slate-400">Revise os detalhes da sua visita.</p>
            </div>

            <div className="w-full max-w-sm bg-slate-800/40 rounded-3xl p-6 border border-slate-800 space-y-4 text-left overflow-hidden">
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-700/50">
                <img src={service?.image} alt={service?.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                   <h4 className="font-bold text-slate-100">{service?.name}</h4>
                   <p className="text-xs text-slate-500">{service?.durationMinutes} min</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">Barbeiro:</span>
                <div className="flex items-center gap-2">
                   <img src={professional?.avatar} alt={professional?.name} className="w-6 h-6 rounded-full object-cover" />
                   <span className="font-bold">{professional?.name}</span>
                </div>
              </div>
              
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Data:</span>
                <span className="font-bold">{selectedDate}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Horário:</span>
                <span className="font-bold">{selectedTime}</span>
              </div>
              
              <div className="bg-amber-500/10 p-3 rounded-2xl flex items-center gap-3 border border-amber-500/10">
                <Bell size={16} className="text-amber-500" />
                <span className="text-[10px] text-amber-500/80 font-bold uppercase tracking-widest">Lembrete ativado via Push</span>
              </div>

              <div className="flex justify-between py-2 pt-4 border-t border-slate-700/50">
                <span className="text-slate-100 font-bold">Total a pagar:</span>
                <span className="text-amber-500 text-xl font-black">R$ {service?.price}</span>
              </div>
            </div>

            <button
              onClick={handleBooking}
              className="w-full max-w-sm bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-4 rounded-2xl transition-all shadow-xl shadow-amber-500/20 active:scale-95"
            >
              Confirmar Agendamento
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
