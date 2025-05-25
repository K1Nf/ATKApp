import { useState } from "react";

const Info_DestrCont = ({
  departmentStates,
  setDepartmentStates,
  departments
  }) => {
  
  const handleCheckboxChange = (key) => {
    setDepartmentStates((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        checked: !prev[key].checked
      }
    }));
  };

  const handleFieldChange = (key, field, value) => {
    if ((field === "sentCount" || field === "blockedCount") && value !== "" && !/^[0-9\b]+$/.test(value)) return;
    setDepartmentStates((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  const totalSent = Object.values(departmentStates)
    .filter((d) => d.checked)
    .reduce((sum, d) => sum + Number(d.sentCount || 0), 0);

  const totalBlocked = Object.values(departmentStates)
    .filter((d) => d.checked)
    .reduce((sum, d) => sum + Number(d.blockedCount || 0), 0);

  return (
    <div>
      <h3>Куда направлен материал</h3>

      {departments.map(({ key, label }) => (
        <div key={key}>
          <label>
            <input
              type="checkbox"
              checked={departmentStates[key].checked}
              onChange={() => handleCheckboxChange(key)}
            />
            {label}
          </label>

          {departmentStates[key].checked && (
            <section style={{ margin: "15px 0", padding: "10px", border: "1px solid #ccc", borderRadius: "6px"}}>
              <label>
                Кол-во направленных материалов:
                <input
                  type="text"
                  value={departmentStates[key].sentCount}
                  onChange={(e) => handleFieldChange(key, "sentCount", e.target.value)}
                  placeholder="Введите только цифры"
                />
              </label>
              <br />
              <label>
                Кол-во заблокированных из них:
                <input
                  type="text"
                  value={departmentStates[key].blockedCount}
                  onChange={(e) => handleFieldChange(key, "blockedCount", e.target.value)}
                  placeholder="Введите только цифры"
                />
              </label>
            </section>
          )}
        </div>
      ))}

      <section>
        <h2>Итог</h2>
        <p>Общее количество направленных материалов: <strong>{totalSent}</strong></p>
        <p>Общее количество заблокированных материалов: <strong>{totalBlocked}</strong></p>
      </section>
    </div>
  );
};

export default Info_DestrCont;