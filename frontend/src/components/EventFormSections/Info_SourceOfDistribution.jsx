import React, { useState } from "react";

const Info_SourceOfDistribution = ({
  sources, 
  setSources, 
  links, 
  setLinks,
  otherDescription, 
  setOtherDescription, 
  errors, 
  setErrors
}) => {
  // Состояния для чекбоксов
  

  // Функция для проверки корректности ссылки
  const validateLink = (link) => {
    const regex = /^(https?:\/\/)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(\/[a-zA-Z0-9-]+)*(\?[a-zA-Z0-9-]+=[a-zA-Z0-9-]+)*$/;
    return regex.test(link);
  };

  // Обработчик изменения состояния чекбоксов
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSources((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  // Обработчик изменения ссылок
  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setLinks((prev) => ({
      ...prev,
      [name]: value
    }));
    // Валидация ссылки
    setErrors((prev) => ({
      ...prev,
      [name]: validateLink(value) ? "" : "Некорректная ссылка"
    }));
  };

  // Обработчик изменения текста для "Другое"
  const handleOtherDescriptionChange = (e) => {
    setOtherDescription(e.target.value);
  };

  return (
    <div>
    <section>
      <h2>Источник распространения</h2>
      
      {/* Источник: Местные СМК */}
      <div>
        <label>
          <input
            type="checkbox"
            name="localMedia"
            checked={sources.localMedia}
            onChange={handleCheckboxChange}
          />
          Местные СМК
        </label>
        {sources.localMedia && (
          <div>
            <input
              type="text"
              name="localMediaLink"
              value={links.localMediaLink}
              onChange={handleLinkChange}
              placeholder="Введите одну или несколько ссылок через запятую, например: https://example1.com, https://example2.com"
            />
            {errors.localMedia && <p style={{ color: "red" }}>{errors.localMedia}</p>}
          </div>
        )}
      </div>

      {/* Источник: Региональные СМК */}
      <div>
        <label>
          <input
            type="checkbox"
            name="regionalMedia"
            checked={sources.regionalMedia}
            onChange={handleCheckboxChange}
          />
          Региональные СМК
        </label>
        {sources.regionalMedia && (
          <div>
            <input
              type="text"
              name="regionalMediaLink"
              value={links.regionalMediaLink}
              onChange={handleLinkChange}
              placeholder="Введите одну или несколько ссылок через запятую, например: https://example1.com, https://example2.com"
            />
            {errors.regionalMedia && <p style={{ color: "red" }}>{errors.regionalMedia}</p>}
          </div>
        )}
      </div>

      {/* Источник: СОНКО */}
      <div>
        <label>
          <input
            type="checkbox"
            name="sonko"
            checked={sources.sonko}
            onChange={handleCheckboxChange}
          />
          СОНКО
        </label>
        {sources.sonko && (
          <div>
            <input
              type="text"
              name="sonkoLink"
              value={links.sonkoLink}
              onChange={handleLinkChange}
              placeholder="Введите одну или несколько ссылок через запятую, например: https://example1.com, https://example2.com"
            />
            {errors.sonko && <p style={{ color: "red" }}>{errors.sonko}</p>}
          </div>
        )}
      </div>

      {/* Источник: Религиозные организации */}
      <div>
        <label>
          <input
            type="checkbox"
            name="religiousOrg"
            checked={sources.religiousOrg}
            onChange={handleCheckboxChange}
          />
          Религиозные организации
        </label>
        {sources.religiousOrg && (
          <div>
            <input
              type="text"
              name="religiousOrgLink"
              value={links.religiousOrgLink}
              onChange={handleLinkChange}
              placeholder="Введите одну или несколько ссылок через запятую, например: https://example1.com, https://example2.com"
            />
            {errors.religiousOrg && <p style={{ color: "red" }}>{errors.religiousOrg}</p>}
          </div>
        )}
      </div>

      {/* Источник: На каналах блогеров */}
      <div>
        <label>
          <input
            type="checkbox"
            name="bloggers"
            checked={sources.bloggers}
            onChange={handleCheckboxChange}
          />
          На каналах блогеров
        </label>
        {sources.bloggers && (
          <div>
            <input
              type="text"
              name="bloggersLink"
              value={links.bloggersLink}
              onChange={handleLinkChange}
              placeholder="Введите одну или несколько ссылок через запятую, например: https://example1.com, https://example2.com"
            />
            {errors.bloggers && <p style={{ color: "red" }}>{errors.bloggers}</p>}
          </div>
        )}
      </div>

      {/* Источник: Каналы АТК ОМСУ */}
      <div>
        <label>
          <input
            type="checkbox"
            name="atcOmsu"
            checked={sources.atcOmsu}
            onChange={handleCheckboxChange}
          />
          Каналы АТК ОМСУ
        </label>
        {sources.atcOmsu && (
          <div>
            <input
              type="text"
              name="atcOmsuLink"
              value={links.atcOmsuLink}
              onChange={handleLinkChange}
              placeholder="Введите одну или несколько ссылок через запятую, например: https://example1.com, https://example2.com"
            />
            {errors.atcOmsu && <p style={{ color: "red" }}>{errors.atcOmsu}</p>}
          </div>
        )}
      </div>

      {/* Источник: Каналы АТК ХМАО-Югры */}
      <div>
        <label>
          <input
            type="checkbox"
            name="atcKhmao"
            checked={sources.atcKhmao}
            onChange={handleCheckboxChange}
          />
          Каналы АТК ХМАО-Югры
        </label>
        {sources.atcKhmao && (
          <div>
            <input
              type="text"
              name="atcKhmaoLink"
              value={links.atcKhmaoLink}
              onChange={handleLinkChange}
              placeholder="Введите одну или несколько ссылок через запятую, например: https://example1.com, https://example2.com"
            />
            {errors.atcKhmao && <p style={{ color: "red" }}>{errors.atcKhmao}</p>}
          </div>
        )}
      </div>

      {/* Источник: Другое */}
      <div>
        <label>
          <input
            type="checkbox"
            name="other"
            checked={sources.other}
            onChange={handleCheckboxChange}
          />
          Другое
        </label>
        {sources.other && (
          <div>
            <textarea
              value={otherDescription}
              onChange={handleOtherDescriptionChange}
              placeholder="Введите название и описание"
            />
            <input
              type="text"
              name="otherLink"
              value={links.otherLink}
              onChange={handleLinkChange}
              placeholder="Введите одну или несколько ссылок через запятую, например: https://example1.com, https://example2.com"
            />
            {errors.other && <p style={{ color: "red" }}>{errors.other}</p>}
          </div>
        )}
      </div>
      </section>
    </div>
    
  );
};

export default Info_SourceOfDistribution;
