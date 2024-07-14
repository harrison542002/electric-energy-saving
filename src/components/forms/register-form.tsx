"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { post } from "@/lib/request-abstract";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  identity_number: z
    .string()
    .min(10, {
      message: "ID should be only 10 characters",
    })
    .max(10, {
      message: "ID should be only 10 characters",
    }),
  name: z.string().min(2, {
    message: "Name should be at least 2 characters",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export function RegisterForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
      identity_number: "",
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const res = await post("/api/register", { ...data });
    if (res?.error) {
      toast({
        title: "Error",
        description: res.message,
      });
    } else {
      toast({
        title: "Success",
        description: res.message,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-x-2 gap-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="E.g. John" {...field} />
                </FormControl>
                <FormDescription>
                  Name will be used to display for your profile
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="identity_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Identity number</FormLabel>
                <FormControl>
                  <Input placeholder="E.g. UK00000001" {...field} />
                </FormControl>
                <FormDescription>
                  ID number from your UK ID card
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="E.g. john123" {...field} />
                </FormControl>
                <FormDescription>
                  Username will be used for login
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="E.g. password123"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Password will be used for login
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Link
          className="block text-primary underline text-sm text-balance"
          href={"/login"}
        >
          Already a member? Login now
        </Link>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
