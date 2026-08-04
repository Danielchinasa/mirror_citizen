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
      headers,
      ...options,
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error(`GET request failed for ${endpoint}:`, error);
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
      headers,
      ...options,
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error(`GET request failed for ${endpoint}:`, error);
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
    console.error(`POST request failed for ${endpoint}:`, error);
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
    console.error(`POST request failed for ${endpoint}:`, error);
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
      headers,
      ...options,
    });

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error(`PUT request failed for ${endpoint}:`, error);
    throw error;
  }
};
