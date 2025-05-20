import React, { useState } from "react";

const Info_BlockMaterial = () => {
  const [executor, setExecutor] = useState("");

  const lawArticles = [
    { key: "law_15_1", label: "1. Включенные в Федеральный список запрещенной экстремистской литературы." },
    { key: "law_15_1_k", label: "2. Пункт к) статьи 15.1 — Изготовление ВВ, оружия и боеприпасов (кроме гражданского)" },
    { key: "law_15_3_1", label: "3. Пункт 1) статьи 15.3 — Призывы к массовым беспорядкам, экстремизму" },
    { key: "law_15_3_2", label: "4. Пункт 2) статьи 15.3 — Ложные сообщения об актах терроризма" },
    { key: "law_15_3_3", label: "5. Пункт 3) статьи 15.3 — Недостоверная информация об использовании ВС РФ" },
    { key: "law_15_3_4", label: "5. Пункт 4) статьи 15.3 — Финансирование противника" },
    { key: "law_15_3_6", label: "6. Пункт 6) статьи 15.3 — Оправдание/обоснование экстремистской деятельности" },
    { key: "law_15_3_8", label: "7. Пункт 8) статьи 15.3 — Материалы организаций, признанных нежелательными в РФ" },
    { key: "law_other", label: "8. Другая информация" }
  ];

  const [laws, setLaws] = useState(
    Object.fromEntries(
      lawArticles.map(({ key }) => [
        key,
        {
          checked: false,
          decision: "",
          orderNumber: "",
          sentCount: "",
          blockedCount: "",
          otherText: ""
        }
      ])
    )
  );

  const handleLawChange = (e) => {
    const { name, checked } = e.target;
    setLaws((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        checked
      }
    }));
  };

  const handleLawFieldChange = (key, field, value) => {
    if ((field === "sentCount" || field === "blockedCount") && value !== "" && !/^[0-9\b]+$/.test(value)) return;
    if (field === "otherText" && value.length > 200) return;

    setLaws((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  const totalSent = Object.values(laws)
    .filter((l) => l.checked)
    .reduce((sum, l) => sum + Number(l.sentCount || 0), 0);

  const totalBlocked = Object.values(laws)
    .filter((l) => l.checked)
    .reduce((sum, l) => sum + Number(l.blockedCount || 0), 0);

  return (
    <div>
      <section>
        <label>
          Исполнитель <span style={{ color: "red" }}>*</span>
          <span className="tooltip">
            <span className="question-icon">?</span>
            <span className="tooltiptext">Это обязательное поле</span>
          </span>
        </label>
        <input
          type="text"
          value={executor}
          onChange={(e) => setExecutor(e.target.value)}
          required
          placeholder="Введите имя исполнителя"
        />
      </section>

      <section>
        <h2>Нарушенные положения законодательства</h2>
        <div className="law-list">
          {lawArticles.map(({ key, label }) => (
            <div key={key} className="law-checkbox-item">
              <label className="law-checkbox-label">
                <input
                  type="checkbox"
                  name={key}
                  checked={laws[key].checked}
                  onChange={handleLawChange}
                />
                <span className="law-checkbox-text">{label}</span>
              </label>

              {laws[key].checked && (
                <div className="law-expansion">
                  <label>
                    Принятое решение:
                    <select
                      value={laws[key].decision}
                      onChange={(e) => handleLawFieldChange(key, "decision", e.target.value)}
                      required
                    >
                      <option value="">Выберите</option>
                      <option value="blocked">Материал заблокирован</option>
                      <option value="denied">Отказ в блокировке</option>
                    </select>
                  </label>

                  {laws[key].decision === "blocked" && (
                    <label>
                      Номер приказа/письма:
                      <input
                        type="text"
                        value={laws[key].orderNumber}
                        onChange={(e) =>
                          handleLawFieldChange(key, "orderNumber", e.target.value)
                        }
                        placeholder="Введите номер"
                        required
                      />
                    </label>
                  )}

                  <label>
                    Кол-во направленных:
                    <input
                      type="number"
                      min="0"
                      value={laws[key].sentCount}
                      onChange={(e) =>
                        handleLawFieldChange(key, "sentCount", e.target.value)
                      }
                      placeholder="0"
                    />
                  </label>

                  <label>
                    Кол-во заблокированных:
                    <input
                      type="number"
                      min="0"
                      value={laws[key].blockedCount}
                      onChange={(e) =>
                        handleLawFieldChange(key, "blockedCount", e.target.value)
                      }
                      placeholder="0"
                    />
                  </label>

                  {key === "law_other" && (
                    <label className="law-other-textarea">
                      Уточните информацию (до 200 символов):
                      <textarea
                        value={laws[key].otherText}
                        onChange={(e) =>
                          handleLawFieldChange(key, "otherText", e.target.value)
                        }
                        placeholder="Опишите содержание"
                        maxLength={200}
                        rows={3}
                      ></textarea>
                      <div className="char-counter">
                        {laws[key].otherText.length}/200
                      </div>
                    </label>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Итог</h2>
        <p>Общее количество направленных материалов: <strong>{totalSent}</strong></p>
        <p>Общее количество заблокированных материалов: <strong>{totalBlocked}</strong></p>
      </section>
    </div>
  );
};

export default Info_BlockMaterial;
