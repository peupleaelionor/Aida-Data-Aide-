const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(error.message ?? 'API request failed')
  }
  return res.json()
}

export const api = {
  benefits: {
    list: (params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : ''
      return apiFetch<{ data: unknown[]; total: number }>(`/benefits${qs}`)
    },
    get: (id: string) => apiFetch<unknown>(`/benefits/${id}`),
    search: (query: string) => apiFetch<{ data: unknown[] }>(`/benefits/search?q=${encodeURIComponent(query)}`),
  },
  users: {
    me: (token: string) =>
      apiFetch<unknown>('/users/me', { headers: { Authorization: `Bearer ${token}` } }),
    updateProfile: (data: unknown, token: string) =>
      apiFetch<unknown>('/users/profile', {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      }),
  },
  ai: {
    chat: (message: string, history: unknown[], token: string) =>
      apiFetch<{ reply: string }>('/ai/chat', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ message, history }),
      }),
    checkEligibility: (profileData: unknown, token: string) =>
      apiFetch<{ results: unknown[] }>('/ai/eligibility', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(profileData),
      }),
  },
}
