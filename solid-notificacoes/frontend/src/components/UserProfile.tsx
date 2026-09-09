import { useUser } from "../hooks/useUser";
import "./UserProfile.css";

interface UserProfileProps {
  userId: number;
}

export function UserProfile({ userId }: UserProfileProps) {
  const { user, loading, error } = useUser(userId);

  if (loading) {
    return (
      <div className="card card--estado">
        <div className="spinner" />
        <p>Carregando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card card--erro">
        <p>{error}</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <article className="card">
      <header className="card__topo">
        <div className="avatar">{user.name.charAt(0)}</div>
        <div>
          <h1 className="card__nome">{user.name}</h1>
          <span className="card__empresa">{user.company.name}</span>
        </div>
      </header>

      <ul className="card__lista">
        <li><span>E-mail</span><strong>{user.email}</strong></li>
        <li><span>Telefone</span><strong>{user.phone}</strong></li>
        <li><span>Site</span><strong>{user.website}</strong></li>
      </ul>
    </article>
  );
}