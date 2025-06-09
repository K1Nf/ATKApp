import { useEffect, useState } from 'react';

import './EventForm.css';

const ControlPanel = ({ onFilter }) => {

  const [municipalityList, setMunicipalityList] = useState('');
  const [municipality, setMunicipality] = useState('');

  const [organizationList, setOrganizationList] = useState([]);
  const [organization, setOrganization] = useState("");


  useEffect(() => {
    const fetchMunicipalities = async () => {
      try {
        const res = await fetch("/api/ref/organizations/municipalities"); // или другой URL
        const data = await res.json();
        setMunicipalityList(data);

      } catch (error) {
        console.error("Ошибка при загрузке муниципалитетов: ", error);
      }
    };

    fetchMunicipalities();
  }, []);



  useEffect(() => {
    if (!municipality) {
      setOrganizationList([]);
      return;
    }

    fetch(`/api/ref/organizations/departments?municipality=${municipality}`)
      .then((res) => res.json())
      .then(setOrganizationList)
      .catch((err) => console.error("Ошибка при загрузке департаментов", err));
  }, [municipality]);




  const [showFilters, setShowFilters] = useState(false);
  const [search, setSearch] = useState('');
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
            <select
              id="municipality"
              value={municipality}
              onChange={(e) => setMunicipality(e.target.value)}
            >
              <option value="">Выбор муниципалитета</option>
              {municipalityList.map((mun) => (
                <option key={mun} value={mun}>
                  {mun}
                </option>
              ))}
            </select>

            <select value={organization} onChange={(e) => setOrganization(e.target.value)} disabled={!organizationList.length}>
              <option value="">-- Выберите департамент --</option>
              {organizationList.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
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

          <button className="filter-submit" onClick={handleSubmit}>Фильтровать</button>
        
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
