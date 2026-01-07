
import React, { useState, useEffect } from 'react';
import { 
  Package, Plus, Search, Filter, ArrowDown, ArrowUp, 
  AlertTriangle, TrendingUp, Sparkles, Box, X, Save, 
  Trash2, Info, ChevronDown, ChevronUp, Calculator, Edit3
} from 'lucide-react';
import { InventoryItem } from '../../types';

const INITIAL_PRODUCTS: InventoryItem[] = [
  { id: '1', name: 'Pomada Matte Elite', stock: 42, minStock: 15, price: 65, category: 'Finalizadores' },
  { id: '2', name: 'Óleo para Barba 30ml', stock: 8, minStock: 10, price: 45, category: 'Barba' },
  { id: '3', name: 'Shampoo Refresh 250ml', stock: 25, minStock: 12, price: 55, category: 'Cabelo' },
  { id: '4', name: 'Lâminas Premium (Box)', stock: 120, minStock: 50, price: 80, category: 'Insumos' },
  { id: '5', name: 'Toalhas Brancas 100% Alg', stock: 60, minStock: 100, price: 15, category: 'Insumos' },
];

export const AdminInventory: React.FC = () => {
  const [products, setProducts] = useState<InventoryItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  
  // Form State
  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    name: '',
    category: 'Finalizadores',
    stock: 0,
    minStock: 5,
    price: 0
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('inventory_data');
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('inventory_data', JSON.stringify(INITIAL_PRODUCTS));
    }
  }, []);

  // Save to localStorage
  const saveProducts = (updatedProducts: InventoryItem[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('inventory_data', JSON.stringify(updatedProducts));
  };

  const handleOpenModal = (item?: InventoryItem) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        category: 'Finalizadores',
        stock: 0,
        minStock: 5,
        price: 0
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    let updated: InventoryItem[];

    if (editingItem) {
      updated = products.map(p => 
        p.id === editingItem.id ? { ...p, ...formData } as InventoryItem : p
      );
    } else {
      const item: InventoryItem = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name!,
        category: formData.category!,
        stock: Number(formData.stock) || 0,
        minStock: Number(formData.minStock) || 0,
        price: Number(formData.price) || 0,
      };
      updated = [item, ...products];
    }

    saveProducts(updated);
    setIsModalOpen(false);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Deseja realmente remover este item do estoque?')) {
      const updated = products.filter(p => p.id !== id);
      saveProducts(updated);
    }
  };

  const updateStock = (id: string, delta: number) => {
    const updated = products.map(p => 
      p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
    );
    saveProducts(updated);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase tracking-[0.3em]">
             <Package size={14} /> Supply Chain Control
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white">Estoque.</h1>
          <p className="text-slate-500 font-medium text-lg">Gerencie produtos de revenda e insumos operacionais.</p>
        </div>
        <div className="flex gap-4">
           <button className="hidden md:flex bg-white/5 text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest border border-white/5 hover:bg-white/10 transition-all items-center gap-3">
              <Box size={20} /> ENTRADA DE NOTA
           </button>
           <button 
            onClick={() => handleOpenModal()}
            className="bg-amber-500 text-slate-950 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center gap-3"
           >
              <Plus size={20} /> NOVO ITEM
           </button>
        </div>
      </div>

      {/* Resumo de Estoque */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[3rem] group hover:bg-slate-900/60 transition-all flex flex-col shadow-xl">
           <div className="flex items-center justify-between mb-6">
              <div className="bg-white/5 p-4 rounded-2xl text-amber-500">
                 <TrendingUp size={24} />
              </div>
              <button 
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-amber-500 hover:bg-white/10 transition-all"
              >
                {showBreakdown ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                Memória de Cálculo
              </button>
           </div>
           <div>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Valor em Estoque</p>
              <h4 className="text-4xl font-black text-white tracking-tighter leading-none">R$ {totalValue.toLocaleString('pt-BR')}</h4>
              <p className="text-[10px] text-slate-500 font-bold italic mt-3">Preço de venda estimado</p>
           </div>

           {showBreakdown && (
             <div className="mt-8 pt-6 border-t border-white/5 space-y-4 animate-in slide-in-from-top-4 duration-500">
               <div className="flex items-center gap-2 mb-2">
                 <Calculator size={12} className="text-amber-500" />
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Detalhamento de Composição</p>
               </div>
               <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {products.map(p => (
                    <div key={p.id} className="flex items-center justify-between text-[11px] group/item">
                       <span className="text-slate-500 truncate max-w-[120px] font-medium group-hover/item:text-slate-300 transition-colors">{p.name}</span>
                       <div className="flex items-center gap-2">
                          <span className="text-slate-600 font-mono">{p.stock} x R$ {p.price}</span>
                          <span className="text-amber-500 font-black">R$ {p.stock * p.price}</span>
                       </div>
                    </div>
                  ))}
               </div>
             </div>
           )}
        </div>

        {[
          { label: 'Itens com Baixo Estoque', value: lowStockCount.toString().padStart(2, '0'), icon: <AlertTriangle />, sub: 'Necessitam reposição imediata', color: lowStockCount > 0 ? 'text-red-500' : 'text-emerald-500' },
          { label: 'Giro de Itens', value: products.length.toString(), icon: <Sparkles />, sub: 'Total de SKUs cadastrados' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900/40 border border-white/5 p-8 rounded-[3rem] group hover:bg-slate-900/60 transition-all flex flex-col justify-between shadow-xl min-h-[190px]">
             <div className="flex items-center justify-between mb-6">
                <div className={`bg-white/5 p-4 rounded-2xl ${stat.color || 'text-amber-500'}`}>
                   {stat.icon}
                </div>
                <ArrowUp size={16} className="text-slate-700" />
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">{stat.label}</p>
                <h4 className="text-4xl font-black text-white tracking-tighter leading-none">{stat.value}</h4>
                <p className="text-[10px] text-slate-500 font-bold italic mt-3">{stat.sub}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/40 border border-white/5 rounded-[4rem] overflow-hidden shadow-2xl backdrop-blur-md">
         <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative flex-1">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
               <input 
                  type="text"
                  placeholder="Pesquisar por produto ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-16 pr-6 text-sm text-white focus:outline-none focus:border-amber-500/30 font-bold transition-all"
               />
            </div>
            <button className="flex items-center gap-3 px-6 py-4 bg-white/5 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5">
               <Filter size={16} /> Filtrar Base
            </button>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-white/5 text-[11px] text-slate-500 font-black uppercase tracking-[0.2em] border-b border-white/5">
                     <th className="px-12 py-8">Produto</th>
                     <th className="px-12 py-8">Categoria</th>
                     <th className="px-12 py-8 text-center">Quantidade</th>
                     <th className="px-12 py-8 text-right">Preço Venda</th>
                     <th className="px-12 py-8">Status</th>
                     <th className="px-12 py-8"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {filteredProducts.map((prod) => {
                    const isLow = prod.stock <= prod.minStock;
                    return (
                    <tr key={prod.id} className="group hover:bg-white/5 transition-all">
                       <td className="px-12 py-8">
                          <p className="font-black text-white text-lg">{prod.name}</p>
                          <p className="text-[10px] text-slate-500 font-black uppercase">SKU: VB-{prod.id.substr(0, 5).toUpperCase()}</p>
                       </td>
                       <td className="px-12 py-8 text-slate-400 font-bold">{prod.category}</td>
                       <td className="px-12 py-8 text-center">
                          <span className={`text-xl font-black ${isLow ? 'text-red-500' : 'text-slate-200'}`}>{prod.stock}</span>
                       </td>
                       <td className="px-12 py-8 text-right font-black text-amber-500 text-lg tabular-nums">R$ {prod.price}</td>
                       <td className="px-12 py-8">
                          <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${isLow ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'}`}>
                             {isLow ? 'BAIXO ESTOQUE' : 'ESTÁVEL'}
                          </span>
                       </td>
                       <td className="px-12 py-8 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button onClick={() => updateStock(prod.id, 1)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-500 hover:text-amber-500 transition-all"><ArrowUp size={16} /></button>
                             <button onClick={() => updateStock(prod.id, -1)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-500 hover:text-amber-500 transition-all"><ArrowDown size={16} /></button>
                             <button onClick={() => handleOpenModal(prod)} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-500 hover:text-white transition-all"><Edit3 size={16} /></button>
                             <button onClick={() => handleDeleteItem(prod.id)} className="p-3 bg-white/5 hover:bg-red-500/10 rounded-xl text-slate-700 hover:text-red-500 transition-all"><Trash2 size={16} /></button>
                          </div>
                       </td>
                    </tr>
                  )})}
               </tbody>
            </table>
         </div>
      </div>

      {/* MODAL NOVO/EDITAR ITEM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300" onClick={() => setIsModalOpen(false)} />
          <div className="bg-slate-900 border border-white/10 w-full max-w-xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in duration-300">
            <div className="p-10 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-amber-500 p-3 rounded-2xl text-slate-950 shadow-lg shadow-amber-500/20">
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">{editingItem ? 'Editar Produto' : 'Novo Produto'}</h3>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Configuração de Item no Inventário</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-500 hover:text-white transition-all">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome do Produto</label>
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Ex: Pomada Efeito Seco Premium"
                    className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-amber-500/30 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Categoria</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-amber-500/30 appearance-none transition-all"
                    >
                      <option className="bg-slate-900">Finalizadores</option>
                      <option className="bg-slate-900">Barba</option>
                      <option className="bg-slate-900">Cabelo</option>
                      <option className="bg-slate-900">Insumos</option>
                      <option className="bg-slate-900">Outros</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Preço de Venda (R$)</label>
                    <input 
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                      placeholder="0,00"
                      className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-amber-500/30 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Estoque Disponível</label>
                    <input 
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                      className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-amber-500/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mínimo para Alerta</label>
                    <input 
                      type="number"
                      value={formData.minStock}
                      onChange={(e) => setFormData({...formData, minStock: Number(e.target.value)})}
                      className="w-full h-16 bg-white/5 border border-white/5 rounded-2xl px-6 text-white font-bold focus:outline-none focus:border-amber-500/30 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button type="submit" className="w-full bg-amber-500 text-slate-950 h-16 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-amber-500/20 hover:bg-amber-400 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                  <Save size={18} /> {editingItem ? 'ATUALIZAR PRODUTO NO SISTEMA' : 'SALVAR NOVO PRODUTO NO SISTEMA'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
