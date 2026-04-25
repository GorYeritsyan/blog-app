export const fetchInstance = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    const res = await fetch(`https://${process.env.PROJECT_SECRET}.mockapi.io/api${endpoint}`, {
        ...options
    });

    return await res.json();
}