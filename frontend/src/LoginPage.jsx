import { useState } from "react";
import {api, setToken} from './api';

export default function LoginPage({onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Заполни email и пароль');
      return;
    }
    setLoading(true);
    try {
        const endpoint = isRegister ? '/auth/register' : '/auth/login';

        const data = await api (endpoint, {
            method: 'POST',
            body: JSON.stringify({email, password}),
        })

        setToken(data.token);
        onLogin();
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="app" style={{ maxWidth: 400, margin: '50px auto' }}>
      <h1>{isRegister ? 'Регистрация' : 'Вход'}</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', marginBottom: 10, padding: 8 }}
        />


        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: 10 }}
        >
          {loading ? 'Загрузка...' : (isRegister ? 'Зарегистрироваться' : 'Войти')}
        </button>
      </form>


      {error && (
        <p style={{ color: 'red', marginTop: 10 }}>{error}</p>
      )}

      <p style={{ marginTop: 15, cursor: 'pointer', color: 'blue' }}
         onClick={() => { setIsRegister(!isRegister); setError(''); }}>
        {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
      </p>
    </div>
  );
}