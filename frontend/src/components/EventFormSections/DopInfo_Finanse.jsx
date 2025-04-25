import { useState } from "react";

const DopInfo_Finanse = ({ financing, setFinancing, hasFinancing, setHasFinancing, financingOtherDescription, setFinancingOtherDescription }) => {

  // Обработчик изменения данных финансирования
  const handleFinancingChange = (e) => {
    setFinancing({ ...financing, [e.target.name]: e.target.value });
  };

  

  return (
    <section>
      <h2>Финансирование</h2>
      <label>
        <input
          type="checkbox"
          checked={hasFinancing}
          onChange={() => setHasFinancing(!hasFinancing)}
        />
        Есть финансирование
      </label>

      {hasFinancing && (
        <div className="financing-details">
          <div className="financing-row">
            <div className="financing-field">
              <label>Муниципальный бюджет:</label>
              <input
                type="number"
                name="municipal"
                placeholder="0"
                min="0"
                value={financing.municipal}
                onChange={handleFinancingChange}
              />
            </div>
            <div className="financing-field">
              <label>Окружной бюджет:</label>
              <input
                type="number"
                name="regional"
                placeholder="0"
                min="0"
                value={financing.regional}
                onChange={handleFinancingChange}
              />
            </div>
          </div>

          <div className="financing-row">
            <div className="financing-field">
              <label>Гранты/Субсидии:</label>
              <input
                type="number"
                name="grants"
                placeholder="0"
                min="0"
                value={financing.grants}
                onChange={handleFinancingChange}
              />
            </div>
            <div className="financing-field">
              <label>Другое (сумма):</label>
              <input
                type="number"
                name="other"
                placeholder="0"
                min="0"
                value={financing.other}
                onChange={handleFinancingChange}
              />
            </div>
          </div>

          {financing.other && (
            <div className="other-details">
              <label>Описание источника финансирования:</label>
              <textarea
                maxLength={200}
                placeholder="Введите описание источника, не более 200 символов"
                value={financingOtherDescription}
                onChange={(e) => setFinancingOtherDescription(e.target.value)}
              ></textarea>
            </div>
          )}

          <div className="total-amount">
            <p>
              ИТОГО:{" "}
              <span>
                {(
                  Number(financing.municipal) +
                  Number(financing.regional) +
                  Number(financing.grants) +
                  Number(financing.other)
                ).toFixed(2)}
              </span>
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default DopInfo_Finanse;
