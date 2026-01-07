
import React from 'react';
import { Users, Search, Filter, Mail, Phone, Calendar, ArrowUpRight, Star } from 'lucide-react';

const MOCK_CLIENTS = [
  { id: '1', name: 'Carlos Roberto', email: 'carlos@email.com', phone: '(11) 99999-0001', visits: 12, spent: 840, status: 'Gold' },
  { id: '2', name: 'Marcos Vinicius', email: 'marcos@email.com', phone: '(11) 99999-0002', visits: 5, spent: 310, status: 'Silver' },
  { id: '3', name: 'João Paulo', email: 'joao@email.com', phone: '(11) 99999-0003', visits: 1, spent: 60, status: 'Bronze' },
  { id: '4', name: 'Felipe Dantas', email: 'felipe@email.com', phone: '(11) 99999-0004', visits: 24, spent: 1680, status: 'Platinum' },
];

export const AdminClients: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-[0.3em]">
             <Users size={14} /> CRM Elite
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white">Clientes.</h1>
          <p className="text-slate-500 font-medium text-lg">Base de dados completa e comportamento de consumo.</p>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-white/10 p-6 rounded-[3rem] backdrop-blur-3xl flex flex-col md:flex-row items-center gap-6 shadow-2xl">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
          <input 
            type="text"
            placeholder="Pesquisar por nome, e-mail ou telefone..."
            className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-5 pl-16 pr-6 text-sm text-white focus:outline-none focus:border-amber-500/30 transition-all font-bold"
          />
        </div>
        <button className="flex items-center gap-3 px-8 py-5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/5 transition-all">
          <Filter size={18} /> Filtrar Base
        </button>
      </div>

      <div className="bg-slate-900/40 border border-white/5 rounded-[4rem] overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-[11px] text-slate-500 font-black uppercase tracking-[0.2em] border-b border-white/5">
                <th className="px-12 py-8">Perfil do Cliente</th>
                <th className="px-12 py-8">Contato</th>
                <th className="px-12 py-8">Visitas</th>
                <th className="px-12 py-8">Fidelidade</th>
                <th className="px-12 py-8 text-right">LTV Total</th>
                <th className="px-12 py-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_CLIENTS.map((client) => (
                <tr key={client.id} className="group hover:bg-white/5 transition-all cursor-pointer">
                  <td className="px-12 py-8">
                    <div className="flex items-center gap-4">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${client.id}`} className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10" />
                      <div>
                        <p className="font-black text-white text-lg">{client.name}</p>
                        <p className="text-[10px] text-slate-500 font-black uppercase">ID #{client.id}992</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-12 py-8">
                     <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold"><Mail size={12} /> {client.email}</div>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold"><Phone size={12} /> {client.phone}</div>
                     </div>
                  </td>
                  <td className="px-12 py-8">
                    <div className="flex items-center gap-2 text-slate-200 font-black">
                       <Calendar size={16} className="text-amber-500" /> {client.visits}
                    </div>
                  </td>
                  <td className="px-12 py-8">
                    <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      client.status === 'Platinum' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' :
                      client.status === 'Gold' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                      'bg-slate-500/10 text-slate-500 border border-slate-500/20'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-12 py-8 text-right">
                    <p className="font-black text-white text-lg tracking-tight">R$ {client.spent}</p>
                  </td>
                  <td className="px-12 py-8 text-right">
                    <button className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-amber-500 transition-all">
                      <ArrowUpRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
