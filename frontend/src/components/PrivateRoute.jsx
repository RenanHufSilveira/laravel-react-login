import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Protege rotas que exigem autenticação.
 * - Enquanto valida o token: mostra loading
 * - Sem usuário: redireciona para /login
 * - Autenticado: renderiza a rota filha via <Outlet />
 */
export default function PrivateRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
        <p>Verificando autenticação...</p>
      </div>
    )
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />
}
