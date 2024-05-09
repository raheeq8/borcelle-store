"use client"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
const formSchema = z.object({
  name: z.string().min(2).max(50),
})


const page = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
        },
      })

      async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await fetch(`http://localhost:3001/api/test`, {
                method: "POST",
                body: JSON.stringify(values)
            })
            const data = await res.json();
            console.log(data)
        } catch (error) {
            console.log(`[test_POST]`)
        }
        
      }
    
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input placeholder="shadcn" {...field} />
            </FormControl>
            <FormDescription>
              This is your public display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  </Form>

  )
}

export default page