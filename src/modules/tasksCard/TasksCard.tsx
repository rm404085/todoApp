import type { ITask } from "@/types/types";

interface IProps {
  task: ITask;
}

const TasksCard = ({ task }: IProps) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-sm mx-auto">
      <div className="p-6">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{task.title}</h2>

        {/* Description */}
        <p className="text-gray-700 mb-4">{task.description}</p>

        {/* Due Date */}
        <p className="text-sm text-gray-500 mb-2">Due: {task.dueDate}</p>

        {/* Priority */}
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            task.priority === "High"
              ? "bg-red-500 text-white"
              : task.priority === "Medium"
              ? "bg-yellow-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {task.priority} Priority
        </span>

        {/* Completion Status */}
        <div className="mt-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              task.isCompleted ? "bg-green-500 text-white" : "bg-gray-300 text-gray-800"
            }`}
          >
            {task.isCompleted ? "Completed" : "Not Completed"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TasksCard;
