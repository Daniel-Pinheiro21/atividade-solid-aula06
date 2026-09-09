export interface AppNotification {
  enviarNotificacao(destinatario: string, mensagem: string): void;
}