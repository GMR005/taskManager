import { useState } from "react";
import {api, setToken, setEmail} from './api';
import './LoginPage.css'

export default function LoginPage({onLogin}) {
  const [email, setEmailState] = useState('');
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
    if (password.length < 6) {
      setError('Пароль минимум 6 символов');
      return;
    }
    setLoading(true);
    try {
        const endpoint = isRegister ? '/auth/register' : '/auth/login';

        const data = await api(endpoint, {
            method: 'POST',
            body: JSON.stringify({email: email.trim(), password}),
        })

        setToken(data.token);
        setEmail(data.user.email);
        onLogin();
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>{isRegister ? 'Регистрация' : 'Вход'}</h1>
        <p className="login-subtitle">
          {isRegister ? 'Создайте аккаунт для управления задачами' : 'Войдите в свой аккаунт'}
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmailState(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Загрузка...' : (isRegister ? 'Зарегистрироваться' : 'Войти')}
          </button>
        </form>

        {error && (
          <p className="login-error">{error}</p>
        )}

        <p className="login-toggle">
          {isRegister ? (
            <>Уже есть аккаунт? <a onClick={() => { setIsRegister(false); setError(''); }}>Войти</a></>
          ) : (
            <>Нет аккаунта? <a onClick={() => { setIsRegister(true); setError(''); }}>Зарегистрироваться</a></>
          )}
        </p>
      </div>
    </div>
  );
}