'use client'
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import {toast} from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useCallback } from 'react';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import { signIn } from 'next-auth/react';

const RegisterModal = () => {

    const LoginModal = useLoginModal();
    const RegisterModal = useRegisterModal();
    const [isLoading, setisLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    });


    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setisLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                RegisterModal.onClose();
            })
            .catch((error) => {
                toast.error('get wrekt')
            })
            .finally(() => {
                setisLoading(false)
            })
    }

    const toggle = useCallback(() => {
        RegisterModal.onClose();
        LoginModal.onOpen();
    },[LoginModal, RegisterModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome to Airbnb'
                subtitle='Create an account!'
            />

            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="password"
                type='password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />


        </div>
    );

        const footercontent = (
            <div className='flex flex-col gap-4 mt-3 '>
                <hr/>
                <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
                />
                <Button
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => signIn('github')}
                />  

                <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                <div>
                    Already have an account?
                </div>
                <div 
                onClick={toggle}
                className='
                 text-neutral-800
                 cursor-pointer
                 hover:underline
                 '
                 >
                    Login
                </div>
                </div>
                </div>

            </div>
        );

    return (
        <Modal
            disabled={isLoading}
            isOpen={RegisterModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={RegisterModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footercontent}
        />
    );
}

export default RegisterModal;