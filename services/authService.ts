
import { User, UserRole } from '../types';

class AuthService {
  private userKey = 'barbersaas_user';

  async login(email: string, password?: string, isGoogle = false): Promise<User | null> {
    const normalizedEmail = email.toLowerCase().trim();
    
    const isAdmin = normalizedEmail === 'olavochaudar12@gmail.com' || normalizedEmail.includes('admin');
    const role = isAdmin ? UserRole.ADMIN : UserRole.CLIENT;
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: isAdmin ? 'Olavo Chaudar (Admin)' : (isGoogle ? 'Usuário Google' : 'Cliente VIP'),
      email: normalizedEmail,
      role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${normalizedEmail}`
    };

    localStorage.setItem(this.userKey, JSON.stringify(mockUser));
    return mockUser;
  }

  async signup(name: string, email: string): Promise<User | null> {
    const normalizedEmail = email.toLowerCase().trim();
    const isAdmin = normalizedEmail === 'olavochaudar12@gmail.com';
    
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email: normalizedEmail,
      role: isAdmin ? UserRole.ADMIN : UserRole.CLIENT,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${normalizedEmail}`
    };
    localStorage.setItem(this.userKey, JSON.stringify(mockUser));
    return mockUser;
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem(this.userKey);
    return data ? JSON.parse(data) : null;
  }

  updateUser(updatedData: Partial<User>): User | null {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;

    const newUser = { ...currentUser, ...updatedData };
    localStorage.setItem(this.userKey, JSON.stringify(newUser));
    
    // Disparar evento para que componentes como o Layout percebam a mudança
    window.dispatchEvent(new Event('storage'));
    return newUser;
  }

  logout() {
    localStorage.removeItem(this.userKey);
    window.location.hash = '#/logout';
  }
}

export const authService = new AuthService();
