// URL base da API - será ajustada automaticamente em produção
const API_BASE = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api' 
    : 'https://jest-dcs.vercel.app/api';

// Elementos do DOM
const mathResult = document.getElementById('mathResult');
const mathResultText = document.getElementById('mathResultText');
const usersList = document.getElementById('usersList');
const apiStatus = document.getElementById('apiStatus');
const apiStatusText = document.getElementById('apiStatusText');

// Verificar status da API ao carregar a página
checkApiStatus();

// Funções para operações matemáticas
async function calculate(operation) {
    const a = document.getElementById('mathA').value;
    const b = document.getElementById('mathB').value;
    
    try {
        const response = await fetch(`${API_BASE}/math/${operation}?a=${a}&b=${b}`);
        const data = await response.json();
        
        if (response.ok) {
            showMathResult(`${a} ${getOperationSymbol(operation)} ${b} = ${data.result}`);
        } else {
            showMathResult(`Erro: ${data.error}`, true);
        }
    } catch (error) {
        showMathResult('Erro de conexão com a API', true);
    }
}

function getOperationSymbol(operation) {
    switch(operation) {
        case 'soma': return '+';
        case 'subtrai': return '-';
        case 'multiplica': return '×';
        case 'divide': return '÷';
        default: return '?';
    }
}

function showMathResult(message, isError = false) {
    mathResultText.textContent = message;
    mathResultText.className = isError ? 'text-red-600' : 'text-green-600';
    mathResult.classList.remove('hidden');
}

// Funções para gerenciamento de usuários
async function loadUsers() {
    try {
        const response = await fetch(`${API_BASE}/users`);
        const users = await response.json();
        
        if (response.ok) {
            displayUsers(users);
        } else {
            alert('Erro ao carregar usuários: ' + users.error);
        }
    } catch (error) {
        alert('Erro de conexão com a API');
    }
}

async function addNewUser() {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    
    if (!name || !email) {
        alert('Por favor, preencha nome e email');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('userName').value = '';
            document.getElementById('userEmail').value = '';
            alert('Usuário adicionado com sucesso!');
            loadUsers(); // Recarrega a lista de usuários
        } else {
            alert('Erro ao adicionar usuário: ' + data.error);
        }
    } catch (error) {
        alert('Erro de conexão com a API');
    }
}

async function deleteUser(id) {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE}/users/${id}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Usuário excluído com sucesso!');
            loadUsers(); // Recarrega a lista de usuários
        } else {
            alert('Erro ao excluir usuário: ' + data.error);
        }
    } catch (error) {
        alert('Erro de conexão com a API');
    }
}

function displayUsers(users) {
    if (users.length === 0) {
        usersList.innerHTML = '<p class="text-gray-500">Nenhum usuário encontrado</p>';
        return;
    }
    
    usersList.innerHTML = users.map(user => `
        <div class="user-item border border-gray-200 rounded p-3 flex justify-between items-center">
            <div>
                <h3 class="font-semibold">${user.name}</h3>
                <p class="text-gray-600 text-sm">${user.email}</p>
            </div>
            <button onclick="deleteUser(${user.id})" class="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    `).join('');
}

// Verificar status da API
async function checkApiStatus() {
    try {
        apiStatus.className = 'inline-block w-3 h-3 rounded-full mr-2 unknown-status';
        apiStatusText.textContent = 'Verificando status da API...';
        
        const response = await fetch(`${API_BASE}/users`);
        
        if (response.ok) {
            apiStatus.className = 'inline-block w-3 h-3 rounded-full mr-2 success-status';
            apiStatusText.textContent = 'API online e funcionando';
        } else {
            apiStatus.className = 'inline-block w-3 h-3 rounded-full mr-2 error-status';
            apiStatusText.textContent = 'API online mas com problemas';
        }
    } catch (error) {
        apiStatus.className = 'inline-block w-3 h-3 rounded-full mr-2 error-status';
        apiStatusText.textContent = 'API offline - não foi possível conectar';
    }
}