import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useCreateProductsMutation } from "@/redux/api/baseApi";
import type { Product } from "@/types/types";

export function AddProductModal() {
  const form = useForm<Product>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      category: "",
      image: "",
    },
  });

  const [createProducts, { isLoading }] = useCreateProductsMutation();

  const onSubmit: SubmitHandler<Product> = async (values) => {
    try {
      await createProducts(values).unwrap();
      form.reset();
      alert("Product added successfully!");
      console.log(values)
    } catch (err) {
      console.error("Failed to add product:", err);
      alert("Failed to add product!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-5">Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter product name" />
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
                    <Textarea {...field} placeholder="Enter description" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min={0} placeholder="Enter price" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter category" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter image URL" />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
             <DialogClose>
                 <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Product"}
              </Button>

             </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
