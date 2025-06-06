import React, { useState, useEffect } from 'react';
import "../components/EventForm.css";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const Login = () => {
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [password, setPassword] = useState('');

  const [municipaslOrganizations, setMunicipaslOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔧 Заглушка: список организаций (в будущем придёт с сервера)
  // const organizations = [
  //   { id: 'org1', name: 'Администрация города' },
  //   { id: 'org2', name: 'Школа №12' },
  //   { id: 'org3', name: 'Центр молодёжи' },
  //   { id: 'org4', name: 'Краевой театр' },
  //   { id: 'org5', name: 'Университет ЮГУ' },
  // ];

  useEffect(() => {
      // Асинхронная функция для запроса
      const fetchData = async () => {
        const urlBack = "/api/ref/auth/organizations";
        try {
          const response = await fetch(urlBack); // Пример URL
          if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
          }
          const result = await response.json();
          console.log("Полученные организации:", result);
  
          // const normalized = result.map(event => ({
          //   ...event,
          //   date: normalizeDate(event.date)
          // }));
  
          setMunicipaslOrganizations(result);
        } catch (error) {
          setError(error.message); // Обрабатываем ошибку, если что-то пошло не так
        } finally {
          setLoading(false); // Завершаем процесс загрузки
        }
      };
  
      fetchData(); // Выполняем запрос
    }, []); // Пустой массив означает, что эффект сработает только при монтировании компонента


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

  if (loading) {
    return loading;
  }

  // Если возникла ошибка — сообщаем об этом
  if (error) {
    return error;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOrganization || !password.trim()) {
      toastr.error('Выберите организацию и введите пароль', 'Ошибка');
      return;
    }

    if (password.length < 4) {
      toastr.error('Пароль должен содержать минимум 4 символа', 'Ошибка');
      return;
    }

    console.log("Пользователь выбрал организацию: " + selectedOrganization);
    console.log("Пользователь ввел пароль: " + password);



    try {
      const response = await fetch('/api/ref/auth/authorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selectedOrganization, password })
      });

      if (!response.ok) {
        throw new Error('Неверные данные для входа');
      }

      const data = await response.text();

      alert(data);
      // localStorage.setItem('token', data.token);
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
            value={selectedOrganization}
            onChange={(e) => setSelectedOrganization(e.target.value)}
          >
            <option value="">-- Выберите организацию --</option>
            {municipaslOrganizations.map((org) => (
              <option value={org}> {/* key={org.id} */}
                {org}
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
