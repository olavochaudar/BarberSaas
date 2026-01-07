
import React, { useState, useEffect } from 'react';
import { 
  Users, Plus, Star, Calendar, MessageSquare, 
  MoreVertical, Settings, X, Save, Trash2, Camera, 
  Sparkles, Award, Edit3, UserPlus
} from 'lucide-react';
import { PROFESSIONALS } from '../../constants';
import { Professional } from '../../types';

export const AdminTeam: React.FC = () => {
  const [team, setTeam] = useState<Professional[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPro, setEditingPro] = useState<Professional | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<Professional>>({
    name: '',
    specialty: '',
    bio: '',
    avatar: '',
    rating: 5.0,
    services: []
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('barber_team');
    if (saved) {
      setTeam(JSON.parse(saved));
    } else {
      setTeam(PROFESSIONALS);
      localStorage.setItem('barber_team', JSON.stringify(PROFESSIONALS));
    }
  }, []);

  const saveTeam = (updatedTeam: Professional[]) => {
    setTeam(updatedTeam);
    localStorage.setItem('barber_team', JSON.stringify(updatedTeam));
  };

  const handleOpenModal = (pro?: Professional) => {
    if (pro) {
      setEditingPro(pro);
      setFormData(pro);
    } else {
      setEditingPro(null);
      setFormData({
        name: '',
        specialty: '',
        bio: '',
        avatar: '',
        rating: 5.0,
        services: ['1', '2'] // Default services for new members
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.specialty) return;

    let updatedTeam: Professional[];
    
    if (editingPro) {
      updatedTeam = team.map(p => p.id === editingPro.id ? { ...p, ...formData } as Professional : p);
    } else {
      const newPro: Professional = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name!,
        specialty: formData.specialty!,
        bio: formData.bio || 'Novo mestre na equipe.',
        avatar: formData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
        rating: Number(formData.rating) || 5.0,
        services: formData.services || ['1', '2']
      };
      updatedTeam = [newPro, ...team];
    }

    saveTeam(updatedTeam);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja remover este mestre da equipe? Esta ação não pode ser desfeita.')) {
      const updated = team.filter(p => p.id !== id);
      saveTeam(updated);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Header Operational */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-[0.3em]">
             <Users size={14} /> Human Resources Management
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white">Equipe de Mestres.</h1>
          <p className="text-slate-500 font-medium text-lg">Gerencie os profissionais, especialidades e visibilidade na vitrine.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-amber-500 text-slate-950 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-amber-500/20 hover:bg-amber-400 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
        >
          <UserPlus size={20} /> ADICIONAR MEMBRO
        </button>
      </div>

      {/* Grid de Profissionais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {team.map(pro => (
          <div key={pro.id} className="bg-slate-900/40 border border-white/5 rounded-[3.5rem] p-8 md:p-10 flex flex-col md:flex-row gap-10 hover:bg-slate-900/60 transition-all group relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[64px] rounded-full pointer-events-none" />
            
            <div className="relative shrink-0 self-center md:self-start">
               <div className="relative">
                  <img 
                    src={pro.avatar} 
                    alt={pro.name} 
                    className="w-36 h-36 rounded-[3rem] object-cover border-4 border-white/5 shadow-2xl group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-amber-500 p-2.5 rounded-2xl shadow-xl text-slate-950 border-4 border-slate-900">
                    <Award size={20} fill="currentColor" />
                  </div>
               </div>
            </div>

            <div className="flex-1 space-y-8">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-3xl font-black text-white group-hover:text-amber-500 transition-colors leading-none tracking-tight">{pro.name}</h3>
                  <p className="text-[10px] text-amber-500 font-black uppercase tracking-[0.3em]">{pro.specialty}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleOpenModal(pro)}
                    className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-500 hover:text-white transition-all border border-white/5"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(pro.id)}
                    className="p-3 bg-white/5 hover:bg-red-500/10 rounded-xl text-slate-700 hover:text-red-500 transition-all border border-white/5"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <p className="text-slate-400 text-sm font-medium italic leading-relaxed">"{pro.bio}"</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-5 rounded-3xl border border-white/5 space-y-2">
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Satisfação</p>
                  <div className="flex items-center gap-2 text-amber-500">
                    <Star size={16} fill="currentColor" />
                    <span className="font-black text-lg">{pro.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="bg-white/5 p-5 rounded-3xl border border-white/5 space-y-2">
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Habilidades</p>
                  <p className="font-black text-slate-200 text-lg leading-none">{pro.services.length} Categorias</p>
                </div>
              </div>

              <div className="flex gap-4">
                 <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/5 transition-all">Ver Agenda Full</button>
                 <button className="flex-1 py-4 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-amber-500/20 transition-all">Relatório Performance</button>
              </div>
            </div>
          </div>
        ))}

        {/* Card Placeholder para Novo Membro */}
        <button 
          onClick={() => handleOpenModal()}
          className="bg-white/5 border-4 border-dashed border-white/5 rounded-[3.5rem] p-12 flex flex-col items-center justify-center text-center space-y-6 group hover:bg-white/[0.08] hover:border-amber-500/20 transition-all min-h-[350px]"
        >
           <div className="w-24 h-24 bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-slate-600 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-500 shadow-2xl">
              <UserPlus size={40} />
           </div>
           <div className="space-y-2">
              <p className="text-2xl font-black text-white tracking-tight">Expandir a Equipe</p>
              <p className="text-sm text-slate-500 font-medium max-w-[240px] mx-auto leading-relaxed">Adicione talentos e aumente a capacidade de atendimento da sua unidade.</p>
           </div>
        </button>
      </div>

      {/* MODAL MASTER REGISTRY (ADD/EDIT) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setIsModalOpen(false)} />
          <div className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in duration-300">
            <div className="p-10 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="bg-amber-500 p-3.5 rounded-2xl text-slate-950 shadow-lg shadow-amber-500/20">
                  <Users size={28} />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight">{editingPro ? 'Editar Mestre' : 'Novo Recrutamento'}</h3>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Painel de Credenciamento de Profissional</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-500 hover:text-white transition-all">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                {/* Lado Esquerdo: Avatar Preview & Link */}
                <div className="md:col-span-4 flex flex-col items-center gap-6">
                   <div className="relative group">
                      <img 
                        src={formData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name || 'default'}`} 
                        className="w-40 h-40 rounded-[2.5rem] object-cover border-4 border-white/5 shadow-2xl bg-slate-800"
                        alt="Preview"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera size={32} className="text-white" />
                      </div>
                   </div>
                   <div className="w-full space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">URL da Foto</label>
                      <input 
                        type="text" 
                        value={formData.avatar}
                        onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                        placeholder="https://..."
                        className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 text-xs text-slate-300 focus:outline-none focus:border-amber-500/30 transition-all font-bold"
                      />
                      <p className="text-[9px] text-slate-600 font-bold px-1 italic leading-tight">Dica: Use URLs do Unsplash ou links de imagem diretos.</p>
                   </div>
                </div>

                {/* Lado Direito: Dados Principais */}
                <div className="md:col-span-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome Completo do Mestre</label>
                    <input 
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Ex: Marcus Vinícius"
                      className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-amber-500/30 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Especialidade / Título</label>
                    <input 
                      type="text"
                      required
                      value={formData.specialty}
                      onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                      placeholder="Ex: Especialista em Barba & Navalha"
                      className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-amber-500/30 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Rating Inicial</label>
                      <input 
                        type="number"
                        step="0.1"
                        max="5"
                        min="1"
                        value={formData.rating}
                        onChange={(e) => setFormData({...formData, rating: Number(e.target.value)})}
                        className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-amber-500/30 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Status Contratual</label>
                      <div className="h-16 flex items-center px-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                         <span className="text-emerald-500 text-xs font-black uppercase tracking-widest">Ativo / Regular</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Bio / Perfil Profissional</label>
                <textarea 
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  placeholder="Conte um pouco sobre a experiência e estilo deste profissional..."
                  className="w-full bg-white/5 border border-white/5 rounded-[2rem] p-6 text-white font-medium text-sm focus:outline-none focus:border-amber-500/30 transition-all min-h-[120px] resize-none"
                />
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full bg-amber-500 text-slate-950 h-16 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-amber-500/20 hover:bg-amber-400 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                  <Save size={18} /> {editingPro ? 'ATUALIZAR CADASTRO DO MESTRE' : 'FINALIZAR RECRUTAMENTO VIP'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rodapé Informativo */}
      <div className="bg-amber-500/5 border border-amber-500/10 rounded-[4rem] p-12 flex flex-col md:flex-row items-center justify-between gap-10">
         <div className="space-y-4 text-center md:text-left">
            <h4 className="text-2xl font-black text-white flex items-center justify-center md:justify-start gap-4">
               <Settings className="text-amber-500" /> Governança de Capital Humano
            </h4>
            <p className="text-slate-500 font-medium text-sm max-w-lg leading-relaxed">
              As alterações realizadas aqui impactam diretamente na vitrine de agendamento do cliente final. Certifique-se de manter as fotos atualizadas e em alta resolução.
            </p>
         </div>
         <div className="flex gap-4">
            <button className="bg-slate-950 border border-white/10 text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 transition-all flex items-center gap-2">
               Configurar Escalas <Calendar size={16} />
            </button>
         </div>
      </div>
    </div>
  );
};
