import { TaskStatus } from '~~/server/types/task-status.enum';
import type { Task } from '~~/server/types/task.type';

export async function useTasks() {
    // useState must be called synchronously before any await
    const selectedStatuses = useState<TaskStatus[]>('selectedStatuses', () => []);

    const { data: tasks, status, refresh } = await useAsyncData('tasks', () => $fetch<Task[]>('/api/task'));

    const filteredTasks = computed(() => {
        if (!tasks.value) return [];
        if (selectedStatuses.value.length === 0) return tasks.value;
        return tasks.value.filter((task) => selectedStatuses.value.includes(task.status));
    });

    const statusOptions: { value: TaskStatus; label: string }[] = [
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
        selectedStatuses,
        statusOptions,
        taskCounts,
    };
}
