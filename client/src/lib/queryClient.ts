import { QueryClient } from "@tanstack/react-query";

const apiRequest = async (endpoint: string, options?: RequestInit) => {
  const url = endpoint.startsWith('http') ? endpoint : `${window.location.origin}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorMessage = "Request failed";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // Fall back to status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }
  
  return response.text();
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const [url] = queryKey as [string];
        return apiRequest(url);
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

export { apiRequest };