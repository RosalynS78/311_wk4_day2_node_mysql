const mysql2 = require('mysql2')
// const mysql = require('mysql')
const pool = require('../sql/connection')
const {
  handleSQLError
} = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  // Create a full Query
  pool.query("SELECT * FROM users JOIN usersAddress ON users.id = usersAddress.user_id JOIN usersContact ON users.id=usersContact.user_id",
    (err, rows) => {
      if (err) return handleSQLError(res, err)
      return res.json(rows);
    })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = `SELECT ??, ??, ?? FROM ?? WHERE ?? = ${req.params.id}`

  // WHAT GOES IN THE BRACKETS
  sql = mysql2.format(sql, ['id', 'first_name', 'last_name', 'users', 'id']);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME 
  let sql = "INSERT INTO users (??, ??) VALUES ('Michael', 'Jackson')";
  // WHAT GOES IN THE BRACKETS
  sql = mysql2.format(sql, ['first_name', 'last_name'])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({
      newId: results.insertId
    });
  })
}

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID> 
  let sql = "UPDATE ?? SET ?? = 'Janet', ?? = 'Jackson' WHERE ?? = ?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql2.format(sql, ['users', 'first_name', 'last_name', 'users.id', req.params.id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json();
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql = "DELETE FROM ?? WHERE ?? = ?"
  // WHAT GOES IN THE BRACKETS
  const replacements = [
    'users',
    'first_name',
    req.params.first_name
  ]
  sql = mysql2.format(sql, replacements)

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({
      message: `Deleted ${results.affectedRows} user(s)`
    });
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName
}