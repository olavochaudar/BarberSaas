
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, User, Scissors, XCircle, CheckCircle, AlertCircle, 
  ChevronRight, Plus, X, Info, MapPin, DollarSign, Timer, Bell, 
  BellOff, BellRing, MessageSquare, RefreshCw, Star, Navigation, 
  ExternalLink, History, ArrowUpRight, Map as MapIcon, Send, ChevronLeft,
  Globe
} from 'lucide-react';
import { SERVICES, EMPTY_STATE_IMAGE, PROFESSIONALS, BARBERSHOP } from '../../constants';
import { Booking, BookingReview } from '../../types';

interface BookingRecord extends Booking {
  service: { id?: string; name: string; price: number };
  professional: { id: string; name: string; avatar: string };
}

const CANCELLATION_REASONS = [
  'Mudança de planos',
  'Problema de saúde',
  'Encontrei outro horário',
  'Incompatibilidade de agenda',
  'Outro'
];

export const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);
  const [bookingToCancel, setBookingToCancel] = useState<BookingRecord | null>(null);
  const [selectedReason, setSelectedReason] = useState<string>('');
  
  // Review State
  const [reviewingBooking, setReviewingBooking] = useState<BookingRecord | null>(null);
  const [tempRating, setTempRating] = useState<number>(0);
  const [tempComment, setTempComment] = useState<string>('');

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('my_bookings');
    if (saved) {
      setBookings(JSON.parse(saved));
    }
  }, []);

  const handleCancelConfirm = () => {
    if (!bookingToCancel || !selectedReason) return;

    const updated = bookings.map(b => 
      b.id === bookingToCancel.id 
        ? { ...b, status: 'cancelled' as const, cancellationReason: selectedReason } 
        : b
    );
    
    setBookings(updated);
    localStorage.setItem('my_bookings', JSON.stringify(updated));
    
    if (selectedBooking?.id === bookingToCancel.id) {
      setSelectedBooking({ ...selectedBooking, status: 'cancelled' as const, cancellationReason: selectedReason });
    }

    setBookingToCancel(null);
    setSelectedReason('');
  };

  const handleReschedule = (booking: BookingRecord) => {
    navigate('/booking', { 
      state: { 
        serviceId: booking.service.id, 
        proId: booking.professional.id 
      } 
    });
  };

  const toggleReminder = (id: string) => {
    const updated = bookings.map(b => 
      b.id === id ? { ...b, reminderEnabled: !b.reminderEnabled } : b
    );
    setBookings(updated);
    localStorage.setItem('my_bookings', JSON.stringify(updated));
  };

  const submitReview = () => {
    if (!reviewingBooking || tempRating === 0) return;

    const review: BookingReview = {
      rating: tempRating,
      comment: tempComment,
      createdAt: new Date().toISOString()
    };

    const updated = bookings.map(b => 
      b.id === reviewingBooking.id ? { ...b, review } : b
    );

    setBookings(updated);
    localStorage.setItem('my_bookings', JSON.stringify(updated));
    
    // Reset states
    setReviewingBooking(null);
    setTempRating(0);
    setTempComment('');
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'cancelled': return 'Cancelado';
      case 'completed': return 'Concluído';
      default: return 'Pendente';
    }
  };

  const getServiceDetails = (serviceId?: string) => {
    return SERVICES.find(s => s.id === serviceId);
  };

  const getProfessionalFullDetails = (proId: string) => {
    return PROFESSIONALS.find(p => p.id === proId);
  };

  const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending')
    .sort((a, b) => b.date.localeCompare(a.date));
  
  const historyBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled')
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="max-w-4xl mx-auto space-y-16 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 px-4 md:px-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-[0.3em]">
             <Scissors size={14} /> My Grooming Journal
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tighter text-white">Agenda VIP</h1>
          <p className="text-slate-500 text-sm md:text-base font-medium">Gerencie sua jornada de estilo e manutenção pessoal.</p>
        </div>
        <Link 
          to="/booking"
          className="bg-amber-500 text-slate-950 px-10 py-5 rounded-[2rem] font-black shadow-2xl shadow-amber-500/20 hover:bg-amber-400 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
        >
          <Plus size={24} className="group-hover:rotate-90 transition-transform" />
          NOVA RESERVA
        </Link>
      </div>

      <section className="space-y-8 px-4 md:px-0">
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
          <div className="flex items-center gap-4">
            <div className="bg-amber-500/10 p-3 rounded-2xl border border-amber-500/20">
              <Calendar className="text-amber-500" size={24} />
            </div>
            <h2 className="text-2xl font-black text-slate-100 tracking-tight">Próximas Visitas</h2>
          </div>
          <span className="bg-slate-900 text-[10px] font-black text-slate-500 px-4 py-2 rounded-xl uppercase tracking-widest">{activeBookings.length} Total</span>
        </div>

        {activeBookings.length === 0 ? (
          <div className="bg-slate-900/40 border border-white/5 rounded-[4rem] p-20 text-center space-y-8 backdrop-blur-md">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto ring-8 ring-slate-900 shadow-inner">
               <Calendar className="text-slate-600" size={40} />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-slate-200">Agenda Vazia</h3>
              <p className="text-slate-500 text-sm font-medium max-w-xs mx-auto">Você ainda não tem nenhum horário reservado para os próximos dias.</p>
            </div>
            <Link to="/booking" className="inline-flex items-center gap-3 bg-white/10 hover:bg-amber-500 hover:text-slate-950 px-10 py-4 rounded-2xl text-xs font-black transition-all border border-white/10 group">
              RESERVAR AGORA <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {activeBookings.map((booking) => {
              const serviceDetails = getServiceDetails(booking.service.id);
              return (
              <div 
                key={booking.id}
                onClick={() => setSelectedBooking(booking)}
                className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[3rem] p-8 md:p-10 hover:border-amber-500/40 hover:bg-slate-900/60 transition-all group relative overflow-hidden shadow-2xl cursor-pointer"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-10">
                  <div className="flex items-center gap-8 flex-1">
                    <div className="relative shrink-0">
                      <img 
                        src={booking.professional.avatar} 
                        alt={booking.professional.name} 
                        className="w-24 h-24 rounded-[2.5rem] object-cover border-4 border-slate-800 group-hover:scale-105 transition-transform shadow-2xl"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-amber-500 p-2.5 rounded-xl border-4 border-slate-950 shadow-xl">
                        <Scissors size={18} className="text-slate-950" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-4">
                        <h4 className="font-black text-2xl md:text-3xl text-slate-100 leading-none tracking-tight">{booking.service.name}</h4>
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border tracking-widest ${getStatusStyle(booking.status)} shadow-lg`}>
                          {getStatusLabel(booking.status)}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                        <p className="text-slate-400 font-bold flex items-center gap-3 text-sm">
                          <User size={18} className="text-amber-500" />
                          {booking.professional.name}
                        </p>
                        <div className="h-4 w-[1px] bg-white/5 hidden sm:block" />
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleReminder(booking.id); }}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black transition-all border ${booking.reminderEnabled ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-slate-800 border-white/5 text-slate-500'}`}
                        >
                          {booking.reminderEnabled ? <BellRing size={14} /> : <BellOff size={14} />}
                          {booking.reminderEnabled ? 'LEMBRETE VIP ATIVO' : 'ATIVAR AVISOS'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-6 lg:gap-4 lg:min-w-[220px] lg:border-l border-white/5 lg:pl-10">
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-800 p-3 rounded-xl text-amber-500">
                        <Calendar size={22} />
                      </div>
                      <div>
                         <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-0.5">Visita</p>
                         <span className="text-base font-black text-slate-200">{new Date(booking.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-800 p-3 rounded-xl text-amber-500">
                        <Clock size={22} />
                      </div>
                      <div>
                         <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-0.5">Horário</p>
                         <span className="text-base font-black text-slate-200">{booking.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex flex-col items-center justify-center p-4 bg-white/5 rounded-[2rem] border border-white/5 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                    <ChevronRight size={32} />
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}
      </section>

      <section className="space-y-10 px-4 md:px-0">
        <div className="flex items-center gap-4 border-b border-white/5 pb-6">
          <div className="bg-slate-800 p-3 rounded-2xl border border-white/5">
            <History className="text-slate-400" size={24} />
          </div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">Histórico de Estilo</h2>
        </div>

        {historyBookings.length === 0 ? (
          <div className="bg-slate-900/20 border border-white/5 border-dashed rounded-[3rem] p-16 text-center">
            <p className="text-slate-500 text-sm font-medium">Seus atendimentos concluídos serão listados aqui.</p>
          </div>
        ) : (
          <div className="bg-slate-900/40 border border-white/5 rounded-[4rem] overflow-hidden shadow-2xl backdrop-blur-md">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-[11px] text-slate-500 font-black uppercase tracking-[0.2em] border-b border-white/5">
                    <th className="px-12 py-8">Serviço & Detalhes</th>
                    <th className="px-12 py-8">Mestre</th>
                    <th className="px-12 py-8">Status</th>
                    <th className="px-12 py-8 text-right">Investimento</th>
                    <th className="px-12 py-8"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {historyBookings.map((booking) => {
                    const serviceDetails = getServiceDetails(booking.service.id);
                    return (
                    <tr key={booking.id} onClick={() => setSelectedBooking(booking)} className="group hover:bg-white/5 transition-all cursor-pointer">
                      <td className="px-12 py-8">
                        <div className="flex items-center gap-6">
                          <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-amber-500/10 group-hover:text-amber-500 transition-all overflow-hidden border border-white/5">
                            {serviceDetails?.image ? (
                              <img src={serviceDetails.image} alt={booking.service.name} className="w-full h-full object-cover" />
                            ) : (
                              <Scissors size={24} />
                            )}
                          </div>
                          <div className="space-y-1.5">
                            <p className="font-black text-slate-200 text-lg leading-tight">{booking.service.name}</p>
                            <div className="flex items-center gap-3">
                               <p className="text-[10px] text-slate-500 flex items-center gap-1.5 font-black uppercase tracking-widest">
                                 <Calendar size={14} className="text-amber-500" /> {new Date(booking.date).toLocaleDateString('pt-BR')}
                               </p>
                               <span className="w-1 h-1 bg-slate-700 rounded-full" />
                               <p className="text-[10px] text-slate-500 flex items-center gap-1.5 font-black uppercase tracking-widest">
                                 <Clock size={14} className="text-amber-500" /> {booking.time}
                               </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-8">
                        <div className="flex items-center gap-4">
                          <img src={booking.professional.avatar} alt={booking.professional.name} className="w-10 h-10 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all border border-white/10" />
                          <span className="text-sm font-bold text-slate-400 group-hover:text-slate-200 transition-colors">{booking.professional.name}</span>
                        </div>
                      </td>
                      <td className="px-12 py-8">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase border tracking-widest ${getStatusStyle(booking.status)}`}>
                          {getStatusLabel(booking.status)}
                        </span>
                      </td>
                      <td className="px-12 py-8 text-right">
                        <span className={`text-lg font-black ${booking.status === 'cancelled' ? 'text-slate-700 line-through' : 'text-amber-500'}`}>
                          R$ {booking.service.price}
                        </span>
                      </td>
                      <td className="px-12 py-8 text-right">
                        <div className="flex items-center justify-end gap-3">
                          {booking.status === 'completed' && !booking.review && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); setReviewingBooking(booking); }}
                              className="px-5 py-2.5 bg-amber-500 text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-amber-500/20"
                            >
                              AVALIAR
                            </button>
                          )}
                          {booking.review && (
                            <div className="flex items-center gap-1.5 text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                              <Star size={12} fill="currentColor" />
                              <span className="text-xs font-black">{booking.review.rating}.0</span>
                            </div>
                          )}
                          <div className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-amber-500 transition-all">
                            <ArrowUpRight size={20} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {selectedBooking && (() => {
        const proDetails = getProfessionalFullDetails(selectedBooking.professional.id);
        const serviceDetails = getServiceDetails(selectedBooking.service.id);
        const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(BARBERSHOP.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        
        return (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 overflow-hidden animate-in fade-in duration-300">
            <div 
              className="absolute inset-0 bg-slate-950/95 backdrop-blur-3xl"
              onClick={() => setSelectedBooking(null)}
            />
            <div className="bg-slate-900 border-0 md:border md:border-white/10 w-full max-w-5xl md:rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative z-10 overflow-hidden flex flex-col h-full md:h-[90vh] animate-in zoom-in-95 slide-in-from-bottom-12 duration-500">
              
              <div className="shrink-0 relative h-64 md:h-80 bg-slate-800 overflow-hidden">
                <img 
                  src={serviceDetails?.image} 
                  alt={selectedBooking.service.name} 
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                
                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="absolute top-6 left-6 p-4 bg-slate-950/50 hover:bg-slate-950 rounded-3xl text-white transition-all backdrop-blur-xl border border-white/10 z-20 md:hidden"
                >
                  <ChevronLeft size={24} />
                </button>

                <button 
                  onClick={() => setSelectedBooking(null)}
                  className="absolute top-8 right-8 p-4 bg-slate-950/50 hover:bg-slate-950 rounded-3xl text-white transition-all backdrop-blur-xl border border-white/10 z-20 hidden md:block group"
                >
                  <X size={24} className="group-hover:rotate-90 transition-transform" />
                </button>

                <div className="absolute bottom-12 left-8 md:left-16 right-8 md:right-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-4">
                    <div className={`inline-flex px-5 py-2 rounded-full text-[10px] font-black uppercase border backdrop-blur-xl shadow-2xl ${getStatusStyle(selectedBooking.status)}`}>
                      {getStatusLabel(selectedBooking.status)}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none drop-shadow-2xl">{selectedBooking.service.name}</h2>
                    <div className="flex items-center gap-4 text-slate-300 text-sm font-medium">
                       <span className="flex items-center gap-2"><Clock size={16} className="text-amber-500" /> {serviceDetails?.durationMinutes} minutos</span>
                       <span className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                       <span className="flex items-center gap-2 font-black text-amber-500">R$ {serviceDetails?.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 md:p-16 space-y-20 custom-scrollbar">
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                  {[
                    { icon: <Calendar size={24} />, label: 'Dia Marcado', value: new Date(selectedBooking.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' }) },
                    { icon: <Clock size={24} />, label: 'Horário', value: selectedBooking.time },
                    { icon: <User size={24} />, label: 'Mestre Responsável', value: proDetails?.name },
                    { icon: <CheckCircle size={24} />, label: 'Protocolo', value: `#${selectedBooking.id.toUpperCase()}` }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-6 md:p-10 rounded-[2.5rem] space-y-4 group hover:border-amber-500/30 transition-all text-center md:text-left">
                       <div className="bg-amber-500/10 p-4 rounded-2xl text-amber-500 w-fit mx-auto md:mx-0 group-hover:scale-110 transition-transform">
                         {stat.icon}
                       </div>
                       <div>
                         <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-1">{stat.label}</p>
                         <p className="font-black text-white text-lg tracking-tight leading-tight">{stat.value}</p>
                       </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
                  
                  <div className="lg:col-span-7 space-y-16">
                    
                    <div className="space-y-8">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-[1px] bg-amber-500" />
                           <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">Como Chegar</h3>
                         </div>
                         <button 
                            onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BARBERSHOP.address)}`, '_blank')}
                            className="flex items-center gap-2 text-amber-500 text-[10px] font-black uppercase tracking-widest hover:underline"
                          >
                            <Navigation size={14} /> Abrir Rota Completa
                          </button>
                      </div>

                      <div className="bg-white/5 border border-white/5 p-8 md:p-12 rounded-[3.5rem] space-y-10 group hover:bg-white/[0.08] transition-all">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                          <div className="bg-slate-950 p-6 rounded-3xl text-amber-500 shadow-2xl">
                             <MapPin size={32} />
                          </div>
                          <div className="space-y-2">
                             <h4 className="text-2xl font-black text-white tracking-tight">{BARBERSHOP.name}</h4>
                             <p className="text-slate-500 font-medium leading-relaxed max-w-sm">{BARBERSHOP.address}</p>
                             <div className="flex items-center gap-4 pt-4">
                                <span className="flex items-center gap-2 text-xs font-bold text-slate-300">
                                   <Globe size={14} /> Sede Principal
                                </span>
                                <span className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                                <span className="flex items-center gap-2 text-xs font-bold text-green-500">
                                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Aberto agora
                                </span>
                             </div>
                          </div>
                        </div>

                        <div className="relative aspect-video w-full rounded-[3rem] overflow-hidden border border-white/10 group/map">
                           <iframe 
                              width="100%" 
                              height="100%" 
                              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%) grayscale(1)" }} 
                              loading="lazy" 
                              src={mapUrl}
                              className="opacity-60 group-hover/map:opacity-100 transition-all duration-1000"
                           ></iframe>
                           <div className="absolute inset-0 bg-slate-900/40 pointer-events-none group-hover/map:opacity-0 transition-opacity" />
                           <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover/map:opacity-0 transition-opacity">
                              <div className="bg-slate-950/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                                <MapIcon size={20} className="text-amber-500" />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">Localização Exata</span>
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-8">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-[1px] bg-amber-500" />
                         <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.4em]">Seu Barbeiro</h3>
                       </div>
                       <div className="bg-slate-950/50 p-10 rounded-[3.5rem] flex flex-col md:flex-row items-center gap-10 border border-white/5 shadow-2xl">
                          <img src={proDetails?.avatar} alt={proDetails?.name} className="w-32 h-32 rounded-[2.5rem] object-cover ring-4 ring-white/5 shadow-2xl" />
                          <div className="space-y-4 text-center md:text-left flex-1">
                             <div className="space-y-1">
                               <h4 className="text-3xl font-black text-white leading-none">{proDetails?.name}</h4>
                               <p className="text-amber-500 font-black text-xs uppercase tracking-widest">{proDetails?.specialty}</p>
                             </div>
                             <p className="text-slate-400 font-medium italic leading-relaxed">"{proDetails?.bio}"</p>
                             <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500">
                                {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-12">
                    <div className="bg-slate-950 rounded-[3.5rem] p-12 border border-white/5 space-y-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[64px] rounded-full" />
                       <h3 className="text-2xl font-black text-white tracking-tight">Checkout Detalhado</h3>
                       
                       <div className="space-y-6">
                         <div className="flex items-center justify-between text-slate-500 font-bold text-sm">
                            <span>Subtotal Visita</span>
                            <span className="text-slate-200">R$ {selectedBooking.service.price}.00</span>
                         </div>
                         <div className="flex items-center justify-between text-slate-500 font-bold text-sm">
                            <span>Taxas & Impostos</span>
                            <span className="text-slate-200">Incluso</span>
                         </div>
                         <div className="flex items-center justify-between text-slate-500 font-bold text-sm">
                            <span>Agendamento Priority</span>
                            <span className="text-green-500 uppercase text-[10px] font-black tracking-widest bg-green-500/10 px-3 py-1 rounded-lg">Cortesia</span>
                         </div>
                         
                         <div className="h-[1px] bg-white/5" />
                         
                         <div className="flex items-end justify-between">
                            <div className="space-y-1">
                               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Estimado</p>
                               <p className="text-4xl font-black text-amber-500 tracking-tighter tabular-nums">R$ {selectedBooking.service.price}</p>
                            </div>
                            <div className="bg-white/5 p-3 rounded-2xl flex flex-col items-center gap-1 border border-white/10">
                               <CheckCircle className="text-amber-500" size={20} />
                               <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Garantido</span>
                            </div>
                         </div>
                       </div>

                       <div className="bg-amber-500/5 p-6 rounded-[2rem] border border-amber-500/10 flex items-start gap-4">
                          <div className="bg-amber-500/20 p-3 rounded-xl text-amber-500 shrink-0">
                            <Info size={18} />
                          </div>
                          <p className="text-xs text-slate-400 font-medium leading-relaxed">
                            O pagamento será realizado presencialmente na unidade após a conclusão dos serviços. Aceitamos todos os cartões e PIX.
                          </p>
                       </div>
                    </div>

                    {selectedBooking.status === 'confirmed' && (
                      <div className="bg-white/5 border border-white/5 rounded-[3.5rem] p-12 space-y-8 group hover:border-amber-500/30 transition-all">
                        <div className="flex items-center gap-6">
                           <div className={`p-5 rounded-[2rem] transition-all shadow-2xl ${selectedBooking.reminderEnabled ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-600'}`}>
                              {selectedBooking.reminderEnabled ? <BellRing size={28} /> : <BellOff size={28} />}
                           </div>
                           <div className="space-y-1">
                              <h4 className="text-xl font-black text-white">Gestão de Alertas</h4>
                              <p className="text-xs text-slate-500 font-medium">Notificamos você 60 min antes via SMS.</p>
                           </div>
                        </div>
                        <button 
                          onClick={() => toggleReminder(selectedBooking.id)}
                          className={`w-full py-5 rounded-3xl font-black text-[11px] uppercase tracking-widest transition-all border ${selectedBooking.reminderEnabled ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 hover:bg-amber-500/20' : 'bg-slate-800 border-white/5 text-slate-500 hover:text-white'}`}
                        >
                          {selectedBooking.reminderEnabled ? 'DESATIVAR LEMBRETE VIP' : 'ATIVAR AGORA'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="shrink-0 p-8 md:p-12 border-t border-white/5 bg-slate-950/80 backdrop-blur-3xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="hidden md:flex items-center gap-6">
                   <div className="space-y-1">
                     <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.4em]">Confirmação</p>
                     <div className="flex items-center gap-3 text-slate-200">
                        <CheckCircle size={20} className="text-amber-500" />
                        <span className="text-base font-black uppercase tracking-[0.1em]">{getStatusLabel(selectedBooking.status)}</span>
                     </div>
                   </div>
                </div>

                <div className="w-full md:w-auto space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
                  {selectedBooking.status === 'confirmed' && (
                    <div className="grid grid-cols-2 gap-3 md:flex md:items-center md:gap-4">
                      <button 
                        onClick={() => setBookingToCancel(selectedBooking)}
                        className="px-6 py-5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-3xl font-black transition-all border border-red-500/20 text-[10px] md:text-xs tracking-widest uppercase flex items-center justify-center"
                      >
                        Cancelar
                      </button>
                      <button 
                        onClick={() => { handleReschedule(selectedBooking); setSelectedBooking(null); }}
                        className="px-6 py-5 bg-white/5 hover:bg-amber-500 text-slate-300 hover:text-slate-950 rounded-3xl font-black transition-all border border-white/10 text-[10px] md:text-xs tracking-widest uppercase flex items-center justify-center gap-2"
                      >
                        <RefreshCw size={16} /> Reagendar
                      </button>
                    </div>
                  )}
                  <button 
                    onClick={() => setSelectedBooking(null)}
                    className="w-full md:w-auto px-10 md:px-14 py-5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-3xl font-black transition-all shadow-2xl shadow-amber-500/20 text-[10px] md:text-xs uppercase tracking-widest"
                  >
                    CONCLUÍDO
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
      
      {reviewingBooking && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" onClick={() => setReviewingBooking(null)} />
          <div className="bg-slate-900 border border-white/10 w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in zoom-in duration-300">
            <div className="p-10 space-y-8">
              <div className="text-center space-y-2">
                <div className="bg-amber-500/10 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                  <Star className="text-amber-500" size={32} />
                </div>
                <h3 className="text-2xl font-black text-white">Sua Avaliação</h3>
                <p className="text-slate-400 text-sm font-medium">Conte-nos como foi sua experiência com o {reviewingBooking.professional.name}.</p>
              </div>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setTempRating(star)} className="transition-all hover:scale-110 active:scale-95">
                    <Star size={42} fill={star <= tempRating ? "currentColor" : "none"} className={star <= tempRating ? "text-amber-500" : "text-slate-700"} />
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Comentário (Opcional)</label>
                <textarea 
                  value={tempComment}
                  onChange={(e) => setTempComment(e.target.value)}
                  placeholder="Excelente atendimento, corte impecável..."
                  className="w-full bg-slate-800 border border-white/5 rounded-2xl p-5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-all min-h-[120px] resize-none"
                />
              </div>
              <button disabled={tempRating === 0} onClick={submitReview} className="w-full bg-amber-500 disabled:opacity-30 disabled:grayscale hover:bg-amber-400 text-slate-950 py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-3 shadow-xl shadow-amber-500/20">
                ENVIAR AVALIAÇÃO <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {bookingToCancel && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setBookingToCancel(null)} />
          <div className="bg-slate-900 border border-white/10 w-full max-w-md rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
            <div className="p-10 space-y-8">
              <div className="bg-red-500/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto border border-red-500/20 animate-pulse">
                <AlertCircle className="text-red-500" size={38} />
              </div>
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-black text-white tracking-tight">Cancelar Visita</h2>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">Por favor, selecione um motivo para o cancelamento:</p>
              </div>
              <div className="space-y-3">
                {CANCELLATION_REASONS.map((reason) => (
                  <button key={reason} onClick={() => setSelectedReason(reason)} className={`w-full p-5 rounded-2xl border text-sm font-black text-left transition-all flex items-center justify-between ${selectedReason === reason ? 'bg-amber-500 border-amber-500 text-slate-950' : 'bg-white/5 border-white/5 text-slate-400 hover:border-amber-500/30'}`}>
                    {reason} {selectedReason === reason && <CheckCircle size={20} />}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-8 bg-slate-800/50 border-t border-white/5 flex gap-4">
              <button onClick={() => { setBookingToCancel(null); setSelectedReason(''); }} className="flex-1 py-4 bg-transparent hover:bg-white/5 text-slate-300 rounded-2xl font-black transition-all text-xs">VOLTAR</button>
              <button disabled={!selectedReason} onClick={handleCancelConfirm} className="flex-[1.8] py-4 bg-red-500 disabled:opacity-30 hover:bg-red-600 text-white rounded-2xl font-black transition-all shadow-xl shadow-red-500/20 text-xs tracking-widest">CONFIRMAR CANCELAMENTO</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
