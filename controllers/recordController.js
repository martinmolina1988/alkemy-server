const conexion = require('../database/db')

exports.balance = async (req, res) => {
    const { id } = req;
    try {
        const query = `select sum(s1.result) as balance from 
                        (SELECT sum(amount) as result FROM mydb.record
                        where user_id = ${id}
                        and type = 'income'
                        union
                        SELECT sum(amount * -1) as result FROM mydb.record
                        where user_id =  ${id}
                        and type = 'expense') as s1`;

        conexion.query(query, (error, results) => {
            if (!results) { return null } else {

                return res.json(results);
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
};

exports.orderBy = async (req, res) => {
    const { key, value } = req.query;
    const { id } = req;
    try {
        const query = `SELECT * FROM mydb.record
        where ${key} = '${value}'
        and user_id= ${id}`;
        conexion.query(query, (error, results) => {
            if (!results) { return null } else {

                return res.json(results);
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
};

exports.getRecords = async (req, res) => {
    const { id } = req;
    try {
        const query = `SELECT * FROM mydb.record
                     where user_id= ${id}
                     ORDER BY date desc
                      limit 10`;
        conexion.query(query, (error, results) => {
            if (!results) { return null } else {

                return res.json(results);
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
};
exports.getRecord = async (req, res) => {
    const { id } = req;
    const { id_record } = req.query;
    try {
        const query = `SELECT * FROM mydb.record
                     where user_id= ${id}
                     and id_record = ${id_record} 
                     `;
        conexion.query(query, (error, results) => {
            if (!results) { return null } else {

                return res.json(results);
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
};

exports.getAllConcepts = async (req, res) => {
    const { id } = req;
    try {
        const query = `SELECT concept, type FROM mydb.record
                        where user_id= ${id}
                        group by concept`;
        conexion.query(query, (error, results) => {
            if (!results) { return null } else {

                return res.json(results);
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
};

exports.insertRecord = async (req, res) => {
    const { concept, amount, date, type, category } = req.body;
    const { id } = req;
    try {
        const query = `INSERT INTO mydb.record
    (user_id,
    concept,
    amount,
    date,
    type,
    category)
    VALUES
    (${id},'${concept}',${amount},'${date}','${type}','${category}')
    
    `;
        conexion.query(query, (error, results) => {
            if (!results) { return null } else {

                return res.json(results);
            }
        })
    } catch (error) {
        console.log(error)
        return next()
    }
};





exports.updateRecord = async (req, res) => {
    const { concept, amount, date, id_record, category } = req.body;
    const { id } = req;

    try {
        // update statment
        let sql = `UPDATE  mydb.record
                SET concept = ?,
                amount = ?,
                date = ?,
                category = ?
                where user_id = ?
                and   id_record = ?`;

        let data = [concept, amount, date, category, id, id_record];

        // execute the UPDATE statement
        conexion.query(sql, data, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            return res.json(results);
        });
    } catch (error) {
        console.log(error)
        return next()
    }
};
exports.deleteRecord = async (req, res) => {
    const { id_record } = req.body;
    const { id } = req;

    try {
        // update statment
        let sql = `DELETE FROM mydb.record
                   WHERE  user_id = ${id}
                   and   id_record = ${id_record};`;


        // execute the UPDATE statement
        conexion.query(sql, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            return res.json(results);
        });
    } catch (error) {
        console.log(error)

    }
};



