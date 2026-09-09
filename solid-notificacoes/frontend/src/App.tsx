import { useState } from "react";
import { UserProfile } from "./components/UserProfile";
import "./App.css";

export default function App() {
  const [userId, setUserId] = useState(1);

  return (
    <main className="app">
      <h2 className="app__titulo">Perfil do Usuário</h2>

      <div className="app__controles">
        {[1, 2, 3, 4, 5].map((id) => (
          <button
            key={id}
            onClick={() => setUserId(id)}
            className={id === userId ? "btn btn--ativo" : "btn"}
          >
            {id}
          </button>
        ))}
      </div>

      <UserProfile userId={userId} />
    </main>
  );
}