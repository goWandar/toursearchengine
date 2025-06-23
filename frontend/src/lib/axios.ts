import axiosRetry from "axios-retry";
import axios from "axios"

axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount: number) => Math.pow(2, retryCount) * 1000, // 1000ms, 2000ms, 4000ms
    retryCondition: (error: any) => {
      const status = error?.response?.status;
      return status >= 500 && status < 600;
    },
  });
