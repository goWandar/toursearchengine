import axios from "axios";
import axiosRetry from "axios-retry";

// Create an axios instance
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

const axiosClient = axios.create({
    baseURL: baseUrl,
});

// Configure axios-retry
axiosRetry(axiosClient, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    onRetry: (retryCount: number, error: Error) => {
        console.log(`Retrying request...`);
    },
    retryCondition: (error: any) => {
        // Retry on network errors or idempotent request errors (5xx)
        return axiosRetry.isNetworkOrIdempotentRequestError(error);
    },
});

export default axiosClient;
