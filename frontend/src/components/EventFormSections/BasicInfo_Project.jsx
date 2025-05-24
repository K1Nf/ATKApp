import React from "react";

const BaseInfo_Project = ({
  isCompetitionDirectionChecked,
  setIsCompetitionDirectionChecked,
  competitionDescription,
  setCompetitionDescription,
  participationResult,
  setParticipationResult,
  winnerDetails,
  setWinnerDetails
}) => {
  return (
    <div>
      <section>
        <h2>Направление проекта для участия в конкурсах</h2>

        <div>
          <label>
            <input
              type="checkbox"
              checked={isCompetitionDirectionChecked}
              onChange={() => setIsCompetitionDirectionChecked(!isCompetitionDirectionChecked)}
            />
            Направлен на участие в конкурсе
          </label>

          {isCompetitionDirectionChecked && (
            <div>
              <textarea
                maxLength={200}
                placeholder="Описание конкурса (не более 200 символов)"
                value={competitionDescription}
                onChange={(e) => setCompetitionDescription(e.target.value)}
              />

              <select
                value={participationResult}
                onChange={(e) => setParticipationResult(e.target.value)}
              >
                <option value="">Результаты участия</option>
                <option value="participant">Участник конкурса</option>
                <option value="winner">Призер или победитель</option>
              </select>

              {participationResult === "winner" && (
                <textarea
                  maxLength={200}
                  placeholder="Укажите, например, название наград или вид документа (диплома, грамоты), какой степени и т.д."
                  value={winnerDetails}
                  onChange={(e) => setWinnerDetails(e.target.value)}
                />
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BaseInfo_Project;
