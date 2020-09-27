const connection = require("../../config/connection.js");
const cTable = require('console.table');
const inquirer = require("inquirer");

const allEmployees = `
SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT (manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN employee manager ON (manager.id = employee.manager_id)
JOIN role ON (employee.role_id = role.id)
JOIN department ON (role.department_id = department.id)
`;

const allManagers = `
SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT (manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN employee manager ON (manager.id = employee.manager_id)
JOIN role ON (employee.role_id = role.id)
JOIN department ON (role.department_id = department.id)
WHERE title LIKE "%Manager" OR title LIKE "President"
`;

const allDepartments = `
SELECT * FROM department
`;

const allRoles = `
SELECT * FROM roles
`;


var table;
// function to display table data
function displayTable(query) {
    connection.query(query, function (err, res) {
        if (err) throw err;
        table = cTable.getTable(res);
        console.log(table);
    })
    return
}

function queryAllEmployees(){
    displayTable(allEmployees + "ORDER BY employee.id");
    return
}



// add new role to db
function addNewRole(title, salary, department) {
    connection.query(
        'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',
        [
            title,
            salary,
            department
        ],
        function (error, data) {
            if (error) throw error;
            // logic goes here
            console.log(`Added new role ${title}, with salary: ${salary} in department id: ${department}`);
        });
}

// add new department to db
function addNewDepartment(name) {
    connection.query(
        'INSERT INTO department (name) VALUES (?)',
        [
            name
        ],
        function (error, data) {
            if (error) throw error;
            // logic goes here
            console.log(`Added new department ${name}`);
        });
}

//add new employee to db
function addNewEmployee(first, last, role, manager) {
    connection.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',
        [
            first,
            last,
            role,
            manager
        ],
        function (error, data) {
            if (error) throw error;
            // logic goes here
            console.log(`Added new employee ${first} ${last} in role: ${role} with manager: ${manager}`);
        });
}

// update an employee role
function updateEmployeeRoles(id, newRoleId) {
    connection.query(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        [
            newRoleId,
            id
        ],
        function (error, data) {
            if (error) throw error;
            console.log(`Updated employee ${id} with role ${newRoleId}`);
        });
}

function chooseRole() {
    new Promise(function (resolve, reject) {
        connection.query(
            allRoles,
            [],
            function (error, data) {
                if (error) reject(error);
                resolve(data.map(record => record.name))
            });
    });
}

function chooseDepartment() {
    new Promise(function (resolve, reject) {
        connection.query(
            allDepartments,
            [],
            function (error, data) {
                if (error) reject(error);
                resolve(data.map(record => record.name))
            });
    });
}

function chooseEmployee() {
    new Promise(function (resolve, reject) {
        connection.query(
            allEmployees,
            [],
            function (error, data) {
                if (error) reject(error);
                resolve(data.map(record =>
                    //     {
                    //     return [`${record.first_name} ${record.last_name}`]
                    // }
                    record.first_name
                ))
            });
    });
}

function chooseManager() {
    new Promise(function (resolve, reject) {
        connection.query(
            allManagers,
            [],
            function (error, data) {
                if (error) reject(error);
                resolve(data.map(record =>
                    //     {
                    //     return [`${record.first_name} ${record.last_name}`]
                    // }
                    record.first_name
                ))
            });
    });
}

function searchByDepartment(name) {
    new Promise(function (resolve, reject) {
        connection.query(
            '',
            [queryParameters],
            function (error, data) {
                if (error) reject(error);
                resolve(data)
            });
    });
}

module.exports = {
    allEmployees,
    allManagers,
    allDepartments,
    allRoles,
    addNewRole,
    addNewDepartment,
    addNewEmployee,
    chooseRole,
    chooseEmployee,
    chooseDepartment,
    chooseManager,
    updateEmployeeRoles,
    queryAllEmployees
}