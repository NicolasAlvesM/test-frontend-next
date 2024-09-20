import React from 'react';

interface DeleteConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="bg-white w-96 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
        <p className="mb-6">Tem certeza de que deseja deletar esta tarefa?</p>
        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Deletar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
