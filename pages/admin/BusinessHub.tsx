
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, Landmark, Briefcase, 
  ArrowUpRight, ArrowDownRight, Zap, Building2, 
  FileText, Download, ShieldCheck, History,
  DollarSign, Activity, Wallet, PieChart as PieChartIcon,
  Settings2, Save, Trash2, Edit3, X, Calculator, Percent,
  Sparkles, Lightbulb
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FinancialTransaction } from '../../types';
import { SERVICES } from '../../constants';

export const BusinessHub: React.FC = () => {
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [realTimeRevenue, setRealTimeRevenue] = useState(0);
  
  const [businessConfig, setBusinessConfig] = useState({
    fixedCost: 8500,
    variableCostPercent: 15,
    expansionTarget: 150000
  });

  const [editingTransaction, setEditingTransaction] = useState<FinancialTransaction | null>(null);

  useEffect(() => {
    const loadData = () => {
      const savedTransactions = JSON.parse(localStorage.getItem('financial_transactions') || '[]');
      const savedConfig = JSON.parse(localStorage.getItem('business_config') || 'null');
      
      setTransactions(savedTransactions);
      if (savedConfig) setBusinessConfig(savedConfig);
      
      const total = savedTransactions.reduce((acc: number, t: FinancialTransaction) => acc + t.amount, 0);
      setRealTimeRevenue(total);
    };

    loadData();
    window.addEventListener('storage', loadData);
    return () => window.removeEventListener('storage', loadData);
  }, []);

  const saveConfig = () => {
    localStorage.setItem('business_config', JSON.stringify(businessConfig));
    alert('Configurações estratégicas salvas com sucesso!');
  };

  const deleteTransaction = (id: string) => {
    if (confirm('Deseja excluir este registro financeiro?')) {
      const updated = transactions.filter(t => t.id !== id);
      localStorage.setItem('financial_transactions', JSON.stringify(updated));
      setTransactions(updated);
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleUpdateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTransaction) return;
    const updated = transactions.map(t => t.id === editingTransaction.id ? editingTransaction : t);
    localStorage.setItem('financial_transactions', JSON.stringify(updated));
    setTransactions(updated);
    setEditingTransaction(null);
    window.dispatchEvent(new Event('storage'));
  };

  const totalVariableCosts = realTimeRevenue * (businessConfig.variableCostPercent / 100);
  const netProfit = realTimeRevenue - businessConfig.fixedCost - totalVariableCosts;
  const marginPercent = realTimeRevenue > 0 ? (netProfit / realTimeRevenue) * 100 : 0;
  
  const chartData = [
    { month: 'Jan', revenue: 45000, profit: 13500 },
    { month: 'Fev', revenue: 52000, profit: 15600 },
    { month: 'Mar', revenue: 48000, profit: 14400 },
    { month: 'Abr', revenue: 61000, profit: 18300 },
    { month: 'Mai', revenue: 59000, profit: 17700 },
    { month: 'Jun', revenue: realTimeRevenue, profit: netProfit > 0 ? netProfit : 0 },
  ];

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-24 md:pb-12">
      {/* Header Mobile First */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 px-1 md:px-0">
        <div className="space-y-2 md:space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
             <Landmark size={12} className="text-amber-500" />
             <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em]">Strategy Hub</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">Hub de <span className="text-amber-500">Negócios.</span></h1>
          <p className="text-slate-500 font-medium text-sm md:text-lg max-w-2xl">Gestão inteligente e projeções financeiras em tempo real.</p>
        </div>
        <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-white/5 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/5 transition-all">
          <FileText size={16} /> EXPORTAR RELATÓRIO
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Receita Bruta', value: `R$ ${realTimeRevenue.toLocaleString('pt-BR')}`, icon: <TrendingUp />, color: 'text-amber-500' },
          { label: 'Lucro Líquido', value: `R$ ${Math.max(0, netProfit).toLocaleString('pt-BR')}`, icon: <DollarSign />, color: 'text-emerald-500' },
          { label: 'Custos Fixos', value: `R$ ${businessConfig.fixedCost.toLocaleString('pt-BR')}`, icon: <Calculator />, color: 'text-slate-400' },
          { label: 'Margem', value: `${marginPercent.toFixed(1)}%`, icon: <Percent />, color: 'text-blue-500' },
        ].map((kpi, i) => (
          <div key={i} className="glass-card p-6 md:p-8 rounded-[2.5rem] flex flex-col justify-between shadow-xl relative overflow-hidden group">
             <div className="flex items-center justify-between mb-4 md:mb-6">
                <div className={`bg-white/5 p-3 rounded-xl ${kpi.color}`}>
                  {React.cloneElement(kpi.icon as React.ReactElement<any>, { size: 20 })}
                </div>
                <ArrowUpRight size={14} className="text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
             <div className="min-w-0">
                <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1 truncate">{kpi.label}</p>
                <h4 className="text-2xl md:text-3xl font-black text-white tracking-tighter tabular-nums truncate leading-tight">{kpi.value}</h4>
             </div>
          </div>
        ))}
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        <div className="lg:col-span-8 bg-slate-900/40 border border-white/5 p-6 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl">
           <div className="flex items-center justify-between mb-8 md:mb-12">
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">Fluxo Mensal</h3>
              <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-amber-500 rounded-full" /><span className="text-[9px] font-black text-slate-500 uppercase">Receita</span></div>
                 <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-emerald-500 rounded-full" /><span className="text-[9px] font-black text-slate-500 uppercase">Lucro</span></div>
              </div>
           </div>
           <div className="h-[240px] md:h-[350px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={chartData}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                 <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                 <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '1rem' }} />
                 <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={3} fillOpacity={0.1} fill="#f59e0b" />
                 <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} fillOpacity={0.1} fill="#10b981" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="lg:col-span-4 bg-slate-900/40 border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 flex flex-col space-y-6 shadow-2xl">
           <div className="flex items-center justify-between">
              <h3 className="text-lg md:text-xl font-black text-white flex items-center gap-3"><History className="text-amber-500" size={20} /> Histórico</h3>
              <div className="bg-emerald-500/20 w-2 h-2 rounded-full animate-pulse" />
           </div>
           <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-3 max-h-[400px]">
              {transactions.length === 0 ? (
                <p className="py-20 text-center text-[9px] font-black text-slate-700 uppercase tracking-widest">Nenhuma transação</p>
              ) : (
                transactions.slice().reverse().map((t) => (
                  <div key={t.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all">
                     <div className="min-w-0">
                        <p className="text-sm font-black text-white truncate leading-tight">{t.serviceName}</p>
                        <p className="text-[9px] text-slate-500 font-bold mt-1">R$ {t.amount}</p>
                     </div>
                     <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditingTransaction(t)} className="p-2 text-slate-500 hover:text-white"><Edit3 size={14} /></button>
                        <button onClick={() => deleteTransaction(t.id)} className="p-2 text-slate-500 hover:text-red-500"><Trash2 size={14} /></button>
                     </div>
                  </div>
                ))
              )}
           </div>
        </div>
      </div>

      {/* Estratégia & Expansão - Refatorado para Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Editor de Custos */}
        <div className="bg-slate-950 border border-white/10 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 shadow-2xl space-y-8">
           <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter flex items-center gap-3">
                 <Settings2 className="text-amber-500" size={24} /> Configuração
              </h3>
              <p className="text-slate-500 text-sm font-medium">Ajuste os parâmetros para recalcular o ROI.</p>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                 <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Custo Fixo (R$)</label>
                 <input 
                   type="number" 
                   value={businessConfig.fixedCost}
                   onChange={(e) => setBusinessConfig({...businessConfig, fixedCost: Number(e.target.value)})}
                   className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white font-black" 
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Variáveis (%)</label>
                 <input 
                   type="number" 
                   value={businessConfig.variableCostPercent}
                   onChange={(e) => setBusinessConfig({...businessConfig, variableCostPercent: Number(e.target.value)})}
                   className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white font-black" 
                 />
              </div>
           </div>

           <div className="space-y-2">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Meta Expansão (R$)</label>
              <input 
                type="number" 
                value={businessConfig.expansionTarget}
                onChange={(e) => setBusinessConfig({...businessConfig, expansionTarget: Number(e.target.value)})}
                className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white font-black" 
              />
           </div>

           <button onClick={saveConfig} className="w-full h-14 bg-amber-500 text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-2">
              <Save size={16} /> ATUALIZAR PARÂMETROS
           </button>
        </div>

        {/* Card de ROI Redesenhado - SEM ALERTA VERMELHO */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 shadow-2xl flex flex-col justify-center space-y-10 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
              <Sparkles size={120} className="text-amber-500" />
           </div>

           <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tighter">Projeção de Crescimento</h3>
              <p className="text-slate-500 text-sm font-medium">Análise de viabilidade para nova unidade.</p>
           </div>

           <div className="grid grid-cols-2 gap-4 p-6 bg-slate-950 rounded-2xl border border-white/5">
              <div>
                 <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Margem Líquida</p>
                 <p className={`text-xl font-black ${marginPercent > 0 ? 'text-emerald-500' : 'text-slate-400'}`}>
                   {marginPercent.toFixed(1)}%
                 </p>
              </div>
              <div className="text-right">
                 <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">Lucro Operacional</p>
                 <p className={`text-xl font-black ${netProfit > 0 ? 'text-white' : 'text-slate-500'}`}>
                   R$ {Math.round(Math.max(0, netProfit)).toLocaleString('pt-BR')}
                 </p>
              </div>
           </div>

           <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl flex items-start gap-4">
              <div className="bg-amber-500/20 p-3 rounded-xl text-amber-500 shrink-0">
                 <Lightbulb size={24} />
              </div>
              <div className="space-y-2">
                 <h4 className="text-lg font-black text-white leading-tight">
                   {netProfit > 0 
                     ? `Próxima unidade em ${Math.ceil(businessConfig.expansionTarget / netProfit)} meses!` 
                     : "Fase de Consolidação Operacional"}
                 </h4>
                 <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
                   {netProfit > 0 
                     ? "Seu fluxo de caixa está saudável para expansão. Continue otimizando os custos variáveis para acelerar o ROI."
                     : "Foque em reduzir custos fixos ou aumentar o ticket médio para tornar a meta de expansão viável nos próximos ciclos."}
                 </p>
              </div>
           </div>
        </div>
      </div>

      {/* Modal Mobile Centered */}
      {editingTransaction && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={() => setEditingTransaction(null)} />
           <div className="bg-slate-900 border border-white/10 w-full max-w-sm rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in duration-300">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                 <h3 className="text-lg font-black text-white">Editar Lançamento</h3>
                 <button onClick={() => setEditingTransaction(null)}><X size={20} className="text-slate-500" /></button>
              </div>
              <form onSubmit={handleUpdateTransaction} className="p-6 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Serviço</label>
                    <input 
                      type="text" 
                      value={editingTransaction.serviceName}
                      onChange={(e) => setEditingTransaction({...editingTransaction, serviceName: e.target.value})}
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-5 text-white font-bold"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Valor (R$)</label>
                    <input 
                      type="number" 
                      value={editingTransaction.amount}
                      onChange={(e) => setEditingTransaction({...editingTransaction, amount: Number(e.target.value)})}
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-5 text-white font-bold"
                    />
                 </div>
                 <button type="submit" className="w-full py-4 bg-amber-500 text-slate-950 rounded-xl font-black text-xs uppercase tracking-widest">ATUALIZAR REGISTRO</button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};
