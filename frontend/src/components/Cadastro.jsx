import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Eye, EyeOff, UserPlus, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { CreatePessoa } from '@/hooks/CreatePessoa'
import { CreateConta } from '@/hooks/CreateConta'

export default function Cadastro({onNavigateToLogin }) {

  const navigate = useNavigate();

  function onNavigateToLogin() {
    navigate('/login');
  }

  const { cadastroPessoa } = CreatePessoa()
  const { cadastroConta } = CreateConta()

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    nascimento: '',
    tipoConta: '',
    senha: '',
    confirmSenha: '',
    email: ''
  })

  const [showSenha, setShowSenha] = useState(false)
  const [showConfirmSenha, setShowConfirmSenha] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    
    if (formData.senha !== formData.confirmSenha) {
      alert('As senhas não coincidem!')
      return
    }

    setIsLoading(true)
    
    try {
      const pessoa = await cadastroPessoa({
        nome: formData.nome,
        cpf: formData.cpf,
        nascimento: formData.nascimento,
        email: formData.email

      })

      const conta = await cadastroConta({
        pessoaId: pessoa.id,
        tipoConta: formData.tipoConta,
        senha: formData.senha,
        limiteSaqueDiario: formData.limiteSaqueDiario
      })
      navigate('/principal')

    } catch (error) {
      console.error('Erro ao cadastrar:', error)
      alert('Erro ao criar conta. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      tipoConta: value
    })
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Criar Conta</CardTitle>
          <CardDescription>
            Preencha os dados abaixo para criar sua conta bancária
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                name="nome"
                type="text"
                placeholder="Digite seu nome completo"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                name="cpf"
                type="text"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="email@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nascimento">Data de Nascimento</Label>
              <Input
                id="nascimento"
                name="nascimento"
                type="date"
                value={formData.nascimento}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipoConta">Tipo de Conta</Label>
              <Select onValueChange={handleSelectChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de conta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Conta Corrente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="limiteSaqueDiario">Limite Diário de Saque</Label>
              <Input
                id="limiteSaqueDiario"
                name="limiteSaqueDiario"
                type="number"
                step="0.01"
                min="0"
                placeholder="R$ 0,00"
                value={formData.limiteSaqueDiario}
                onChange={handleChange}
              />
            </div>
            
        
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <div className="relative">
                <Input
                  id="senha"
                  name="senha"
                  type={showSenha ? 'text' : 'senha'}
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

            <div className="space-y-2">
              <Label htmlFor="confirmSenha">Confirmar Senha</Label>
              <div className="relative">
                <Input
                  id="confirmSenha"
                  name="confirmSenha"
                  type={showConfirmSenha ? 'text' : 'senha'}
                  placeholder="Confirme sua senha"
                  value={formData.confirmSenha}
                  onChange={handleChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmSenha(!showConfirmSenha)}
                >
                  {showConfirmSenha ? (
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
              disabled={isLoading}
              onClick={handleSubmit}
            >
              {isLoading ? (
                'Criando conta...'
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Criar Conta
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="link"
              className="p-0 h-auto font-semibold text-primary"
              onClick={onNavigateToLogin}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Voltar para o Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

