import axios from 'axios'

const api = axios.create({
  // Sem baseURL absoluta — o proxy do Vite redireciona /api e /sanctum
  // para o Laravel. Browser e backend ficam no mesmo origem (localhost:5173),
  // resolvendo o CSRF token mismatch.
  baseURL: '/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Redireciona para /login em 401, exceto na verificação inicial de sessão.
// Sem essa exceção, o AuthProvider entraria em loop infinito:
// GET /api/user → 401 → redirect /login → monta AuthProvider → GET /api/user → ...
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isSessionCheck = error.config?.url === '/api/user'
    if (error.response?.status === 401 && !isSessionCheck) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
