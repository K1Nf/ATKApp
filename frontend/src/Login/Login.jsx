import React, { useState, useEffect } from 'react';
import "../components/EventForm.css";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const Login = () => {
  const [organizationName, setOrganizationName] = useState('');
  const [password, setPassword] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const [municipalsOrganizations, setMunicipalsOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredOrgs = municipalsOrganizations.filter((org) =>
    org.toLowerCase().includes(organizationName.toLowerCase())
  );

  const handleOrgChange = (e) => {
    setOrganizationName(e.target.value);
    setShowDropdown(true);
  };

  const handleOrgSelect = (name) => {
    setOrganizationName(name);
    setShowDropdown(false);
  };

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
  
  
          setMunicipalsOrganizations(result);
        } catch (error) {
          setError(error.message); // Обрабатываем ошибку, если что-то пошло не так
        } finally {
          setLoading(false); // Завершаем процесс загрузки
        }
    };

    fetchData(); // Выполняем запрос
  }, []); // Пустой массив означает, что эффект сработает только при монтировании компонента


  if (loading) {
    return loading;
  }

  if (error) {
    return error;
  }




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!organizationName || !password.trim()) {
      toastr.error('Введите организацию и пароль', 'Ошибка');
      return;
    }

    const selectedOrg = municipalsOrganizations.find(org => org === organizationName);
    //const orgIdToSend = selectedOrg ? selectedOrg.id : organizationName; // если нет в списке — отправим текст
    //console.log("Пользователь выбрал организацию: " + organizationName);
    //console.log("Пользователь ввел пароль: " + password);


    try {
      const response = await fetch('/api/ref/auth/authorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ organizationName, password })
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.text();

      alert(data);
      localStorage.setItem('tokenATK', data.token);
      toastr.success('Успешный вход!', 'Добро пожаловать');
      window.location.href = '/events';
    } catch (err) {
      toastr.error(err.message || 'Ошибка входа', 'Ошибка');
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-image">
          <video autoPlay muted loop playsInline>
            <source src="/images/fon.mp4" type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        </div>
        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <h2>Авторизация</h2>

          <label htmlFor="organization">Организация</label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              id="organization"
              value={organizationName}
              onChange={handleOrgChange}
              onFocus={() => setShowDropdown(true)}
              placeholder="Введите или выберите из списка"
            />
            {showDropdown && filteredOrgs.length > 0 && (
              <ul className="autocomplete-list">
                {filteredOrgs.map((org) => (
                  <li
                    key={org}
                    onClick={() => handleOrgSelect(org)}
                    className="autocomplete-item"
                  >
                    {org}
                  </li>
                ))}
              </ul>
            )}
          </div>

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
