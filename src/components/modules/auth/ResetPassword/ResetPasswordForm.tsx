"use client"


import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form'
import { ResetPassSchema, resetPassSchema } from './resetPassValidation';
import { resetPassword } from '@/services/AuthService';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const ResetPasswordForm = () => {
    const router = useRouter();
  
    const form = useForm<ResetPassSchema>({
      resolver: zodResolver(resetPassSchema),
      defaultValues: {
        newPassword: "",
      }
    });
  
    const onSubmit: SubmitHandler<ResetPassSchema> = async (data) => {
        try {
          const res = await resetPassword(data);
    
          if (res?.success) {
            toast.success("Password reset successfully!");
            
            document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            router.push("/login");
          } else {
            toast.error(res?.message || "Password reset failed");
          }
        } catch (error) {
          console.error("Reset password error:", error);
        }
      };
  
    return (
      <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5 space-y-4">
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
  
            <Button type="submit" className="w-full">
              Reset Password
            </Button>
          </form>
        </Form>
      </div>
    )
  }
  
  export default ResetPasswordForm