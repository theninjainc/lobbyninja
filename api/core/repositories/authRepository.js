const { account, databases } = require('../config/appwriteClient');
const { ID } = require('node-appwrite');

const DATABASE_ID = '6759f9f40015f31d86bb';
const COLLECTION_ID = 'user';

const login = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error.message);
    }
};

const register = async (email, password, name) => {
    try {
        const user = await account.create('unique()', email, password, name);

        await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            'unique()',
            { email }
        );

        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAccount = async () => {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        throw new Error('Failed to fetch user data');
    }
};

module.exports = { login, register, getAccount };
