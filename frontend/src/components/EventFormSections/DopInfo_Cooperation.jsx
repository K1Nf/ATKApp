import { useState } from "react";

const DopInfo_Cooperation = ({ isCooperation, setIsCooperation, selectedOrganizations, setSelectedOrganizations, otherOrganizations, setOtherOrganizations }) => {

  // Обработчик для добавления новой организации
  const handleAddOrganization = () => {
    setOtherOrganizations((prev) => [
      ...prev,
      { name: "", role: "", description: "" }
    ]);
  };

  // Обработчик для изменения данных в существующей организации
  const handleOrgChange = (index, field, value) => {
    const updated = [...otherOrganizations];
    updated[index][field] = value;
    setOtherOrganizations(updated);
  };

  // Обработчик для удаления организации
  const handleRemoveOrganization = (index) => {
    setOtherOrganizations((prev) => prev.filter((_, i) => i !== index));
  };

  // Обработчик для изменения выбранных организаций
  const handleCheckboxChange = (orgName) => {
    setSelectedOrganizations((prev) => {
      const updated = { ...prev };
      if (updated[orgName]) {
        delete updated[orgName];
      } else {
        updated[orgName] = { role: "", description: "" };
      }
      return updated;
    });
  };

  return (
    <section>
      <h2>Сотрудничество с другими организациями</h2>
      <label>
        <input
          type="checkbox"
          checked={isCooperation}
          onChange={() => setIsCooperation(!isCooperation)}
        />
        Было сотрудничество с другими организациями
        <span className="tooltip">
          <span className="question-icon">!</span>
          <span className="tooltiptext">Влияет на рейтинг</span>
        </span>
      </label>

      {isCooperation && (
        <>
          {/* Статические организации с чекбоксами */}
          {[
            "Аппарат АТК-ХМАО",
            "Аппарат АТК-ОНСУ",
            "СОНКО",
            "ОМВД по ОНСУ",
            "СВО",
            "ЛОМЫ",
            "Представители религиозных организаций традиционных для России конфессий"
          ].map((orgName) => (
            <div key={orgName} className="organization-row">
              <label className="org-label">
                {orgName}
                <input
                  type="checkbox"
                  checked={!!selectedOrganizations[orgName]}
                  onChange={() => handleCheckboxChange(orgName)}
                  className="org-checkbox"
                />
              </label>

              {selectedOrganizations[orgName] && (
                <>
                  <select
                    value={selectedOrganizations[orgName].role}
                    onChange={(e) =>
                      setSelectedOrganizations((prev) => ({
                        ...prev,
                        [orgName]: {
                          ...prev[orgName],
                          role: e.target.value,
                          description:
                            e.target.value === "выступление"
                              ? prev[orgName]?.description || ""
                              : ""
                        }
                      }))
                    }
                  >
                    <option value="">Выберите роль</option>
                    <option value="участие">Принял участие</option>
                    <option value="выступление">Выступил</option>
                  </select>

                  {selectedOrganizations[orgName].role === "выступление" && (
                    <textarea
                      maxLength={200}
                      placeholder="Описание выступления"
                      value={selectedOrganizations[orgName].description}
                      onChange={(e) =>
                        setSelectedOrganizations((prev) => ({
                          ...prev,
                          [orgName]: {
                            ...prev[orgName],
                            description: e.target.value
                          }
                        }))
                      }
                    />
                  )}
                </>
              )}
            </div>
          ))}

          {/* Динамически добавленные организации */}
          {otherOrganizations.map((org, index) => (
            <div key={`custom-${index}`} className="organization-row">
              <div className="org-header">
                <input
                  type="text"
                  placeholder="Название организации"
                  maxLength={50}
                  value={org.name}
                  onChange={(e) => handleOrgChange(index, "name", e.target.value)}
                />
                <span
                  className="remove-org-x"
                  onClick={() => handleRemoveOrganization(index)}
                >
                  ×
                </span>
              </div>

              <select
                value={org.role}
                onChange={(e) => handleOrgChange(index, "role", e.target.value)}
              >
                <option value="">Выберите роль</option>
                <option value="участие">Принял участие</option>
                <option value="выступление">Выступил</option>
              </select>

              {org.role === "выступление" && (
                <textarea
                  placeholder="Описание выступления, не более 200 символов!"
                  maxLength={200}
                  value={org.description}
                  onChange={(e) => handleOrgChange(index, "description", e.target.value)}
                />
              )}
            </div>
          ))}

          {/* Кнопка добавления новой организации */}
          <button
            id="add_button"
            type="button"
            className="add-organization-btn"
            onClick={handleAddOrganization}
          >
            + Добавить организацию
          </button>
        </>
      )}
    </section>
  );
};

export default DopInfo_Cooperation;
