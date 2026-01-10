import { TaskStatus } from '~~/server/types/task-status.enum';
import type { Task } from '~~/server/types/task.type';

export async function useTasks() {
    const { data: tasks, status, refresh } = await useAsyncData('tasks', () => $fetch<Task[]>('/api/task'));

    const selectedStatus = ref<TaskStatus | 'all'>('all');

    const filteredTasks = computed(() => {
        if (!tasks.value) return [];
        if (selectedStatus.value === 'all') return tasks.value;
        return tasks.value.filter((task) => task.status === selectedStatus.value);
    });

    const statusOptions: { value: TaskStatus | 'all'; label: string }[] = [
        { value: 'all', label: 'All' },
        { value: TaskStatus.Todo, label: 'To Do' },
        { value: TaskStatus.InProgress, label: 'In Progress' },
        { value: TaskStatus.Done, label: 'Done' },
    ];

    const taskCounts = computed(() => {
        if (!tasks.value) return { all: 0, todo: 0, 'in-progress': 0, done: 0 };
        return {
            all: tasks.value.length,
            todo: tasks.value.filter((t) => t.status === 'todo').length,
            'in-progress': tasks.value.filter((t) => t.status === 'in-progress').length,
            done: tasks.value.filter((t) => t.status === 'done').length,
        };
    });

    return {
        tasks,
        filteredTasks,
        status,
        refresh,
        selectedStatus,
        statusOptions,
        taskCounts,
    };
}
