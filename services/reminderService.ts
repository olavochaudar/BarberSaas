
import { Booking, AppNotification } from '../types';
import { SERVICES, PROFESSIONALS } from '../constants';

class ReminderService {
  private bookingsKey = 'my_bookings';
  private notificationsKey = 'app_notifications';

  public checkReminders() {
    const bookings: Booking[] = JSON.parse(localStorage.getItem(this.bookingsKey) || '[]');
    const now = new Date();
    let updated = false;

    const newBookings = bookings.map(booking => {
      if (booking.status !== 'confirmed' || !booking.reminderEnabled) return booking;

      // Montar data e hora do agendamento
      const [hours, minutes] = booking.time.split(':');
      const appointmentDate = new Date(booking.date);
      appointmentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

      const diffInMs = appointmentDate.getTime() - now.getTime();
      const diffInHours = diffInMs / (1000 * 60 * 60);

      const remindersSent = booking.remindersSent || {};
      const service = SERVICES.find(s => s.id === booking.serviceId);
      const pro = PROFESSIONALS.find(p => p.id === booking.professionalId);

      // Lembrete de 24 horas
      if (diffInHours <= 24 && diffInHours > 1 && !remindersSent.twentyFourHours) {
        this.addNotification({
          id: Math.random().toString(36).substr(2, 9),
          title: 'Lembrete: 24 Horas',
          message: `Seu horário para ${service?.name} com ${pro?.name} é amanhã às ${booking.time}.`,
          type: 'info',
          timestamp: now.toISOString(),
          read: false
        });
        remindersSent.twentyFourHours = true;
        updated = true;
      }

      // Lembrete de 1 hora
      if (diffInHours <= 1 && diffInHours > 0 && !remindersSent.oneHour) {
        this.addNotification({
          id: Math.random().toString(36).substr(2, 9),
          title: 'Seu mestre te espera!',
          message: `Falta apenas 1 hora para seu serviço de ${service?.name}. Prepare-se para a transformação!`,
          type: 'success',
          timestamp: now.toISOString(),
          read: false
        });
        remindersSent.oneHour = true;
        updated = true;
      }

      return { ...booking, remindersSent };
    });

    if (updated) {
      localStorage.setItem(this.bookingsKey, JSON.stringify(newBookings));
      window.dispatchEvent(new Event('storage'));
    }
  }

  private addNotification(notif: AppNotification) {
    const current: AppNotification[] = JSON.parse(localStorage.getItem(this.notificationsKey) || '[]');
    const updated = [notif, ...current].slice(0, 50); // Manter as últimas 50
    localStorage.setItem(this.notificationsKey, JSON.stringify(updated));
    
    // Disparar evento customizado para notificar componentes React
    window.dispatchEvent(new CustomEvent('new_notification', { detail: notif }));
  }

  public getNotifications(): AppNotification[] {
    return JSON.parse(localStorage.getItem(this.notificationsKey) || '[]');
  }

  public markAsRead(id: string) {
    const current: AppNotification[] = this.getNotifications();
    const updated = current.map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem(this.notificationsKey, JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  }
}

export const reminderService = new ReminderService();
