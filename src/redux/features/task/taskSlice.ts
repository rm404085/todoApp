import type { RootState } from "@/redux/store";
import type { ITask } from "@/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  tasks: ITask[];
}

const initialState: InitialState = {
  tasks: [
    {
      id: "task-1",
      title: "Initialized Frontend",
      description: "create Home Page , and routing",
      dueDate: "2025-11",
      isCompleted: false,
      priority: "High",
    },
    {
      id: "task-2",
      title: "Initialized github",
      description: "Version control setup completed",
      dueDate: "2025-11",
      isCompleted: true,
      priority: "High",
    },
    {
      id: "task-3",
      title: "Setup routing",
      description: "React Router setup finished",
      dueDate: "2025-11",
      isCompleted: true,
      priority: "Low",
    },
  ],
};

const taskSlice = createSlice({
  name: "tasks", // ✔ slice name
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.unshift(action.payload);
    },
  },
});

// ✔ Correct selector
export const selectTasks = (state: RootState) => state.tasks.tasks;

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;
