
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Scissors, LogOut, Menu, X, Bell, BellRing, 
  ChevronRight, LayoutDashboard, LogIn, UserCircle, 
  Check, Zap, Fingerprint, Shield, Command, Activity
} from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { authService } from '../services/authService';
import { reminderService } from '../services/reminderService';
import { UserRole, AppNotification, User } from '../types';

interface LayoutProps { label?: string; children: React.ReactNode; }

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(authService.getCurrentUser());
  const location = useLocation();
  
  useEffect(() => {
    const handleSync = () => {
      setNotifications(reminderService.getNotifications());
      setCurrentUser(authService.getCurrentUser());
    };

    handleSync();
    window.addEventListener('storage', handleSync);
    window.addEventListener('new_notification' as any, handleSync);
    
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('new_notification' as any, handleSync);
    };
  }, []);

  const links = currentUser?.role === UserRole.ADMIN ? NAV_LINKS.ADMIN : NAV_LINKS.CLIENT;

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col md:flex-row overflow-x-hidden selection:bg-amber-500/30 font-display">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-amber-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[70vw] h-[70vw] bg-blue-600/5 blur-[100px] rounded-full" />
      </div>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-5 bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 sticky top-0 z-[60]">
        <div className="flex items-center gap-2">
          <div className="bg-amber-500 p-1.5 rounded-lg">
            <Scissors className="text-slate-950" size={14} />
          </div>
          <span className="text-base font-black tracking-tighter text-white uppercase">BarberSaaS</span>
        </div>
        <button onClick={() => setSidebarOpen(true)} className="p-2 text-white bg-white/5 rounded-xl border border-white/10">
          <Menu size={20} />
        </button>
      </header>

      {/* Sidebar reativa ao avatar */}
      <aside className={`
        fixed md:sticky top-0 h-screen z-[70] transition-transform duration-500 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        w-80 bg-[#020617]/95 md:bg-[#020617]/80 backdrop-blur-3xl border-r border-white/5 flex flex-col shadow-2xl
      `}>
        <div className="p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-12">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-amber-500 w-10 h-10 flex items-center justify-center rounded-xl shadow-lg shadow-amber-500/20">
                <Scissors className="text-slate-950" size={20} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-black text-white tracking-tighter leading-none">BarberSaaS.</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 bg-white/5 rounded-xl text-slate-400">
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-4 px-6 py-4 rounded-2xl transition-all
                    ${isActive 
                      ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/10' 
                      : 'text-slate-500 hover:bg-white/5 hover:text-slate-200'
                    }
                  `}
                >
                  {React.cloneElement(link.icon as React.ReactElement<any>, { size: 18, strokeWidth: isActive ? 3 : 2 })}
                  <span className="text-xs font-black tracking-tight uppercase tracking-[0.1em]">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Avatar Area - Sincronizada */}
          <div className="mt-auto pt-8 border-t border-white/5">
            {currentUser ? (
              <div className="space-y-4">
                <Link to="/profile" onClick={() => setSidebarOpen(false)} className="bg-white/5 hover:bg-white/10 p-4 rounded-3xl flex items-center gap-4 border border-white/5 transition-all group">
                  <div className="relative">
                    <img 
                      src={currentUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.email}`} 
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-amber-500/20 group-hover:ring-amber-500 transition-all" 
                      alt="User Avatar" 
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#020617] rounded-full" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-white truncate">{currentUser.name}</p>
                    <p className="text-[9px] text-amber-500/60 font-black uppercase tracking-widest">{currentUser.role}</p>
                  </div>
                </Link>
                <button 
                  onClick={() => authService.logout()}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-red-500/5 hover:bg-red-500 text-slate-500 hover:text-white rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest border border-red-500/10"
                >
                  <LogOut size={14} /> Sair da Conta
                </button>
              </div>
            ) : (
              <Link to="/login" className="w-full block py-5 bg-amber-500 text-slate-950 rounded-2xl font-black text-xs text-center uppercase tracking-widest shadow-xl shadow-amber-500/10">
                Acessar Sistema
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col min-w-0">
        <div className="w-full max-w-7xl mx-auto p-4 md:p-12 pb-32 md:pb-12 flex-1">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {!isSidebarOpen && (
        <div className="md:hidden fixed bottom-8 left-6 right-6 z-[80] transition-all animate-in fade-in slide-in-from-bottom-4">
          <nav className="bg-[#020617]/95 backdrop-blur-3xl border border-white/10 px-8 py-5 rounded-[2.5rem] flex justify-around items-center shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
            {links.slice(0, 4).map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`p-3 rounded-2xl transition-all ${isActive ? 'text-amber-500 bg-amber-500/10 scale-110' : 'text-slate-500'}`}
                >
                  {React.cloneElement(link.icon as React.ReactElement<any>, { size: 24, strokeWidth: isActive ? 3 : 2 })}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};
