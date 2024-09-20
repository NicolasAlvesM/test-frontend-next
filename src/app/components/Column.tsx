import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Task } from './KanbanBoard';
import TaskCard from './TaskCard';

interface ColumnProps {
  title: string;
  tasks: Task[];
  droppableId: string;
}

const Column: React.FC<ColumnProps> = ({ title, tasks, droppableId }) => {
  return (
    <div style={{ margin: '0 10px', width: '30%' }}>
      <h2 className='bg-[#F7F8F9]'>{title}</h2>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <ul
            ref={provided.innerRef}
            className='bg-[#F7F8F9] min-h-[500px] flex flex-col pt-2 px-1'
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
