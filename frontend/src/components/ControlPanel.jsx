import { useEffect, useState } from 'react';

import './EventForm.css';

const ControlPanel = ({ onFilter }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [organization, setOrganization] = useState('');
  const [level, setLevel] = useState('');
  const [important, setImportant] = useState(false);
  const [peerFormat, setPeerFormat] = useState(false);
  const [bestPractice, setBestPractice] = useState(false);
  const [interagency, setInteragency] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [financing, setFinancing] = useState(false);

  const [theme, setTheme] = useState('');
  const [themes, setThemes] = useState([]);

  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');


  useEffect(() => {
    fetch('/api/ref/themes')
      .then(res => res.json())
      .then(data => setThemes(data))
      .catch(err => console.error("Ошибка загрузки тем:", err));
  }, []);

  const toggleFilters = () => setShowFilters(!showFilters);






  const handleSubmit = () => {

    // console.log("" + search);
    // console.log("Муниципалитет: " + municipality);
    // console.log("Организация: " + organization);
    // console.log("Уровень: " + level);
    // console.log("Важное: " + important);
    // console.log("Равныйравному: " + peerFormat);
    // console.log("Лучшиепрактики: " + bestPractice);
    // console.log("Взаимодействие: " + interagency);
    // console.log("Обратнаясвязь: " + feedback);
    // console.log("Тема: " + theme);
    // console.log("Финансирование: " + financing);
    // console.log("Датаот: " + dateFrom);
    // console.log("Датадо: " + dateTo);

    function buildQueryParams(filters) {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (typeof value === "string" && value.trim() !== "") {
          params.append(key, value.trim());
        } else if (typeof value === "number" && !isNaN(value)) {
          params.append(key, value.toString());
        } else if (typeof value === "boolean" && value === true) {
          params.append(key, "true");
        }
        // Пропускаем false, null, undefined, пустые строки
      });

      return params.toString();
    }

    const query = buildQueryParams({
      municipality,
      organization,
      level,
      important,
      peerFormat,
      bestPractice,
      interagency,
      feedback,
      theme,
      financing,
      dateFrom,
      dateTo,
    });

    if (onFilter) {
      onFilter(query); // <-- передаём строку запроса в EventTable
    }


    // let utlToSort = `api/ref/events/sort?${query}`;
    // fetch(utlToSort);
    // console.log(utlToSort);
  };


  return (
    <div className="control-panel-wrapper">
      <div className="control-panel">
        <input
          type="text"
          placeholder="Поиск мероприятий..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => window.location.href = '/create'}>Создать мероприятие</button>
        <button onClick={toggleFilters}>{showFilters ? 'Скрыть фильтры' : 'Фильтрация'}</button>
      </div>

      {showFilters && (
        <div className="filters">
          <div className="row">
            <select value={municipality} onChange={e => setMunicipality(e.target.value)}>
              <option value="">Выбор муниципалитета</option>
              <option value="Муниципалитет 1">Муниципалитет 1</option>
              <option value="Муниципалитет 2">Муниципалитет 2</option>
              <option value="Муниципалитет 3">Муниципалитет 3</option>
              <option value="Муниципалитет 4">Муниципалитет 4</option>
              <option value="Муниципалитет 5">Муниципалитет 5</option>
            </select>

            <select value={organization} onChange={e => setOrganization(e.target.value)}>
              <option value="">Выбор организации</option>
              <option value="Организация А">Организация А</option>
              <option value="Организация Б">Организация Б</option>
              <option value="Организация В">Организация В</option>
              <option value="Организация Г">Организация Г</option>
              <option value="Организация Д">Организация Д</option>
            </select>

            <select value={level} onChange={e => setLevel(e.target.value)}>
              <option value="">Уровень мероприятия</option>
              <option value="Муниципальный">Муниципальный</option>
              <option value="Региональный">Региональный</option>
              <option value="Всероссийский">Всероссийский</option>
              <option value="Международный">Международный</option>
            </select>
          </div>



          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="theme-select"
          >
            <option value="">Выбрать тему</option>
            {themes.map((t) => (
              <option key={t.code} value={t.code} title={t.description}>
                {t.code}
              </option>
            ))}
          </select>



          <div className="date-filter">
            <label>Дата от:</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>

          <div className="date-filter">
            <label>Дата до:</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          </div>


          <div className="checkboxes">
            <label><input type="checkbox" checked={important} onChange={e => setImportant(e.target.checked)} /> Важное</label>
            <label><input type="checkbox" checked={peerFormat} onChange={e => setPeerFormat(e.target.checked)} /> Формат равный равному</label>
            <label><input type="checkbox" checked={bestPractice} onChange={e => setBestPractice(e.target.checked)} /> Лучшие практики</label>
            <label><input type="checkbox" checked={interagency} onChange={e => setInteragency(e.target.checked)} /> Межведомственное взаимодействие</label>
            <label><input type="checkbox" checked={feedback} onChange={e => setFeedback(e.target.checked)} /> Обратная связь</label>
            <label><input type="checkbox" checked={financing} onChange={e => setFinancing(e.target.checked)} /> Есть финансирование</label>
          </div>

          <button className="filter-submit" onClick={handleSubmit}>Фильтровать</button>
          <button type="button" className="filter-reset" onClick={() => {
            setSearch('');
            setMunicipality('');
            setOrganization('');
            setLevel('');
            setTheme('');
            setImportant(false);
            setPeerFormat(false);
            setBestPractice(false);
            setInteragency(false);
            setFeedback(false);
            setFinancing(false);
            setDateFrom('');
            setDateTo('');
            //onFilter({}, []); // сбросить фильтрацию
          }}>

            Сбросить фильтры

          </button>

        </div>
      )}
    </div>
  );
};

export default ControlPanel;
