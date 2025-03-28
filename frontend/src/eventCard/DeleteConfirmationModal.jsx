import React from 'react';
import '../components/EventForm.css';

const DeleteConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Подтверждение удаления</h2>
        <p>Вы уверены, что хотите удалить?</p>
        <div className="modal-buttons">
          <button className="confirm-del-btn" onClick={onConfirm}>Удалить</button>
          <button className="confirm-cancel-btn" onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
