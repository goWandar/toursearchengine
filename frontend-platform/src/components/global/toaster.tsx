"use client";
import { Toast, ToastClose, ToastDescription, ToastTitle } from "@/recipes/toast/toast";
import { useToastStore } from "@/stores/useToastStore";


export function Toaster() {
    const { open, setOpen, title, description, action, variant } = useToastStore();

    return (
        <Toast open={open} onOpenChange={setOpen} variant={variant}>
            <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && <ToastDescription>{description}</ToastDescription>}
            </div>

            {action}

            <ToastClose />
        </Toast>
    );
}
