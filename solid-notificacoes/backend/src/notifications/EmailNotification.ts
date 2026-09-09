import type { AppNotification } from "./AppNotification.js";

export class EmailNotification implements AppNotification {
  enviarNotificacao(destinatario: string, mensagem: string): void {
    console.log(` Enviando E-MAIL para ${destinatario}: ${mensagem}`);
  }
}