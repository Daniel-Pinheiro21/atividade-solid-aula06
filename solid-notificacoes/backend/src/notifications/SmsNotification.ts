import type { AppNotification } from "./AppNotification.js";

export class SmsNotification implements AppNotification {
  enviarNotificacao(destinatario: string, mensagem: string): void {
    console.log(` Enviando SMS para o número ${destinatario}: ${mensagem}`);
  }
}