
import { CONFIG } from "./config";
import { getAccessToken } from "./auth";

interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}

export async function apiClient<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { requiresAuth = false, headers, ...restOptions } = options;

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (requiresAuth) {
    const token = getAccessToken();
    if (token) defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`, {
    ...restOptions,
    headers: { ...defaultHeaders, ...headers },
  });

  const responseText = await response.text();
  let data: any;

  try {
    data = responseText ? JSON.parse(responseText) : {};
  } catch {
    data = { message: responseText };
  }

  if (!response.ok || data.error) {
    const errorMessage = Array.isArray(data.message)
      ? data.message.join(", ")
      : data.message || data.error || "An unexpected error occurred.";
    throw new Error(errorMessage);
  }

  return data as T;
}
