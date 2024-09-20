import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Task } from './KanbanBoard';

interface TaskCardProps {
  task: Task;
  index: number;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onEdit, onDelete }) => {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided) => (
        <div
          className="bg-white p-3 mb-3 rounded shadow-md"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4 className="font-semibold">{task.title}</h4>
          <p className="text-sm text-gray-600">{task.description}</p>
          {task.status != 'completed' && <div className="flex justify-end mt-2 space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="px-2 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
            >
              Editar
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(task.id) }}
              className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
            >
              Deletar
            </button>
          </div>}
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
