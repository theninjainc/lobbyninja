const { getColumns, saveColumns } = require('../repositories/costumizeColumnsRepository');

const fetchColumns = async (email) => {
    console.log("cheguei aqui")
    return await getColumns(email);
};

const storeColumns = async (email, columns) => {
    return await saveColumns(email, columns);
};

module.exports = { fetchColumns, storeColumns };
