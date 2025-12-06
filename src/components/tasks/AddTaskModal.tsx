import { Button } from "@/components/ui/button"
import {
  Dialog,
 
  DialogClose,
 
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

// React Hook Form imports
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { Textarea } from "../ui/textarea"
import { UseAppDispatch } from "@/redux/hook"
import { addTask } from "@/redux/features/task/taskSlice"
import type { ITask } from "@/types/types"



export function AddTaskModal() {
  
const form = useForm();

const dispatch = UseAppDispatch()
  // Submit handler function
  const onSubmit : SubmitHandler<FieldValues> = (data) => {
console.log(data)
dispatch(addTask(data as ITask))
form.reset();
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          
          <Form {...form}>
            {/* Task Name Field */}
            <FormField
              name="title"
              control={form.control}  
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Name</FormLabel>
                  <FormControl>
                    
                        <Input {...field} />
                      
                    
                  </FormControl>
                 
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}  
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    
                          <Textarea {...field} />
                      
                    
                  </FormControl>
                 
                </FormItem>
              )}
            />
         <DialogFooter>
            <DialogClose asChild>
                <Button type="submit">Save Task</Button>
              </DialogClose>
          </DialogFooter>
            {/* You can add more fields here */}
          </Form>

          {/* Dialog Footer with Action Buttons */}
         
        </form>
      </DialogContent>
    </Dialog>
  )
}
