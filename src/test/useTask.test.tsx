import { renderHook, act, waitFor } from '@testing-library/react';
import * as api from '../api/api';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { useTasks } from '../hook/useTask';

const mockTasks = [
  { id: '1', title: 'Tarea 1', completed: false, createdAt: new Date().toISOString() },
  { id: '2', title: 'Tarea 2', completed: true, createdAt: new Date().toISOString() },
];

describe('useTasks', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('carga tareas iniciales con getTasks', async () => {
    vi.spyOn(api, 'getTasks').mockResolvedValue(mockTasks);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.tasks).toHaveLength(2);
    });
  });

  it('puede agregar una tarea con handleAdd', async () => {
    const newTask = {
      id: '3',
      title: 'Nueva Tarea',
      completed: false,
      createdAt: new Date().toISOString(),
    };

    vi.spyOn(api, 'getTasks').mockResolvedValue([]);
    vi.spyOn(api, 'createTask').mockResolvedValue(newTask);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.tasks).toHaveLength(0);
    });

    act(() => {
      result.current.handleInputChange('Nueva Tarea');
    });

    await act(async () => {
      await result.current.handleAdd();
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe('Nueva Tarea');
  });

  it('puede eliminar una tarea', async () => {
    vi.spyOn(api, 'getTasks').mockResolvedValue(mockTasks);
    vi.spyOn(api, 'deleteTask').mockResolvedValue(undefined);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.tasks).toHaveLength(2);
    });

    await act(async () => {
      await result.current.handleDeleteTask('1');
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].id).toBe('2');
  });

  it('puede cambiar el estado de una tarea', async () => {
    const updated = { ...mockTasks[0], completed: true };
    vi.spyOn(api, 'getTasks').mockResolvedValue([mockTasks[0]]);
    vi.spyOn(api, 'patchStatus').mockResolvedValue(updated);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.tasks[0].completed).toBe(false);
    });

    await act(async () => {
      await result.current.toggleTask('1');
    });

    expect(result.current.tasks[0].completed).toBe(true);
  });

  it('puede editar una tarea existente', async () => {
    const updatedTask = { ...mockTasks[0], title: 'Tarea Editada' };

    vi.spyOn(api, 'getTasks').mockResolvedValue([mockTasks[0]]);
    vi.spyOn(api, 'updateTask').mockResolvedValue(updatedTask);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.tasks[0].title).toBe('Tarea 1');
    });

    act(() => {
      result.current.handleEditClick('1');
      result.current.handleInputChange('Tarea Editada');
    });

    await act(async () => {
      await result.current.handleOK();
    });

    expect(result.current.tasks[0].title).toBe('Tarea Editada');
  });
});
