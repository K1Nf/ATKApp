import React from 'react';
import '../css/upr_vkr.css';
import Getevents from '../Api/getevents'

export default function EventTable(){
  return (
    <div className="table-container">

      <Getevents/>
      {/* <table>
        <thead>
          <tr>
            <th>№ темы</th>
            <th>Статус мероприятия</th>
            <th>Наименование</th>
            <th>Дата</th>
            <th>Количество участников</th>
            <th>Уровень проведения</th>
            <th>Форма проведения</th>
            <th>Значимое</th>
            <th>Лучшее</th>
            <th>Формат "равный равному"</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1.1.1</td>
            <td>Активное</td>
            <td>Мероприятие А</td>
            <td>2025-03-10</td>
            <td>120</td>
            <td>Региональный</td>
            <td>Лекция</td>
            <td>Да</td>
            <td>Нет</td>
            <td>Описание формата</td>
          </tr>
          <tr>
            <td>2.3</td>
            <td>Завершено</td>
            <td>Мероприятие Б</td>
            <td>2025-02-25</td>
            <td>80</td>
            <td>Муниципальный</td>
            <td>Акция</td>
            <td>Нет</td>
            <td>Да</td>
            <td>Описание формата</td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
};
