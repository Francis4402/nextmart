"use client"


import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ForgotPasswordSchema, forgotPasswordSchema } from "./forgotpvalidataion";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/svgs/Logo";
import { forgotpassword } from "@/services/AuthService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



const ForgotPasswordForm = () => {

    const form = useForm({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: ""
        }
    });
    
    const router = useRouter();

    const {formState: {isSubmitting}} = form;

    const onSubmit: SubmitHandler<ForgotPasswordSchema> = async (data) => {
        try {
            const res = await forgotpassword(data);

            if (res?.success) {
                toast.success(res?.message);
                router.push("/verify-otp");
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5 space-y-4">
      <div className="flex items-center space-x-4 ">
        <Logo />
        <div>
          <h1 className="text-xl font-semibold">Forgot Password</h1>
        </div>
      </div>
      <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input type="email" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <Button type="submit" disabled={isSubmitting} className="mt-5 w-full">
                    {isSubmitting ? "Sending...." : "Send"}
                </Button>
            </form>
        </Form>
    </div>
  )
}

export default ForgotPasswordForm