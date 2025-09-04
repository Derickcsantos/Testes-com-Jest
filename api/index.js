const { soma, subtrai, multiplica, divide } = require('../functions/math');
const { getUsers, getUserById, addUser, removeUser } = require('../functions/user');
const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsing JSON
app.use(express.json());

// Configura CORS para permitir requests do frontend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Roteamento da API
app.get('/api/math/:operation', (req, res) => {
  const { operation } = req.params;
  const { a, b } = req.query;
  
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA) || isNaN(numB)) {
    return res.status(400).json({ error: 'Parâmetros a e b devem ser números válidos' });
  }

  try {
    let result;
    switch (operation) {
      case 'soma':
        result = soma(numA, numB);
        break;
      case 'subtrai':
        result = subtrai(numA, numB);
        break;
      case 'multiplica':
        result = multiplica(numA, numB);
        break;
      case 'divide':
        result = divide(numA, numB);
        break;
      default:
        return res.status(404).json({ error: 'Operação matemática não encontrada' });
    }

    return res.json({
      operation,
      a: numA,
      b: numB,
      result
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Rotas de usuários
app.get('/api/users', (req, res) => {
  const users = getUsers();
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = getUserById(id);
  
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }

  const newUser = addUser(name, email);
  res.status(201).json(newUser);
});

app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const removed = removeUser(id);
  
  if (!removed) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }

  res.json({ message: 'Usuário removido com sucesso' });
});

// Rota fallback para servir o frontend (SPA)
app.use((req, res) => {
  const possiblePaths = [
    path.join(__dirname, '../frontend/index.html'),
    path.join(__dirname, './frontend/index.html'),
    path.join(process.cwd(), 'frontend/index.html'),
    path.join(process.cwd(), '../frontend/index.html')
  ];

  for (const filePath of possiblePaths) {
    try {
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      }
    } catch (e) {
      // Continua para o próximo path
    }
  }

  // Se não encontrar o arquivo, retorna HTML básico
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Projeto Full-Stack com Jest</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        .hidden { display: none; }
        .loading { opacity: 0.6; pointer-events: none; }
        .success-status { background-color: #10B981; }
        .error-status { background-color: #EF4444; }
        .unknown-status { background-color: #6B7280; }
      </style>
    </head>
    <body class="bg-gray-100 min-h-screen">
      <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-center text-blue-600 mb-8">
          Projeto Full-Stack com Jest
        </h1>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <p class="text-center text-gray-600">
            Frontend não encontrado. Certifique-se de que a pasta frontend existe.
          </p>
          <div class="mt-4 text-center">
            <a href="/api/users" class="text-blue-500 hover:text-blue-700 mr-4">
              Testar API de Usuários
            </a>
            <a href="/api/math/soma?a=5&b=3" class="text-blue-500 hover:text-blue-700">
              Testar API Matemática
            </a>
          </div>
        </div>
      </div>
      <script>
        console.log('Frontend carregado com sucesso');
      </script>
    </body>
    </html>
  `);
});

// Inicia o servidor apenas se não estiver na Vercel
if (process.env.VERCEL !== '1') {
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
    console.log(`- Frontend: http://localhost:${port}/`);
    console.log(`- API Matemática: http://localhost:${port}/api/math/soma?a=5&b=3`);
    console.log(`- API Usuários: http://localhost:${port}/api/users`);
    console.log(`\nPressione Ctrl+C para parar o servidor`);
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\nServidor encerrado');
    process.exit(0);
  });
}

// Export para Vercel
module.exports = app;