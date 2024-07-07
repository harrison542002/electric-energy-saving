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
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [load, setLoad] = useState(false);
  const router = useRouter();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoad(true);
    const result = await signIn("credentials", {
      redirect: false,
      ...data,
    });
    if (result?.error) {
      toast({
        title: "Fail",
        description: result.error,
      });
      setLoad(false);
    } else {
      toast({
        title: "Success",
        description: "Welcome back!",
      });
      router.push("/overview");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="E.g. john" {...field} />
              </FormControl>
              <FormDescription>
                Account username you filled while registering
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
                <Input placeholder="E.g. password123" {...field} />
              </FormControl>
              <FormDescription>
                Enter the password you have created in registration form
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Link
          className="block text-primary underline text-sm text-balance"
          href={"/register"}
        >
          New here? Register now
        </Link>
        <Button type="submit" disabled={load}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
