import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Task } from './KanbanBoard';

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided) => (
        <li className='mt-4'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className='bg-white shadow-md rounded'>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default TaskCard;
