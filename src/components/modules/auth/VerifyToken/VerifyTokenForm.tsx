"use client"

import Logo from '@/assets/svgs/Logo';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form'
import { VerifyTokenSchema, verifyTokenSchema } from './VerifyTokenValidation';
import { verifyToken } from '@/services/AuthService';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const VerifyTokenForm = () => {

    const form = useForm({
        resolver: zodResolver(verifyTokenSchema),
        defaultValues: {
            email: "",
            otp: ""
        }
    });
    
    const router = useRouter();

    const {formState: {isSubmitting}} = form;

    const onSubmit: SubmitHandler<VerifyTokenSchema> = async (data) => {
        try {
          const res = await verifyToken(data);

          if (res?.success) {
            toast.success("Reset Password Link Sent To Your Email");
            router.push("/reset-password");
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

              <FormField
                    control={form.control}
                    name="otp"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>OTP CODE</FormLabel>
                        <FormControl>
                            <Input type="text" {...field} value={field.value || ""} />
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

export default VerifyTokenForm