type TaskPriority = "Low" | "Medium" | "High"; 

export interface ITask {
  id: string;               // Unique ID
  title: string;           
  description: string;      // Task Description
  dueDate: string;          
  isCompleted: boolean;    
  priority: TaskPriority;  
}
// src/types/types.ts

export type User = {
  id: string;
  name: {
    firstname: string;
    lastname?: string; // optional
  };
  email: string;
  role: "user" | "admin";
};



export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
}

export interface PreferencesState {
  theme: "light" | "dark";
  language: "en" | "bn";
  layout: "grid" | "list";
}