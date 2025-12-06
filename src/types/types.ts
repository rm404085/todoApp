type TaskPriority = "Low" | "Medium" | "High"; 

export interface ITask {
  id: string;               // Unique ID
  title: string;           
  description: string;      // Task Description
  dueDate: string;          
  isCompleted: boolean;    
  priority: TaskPriority;  
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image?: string;
}
