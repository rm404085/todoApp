import TasksCard from "@/modules/tasksCard/TasksCard";

import { selectTasks } from "@/redux/features/task/taskSlice";
import { useAppSelector } from "@/redux/hook";
import { AddTaskModal } from "./AddTaskModal";

const Tasks = () => {

    const tasks = useAppSelector(selectTasks)

    console.log(tasks)

    return(
       <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Task Management</h1>

      <div className="mb-10">
        <AddTaskModal></AddTaskModal>
      </div>

      {/* Mapping tasks to TaskCard */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <TasksCard key={task.id} task={task} />
        ))}
      </div>
    </div>
    )
}

export default Tasks;