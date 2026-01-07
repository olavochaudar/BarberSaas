
import React, { useState, useEffect } from 'react';
import { 
  Megaphone, MessageSquare, Gift, Users, ArrowUpRight, Plus, 
  Smartphone, Mail, Zap, Target, X, Send, CheckCircle2, 
  Loader2, AlertCircle, BarChart3, Users2, Filter, Trash2,
  Settings2, Clock, Calendar, Hash, Percent
} from 'lucide-react';

type Segment = 'all' | 'inactive' | 'vip' | 'new';
type ModalType = 'blast' | 'automation' | 'coupon' | 'campaign';

interface Coupon {
  id: string;
  code: string;
  discount: string;
  uses: number;
  limit: number;
  active: boolean;
}

export const AdminMarketing: React.FC = () => {
  // Global UI States
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const [automationType, setAutomationType] = useState<string | null>(null);
  
  // Data States
  const [coupons, setCoupons] = useState<Coupon[]>([
    { id: '1', code: 'BEMVINDO20', discount: '20%', uses: 142, limit: 500, active: true },
    { id: '2', code: 'MESTRE10', discount: 'R$ 10', uses: 89, limit: 200, active: true },
    { id: '3', code: 'NATALVIP', discount: '35%', uses: 0, limit: 100, active: true },
  ]);

  // Blast States
  const [dispatchStep, setDispatchStep] = useState<'compose' | 'sending' | 'success'>('compose');
  const [message, setMessage] = useState('Olá {{nome}}, notamos que faz tempo que você não nos visita! Que tal um trato no visual com 15% OFF? Use o cupom VOLTA15.');
  const [selectedSegment, setSelectedSegment] = useState<Segment>('all');
  const [progress, setProgress] = useState(0);

  // New Coupon Form
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: '', limit: 100 });

  const segments = {
    all: { name: 'Base Completa', count: 842, icon: <Users2 size={16} /> },
    inactive: { name: 'Inativos (+30 dias)', count: 156, icon: <AlertCircle size={16} /> },
    vip: { name: 'Clientes VIP (Top LTV)', count: 48, icon: <Zap size={16} /> },
    new: { name: 'Novos (Últimos 7 dias)', count: 24, icon: <Plus size={16} /> },
  };

  const automations = [
    { id: 'retorno', title: 'Lembrete de Retorno', desc: 'SMS para clientes inativos.', icon: <Zap />, stats: '24% conv.', color: 'amber' },
    { id: 'aniversario', title: 'Aniversariantes', desc: 'Cupom no dia do niver.', icon: <Gift />, stats: '18 resgates', color: 'pink' },
    { id: 'feedback', title: 'Avaliação Pós-Corte', desc: 'NPS após 1h do serviço.', icon: <MessageSquare />, stats: '4.9 NPS', color: 'blue' },
  ];

  const handleStartDispatch = () => {
    setDispatchStep('sending');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDispatchStep('success'), 600);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 400);
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const coupon: Coupon = {
      id: Math.random().toString(36).substr(2, 9),
      code: newCoupon.code.toUpperCase(),
      discount: newCoupon.discount,
      uses: 0,
      limit: newCoupon.limit,
      active: true
    };
    setCoupons([...coupons, coupon]);
    setActiveModal(null);
    setNewCoupon({ code: '', discount: '', limit: 100 });
  };

  const deleteCoupon = (id: string) => {
    if(confirm('Excluir este cupom permanentemente?')) {
      setCoupons(coupons.filter(c => c.id !== id));
    }
  };

  const closeModals = () => {
    setActiveModal(null);
    setDispatchStep('compose');
    setProgress(0);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      {/* Header Premium */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-[0.4em]">
             <Megaphone size={14} /> Revenue Growth Center
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-[0.9]">Marketing & <br /><span className="text-amber-500 italic">Lealdade.</span></h1>
          <p className="text-slate-500 font-medium text-lg">Ferramentas de precisão para reter e converter clientes.</p>
        </div>
        <button 
          onClick={() => setActiveModal('campaign')}
          className="bg-amber-500 text-slate-950 px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-amber-500/20 hover:bg-amber-400 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <Plus size={20} /> CRIAR CAMPANHA
        </button>
      </div>

      {/* Automações Ativas - Interativas */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {automations.map((item) => (
          <button 
            key={item.id}
            onClick={() => { setAutomationType(item.id); setActiveModal('automation'); }}
            className="bg-slate-900/40 border border-white/5 p-8 rounded-[3.5rem] group hover:bg-slate-900/60 hover:border-amber-500/30 text-left transition-all flex flex-col justify-between space-y-8 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-700">
               {item.icon}
             </div>
             <div className="flex items-start justify-between">
                <div className="bg-amber-500/10 p-5 rounded-2xl text-amber-500 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                   <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Ativo</span>
                </div>
             </div>
             <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">{item.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{item.desc}</p>
             </div>
             <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">{item.stats}</span>
                <div className="flex items-center gap-2 text-slate-600 group-hover:text-white transition-colors">
                   <span className="text-[9px] font-black uppercase">Configurar</span>
                   <Settings2 size={16} />
                </div>
             </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Gestão de Cupons */}
         <div className="lg:col-span-8 bg-slate-900/40 border border-white/10 p-8 md:p-12 rounded-[3.5rem] shadow-2xl space-y-10">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="bg-white/5 p-3 rounded-xl text-amber-500"><Hash size={24} /></div>
                  <h3 className="text-3xl font-black text-white tracking-tight">Cupons & Promoções</h3>
               </div>
               <button 
                 onClick={() => setActiveModal('coupon')}
                 className="bg-amber-500/10 hover:bg-amber-500 text-amber-500 hover:text-slate-950 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
               >
                 <Plus size={14} /> NOVO CUPOM
               </button>
            </div>
            
            <div className="space-y-4">
               {coupons.map((coupon) => (
                 <div key={coupon.id} className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-[2rem] group hover:bg-white/[0.08] transition-all">
                    <div className="flex items-center gap-6">
                       <div className="bg-slate-950 p-4 rounded-2xl border border-dashed border-amber-500/40 text-amber-500 font-black text-lg tracking-widest min-w-[140px] text-center">
                          {coupon.code}
                       </div>
                       <div>
                          <p className="font-black text-white text-xl">{coupon.discount} OFF</p>
                          <div className="flex items-center gap-3 mt-1">
                             <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{coupon.uses} / {coupon.limit} USOS</p>
                             <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500" style={{ width: `${(coupon.uses/coupon.limit)*100}%` }} />
                             </div>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <button className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-500 hover:text-white transition-all"><Settings2 size={18} /></button>
                       <button onClick={() => deleteCoupon(coupon.id)} className="p-4 bg-white/5 hover:bg-red-500/10 rounded-2xl text-slate-700 hover:text-red-500 transition-all"><Trash2 size={18} /></button>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Card WhatsApp Blast - Ativado */}
         <div className="lg:col-span-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-[3.5rem] p-12 text-slate-950 flex flex-col justify-between shadow-2xl relative overflow-hidden group min-h-[500px]">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
               <Smartphone size={200} />
            </div>
            <div className="space-y-6 relative z-10">
               <div className="bg-slate-950/10 w-fit p-4 rounded-2xl mb-4"><Smartphone size={32} /></div>
               <h3 className="text-3xl font-black tracking-tighter leading-none">WhatsApp <br />Blast Engine</h3>
               <p className="font-bold text-sm leading-relaxed opacity-80">Alcance centenas de clientes em segundos com ofertas personalizadas e alta taxa de abertura.</p>
               <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3 bg-slate-950/10 p-4 rounded-2xl">
                     <Users2 size={20} />
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest leading-none">Alcance Potencial</p>
                        <p className="text-lg font-black leading-none mt-1">842 Clientes</p>
                     </div>
                  </div>
               </div>
            </div>
            <button 
              onClick={() => setActiveModal('blast')}
              className="w-full py-6 bg-slate-950 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl mt-12 hover:scale-[1.02] active:scale-95 transition-all relative z-10 flex items-center justify-center gap-3"
            >
              <Zap size={18} fill="currentColor" /> INICIAR DISPARO
            </button>
         </div>
      </div>

      {/* MODAL MASTER - CONFIGURAÇÕES DE MARKETING */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-300" onClick={closeModals} />
          <div className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-[3.5rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-500 flex flex-col max-h-[90vh]">
            
            <div className="p-8 border-b border-white/5 flex items-center justify-between shrink-0">
               <div className="flex items-center gap-4">
                  <div className="bg-amber-500 p-3 rounded-2xl text-slate-950 shadow-lg shadow-amber-500/20">
                    {activeModal === 'blast' && <Smartphone size={24} />}
                    {activeModal === 'automation' && <Zap size={24} />}
                    {activeModal === 'coupon' && <Hash size={24} />}
                    {activeModal === 'campaign' && <Megaphone size={24} />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight">
                        {activeModal === 'blast' && 'WhatsApp Blast'}
                        {activeModal === 'automation' && 'Configurar Automação'}
                        {activeModal === 'coupon' && 'Criar Cupom de Desconto'}
                        {activeModal === 'campaign' && 'Nova Campanha de Marketing'}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Painel de Crescimento BarberSaaS</p>
                  </div>
               </div>
               <button onClick={closeModals} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-500 hover:text-white transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 md:p-10 flex-1 overflow-y-auto custom-scrollbar">
              
              {/* MODAL: WHATSAPP BLAST */}
              {activeModal === 'blast' && (
                <>
                  {dispatchStep === 'compose' && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">1. Audiência Alvo</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           {(Object.entries(segments) as [Segment, typeof segments.all][]).map(([key, value]) => (
                             <button 
                                key={key}
                                onClick={() => setSelectedSegment(key)}
                                className={`p-5 rounded-2xl border text-left transition-all group flex items-center justify-between ${
                                  selectedSegment === key 
                                  ? 'bg-amber-500 border-amber-500 text-slate-950' 
                                  : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20'
                                }`}
                             >
                                <div className="flex items-center gap-3">
                                   <div className={`${selectedSegment === key ? 'bg-slate-950/10' : 'bg-white/5'} p-2 rounded-lg`}>{value.icon}</div>
                                   <div>
                                      <p className="text-xs font-black uppercase tracking-tight leading-none">{value.name}</p>
                                      <p className={`text-[10px] mt-1 font-bold ${selectedSegment === key ? 'text-slate-800' : 'text-slate-600'}`}>{value.count} Clientes</p>
                                   </div>
                                </div>
                                {selectedSegment === key && <CheckCircle2 size={18} />}
                             </button>
                           ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">2. Redigir Mensagem</label>
                        <textarea 
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full bg-slate-950/50 border border-white/10 rounded-[2rem] p-6 text-white font-medium text-sm focus:outline-none focus:border-amber-500/50 transition-all min-h-[160px] resize-none"
                        />
                      </div>
                      <button onClick={handleStartDispatch} className="w-full bg-amber-500 text-slate-950 h-16 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl hover:bg-amber-400 transition-all flex items-center justify-center gap-3">
                        DISPARAR PARA {segments[selectedSegment].count} CONTATOS <Send size={18} />
                      </button>
                    </div>
                  )}

                  {dispatchStep === 'sending' && (
                    <div className="py-20 flex flex-col items-center justify-center space-y-10">
                       <Loader2 size={60} className="text-amber-500 animate-spin" />
                       <div className="text-center space-y-4">
                          <h4 className="text-3xl font-black text-white tracking-tighter">Enviando Blast...</h4>
                          <div className="w-64 h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                          </div>
                          <p className="text-xl font-black text-amber-500 tabular-nums">{Math.round(progress)}%</p>
                       </div>
                    </div>
                  )}

                  {dispatchStep === 'success' && (
                    <div className="py-12 space-y-10 text-center animate-in slide-in-from-bottom-8">
                       <div className="bg-emerald-500/10 p-8 rounded-full w-fit mx-auto border border-emerald-500/20 text-emerald-500">
                         <CheckCircle2 size={64} />
                       </div>
                       <h4 className="text-4xl font-black text-white">Sucesso Total!</h4>
                       <p className="text-slate-500 font-medium text-lg">Suas ofertas foram entregues para a fila do WhatsApp.</p>
                       <button onClick={closeModals} className="w-full h-16 bg-white/5 text-white rounded-2xl font-black text-xs uppercase tracking-widest">VOLTAR AO PAINEL</button>
                    </div>
                  )}
                </>
              )}

              {/* MODAL: CONFIG AUTOMAÇÃO */}
              {activeModal === 'automation' && (
                <div className="space-y-8 animate-in fade-in">
                  <div className="bg-amber-500/5 border border-amber-500/10 p-6 rounded-[2rem] flex items-center gap-4">
                     <AlertCircle className="text-amber-500 shrink-0" />
                     <p className="text-xs text-slate-400 font-bold leading-relaxed uppercase tracking-wider">
                       Esta automação é disparada pelo sistema sempre que as condições de gatilho forem atendidas.
                     </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Gatilho (Dias)</label>
                        <div className="relative">
                           <Clock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                           <input type="number" defaultValue={30} className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 text-white font-bold" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Canal de Envio</label>
                        <select className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 text-white font-bold appearance-none">
                           <option>WhatsApp & SMS</option>
                           <option>Apenas WhatsApp</option>
                           <option>Apenas E-mail</option>
                        </select>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Template da Mensagem</label>
                     <textarea className="w-full bg-white/5 border border-white/5 rounded-[2rem] p-6 text-white font-medium text-sm min-h-[120px] resize-none" defaultValue="Olá {{nome}}, já se passaram 30 dias desde seu último corte. Agende agora e mantenha o visual em dia!" />
                  </div>
                  <button onClick={closeModals} className="w-full bg-amber-500 text-slate-950 h-16 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">SALVAR CONFIGURAÇÕES</button>
                </div>
              )}

              {/* MODAL: CRIAR CUPOM */}
              {activeModal === 'coupon' && (
                <form onSubmit={handleAddCoupon} className="space-y-8 animate-in fade-in">
                   <div className="space-y-2">
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Código do Cupom</label>
                      <div className="relative">
                         <Hash className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                         <input 
                           type="text" 
                           required 
                           value={newCoupon.code}
                           onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                           placeholder="EX: PROMO50" 
                           className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 text-white font-black text-lg placeholder:text-slate-800" 
                         />
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Valor do Desconto</label>
                         <div className="relative">
                            <Percent className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                            <input 
                              type="text" 
                              required 
                              value={newCoupon.discount}
                              onChange={(e) => setNewCoupon({...newCoupon, discount: e.target.value})}
                              placeholder="20% ou R$ 15" 
                              className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl pl-16 pr-6 text-white font-bold" 
                            />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Limite de Usos</label>
                         <input 
                           type="number" 
                           required 
                           value={newCoupon.limit}
                           onChange={(e) => setNewCoupon({...newCoupon, limit: Number(e.target.value)})}
                           className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 text-white font-bold" 
                         />
                      </div>
                   </div>
                   <button type="submit" className="w-full bg-amber-500 text-slate-950 h-16 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">ATIVAR CUPOM AGORA</button>
                </form>
              )}

              {/* MODAL: NOVA CAMPANHA */}
              {activeModal === 'campaign' && (
                 <div className="space-y-8 animate-in fade-in">
                    <div className="space-y-2">
                       <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome da Campanha</label>
                       <input type="text" placeholder="Ex: Black Friday 2025" className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 text-white font-bold" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Data Início</label>
                          <input type="date" className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 text-white font-bold" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Data Fim</label>
                          <input type="date" className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 text-white font-bold" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Canais de Divulgação</label>
                       <div className="grid grid-cols-3 gap-3">
                          {['WhatsApp', 'Instagram', 'E-mail'].map(ch => (
                             <button key={ch} className="py-4 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-amber-500 hover:border-amber-500 transition-all">{ch}</button>
                          ))}
                       </div>
                    </div>
                    <button onClick={closeModals} className="w-full bg-amber-500 text-slate-950 h-16 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">CRIAR PLANEJAMENTO</button>
                 </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
