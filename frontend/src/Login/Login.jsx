import React, { useState } from 'react';
import "../components/EventForm.css";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const Login = () => {
  const [organizationId, setOrganizationId] = useState('');
  const [password, setPassword] = useState('');

  // 🔧 Заглушка: список организаций (в будущем придёт с сервера)
  const organizations = [
    { id: 'org1', name: 'Администрация города' },
    { id: 'org2', name: 'Школа №12' },
    { id: 'org3', name: 'Центр молодёжи' },
    { id: 'org4', name: 'Краевой театр' },
    { id: 'org5', name: 'Университет ЮГУ' },
  ];

  // ❗ Включить позже при наличии API
  /*
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('/api/ref/organizations');
        if (!response.ok) throw new Error('Ошибка загрузки организаций');
        const data = await response.json();
        setOrganizations(data);
      } catch (err) {
        toastr.error(err.message, 'Ошибка загрузки');
      }
    };
    fetchOrganizations();
  }, []);
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!organizationId || !password.trim()) {
      toastr.error('Выберите организацию и введите пароль', 'Ошибка');
      return;
    }

    if (password.length < 4) {
      toastr.error('Пароль должен содержать минимум 4 символа', 'Ошибка');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ organizationId, password })
      });

      if (!response.ok) {
        throw new Error('Неверные данные для входа');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      toastr.success('Успешный вход!', 'Добро пожаловать');
      window.location.href = '/events';
    } catch (err) {
      toastr.error(err.message || 'Ошибка входа', 'Ошибка');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-image">
          <video autoPlay muted loop playsInline>
            <source src="/images/fon.mp4" type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Авторизация</h2>

          <label htmlFor="organization">Организация</label>
          <select
            id="organization"
            value={organizationId}
            onChange={(e) => setOrganizationId(e.target.value)}
          >
            <option value="">-- Выберите организацию --</option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.name}
              </option>
            ))}
          </select>

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="actions">
            <button type="submit" className="primary-btn">Войти</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
