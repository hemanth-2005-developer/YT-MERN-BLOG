import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card } from '@/components/ui/card'
import { RouteIndex, RouteSignUp } from '@/helpers/RouteName'
import { Link, useNavigate } from 'react-router-dom'
import { showToast } from '@/helpers/showToast'
import { getEvn } from '@/helpers/getEnv'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/user/user.slice'
import GoogleLogin from '@/components/GoogleLogin'
import logo from '@/assets/images/logo-white.png'

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(3, 'Password field required.')
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(values) {
        console.log("Submitting form with values:", values); // Log form values
        try {
            const response = await fetch(`${getEvn('VITE_API_BASE_URL')}/auth/login`, {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(values)
            });
            const data = await response.json();
            console.log("Response data:", data); // Log response from API
            if (!response.ok) {
                return showToast('error', data.message);
            }
            dispatch(setUser(data.user));
            navigate(RouteIndex);
            showToast('success', data.message);
        } catch (error) {
            console.error("Login attempt failed:", error); // Log any errors
            showToast('error', error.message);
        }
    }

    return (
        <div className='flex justify-center items-center h-screen w-screen'>
            <Card className="w-[400px] p-5">
                <div className='flex justify-center items-center mb-2'>
                    <Link to={RouteIndex}>
                        <img src={logo} />
                    </Link>
                </div>
                <h1 className='text-2xl font-bold text-center mb-5'>Login Into Account</h1>
                <GoogleLogin />
                <div className='border my-5 flex justify-center items-center'>
                    <span className='absolute bg-white text-sm'>Or</span>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mb-3'>
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='mt-5'>
                            <Button type="submit" className="w-full">Sign In</Button>
                            <div className='mt-5 text-sm flex justify-center items-center gap-2'>
                                <p>Don't have an account?</p>
                                <Link className='text-blue-500 hover:underline' to={RouteSignUp}>Sign Up</Link>
                            </div>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    );
}

export default SignIn;
