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
          className="bg-white p-3 mb-3 rounded shadow-md flex flex-col gap-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4 className="font-semibold">{task.title}</h4>
          <hr className='h-[1px]'/>
          <p className="text-sm text-gray-600">{task.description}</p>
          {task.status != 'completed' && <div className="flex justify-center mt-2 space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="px-2 py-1 border-black border-1 border text-black text-sm rounded-md hover:bg-gray-100"
            >
              Editar
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(task.id) }}
              className="px-2 py-1 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-500"
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
