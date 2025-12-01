'use client';

import { create } from 'zustand';
import { ReactNode } from 'react';

type ToastVariant = 'default' | 'destructive';

interface TriggerToastParams {
    title?: string;
    description?: string;
    action?: ReactNode;
    variant?: ToastVariant;
}

interface ToastState {
    open: boolean;
    title?: string;
    description?: string;
    action?: ReactNode;
    variant: ToastVariant;

    setOpen: (value: boolean) => void;
    setTitle: (value?: string) => void;
    setDescription: (value?: string) => void;
    setAction: (value?: ReactNode) => void;
    setVariant: (value: ToastVariant) => void;

    triggerToast: (params: TriggerToastParams) => void;
}

export const useToastStore = create<ToastState>((set) => ({
    open: false,
    title: undefined,
    description: undefined,
    action: undefined,
    variant: 'default',

    setOpen: (value) => set({ open: value }),
    setTitle: (value) => set({ title: value }),
    setDescription: (value) => set({ description: value }),
    setAction: (value) => set({ action: value }),
    setVariant: (value) => set({ variant: value }),

    triggerToast: ({ title, description, action, variant = 'default' }) =>
        set({
            open: true,
            title,
            description,
            action,
            variant,
        }),
}));
