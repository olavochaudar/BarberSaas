
import React, { useState, useEffect } from 'react';
import { 
  Scissors, Plus, Search, Edit2, Trash2, 
  Clock, DollarSign, ToggleLeft, ToggleRight, Sparkles,
  X, Save, Camera, Info, Upload, CheckCircle2, AlertCircle
} from 'lucide-react';
import { SERVICES } from '../../constants';
import { BarberService } from '../../types';

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState<BarberService[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todos');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<BarberService | null>(null);
  
  const [formData, setFormData] = useState<Partial<BarberService>>({
    name: '',
    description: '',
    durationMinutes: 30,
    price: 0,
    category: 'Cabelo',
    image: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('barber_services');
    if (saved) {
      setServices(JSON.parse(saved));
    } else {
      setServices(SERVICES);
      localStorage.setItem('barber_services', JSON.stringify(SERVICES));
    }
  }, []);

  const saveServices = (updated: BarberService[]) => {
    setServices(updated);
    localStorage.setItem('barber_services', JSON.stringify(updated));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("A imagem é muito grande! Use arquivos de até 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenModal = (service?: BarberService) => {
    if (service) {
      setEditingService(service);
      setFormData(service);
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        description: '',
        durationMinutes: 30,
        price: 0,
        category: 'Cabelo',
        image: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || formData.price === undefined) return;

    let updated: BarberService[];
    if (editingService) {
      updated = services.map(s => s.id === editingService.id ? { ...s, ...formData } as BarberService : s);
    } else {
      const newService: BarberService = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name!,
        description: formData.description || '',
        durationMinutes: Number(formData.durationMinutes) || 30,
        price: Number(formData.price) || 0,
        category: formData.category || 'Cabelo',
        image: formData.image || 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800'
      };
      updated = [newService, ...services];
    }

    saveServices(updated);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente remover este serviço?')) {
      const updated = services.filter(s => s.id !== id);
      saveServices(updated);
    }
  };

  const toggleStatus = (id: string) => {
    const updated = services.map(s => s.id === id ? { ...s, active: !((s as any).active ?? true) } : s);
    saveServices(updated as any);
  };

  const filteredServices = services.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'Todos' || s.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      {/* Header com Estilo Comando */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-[0.4em]">
             <Sparkles size={14} /> Catalog Excellence
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white leading-[0.9]">Menu de <br /><span className="text-amber-500 italic">Serviços.</span></h1>
          <p className="text-slate-500 font-medium text-lg">Gerencie a vitrine de experiências que sua barbearia oferece.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-amber-500 text-slate-950 px-10 py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-amber-500/20 hover:bg-amber-400 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <Plus size={20} /> ADICIONAR SERVIÇO
        </button>
      </div>

      {/* Filtros Glass */}
      <div className="bg-slate-900/40 border border-white/5 p-4 md:p-6 rounded-[2.5rem] md:rounded-[3rem] backdrop-blur-3xl flex flex-col md:flex-row items-center gap-6 shadow-2xl">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
          <input 
            type="text"
            placeholder="Pesquisar serviço..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-16 pr-6 text-sm text-white focus:outline-none focus:border-amber-500/30 transition-all font-bold"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
           {['Todos', 'Cabelo', 'Barba', 'Estética', 'Combo'].map(cat => (
             <button 
                key={cat} 
                onClick={() => setFilterCategory(cat)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shrink-0 transition-all border ${
                  filterCategory === cat 
                  ? 'bg-amber-500 text-slate-950 border-amber-500' 
                  : 'bg-white/5 text-slate-500 border-white/5 hover:text-slate-200 hover:bg-white/10'
                }`}
             >
               {cat}
             </button>
           ))}
        </div>
      </div>

      {/* Grid de Cards Refinados */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredServices.map((service) => {
          const isActive = (service as any).active ?? true;
          return (
          <div key={service.id} className={`bg-slate-900/40 border rounded-[3.5rem] overflow-hidden group transition-all shadow-2xl flex flex-col relative ${isActive ? 'border-white/5 hover:border-amber-500/30' : 'border-red-500/10 grayscale opacity-60'}`}>
            <div className="h-64 relative overflow-hidden">
               <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
               
               <div className="absolute top-6 right-6 flex gap-2">
                  <button 
                    onClick={() => handleOpenModal(service)}
                    className="p-3 bg-slate-950/80 backdrop-blur-xl rounded-2xl text-white hover:text-amber-500 transition-all border border-white/10 shadow-xl"
                  >
                    <Edit2 size={16} />
                  </button>
               </div>
               
               <div className="absolute bottom-6 left-8">
                  <span className="bg-amber-500 text-slate-950 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl">
                    {service.category}
                  </span>
               </div>
            </div>
            
            <div className="p-10 flex-1 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                   <h3 className="font-black text-2xl text-white group-hover:text-amber-500 transition-colors tracking-tight leading-tight flex-1">{service.name}</h3>
                   <div className="flex flex-col items-end shrink-0">
                      <button 
                        onClick={() => toggleStatus(service.id)}
                        className={`${isActive ? 'text-emerald-500' : 'text-slate-600'} flex items-center gap-2 transition-all hover:scale-110`}
                      >
                         <span className="text-[10px] font-black uppercase">{isActive ? 'Ativo' : 'Off'}</span>
                         {isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                      </button>
                   </div>
                </div>
                <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2">{service.description}</p>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-white/5">
                <div className="flex items-center gap-6">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Duração</p>
                    <div className="flex items-center gap-2 text-slate-200">
                      <Clock size={16} className="text-amber-500" />
                      <span className="font-black text-base">{service.durationMinutes}m</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Preço</p>
                    <div className="flex items-center gap-2 text-slate-200">
                      <DollarSign size={16} className="text-amber-500" />
                      <span className="font-black text-base">R$ {service.price}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(service.id)}
                  className="w-12 h-12 bg-white/5 hover:bg-red-500/10 rounded-2xl flex items-center justify-center text-slate-700 hover:text-red-500 transition-all border border-white/5"
                >
                   <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        )})}

        <button 
          onClick={() => handleOpenModal()}
          className="bg-white/5 border-4 border-dashed border-white/10 rounded-[3.5rem] p-12 flex flex-col items-center justify-center text-center space-y-4 group hover:bg-white/[0.08] hover:border-amber-500/20 transition-all min-h-[520px]"
        >
           <div className="w-20 h-20 bg-slate-800 rounded-[2.5rem] flex items-center justify-center text-slate-600 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-500 shadow-2xl">
              <Plus size={40} />
           </div>
           <div className="space-y-1">
              <p className="text-xl font-black text-white">Novo Serviço</p>
              <p className="text-sm text-slate-500 font-medium max-w-[200px] leading-relaxed">Expanda seu menu com novas experiências.</p>
           </div>
        </button>
      </div>

      {/* Modal Service Master (Fixed Layout) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setIsModalOpen(false)} />
          <div className="bg-slate-900 border border-white/10 w-full max-w-2xl rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative z-10 overflow-hidden animate-in zoom-in-95 duration-500 max-h-[90vh] flex flex-col">
            
            <div className="p-8 md:p-10 border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-5">
                <div className="bg-amber-500 p-4 rounded-2xl text-slate-950 shadow-xl shadow-amber-500/20">
                  <Scissors size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">{editingService ? 'Ajustar Serviço' : 'Cadastrar Serviço'}</h3>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Configuração de Atendimento</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-500 hover:text-white transition-all">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8 overflow-y-auto custom-scrollbar">
              {/* ÁREA DE UPLOAD MELHORADA */}
              <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Imagem Principal</label>
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden group border-2 border-dashed border-white/10 hover:border-amber-500/40 transition-all bg-slate-950 flex flex-col items-center justify-center shadow-inner">
                  {formData.image ? (
                    <>
                      <img src={formData.image} className="w-full h-full object-cover opacity-80" alt="Preview" />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                         <div className="bg-white text-slate-950 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-2xl">
                            <Camera size={16} /> TROCAR FOTO
                         </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-slate-600 group-hover:text-amber-500 transition-colors">
                      <div className="bg-white/5 p-6 rounded-3xl">
                        <Upload size={40} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-widest">Enviar Imagem (Base64)</span>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-3 px-1">
                   <AlertCircle size={14} className="text-slate-600" />
                   <p className="text-[9px] text-slate-600 font-bold italic uppercase tracking-wider">A imagem será salva no seu dispositivo local (Max 2MB).</p>
                </div>
              </div>

              {/* DADOS DO SERVIÇO */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome da Experiência</label>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ex: Corte Degrader Premium"
                    className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-slate-700"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Categoria Principal</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-amber-500/50 appearance-none cursor-pointer"
                    >
                      <option className="bg-slate-900">Cabelo</option>
                      <option className="bg-slate-900">Barba</option>
                      <option className="bg-slate-900">Estética</option>
                      <option className="bg-slate-900">Combo</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Investimento (R$)</label>
                    <div className="relative">
                      <DollarSign size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" />
                      <input 
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                        placeholder="0.00"
                        className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 text-white font-bold focus:outline-none focus:border-amber-500/50 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Duração Estimada (min)</label>
                    <div className="relative">
                      <Clock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" />
                      <input 
                        type="number"
                        value={formData.durationMinutes}
                        onChange={(e) => setFormData({...formData, durationMinutes: Number(e.target.value)})}
                        className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 text-white font-bold focus:outline-none focus:border-amber-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="bg-amber-500/5 border border-amber-500/10 p-5 rounded-2xl flex items-center gap-4">
                    <CheckCircle2 size={24} className="text-amber-500 shrink-0" />
                    <p className="text-[9px] text-slate-500 font-black uppercase leading-tight tracking-wider">Disponibilidade calculada via sistema.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Descrição Comercial</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Descreva a experiência oferecida..."
                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 text-white font-medium text-sm focus:outline-none focus:border-amber-500/50 transition-all min-h-[120px] resize-none placeholder:text-slate-700"
                  />
                </div>
              </div>

              <div className="pt-6 shrink-0">
                <button type="submit" className="w-full bg-amber-500 text-slate-950 h-20 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-amber-500/20 hover:bg-amber-400 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3">
                  <Save size={20} /> {editingService ? 'SALVAR ALTERAÇÕES' : 'PUBLICAR SERVIÇO'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
