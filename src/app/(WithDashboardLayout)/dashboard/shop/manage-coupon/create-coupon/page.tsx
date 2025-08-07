"use client"

import { CouponForm, validateCouponForm } from '@/components/modules/shop/manage-coupon/CouponFormValidation';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createACoupon } from '@/services/Coupon';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const CreateCoupon = () => {

    const [startDateOpen, setStartDateOpen] = useState(false);
    const [endDateOpen, setEndDateOpen] = useState(false);

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(validateCouponForm),
    });

    const { formState: { isSubmitting } } = form;

    const onSubmit: SubmitHandler<CouponForm> = async (data) => {
        console.log(data);
        try {
            const res = await createACoupon(data);

            if (res.success) {
                toast.success(res.message);
                router.push("/dashboard/shop/manage-coupon");
                form.reset();
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

  return (
    <div className='flex w-full items-center justify-center p-6 md:p-10'>
        <div className='w-fit'>
            <Card>
                <CardContent>
                    <CardHeader>
                        <CardTitle>Create Coupon</CardTitle>
                    </CardHeader>
                    
                    <Form {...form}>
                        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>

                            <div className='grid lg:grid-cols-2 gap-5 items-center justify-center'>
                                <FormField control={form.control} name="code" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Coupon Code</FormLabel>
                                    <FormControl>
                                    <Input type="text" {...field} value={field.value || ""} placeholder="Promo / Coupon code" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )} />

                                <FormField control={form.control} name="discountType" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Discount Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value || ""}
                                        >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select discount type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Percentage">Percentage</SelectItem>
                                            <SelectItem value="Flat">Flat</SelectItem>
                                        </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField
                                control={form.control}
                                name="discountValue"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>
                                        Discount Value
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} value={field.value || ""} onChange={(e) => field.onChange(Number(e.target.value) || 0)} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />

                                <FormField
                                control={form.control}
                                name="minOrderAmount"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Minimum Order Amount</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} value={field.value || ""} onChange={(e) => field.onChange(Number(e.target.value) || 0)} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />

                                <FormField
                                control={form.control}
                                name="maxDiscountAmount"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Maximum Discount Amount</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} value={field.value || ""} onChange={(e) => field.onChange(Number(e.target.value) || 0)} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />

                                <div className='flex justify-between gap-4'>
                                    <FormField 
                                        control={form.control} 
                                        name='startDate' 
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-medium">Start Date</FormLabel>
                                                <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                                                    <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                        variant="outline"
                                                        className="w-full justify-between text-left font-normal"
                                                        >
                                                        {field.value ? format(new Date(field.value), "PPP") : "Select start date"}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start" side="top" sideOffset={4}>
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value ? new Date(field.value) : undefined}
                                                        onSelect={(date) => {
                                                        field.onChange(date?.toISOString() || null);
                                                            setStartDateOpen(false);
                                                        }}
                                                        disabled={(date) => {
                                                        const today = new Date();
                                                        today.setHours(0, 0, 0, 0);
                                                        return date < today;
                                                        }}
                                                    />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )} 
                                    />

                                    <FormField 
                                        control={form.control} 
                                        name='endDate' 
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel className="text-sm font-medium">End Date</FormLabel>
                                            <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                                                <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                    variant="outline"
                                                    className="w-full justify-between text-left font-normal"
                                                    >
                                                    {field.value ? format(new Date(field.value), "PPP") : "Select end date"}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start" side="top" sideOffset={4}>
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value ? new Date(field.value) : undefined}
                                                    onSelect={(date) => {
                                                    field.onChange(date?.toISOString() || null);
                                                    setEndDateOpen(false);
                                                    }}
                                                    disabled={(date) => {
                                                    const today = new Date();
                                                    today.setHours(0, 0, 0, 0);
                                                    const startDate = form.getValues('startDate');
                                                    if (startDate) {
                                                        return date < new Date(startDate);
                                                    }
                                                    return date < today;
                                                    }}
                                                />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                            </FormItem>
                                        )} 
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Creating..." : "Create"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}

export default CreateCoupon