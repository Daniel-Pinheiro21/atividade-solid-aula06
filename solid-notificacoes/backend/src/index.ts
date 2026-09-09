import { UserService } from "./services/UserService.js";
import { EmailNotification } from "./notifications/EmailNotification.js";
import { SmsNotification } from "./notifications/SmsNotification.js";

const email = "daniel@ceub.br";
const numero = "61999998888";

// Mesma classe, comportamentos diferentes: DIP funcionando.
const servicoEmail = new UserService(new EmailNotification());
servicoEmail.createUser(email, numero, email);

const servicoSms = new UserService(new SmsNotification());
servicoSms.createUser(email, numero, numero);

// Validação
try {
  servicoEmail.createUser("email-sem-arroba", numero, "email-sem-arroba");
} catch (e) {
  console.error("❌", (e as Error).message);
}