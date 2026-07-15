import axios from "axios";
import baseUrl from "./apiConfig";

// Generic GET request function
export const apiGet = async (endpoint, token = null, options = {}) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.get(`${baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    const apiMessage = error.response?.data?.message || error.message;
    const apiStatus = error.response?.data?.status;
    console.error(`GET request failed for ${endpoint}:`);
    console.error("API Response:", {
      message: apiMessage,
      status: apiStatus,
      fullResponse: error.response?.data,
    });
    throw error;
  }
};

export const apiGetInternalCall = async (
  endpoint,
  token = null,
  options = {},
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.get(`${baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    const apiMessage = error.response?.data?.message || error.message;
    const apiStatus = error.response?.data?.status;
    console.error(`GET request failed for ${endpoint}:`);
    console.error("API Response:", {
      message: apiMessage,
      status: apiStatus,
      fullResponse: error.response?.data,
    });
    throw error;
  }
};

// Generic POST request function
export const apiPost = async (
  endpoint,
  data = {},
  token = null,
  options = {},
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.post(`${baseUrl}${endpoint}`, data, {
      ...options,
      headers,
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    const apiMessage = error.response?.data?.message || error.message;
    const apiStatus = error.response?.data?.status;
    console.error(`POST request failed for ${endpoint}:`);
    console.error("API Response:", {
      message: apiMessage,
      status: apiStatus,
      fullResponse: error.response?.data,
    });
    throw error;
  }
};

export const apiPostInternalCall = async (
  endpoint,
  data = {},
  token = null,
  options = {},
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.post(`${baseUrl}${endpoint}`, data, {
      ...options,
      headers,
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    const apiMessage = error.response?.data?.message || error.message;
    const apiStatus = error.response?.data?.status;
    console.error(`POST request failed for ${endpoint}:`);
    console.error("API Response:", {
      message: apiMessage,
      status: apiStatus,
      fullResponse: error.response?.data,
    });
    throw error;
  }
};

// Generic PUT request function
export const apiPut = async (
  endpoint,
  data = {},
  token = null,
  options = {},
) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios.put(`${baseUrl}${endpoint}`, data, {
      ...options,
      headers,
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    const apiMessage = error.response?.data?.message || error.message;
    const apiStatus = error.response?.data?.status;
    console.error(`PUT request failed for ${endpoint}:`);
    console.error("API Response:", {
      message: apiMessage,
      status: apiStatus,
      fullResponse: error.response?.data,
    });
    throw error;
  }
};
