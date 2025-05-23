import React, { useState } from "react";

const BaseInfo_TeachMaterials = ({
  isMaterialAgreementChecked,
  categories, 
  isCategoryAdded, 

  isATKOMSUChecked, 
  ATKOMSUResult, 
  ATKOMSUDescription, 
  
  isATKKhmaoChecked, 
  ATKKhmaoResult, 
  ATKKhmaoDescription, 
  
  isExpertCouncilChecked, 
  expertCouncilResult, 
  expertCouncilDescription,

  setIsATKOMSUChecked,
  setATKOMSUResult,
  setATKOMSUDescription,
  setIsATKKhmaoChecked,
  setATKKhmaoResult,
  setATKKhmaoDescription,
  setIsExpertCouncilChecked,
  setExpertCouncilResult,
  setExpertCouncilDescription,

  setIsMaterialAgreementChecked,
  setCategories,
  setIsCategoryAdded

  }) => {
  // Состояния для чекбоксов и связанных с ними данных
  // const [isMaterialAgreementChecked, setIsMaterialAgreementChecked] = useState(false);

  // // Состояния для категорий/организаций
  // const [categories, setCategories] = useState([]);

  // // Состояние для отслеживания, была ли нажата кнопка добавления категории
  // const [isCategoryAdded, setIsCategoryAdded] = useState(false);

  // // Состояния для выбора результата
  // const [isATKOMSUChecked, setIsATKOMSUChecked] = useState(false);
  // const [ATKOMSUResult, setATKOMSUResult] = useState("");
  // const [ATKOMSUDescription, setATKOMSUDescription] = useState("");

  // const [isATKKhmaoChecked, setIsATKKhmaoChecked] = useState(false);
  // const [ATKKhmaoResult, setATKKhmaoResult] = useState("");
  // const [ATKKhmaoDescription, setATKKhmaoDescription] = useState("");

  // const [isExpertCouncilChecked, setIsExpertCouncilChecked] = useState(false);
  // const [expertCouncilResult, setExpertCouncilResult] = useState("");
  // const [expertCouncilDescription, setExpertCouncilDescription] = useState("");


  // Логика для добавления и удаления категорий
  const handleCategoryChange = (index, key, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index][key] = value;
    setCategories(updatedCategories);
  };

  const handleAddCategory = () => {
    setCategories([...categories, { name: "", description: "", result: "", docDescription: "", isOpen: true }]);
    setIsCategoryAdded(true);  // После нажатия на кнопку добавления категории показываем форму
  };

  const handleRemoveCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  return (
    <div>
    <section>
      <h2>Согласование материала</h2>
        {/* Согласование материала */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={isMaterialAgreementChecked}
              onChange={() => setIsMaterialAgreementChecked(!isMaterialAgreementChecked)}
            />
            Материал был согласован 
          </label>

          {/* Добавление категорий только если согласование материала активировано */}
          {isMaterialAgreementChecked && (
            <>
              {/* Аппарат АТК ОМСУ */}
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={isATKOMSUChecked}
                    onChange={() => setIsATKOMSUChecked(!isATKOMSUChecked)}
                  />
                  С аппаратом АТК ОМСУ
                </label>

                {isATKOMSUChecked && (
                  <div>
                    <select value={ATKOMSUResult} onChange={(e) => setATKOMSUResult(e.target.value)}>
                      <option value="">Результат</option>
                      <option value="rejected">Отказано</option>
                      <option value="approved">Утверждено</option>
                    </select>

                    {ATKOMSUResult === "approved" && (
                      <textarea
                        value={ATKOMSUDescription}
                        onChange={(e) => setATKOMSUDescription(e.target.value)}
                        placeholder="Номер и название утверждающего документа"
                        maxLength={100}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Аппарат АТК ХМАО */}
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={isATKKhmaoChecked}
                    onChange={() => setIsATKKhmaoChecked(!isATKKhmaoChecked)}
                  />
                  С аппаратом АТК ХМАО
                </label>

                {isATKKhmaoChecked && (
                  <div>
                    <select value={ATKKhmaoResult} onChange={(e) => setATKKhmaoResult(e.target.value)}>
                      <option value="">Результат</option>
                      <option value="rejected">Отказано</option>
                      <option value="approved">Утверждено</option>
                    </select>

                    {ATKKhmaoResult === "approved" && (
                      <textarea
                        value={ATKKhmaoDescription}
                        onChange={(e) => setATKKhmaoDescription(e.target.value)}
                        placeholder="Номер и название утверждающего документа"
                        maxLength={100}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* С экспертным советом при АТК ХМАО-Югры */}
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={isExpertCouncilChecked}
                    onChange={() => setIsExpertCouncilChecked(!isExpertCouncilChecked)}
                  />
                  С экспертным советом при АТК ХМАО-Югры
                </label>

                {isExpertCouncilChecked && (
                  <div>
                    <select value={expertCouncilResult} onChange={(e) => setExpertCouncilResult(e.target.value)}>
                      <option value="">Результат</option>
                      <option value="rejected">Отказано</option>
                      <option value="approved">Утверждено</option>
                    </select>

                    {expertCouncilResult === "approved" && (
                      <textarea
                        value={expertCouncilDescription}
                        onChange={(e) => setExpertCouncilDescription(e.target.value)}
                        placeholder="Номер и название утверждающего документа"
                        maxLength={100}
                      />
                    )}
                  </div>
                )}
                
              </div>

              <div>
                {/* Кнопка добавления категории */}
                <button
                  id="add_button"
                  type="button"
                  className="add-organization-btn"
                  onClick={handleAddCategory}
                >
                  + Добавить организацию
                </button>

                {/* Динамически добавленные категории */}
                {isCategoryAdded && categories.map((category, index) => (
                  category.isOpen && (
                    <div key={index}>
                      {/* Название категории */}
                      <div className="org-header">
                        <input
                          type="text"
                          placeholder="Название категории"
                          value={category.name}
                          onChange={(e) => handleCategoryChange(index, "name", e.target.value)}
                        />
                        <span
                          className="remove-org-x"
                          onClick={() => handleRemoveCategory(index)}
                        >
                          ×
                        </span>
                      </div>

                      {/* Селект для результата */}
                      <select
                        value={category.result}
                        onChange={(e) => handleCategoryChange(index, "result", e.target.value)}
                      >
                        <option value="">Результат</option>
                        <option value="rejected">Отказано</option>
                        <option value="approved">Утверждено</option>
                      </select>

                      {/* Если результат "Утверждено", появляется поле для описания */}
                      {category.result === "approved" && (
                        <textarea
                          placeholder="№ и название документа утверждающего методический материал"
                          maxLength={100}
                          value={category.docDescription}
                          onChange={(e) => handleCategoryChange(index, "docDescription", e.target.value)}
                        />
                      )}
                    </div>
                  )
                ))}
              </div>
            </>
          )}
        </div></section>
    </div>
  );
};

export default BaseInfo_TeachMaterials;
