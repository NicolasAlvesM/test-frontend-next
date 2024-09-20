import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Task } from './KanbanBoard';
import TaskCard from './TaskCard';

interface ColumnProps {
  title: string;
  tasks: Task[];
  droppableId: string;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, droppableId, onEdit, onDelete }) => {
  return (
    <div style={{ margin: '0 10px', width: '30%' }}>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <ul
            ref={provided.innerRef}
            className='bg-[#F7F8F9] min-h-[400px] flex flex-col pt-4 px-2 rounded-xl'
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} onEdit={onEdit} onDelete={onDelete} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
