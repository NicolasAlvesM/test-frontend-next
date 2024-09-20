"use client"
import React, { useState } from 'react';
import Column from './Column';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { api } from '@/services/api';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
}

interface KanbanBoardProps {
  currentTasks: Task[];
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ currentTasks = [] }: KanbanBoardProps) => {
  const [tasks, setTasks] = useState<Task[]>(currentTasks);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId) {
      return;
    }

    const currStatus = source.droppableId as Task['status'];

    const updatedStatus = destination.droppableId as Task['status'];

    const updateTaskStatus = async () => {
      try {
        const updatedTasks = tasks.map((task) => task.id == draggableId ? { ...task, status: updatedStatus } : task);
        setTasks(updatedTasks);
        await api.patch(`/api/v1/tasks/${draggableId}`, {
          status: updatedStatus,
        });
      } catch (error) {
        const updatedTasks = tasks.map((task) => task.id == draggableId ? { ...task, status: currStatus } : task);
        setTasks(updatedTasks);
        console.error('Erro ao atualizar status da tarefa:', error);
      }
    };

    updateTaskStatus();
  };

  const pendingTasks = tasks?.filter((task) => task.status === 'pending');
  const inProgressTasks = tasks?.filter((task) => task.status === 'in_progress');
  const completedTasks = tasks?.filter((task) => task.status === 'completed');

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Column title="Pendente" tasks={pendingTasks} droppableId="pending" />
        <Column title="Em Andamento" tasks={inProgressTasks} droppableId="in_progress" />
        <Column title="Concluída" tasks={completedTasks} droppableId="completed" />
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
