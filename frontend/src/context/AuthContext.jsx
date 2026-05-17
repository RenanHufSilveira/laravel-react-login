import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  // Ao carregar a app, verifica se já existe sessão ativa no servidor
  // Nenhum dado sensível fica no navegador — tudo está no cookie HttpOnly
  useEffect(() => {
    api.get('/api/user')
      .then(({ data }) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  /**
   * Passo 1: busca o cookie XSRF-TOKEN do Sanctum
   * Passo 2: faz o login — o Laravel seta o cookie de sessão HttpOnly
   * O XSRF-TOKEN é lido automaticamente pelo axios e enviado como header
   */
  const login = useCallback(async (email, password) => {
    await api.get('/sanctum/csrf-cookie')
    const { data } = await api.post('/api/login', { email, password })
    setUser(data.user)
    return data.user
  }, [])

  const register = useCallback(async (name, email, password, password_confirmation) => {
    await api.get('/sanctum/csrf-cookie')
    const { data } = await api.post('/api/register', { name, email, password, password_confirmation })
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.post('/api/logout')
    } finally {
      setUser(null)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro de <AuthProvider>')
  return context
}
