import type { AppNotification } from "../notifications/AppNotification.js";

export interface User {
  id: number;
  email: string;
  numero: string;
}

export class UserService {
  // DIP: recebe a abstração pronta, não instancia nada por dentro.
  constructor(private readonly notificador: AppNotification) {}

  createUser(email: string, numero: string, destino: string): User {
    if (!email.includes("@")) {
      throw new Error("Email inválido");
    }

    const user: User = { id: 1, email, numero };

    // SRP: o service NÃO sabe como enviar. Ele só pede.
    this.notificador.enviarNotificacao(destino, "Bem-vindo!");

    return user;
  }
}