export const fetchInstance = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    const res = await fetch(`http://localhost:8080/api${endpoint}`, options);
    return await res.json();
}