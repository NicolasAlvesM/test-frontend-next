"use client"
import React, { useState } from 'react';
import Column from './Column';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { createTask, updateTask } from '@/services/tasks';
import NewTaskModal from './NewTaskModal';

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
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateTask = async (title: string, description: string) => {
    try {
      const newTask = await createTask({ title, description });

      setTasks((prev) => [...prev, newTask]);
      closeModal();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

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
        await updateTask(draggableId, { status: updatedStatus });
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
    <>
      <button
        onClick={openModal}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Criar Nova Tarefa
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Column title="Pendente" tasks={pendingTasks} droppableId="pending" />
          <Column title="Em Andamento" tasks={inProgressTasks} droppableId="in_progress" />
          <Column title="Concluída" tasks={completedTasks} droppableId="completed" />
        </div>
      </DragDropContext>
      {isModalOpen && (
        <NewTaskModal onClose={closeModal} onSave={handleCreateTask} />
      )}
    </>
  );
};

export default KanbanBoard;
