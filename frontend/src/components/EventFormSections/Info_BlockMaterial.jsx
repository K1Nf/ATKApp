import React, { useState } from "react";

const Info_BlockMaterial = () => {
  // Состояние для обязательного поля "Исполнитель"
  const [executor, setExecutor] = useState("");

  // Состояния для направленных и заблокированных материалов
  const [sentMaterials, setSentMaterials] = useState(0);
  const [blockedMaterials, setBlockedMaterials] = useState(0);

  // Ошибки для направленных и заблокированных материалов
  const [errorSent, setErrorSent] = useState("");
  const [errorBlocked, setErrorBlocked] = useState("");

  // Состояние для чекбоксов (ФЗ 149)
  const [laws, setLaws] = useState({
    law151: false,
    law152: false,
    law153: false
  });

  // Состояние для принятого решения
  const [decision, setDecision] = useState("");
  const [orderNumber, setOrderNumber] = useState(""); // Для текстового поля с номером приказа/письма

  // Обработчики изменения состояния
  const handleExecutorChange = (e) => {
    setExecutor(e.target.value);
  };

  const handleLawChange = (e) => {
    const { name, checked } = e.target;
    setLaws((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleDecisionChange = (e) => {
    setDecision(e.target.value);
  };

  const handleOrderNumberChange = (e) => {
    setOrderNumber(e.target.value);
  };

  const handleSentMaterialsChange = (e) => {
    const value = e.target.value;
    // Проверяем, что введено число, и не отрицательное
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setSentMaterials(value);
      setErrorSent(""); // Очистить ошибку при корректном вводе
    } else {
      setErrorSent("Только положительные числа разрешены");
    }
  };

  // Обработчик изменения для "Количество заблокированных материалов"
  const handleBlockedMaterialsChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9\b]+$/.test(value)) {
      setBlockedMaterials(value);
      setErrorBlocked(""); // Очистить ошибку при корректном вводе
    } else {
      setErrorBlocked("Только положительные числа разрешены");
    }
  };

  return (
    <div>
      {/* Обязательное текстовое поле "Исполнитель" */}
      <section>
        <div>
          <label>
            Исполнитель
            <span style={{ color: "red" }}>*</span>
            <span className="tooltip">
              <span className="question-icon">?</span>
              <span className="tooltiptext">Это обязательное поле</span>
            </span>
          </label>
          <input
            type="text"
            value={executor}
            onChange={handleExecutorChange}
            required
            placeholder="Введите имя исполнителя"
          />
        </div>
      </section>

      <section>
        <h2>Направление выявленного материала</h2>

        {/* Номера статей */}
        <div>
          <label>Укажите номер письма</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="law151"
                checked={laws.law151}
                onChange={handleLawChange}
              />
              Ст. 15.1 ФЗ 149
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="law152"
                checked={laws.law152}
                onChange={handleLawChange}
              />
              Ст. 15.2 ФЗ 149
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                name="law153"
                checked={laws.law153}
                onChange={handleLawChange}
              />
              Ст. 15.3 ФЗ 149
            </label>
          </div>
        </div>
      </section>

      <section>
        <h2>Отметка о принятом решении</h2>

        {/* Результат реагирования */}
        <div>
          <label>Результат реагирования</label>
          <select value={decision} onChange={handleDecisionChange} required>
            <option value="">Выберите результат</option>
            <option value="blocked">Материал заблокирован</option>
            <option value="denied">Отказ в блокировке</option>
          </select>
        </div>

        {/* Если выбран "Материал заблокирован", появляется поле для ввода номера приказа/письма */}
        {decision === "blocked" && (
          <div>
            <label>Укажите номер приказа/письма</label>
            <input
              type="text"
              value={orderNumber}
              onChange={handleOrderNumberChange}
              placeholder="Введите номер приказа/письма"
              required
            />
          </div>
        )}
      </section>

      <section>
        <h2> Количество материалов </h2>
        <div>
          <label>Количество направленных материалов</label>
          <input
            type="number"
            value={sentMaterials}
            onChange={handleSentMaterialsChange}
            min="0"
            placeholder="Введите количество направленных материалов"
          />
          {errorSent && <p style={{ color: "red" }}>{errorSent}</p>}
        </div>

        <div>
          <label>Количество заблокированных материалов</label>
          <input
            type="number"
            value={blockedMaterials}
            onChange={handleBlockedMaterialsChange}
            min="0"
            placeholder="Введите количество заблокированных материалов"
          />
          {errorBlocked && <p style={{ color: "red" }}>{errorBlocked}</p>}
        </div>
      </section>
    </div>
  );
};

export default Info_BlockMaterial;
