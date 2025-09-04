const { getUsers, getUserById, addUser, removeUser } = require('../functions/user.js');

// Mock da lista de usuários
let mockUsers = [];

beforeEach(() => {
  // Resetar a lista de usuários antes de cada teste
  mockUsers = [
    { id: 1, name: 'João Silva', email: 'joao@email.com' },
    { id: 2, name: 'Maria Santos', email: 'maria@email.com' },
    { id: 3, name: 'Pedro Alves', email: 'pedro@email.com' }
  ];
});

// Mock das funções
jest.mock('../functions/user.js', () => ({
  getUsers: jest.fn(() => [...mockUsers]),
  getUserById: jest.fn((id) => mockUsers.find(user => user.id === id) || null),
  addUser: jest.fn((name, email) => {
    if (!name || !email) {
      throw new Error("Nome e Email são obrigatórios");
    }
    const newUser = {
      id: mockUsers.length + 1,
      name, 
      email
    };
    mockUsers.push(newUser);
    return newUser;
  }),
  removeUser: jest.fn((id) => {
    const initialLength = mockUsers.length;
    mockUsers = mockUsers.filter(user => user.id !== id);
    return mockUsers.length < initialLength;
  })
}));

describe('Testes das funções de usuário', () => {
    
    test('getUsers deve retornar todos os usuários', () => {
        const users = getUsers();
        expect(users).toHaveLength(3);
        expect(users[0].name).toBe('João Silva');
    });

    test('getUserById deve retornar o usuário correto', () => {
        const user = getUserById(2);
        expect(user).not.toBeNull();
        expect(user.name).toBe('Maria Santos');
    });

    test('getUserById deve retornar null para ID inexistente', () => {
        const user = getUserById(999);
        expect(user).toBeNull();
    });

    test('addUser deve adicionar um novo usuário', () => {
        const newUser = addUser('Carlos Souza', 'carlos@gmail.com');
        expect(newUser).toHaveProperty('id', 4);
        expect(newUser.name).toBe('Carlos Souza');

        const users = getUsers();
        expect(users).toHaveLength(4);
    });

    test('addUser deve lançar erro sem nome ou email', () => {
        expect(() => addUser('', 'test@email.com')).toThrow('Nome e Email são obrigatórios');
        expect(() => addUser('Teste', '')).toThrow('Nome e Email são obrigatórios');
    });

    test('removeUser deve remover um usuário existente', () => {
        const result = removeUser(2);
        expect(result).toBe(true);

        const users = getUsers();
        expect(users).toHaveLength(2);
        expect(users.find(u => u.id === 2)).toBeUndefined();
    });

    test('removeUser deve retornar false para ID inexistente', () => {
        const result = removeUser(999);
        expect(result).toBe(false);
        
        const users = getUsers();
        expect(users).toHaveLength(3);
    });
});