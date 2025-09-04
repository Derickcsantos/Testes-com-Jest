let users = [
  { id: 1, name: 'João Silva', email: 'joao@email.com' },
  { id: 2, name: 'Maria Santos', email: 'maria@email.com' },
  { id: 3, name: 'Pedro Alves', email: 'pedro@email.com' }
];

function getUsers(){
    return users;
}

function getUserById(id){
    return users.find(user => user.id === id) || null;
}

function addUser(name, email){
    if (!name || !email) {
        throw new Error("Nome e Email são obrigatórios");
    }

    const newUser = {
        id: users.length + 1,
        name, 
        email
    };

    users.push(newUser);
    return newUser;
}

function removeUser(id) {
    const initialLength = users.length;
    users = users.filter(user => user.id !== id);
    return users.length < initialLength;
}

module.exports = { getUsers, getUserById, addUser, removeUser };