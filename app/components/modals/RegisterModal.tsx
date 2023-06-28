'use client'
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import {toast} from 'react-hot-toast'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';


const RegisterModal = () => {


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
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={RegisterModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={RegisterModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}

        />
    );
}

export default RegisterModal;