
import React from 'react';
import { Scissors, Calendar, Users, Settings, Home, History, LogOut, CheckCircle, Clock, XCircle, BarChart3, Landmark, Megaphone, Package, UserCircle, Coffee } from 'lucide-react';
import { BarberService, Professional, BarbershopInfo } from './types';

export const BARBERSHOP: BarbershopInfo = {
  name: "Vintage Blades Co.",
  address: "Av. Paulista, 1000 - São Paulo, SP",
  phone: "(11) 98765-4321",
  instagram: "@vintageblades_co",
  whatsapp: "5511987654321",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975031234!2d-46.6586!3d-23.5617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-100!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr",
  image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1600",
  openingHours: {
    "Segunda": "09:00 - 19:00",
    "Terça": "09:00 - 19:00",
    "Quarta": "09:00 - 19:00",
    "Quinta": "09:00 - 19:00",
    "Sexta": "09:00 - 21:00",
    "Sábado": "08:00 - 20:00",
    "Domingo": "Fechado"
  }
};

export const PROMOTIONS = [
  {
    id: 'promo1',
    title: 'Happy Hour da Barba',
    subtitle: '30% OFF em todas as barbas nas Terças-feiras.',
    image: 'https://images.unsplash.com/photo-1532710093739-9470acff878f?auto=format&fit=crop&q=80&w=800'
  }
];

export const EMPTY_STATE_IMAGE = "https://images.unsplash.com/photo-1621607512214-68297480165e?auto=format&fit=crop&q=80&w=600";

export const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1512690118275-14f88cee399f?auto=format&fit=crop&q=80&w=800"
];

export const SERVICES: BarberService[] = [
  { 
    id: '1', 
    name: 'Corte de Cabelo', 
    description: 'Corte clássico ou moderno, acabamento com navalha.', 
    durationMinutes: 45, 
    price: 60, 
    category: 'Cabelo',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '2', 
    name: 'Barba Master', 
    description: 'Toalha quente, óleos essenciais e hidratação.', 
    durationMinutes: 30, 
    price: 45, 
    category: 'Barba',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '3', 
    name: 'Combo Completo', 
    description: 'Corte + Barba + Lavagem especial.', 
    durationMinutes: 75, 
    price: 95, 
    category: 'Combo',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=800'
  },
  { 
    id: '4', 
    name: 'Cabelo & Barba VIP', 
    description: 'O protocolo completo para o homem moderno.', 
    durationMinutes: 90, 
    price: 110, 
    category: 'Combo',
    image: 'https://images.unsplash.com/photo-1592647425447-1827e33fa9e8?auto=format&fit=crop&q=80&w=800'
  }
];

export const PROFESSIONALS: Professional[] = [
  { 
    id: 'p1', 
    name: 'Mestre Silva', 
    specialty: 'Especialista em Degrader', 
    bio: '15 anos de experiência nas tesouras.', 
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400', 
    rating: 4.9,
    services: ['1', '2', '3']
  },
  { 
    id: 'p2', 
    name: 'Lucas Corte', 
    specialty: 'Cortes Clássicos', 
    bio: 'Apaixonado pela cultura clássica da barbearia.', 
    avatar: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&q=80&w=400', 
    rating: 4.8,
    services: ['1', '2', '3']
  }
];

export const NAV_LINKS = {
  CLIENT: [
    { name: 'Início', path: '/', icon: <Home size={20} /> },
    { name: 'Agendar', path: '/booking', icon: <Calendar size={20} /> },
    { name: 'Minhas Reservas', path: '/my-bookings', icon: <History size={20} /> },
    { name: 'Perfil', path: '/profile', icon: <UserCircle size={20} /> },
  ],
  ADMIN: [
    { name: 'Dashboard', path: '/admin', icon: <Home size={20} /> },
    { name: 'Horários', path: '/admin/schedule', icon: <Clock size={20} /> },
    { name: 'Finanças', path: '/admin/business', icon: <Landmark size={20} /> },
    { name: 'Marketing', path: '/admin/marketing', icon: <Megaphone size={20} /> },
    { name: 'Estoque', path: '/admin/inventory', icon: <Package size={20} /> },
    { name: 'Clientes', path: '/admin/clients', icon: <Users size={20} /> },
    { name: 'Serviços', path: '/admin/services', icon: <Scissors size={20} /> },
    { name: 'Equipe', path: '/admin/team', icon: <Users size={20} /> },
    { name: 'Configurações', path: '/admin/settings', icon: <Settings size={20} /> },
  ]
};
