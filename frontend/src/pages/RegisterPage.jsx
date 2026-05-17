import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate     = useNavigate()
  const [form, setForm]     = useState({ name: '', email: '', password: '', password_confirmation: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    try {
      await register(form.name, form.email, form.password, form.password_confirmation)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setErrors(err.response?.data?.errors ?? { general: ['Erro ao cadastrar. Tente novamente.'] })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.title}>Criar conta</h1>

        {errors.general && <p style={styles.error} role="alert">{errors.general[0]}</p>}

        {[
          { id: 'name',                  label: 'Nome',              type: 'text',     autoComplete: 'name' },
          { id: 'email',                 label: 'E-mail',            type: 'email',    autoComplete: 'email' },
          { id: 'password',              label: 'Senha',             type: 'password', autoComplete: 'new-password' },
          { id: 'password_confirmation', label: 'Confirmar senha',   type: 'password', autoComplete: 'new-password' },
        ].map(({ id, label, type, autoComplete }) => (
          <div key={id}>
            <label style={styles.label} htmlFor={id}>{label}</label>
            <input
              id={id}
              name={id}
              type={type}
              value={form[id]}
              onChange={handleChange}
              required
              autoComplete={autoComplete}
              style={styles.input}
            />
            {errors[id] && <p style={styles.error}>{errors[id][0]}</p>}
          </div>
        ))}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p style={styles.link}>
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </form>
    </div>
  )
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' },
  form:      { display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%', maxWidth: '360px', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' },
  title:     { margin: 0, marginBottom: '0.5rem', fontSize: '1.5rem' },
  label:     { fontWeight: 600, fontSize: '0.9rem', display: 'block', marginBottom: '0.25rem' },
  input:     { padding: '0.5rem 0.75rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box' },
  button:    { padding: '0.6rem', fontSize: '1rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  error:     { color: '#dc2626', fontSize: '0.875rem', margin: '0.25rem 0 0' },
  link:      { textAlign: 'center', fontSize: '0.875rem' },
}
