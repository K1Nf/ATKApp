import React, { useState } from "react";

const Info_EventStatus = () => {
  // Состояние для чекбоксов
  const [status, setStatus] = useState({
    institutionPage: false,
    atcPage: false,
    ATKHMAO: false,
    catalog: false,
    nak: false,
    bestPractices: false,
    other: false
  });

  // Состояние для ссылки, если выбран чекбокс, требующий ввода ссылки
  const [link, setLink] = useState("");
  const [otherDescription, setOtherDescription] = useState("");

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setStatus((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleOtherDescriptionChange = (event) => {
    setOtherDescription(event.target.value);
  };

  // Функция для проверки корректности ссылки
  const validateLink = (link) => {
    const regex = /^(https?:\/\/)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(\/[a-zA-Z0-9-]+)*(\?[a-zA-Z0-9-]+=[a-zA-Z0-9-]+)*$/;
    return regex.test(link);
  };

  return (
    <div>
      <h2>Статус контекста </h2>
      <label> Размещение контента </label>
      <div>
        <label>
          <input
            type="checkbox"
            name="institutionPage"
            checked={status.institutionPage}
            onChange={handleCheckboxChange}
          />
          Размещен на странице учреждения (организация) СМИ
        </label>
        {status.institutionPage && (
          <div>
            <input
              type="text"
              placeholder="Введите одну или несколько ссылок через запятую, например: https://example1.com, https://example2.com"
              value={link}
              onChange={handleLinkChange}
            />
            {!validateLink(link) && link && (
              <p style={{ color: "red" }}>Некорректная ссылка</p>
            )}
          </div>
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="atcPage"
            checked={status.atcPage}
            onChange={handleCheckboxChange}
          />
          Размещен на странице АТК МО
        </label>
        {status.atcPage && (
          <div>
            <input
              type="text"
              placeholder="Введите одну или несколько ссылок через запятую, например: https://example1.com, https://example2.com"
              value={link}
              onChange={handleLinkChange}
            />
            {!validateLink(link) && link && (
              <p style={{ color: "red" }}>Некорректная ссылка</p>
            )}
          </div>
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="ATKHMAO"
            checked={status.ATKHMAO}
            onChange={handleCheckboxChange}
          />
          Направлен для размещения в электронном каталоге АТК ХМАО-Югры
        </label>
        {status.ATKHMAO && (
          <div>
            <input
              type="text"
              placeholder="Введите одну или несколько ссылок через запятую, например: https://example1.com, https://example2.com"
              value={link}
              onChange={handleLinkChange}
            />
            {!validateLink(link) && link && (
              <p style={{ color: "red" }}>Некорректная ссылка</p>
            )}
          </div>
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="nak"
            checked={status.nak}
            onChange={handleCheckboxChange}
          />
          Направлен для размещения в НАК
        </label>
        {status.nak && (
          <div>
            <input
              type="text"
              placeholder="Введите одну или несколько ссылок через запятую, например: https://example1.com, https://example2.com"
              value={link}
              onChange={handleLinkChange}
            />
            {!validateLink(link) && link && (
              <p style={{ color: "red" }}>Некорректная ссылка</p>
            )}
          </div>
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="bestPractices"
            checked={status.bestPractices}
            onChange={handleCheckboxChange}
          />
          Размещен в сборнике лучших практик
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="other"
            checked={status.other}
            onChange={handleCheckboxChange}
          />
          Другое
        </label>
        {status.other && (
          <div>
            <textarea
              value={otherDescription}
              onChange={handleOtherDescriptionChange}
              placeholder="Введите описание"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Info_EventStatus;
