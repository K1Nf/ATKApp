import { useState } from "react";

const Info_DestrCont = ({
  selectedUMVD, setSelectedUMVD,
  selectedProsecutor, setSelectedProsecutor,
  selectedRoskomnadzor, setSelectedRoskomnadzor,
  selectedFSB, setSelectedFSB,
  umvdStatus, setUmvdStatus,
  prosecutorStatus, setProsecutorStatus,
  roskomnadzorStatus, setRoskomnadzorStatus,
  fsbStatus, setFsbStatus,
  numMaterialsSent, setNumMaterialsSent,
  numMaterialsBlocked, setNumMaterialsBlocked
}) => {

  // Функция изменения значения selectedUMVD

  // Обработчики для изменения числовых значений
  const handleNumMaterialsSentChange = (e) => {
    // Разрешаем только ввод цифр
    const value = e.target.value.replace(/[^0-9]/g, '');
    setNumMaterialsSent(value);
  };

  const handleNumMaterialsBlockedChange = (e) => {
    // Разрешаем только ввод цифр
    const value = e.target.value.replace(/[^0-9]/g, '');
    setNumMaterialsBlocked(value);
  };

  return (
    <div>
      <h3>Куда направлен материал</h3>

      {/* Чекбокс УМВД */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectedUMVD}
            onChange={() => setSelectedUMVD(!selectedUMVD)}
          />
          УМВД
        </label>
        {selectedUMVD && (
          <select
          value={umvdStatus} 
          onChange={(e) => setUmvdStatus(e.target.value)}
        >
          <option value="">Выберите статус</option>
          <option value="no_response">Ответ не поступил</option>
          <option value="measures_taken">Меры приняты</option>
        </select>
        )}
      </div>

      {/* Чекбокс Прокуратура */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectedProsecutor}
            onChange={() => setSelectedProsecutor(!selectedProsecutor)}
          />
          Прокуратура
        </label>
        {selectedProsecutor && (
          <select
            value={prosecutorStatus}
            onChange={(e) => setProsecutorStatus(e.target.value)}
          >
            <option value="">Выберите статус</option>
            <option value="no_response">Ответ не поступил</option>
            <option value="measures_taken">Меры приняты</option>
          </select>
        )}
      </div>

      {/* Чекбокс Роскомнадзор */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectedRoskomnadzor}
            onChange={() => setSelectedRoskomnadzor(!selectedRoskomnadzor)}
          />
          Роскомнадзор
        </label>
        {selectedRoskomnadzor && (
          <select
            value={roskomnadzorStatus}
            onChange={(e) => setRoskomnadzorStatus(e.target.value)}
          >
            <option value="">Выберите статус</option>
            <option value="no_response">Ответ не поступил</option>
            <option value="measures_taken">Меры приняты</option>
          </select>
        )}
      </div>

      {/* Чекбокс РУФСБ */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectedFSB}
            onChange={() => setSelectedFSB(!selectedFSB)}
          />
          РУФСБ
        </label>
        {selectedFSB && (
          <select
            value={fsbStatus}
            onChange={(e) => setFsbStatus(e.target.value)}
          >
            <option value="">Выберите статус</option>
            <option value="no_response">Ответ не поступил</option>
            <option value="measures_taken">Меры приняты</option>
          </select>
        )}
      </div>

      {/* Поле для ввода количества направленных материалов */}
      <section>
        <label htmlFor="numMaterialsSent">
          Кол-во направленных материалов
        </label>
        <input
          type="text"
          id="numMaterialsSent"
          name="numMaterialsSent"
          value={numMaterialsSent}
          onChange={handleNumMaterialsSentChange}
          placeholder="Введите только цифры"
          required
        />
      </section>

      {/* Поле для ввода количества заблокированных материалов */}
      <section>
        <label htmlFor="numMaterialsBlocked">
          Кол-во заблокированных материалов
        </label>
        <input
          type="text"
          id="numMaterialsBlocked"
          name="numMaterialsBlocked"
          value={numMaterialsBlocked}
          onChange={handleNumMaterialsBlockedChange}
          placeholder="Введите только цифры"
          required
        />
      </section>
    </div>
  );
};

export default Info_DestrCont;
