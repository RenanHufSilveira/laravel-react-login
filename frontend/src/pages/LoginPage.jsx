import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login }        = useAuth()
  const navigate         = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const msg = err.response?.data?.errors?.email?.[0]
        ?? err.response?.data?.message
        ?? 'Erro ao fazer login. Tente novamente.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.title}>Entrar</h1>

        {error && <p style={styles.error} role="alert">{error}</p>}

        <label style={styles.label} htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          style={styles.input}
        />

        <label style={styles.label} htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          style={styles.input}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <p style={styles.link}>
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </form>
    </div>
  )
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' },
  form:      { display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '360px', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' },
  title:     { margin: 0, marginBottom: '0.5rem', fontSize: '1.5rem' },
  label:     { fontWeight: 600, fontSize: '0.9rem' },
  input:     { padding: '0.5rem 0.75rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' },
  button:    { padding: '0.6rem', fontSize: '1rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  error:     { color: '#dc2626', fontSize: '0.875rem', margin: 0 },
  link:      { textAlign: 'center', fontSize: '0.875rem' },
}
