const { Client, Account, Databases } = require('node-appwrite');

const client = new Client()
    .setProject('lobbyninja')

const account = new Account(client);
const databases = new Databases(client);

module.exports = { client, account, databases };
