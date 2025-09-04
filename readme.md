# Projeto Full-Stack com Jest

Este é um projeto full-stack com frontend (HTML + Tailwind CSS) e backend (Node.js) com testes Jest, preparado para deploy na Vercel.

## Estrutura do Projeto

- `frontend/`: Interface do usuário com HTML, Tailwind CSS e JavaScript
- `backend/`: API Node.js com testes Jest
  - `api/`: Endpoint principal para a Vercel
  - `functions/`: Lógica de negócio (matemática e usuários)
  - `tests/`: Testes unitários com Jest

## Funcionalidades

### Frontend
- Interface responsiva com Tailwind CSS
- Operações matemáticas (soma, subtração, multiplicação, divisão)
- Gerenciamento de usuários (listar, adicionar, remover)
- Verificação de status da API

### Backend
- API REST com endpoints para:
  - `/api/math/[operação]?a=X&b=Y` - Operações matemáticas
  - `/api/users` - Listar todos os usuários (GET) ou adicionar (POST)
  - `/api/users/:id` - Obter (GET) ou remover (DELETE) um usuário específico

### Testes
- Testes unitários para funções matemáticas
- Testes unitários para funções de usuário
- Cobertura de testes com relatório

## Como executar localmente

### Backend
```bash
cd backend
npm install
npm test          # Executar testes
npm run dev       # Executar com Vercel dev