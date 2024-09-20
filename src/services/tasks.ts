import { api } from "./api";

export const getUserTasks = async (userId: string) => {
  try {
    const { data } = await api.get(`/api/v1/tasks/user/${userId}`);
    return data.data;
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
  }
}

export const getTask = async (taskId: string) => {
  try {
    const { data } = await api.get(`/api/v1/tasks/${taskId}`);
    return data.data;
  } catch (error) {
    console.error(`Erro ao buscar tarefa ${taskId}:`, error);
  }
}

export const createTask = async (task: any) => {
  try {
    const { data } = await api.post('/api/v1/tasks', task);
    return data.data;
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
  }
}

export const updateTask = async (taskId: string, task: any) => {
  try {
    const { data } = await api.patch(`/api/v1/tasks/${taskId}`, task);
    return data.data;
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
  }
}

export const deleteTask = async (taskId: string) => {
  try {
    await api.delete(`/api/v1/tasks/${taskId}`);
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
  }
}