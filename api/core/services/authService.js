const authRepository = require('../repositories/authRepository');

const login = async (email, password) => {
    return await authRepository.login(email, password);
};

const register = async (email, password, name) => {
    return await authRepository.register(email, password, name);
};

const getAccount = async () => {
    return await authRepository.getAccount();
};

module.exports = { login, register, getAccount };
