'use client';

import { useState, useEffect, useCallback } from 'react'
import { IoMdClose } from 'react-icons/io'
import Button from '../Button'




interface ModalProps {
    isOpen?: boolean,
    onClose: () => void,
    onSubmit: () => void,
    title?: string,
    body?: React.ReactElement,
    footer?: React.ReactElement,
    actionLabel: string,
    disabled?: boolean,
    secondryAction?: () => void,
    secondryActionLabel?: string
}





const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, body, footer, actionLabel, disabled, secondryAction, secondryActionLabel }) => {

    const [showModal, setShowModel] = useState(isOpen)

    useEffect(() => {
        setShowModel(isOpen)
    }, [isOpen])

    const handelClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModel(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose,disabled])

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [onSubmit, disabled]);


    const handleSecondryAction = useCallback(() => {
        if (disabled || !secondryAction) {
            return;
        }

        secondryAction();
    }, [secondryAction, disabled])

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div className='justify-center 
            items-center 
            flex 
            overflow-x-hidden 
            overflow-y-auto 
            fixed 
            inset-0 
            z-50 
            outline-none 
            focus:ouline-none 
            bg-neutral-800/70'>
                <div className='relative 
                w-full
                 md:w-4/6 
                 lg:w-3/6 
                 xl:w-2/5 
                 my-6
                 mx-auto 
                 h-full 
                 lg: h-auto 
                 md:h-auto'>


                    <div className={`translate 
                    duration-300 
                    h-full
             ${showModal ? 'translate-y-0' : 'translate-y-full'} 
             ${showModal ? 'opasity-100' : 'opasity-0'}`}>

                        <div className='translate 
                        h-full 
                        lg:h-auto 
                        md:h-auto 
                        border-0 
                        rounded-lg 
                        shadow-lg
                        relative 
                        flex 
                        flex-col 
                        w-full 
                        bg-white 
                        outline-none 
                        focus:ouline-none'
                        >
                            {/* Header */}

                            <div className='flex 
                            items-center
                             p-6 rounded-t
                              justify-center
                               relative 
                               border-b-[1px] '>
                                <button
                                    onClick={handelClose}
                                    className='
                                p-1
                                border-0
                                hover:opacity-70
                                transition
                                absolute
                                left-9
                                '
                                >
                                    <IoMdClose size={18} />
                                </button>

                                <div className='text-lg font-semibold'>
                                    {title}

                                </div>
                            </div>
                            {/* Body */}
                            <div className='relative
                                p-6
                                flex-auto'>
                                {body}
                            </div>
                            {/* Footer */}

                            <div className='flex flex-col gap-2 p-6'>
                                <div className='flex flex-row items-center gap-4 w-full'>
                                    {secondryAction && secondryActionLabel && (
                                        <Button
                                            outline
                                            disabled={disabled}
                                            label={secondryActionLabel}
                                            onClick={handleSecondryAction} />

                                    )}
                                    <Button
                                        disabled={disabled}
                                        label={actionLabel}
                                        onClick={handleSubmit} />
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;
