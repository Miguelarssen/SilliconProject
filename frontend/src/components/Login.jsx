import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useLogin } from '../hooks/useLogin' 
import { useNavigate } from 'react-router-dom'

export default function Login({ onLoginSuccess, onNavigateToCadastro }) {

  const navigate = useNavigate();

  function onNavigateToCadastro() {
    navigate('/cadastro');
  }

  const [formData, setFormData] = useState({
    email: '',  
    senha: ''
  })
  const [showSenha, setShowSenha] = useState(false)

  const { login, loading, error } = useLogin()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const userData = await login({ 
      email: formData.email,
      senha: formData.senha
    })

    if (userData) {
      onLoginSuccess(userData)
      navigate('/principal', { state: { userData } })
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Banco Digital</CardTitle>
          <CardDescription>
            Entre na sua conta para acessar seus serviços bancários
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <div className="relative">
                <Input
                  id="senha"
                  name="senha"
                  type={showSenha ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowSenha(!showSenha)}
                >
                  {showSenha ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                'Entrando...'
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Entrar
                </>
              )}
            </Button>
          </form>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <Button
                variant="link"
                className="p-0 h-auto font-semibold text-primary"
                onClick={onNavigateToCadastro}
              >
                Cadastre-se aqui
              </Button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}