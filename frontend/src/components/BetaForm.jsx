import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

const { VITE_API_PATH } = import.meta.env;
console.log("VITE_API_PATH:", VITE_API_PATH);

const BetaForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setMessage(null);

        try {
            const response = await axios.post(`${VITE_API_PATH}/api/subscribers`, {
                email: data.email,
            });

            if (response.status === 409 || response.status === 204) {
                setMessage({
                    text: "This email is already registered. Please use a different email.",
                    type: "error",
                });
                return;
            }

            setMessage({
                text: "Thank you for joining our waitlist!",
                type: "success",
            });
            reset();
        } catch (error) {
            let errorMessage = "An error occurred. Please try again.";

            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        errorMessage = error.response.data.error || "Invalid request";
                        break;
                    case 204:
                        errorMessage =
                            "This email is already registered. Please use a different email.";
                        break;
                    default:
                        errorMessage =
                            error.response.data?.error || "Server error occurred";
                }
            } else if (error.request) {
                errorMessage =
                    "Unable to connect to the server. Please check your internet connection.";
            }

            setMessage({
                text: errorMessage,
                type: "error",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    return (
        <>
            <section className="betaForm">
                <div className="form-container">
                    <h1 className="title fw-bold animate__animated animate__heartBeat">
                        Early Beta Access
                    </h1>
                    <p className="description">
                        Join our exclusive beta launch and get first access to
                        Africa&apos;s best-ranked safari operators
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="email-form">
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            type="email"
                            placeholder="Enter your email"
                            className="email-input"
                        />
                        {errors.email && (
                            <div className="error-message invalid-feedback d-block">
                                {errors.email.message}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`submit-button ${
                                isLoading ? "disabled opacity-50" : ""
                            }`}
                        >
                            {isLoading ? "Submitting..." : "Join Waitlist"}
                        </button>
                    </form>

                    {message && (
                        <div
                            className={`mt-4 p-3 rounded ${
                                message.type === "success"
                                    ? "alert alert-success text-success border border-success-subtle"
                                    : "alert alert-danger border border-danger-subtle"
                            }`}
                        >
                            {message.text}
                        </div>
                    )}
                </div>
                {/* primary features */}
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4 p-md-5">
                                <h3 className="h3 mb-4 text-center">
                                    Primary Features
                                </h3>
                                <div className="row">
                                    <div className="col-lg-6 mx-auto">
                                        <ul className="list-unstyled feature-list">
                                            <li className="d-flex align-items-start mb-4">
                                                <div className="feature-bullet bg
