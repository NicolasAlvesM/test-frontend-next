"use client"
import React, { useState } from 'react';
import Column from './Column';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { createTask, deleteTask, updateTask } from '@/services/tasks';
import NewTaskModal from './NewTaskModal';
import EditTaskModal from './EditTaskModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
}

interface KanbanBoardProps {
  currentTasks: Task[];
  name: string | null | undefined;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ currentTasks = [], name }: KanbanBoardProps) => {
  const [tasks, setTasks] = useState<Task[]>(currentTasks);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

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

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTaskToEdit(null);
  };

  const saveTask = async (id: string, title: string, description: string) => {
    try {
      const updatedTask = await updateTask(id, { title, description });
      const updatedTasks = tasks.map((task) => task.id === id ? updatedTask : task);
      setTasks(updatedTasks);
      closeEditModal();
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  };

  const openDeleteModal = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const confirmDeleteTask = async () => {
    if (taskToDelete) {
      try {
        await deleteTask(taskToDelete);
        setTasks((prev) => prev.filter((task) => task.id !== taskToDelete));
        closeDeleteModal();
      } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
      }
    }
  };

  return (
    <>
      <div className='flex justify-between'>
        <h1 className="text-3xl font-semibold mb-4">Olá {name}</h1>
        <button
          onClick={openModal}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Criar Nova Tarefa
        </button>
      </div>
      <hr className='h-[1px] mb-10' />
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Column
            title="Pendente"
            tasks={pendingTasks}
            droppableId="pending"
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
          <Column
            title="Em Andamento"
            tasks={inProgressTasks}
            droppableId="in_progress"
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
          <Column
            title="Concluída"
            tasks={completedTasks}
            droppableId="completed"
            onEdit={openEditModal}
            onDelete={openDeleteModal}
          />
        </div>
      </DragDropContext>
      {isModalOpen && (
        <NewTaskModal onClose={closeModal} onSave={handleCreateTask} />
      )}
      {isEditModalOpen && taskToEdit && (
        <EditTaskModal task={taskToEdit} onClose={closeEditModal} onSave={saveTask} />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onClose={closeDeleteModal}
          onConfirm={confirmDeleteTask}
        />
      )}
    </>
  );
};

export default KanbanBoard;
