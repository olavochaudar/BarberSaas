
import React, { useState, useEffect } from 'react';
import { 
  Users, Calendar, TrendingUp, Clock, CheckCircle, XCircle, 
  ArrowUpRight, DollarSign, Timer, UserCheck, Star, Trophy, 
  Sparkles, Filter, ChevronRight, Activity, Scissors, Receipt
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { PROFESSIONALS, SERVICES } from '../../constants';
import { Booking, FinancialTransaction } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  
  // Data de hoje para o filtro
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const loadData = () => {
      const savedBookings = JSON.parse(localStorage.getItem('my_bookings') || '[]');
      const savedTransactions = JSON.parse(localStorage.getItem('financial_transactions') || '[]');
      
      if (savedBookings.length === 0) {
        const mockToday: Booking[] = [
          { id: 'b1', clientId: 'c1', professionalId: 'p1', serviceId: '1', date: todayStr, time: '14:00', status: 'confirmed', totalPrice: 60 },
          { id: 'b2', clientId: 'c2', professionalId: 'p2', serviceId: '3', date: todayStr, time: '15:30', status: 'confirmed', totalPrice: 95 },
          { id: 'b3', clientId: 'c3', professionalId: 'p3', serviceId: '2', date: todayStr, time: '16:00', status: 'confirmed', totalPrice: 45 },
        ];
        setBookings(mockToday);
        localStorage.setItem('my_bookings', JSON.stringify(mockToday));
      } else {
        setBookings(savedBookings);
      }
      setTransactions(savedTransactions);
    };

    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const handleFinishService = (booking: Booking) => {
    const serviceName = SERVICES.find(s => s.id === booking.serviceId)?.name || 'Serviço Personalizado';
    const newTransaction: FinancialTransaction = {
      id: Math.random().toString(36).substr(2, 9),
      amount: booking.totalPrice,
      serviceName,
      date: new Date().toISOString(),
      bookingId: booking.id,
      professionalId: booking.professionalId
    };

    const updatedTransactions = [...transactions, newTransaction];
    localStorage.setItem('financial_transactions', JSON.stringify(updatedTransactions));
    setTransactions(updatedTransactions);

    const updatedBookings = bookings.map(b => 
      b.id === booking.id ? { ...b, status: 'completed' as const } : b
    );
    localStorage.setItem('my_bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);

    window.dispatchEvent(new Event('storage'));
    alert(`Atendimento finalizado com sucesso!`);
  };

  const realizedRevenueToday = transactions
    .filter(t => t.date.split('T')[0] === todayStr)
    .reduce((acc, t) => acc + t.amount, 0);

  const pendingToday = bookings.filter(b => b.date === todayStr && b.status === 'confirmed');

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-1000">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 md:gap-8">
        <div className="space-y-2 md:space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full">
             <Activity size={12} className="text-amber-500" />
             <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em]">Command Center</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none">Dashboard.</h1>
          <p className="text-slate-500 font-medium text-sm md:text-lg">
            Caixa hoje: <span className="text-emerald-500 font-black">R$ {realizedRevenueToday}</span>.
          </p>
        </div>
        
        <div className="hidden sm:flex flex-wrap gap-4">
           <div className="bg-slate-900/40 border border-white/5 px-8 py-4 rounded-3xl flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ativos Hoje</p>
                 <p className="text-xs font-bold text-white uppercase">{pendingToday.length} Aguardando</p>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Receita Realizada', value: `R$ ${realizedRevenueToday}`, icon: <DollarSign />, color: 'text-emerald-500' },
          { label: 'Check-ins', value: pendingToday.length.toString(), icon: <Calendar />, color: 'text-amber-500' },
          { label: 'Total Vendas', value: transactions.length.toString(), icon: <Receipt />, color: 'text-slate-400' },
          { label: 'Score UX', value: '98%', icon: <Star />, color: 'text-amber-500' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 md:p-8 rounded-[2.5rem] md:rounded-[3.5rem] group shadow-xl">
             <div className="flex items-start justify-between">
                <div className={`bg-white/5 p-3 rounded-xl ${stat.color} group-hover:scale-110 transition-transform`}>
                  {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 20 })}
                </div>
             </div>
             <div className="mt-6 md:mt-8">
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 truncate">{stat.label}</p>
                <h4 className="text-2xl md:text-4xl font-black text-white tracking-tighter leading-none tabular-nums">{stat.value}</h4>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="p-6 md:p-10 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-amber-500/10 p-3 rounded-xl text-amber-500">
              <Timer size={22} />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">Próximos Cortes</h3>
              <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest hidden sm:block">Ações imediatas para faturamento</p>
            </div>
          </div>
        </div>

        {/* Responsive Content - Table for Desktop, Cards for Mobile */}
        <div className="p-4 md:p-0">
          {pendingToday.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <CheckCircle size={40} className="text-emerald-500 mx-auto opacity-20" />
              <p className="text-slate-500 font-bold text-sm">Tudo em ordem por aqui.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-[10px] text-slate-500 font-black uppercase tracking-widest border-b border-white/5">
                      <th className="px-10 py-6">Horário</th>
                      <th className="px-10 py-6">Cliente</th>
                      <th className="px-10 py-6">Serviço</th>
                      <th className="px-10 py-6 text-right">Valor</th>
                      <th className="px-10 py-6"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {pendingToday.sort((a,b) => a.time.localeCompare(b.time)).map((booking) => {
                      const service = SERVICES.find(s => s.id === booking.serviceId);
                      return (
                        <tr key={booking.id} className="group hover:bg-white/5 transition-all">
                          <td className="px-10 py-6">
                            <div className="flex items-center gap-2 text-amber-500 font-black text-lg">
                              <Clock size={16} /> {booking.time}
                            </div>
                          </td>
                          <td className="px-10 py-6">
                            <div className="flex items-center gap-4">
                               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.id}`} className="w-9 h-9 rounded-xl bg-slate-800" />
                               <span className="font-bold text-white">Cliente VIP</span>
                            </div>
                          </td>
                          <td className="px-10 py-6 text-slate-400 font-medium">{service?.name}</td>
                          <td className="px-10 py-6 text-right font-black text-white tabular-nums">R$ {booking.totalPrice}</td>
                          <td className="px-10 py-6 text-right">
                            <button 
                              onClick={() => handleFinishService(booking)}
                              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-5 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-lg transition-all flex items-center gap-2 ml-auto"
                            >
                              FINALIZAR
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {pendingToday.sort((a,b) => a.time.localeCompare(b.time)).map((booking) => {
                  const service = SERVICES.find(s => s.id === booking.serviceId);
                  return (
                    <div key={booking.id} className="p-5 bg-white/5 border border-white/10 rounded-3xl space-y-5">
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-amber-500 font-black">
                             <Clock size={16} />
                             <span>{booking.time}</span>
                          </div>
                          <span className="text-white font-black">R$ {booking.totalPrice}</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.id}`} className="w-10 h-10 rounded-xl bg-slate-800" />
                          <div>
                             <p className="text-white font-black leading-tight">Cliente VIP</p>
                             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">{service?.name}</p>
                          </div>
                       </div>
                       <button 
                          onClick={() => handleFinishService(booking)}
                          className="w-full bg-emerald-500 py-4 rounded-2xl text-slate-950 font-black text-[10px] uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
                       >
                          <UserCheck size={16} /> FINALIZAR SERVIÇO
                       </button>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
