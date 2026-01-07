
export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}

export interface BarberService {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  category: string;
  image?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  avatar: string;
  rating: number;
  services: string[]; // IDs of services they provide
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface BookingReview {
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  clientId: string;
  professionalId: string;
  serviceId: string;
  date: string; // ISO String
  time: string;
  status: BookingStatus;
  totalPrice: number;
  reminderEnabled?: boolean;
  cancellationReason?: string;
  review?: BookingReview;
  remindersSent?: {
    twentyFourHours?: boolean;
    oneHour?: boolean;
  };
}

export interface FinancialTransaction {
  id: string;
  amount: number;
  serviceName: string;
  date: string;
  bookingId: string;
  professionalId: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  timestamp: string;
  read: boolean;
}

export interface OperatingDay {
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  hasLunchBreak: boolean;
  lunchStart: string;
  lunchEnd: string;
}

// Added missing properties to match usage in constants and components
export interface BarbershopInfo {
  name: string;
  address: string;
  phone: string;
  image?: string;
  instagram?: string;
  whatsapp?: string;
  mapUrl?: string;
  openingHours: {
    [key: string]: string | OperatingDay; 
  };
}
