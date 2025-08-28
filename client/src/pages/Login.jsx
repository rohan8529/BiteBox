import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { Flip, toast } from 'react-toastify';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Login = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [serverError, setServerError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const onSubmit = async (data) => {
        setLoading(true);
        setServerError(null);

        try {
            await login(data.Email, data.Password);
            reset();
            toast.success('Login Successfull.', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
            });

            navigate('/');
        } catch (error) {
            setServerError(error.message || 'An error occurred');
            reset();
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='lg:p-8 lg:w-4/5 m-auto'>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md m-auto p-4 bg-white text-gray-900 rounded-lg shadow-md space-y-4">
                {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

                <div className="flex flex-col">
                    <label htmlFor="Email" className="text-gray-700 font-medium">Email</label>
                    <input
                        id="Email"
                        type="email"
                        placeholder="Email"
                        {...register("Email", {
                            required: "Email is required",
                            maxLength: { value: 30, message: "Email cannot exceed 30 characters" },
                            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, message: "Invalid email address" }
                        })}
                        className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    {errors.Email && <p className="text-red-500 xs:text-xs sm:text-sm">{errors.Email.message}</p>}
                </div>

                <div className="flex flex-col relative">
                    <label htmlFor="Password" className="text-gray-700 font-medium">Password</label>
                    <input
                        id="Password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        {...register("Password", {
                            required: "Password is required",
                            maxLength: { value: 30, message: "Password cannot exceed 30 characters" }
                        })}
                        className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    {showPassword ?
                        <EyeSlashIcon className='w-6 h-6 absolute right-2 top-2/4 text-gray-700 cursor-pointer' onClick={() => setShowPassword(false)} /> :
                        <EyeIcon className='w-6 h-6 absolute right-2 top-2/4 text-gray-700 cursor-pointer' onClick={() => setShowPassword(true)} />
                    }
                    {errors.Password && <p className="text-red-500 xs:text-xs sm:text-sm">{errors.Password.message}</p>}
                </div>

                <div className="flex flex-col items-center space-y-2">
                    <input
                        type="submit"
                        value={loading ? "Logging in..." : "Submit"}
                        className="py-2 px-4 bg-cgrey cursor-pointer text-white rounded-lg hover:bg-corg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        disabled={loading}
                    />
                    <p>

                    </p>
                    <p className="text-sm text-gray-600">
                        Doesn't have an account? <Link to="/register" className="text-blue-500 hover:underline">Create new account</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;


