const inquirer = require("inquirer");
const mysql = require('mysql');
const cTable = require('console.table');
const app = require("express");
const connection = require("./config/connection.js");
var table;

const programTitle = `
███████ ███    ███ ██████  ██       ██████  ██    ██ ███████ ███████ 
██      ████  ████ ██   ██ ██      ██    ██  ██  ██  ██      ██      
█████   ██ ████ ██ ██████  ██      ██    ██   ████   █████   █████   
██      ██  ██  ██ ██      ██      ██    ██    ██    ██      ██      
███████ ██      ██ ██      ███████  ██████     ██    ███████ ███████ 
                                                                     
                                                                     
                     ██████ ███    ███ ███████                       
                    ██      ████  ████ ██                            
                    ██      ██ ████ ██ ███████                       
                    ██      ██  ██  ██      ██                       
                     ██████ ██      ██ ███████                       
                                                                                              
`;

console.log(programTitle);

const allEmployees = `
SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT (manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN employee manager ON (manager.id = employee.manager_id)
JOIN role ON (employee.role_id = role.id)
JOIN department ON (role.department_id = department.id)
ORDER BY employee.id
`;

const allDepartments = `
SELECT name FROM department
`;

const allRoles = `
SELECT title FROM roles
`;

// function to display table data
function displayTable(query) {
    connection.query(query, function (err, res) {
        if(err) throw err;
        table = cTable.getTable(res);
        console.log(table);
        
    })
}


function addNewRole(title, salary, department){
    connection.query(
        'INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',
        [
            title,
            salary,
            department
        ],
        function(error, data) {
            if(error) throw error;
            // logic goes here
            console.log(`Added new role ${title}, with salary: ${salary} in department id: ${department}`);
        });
}

function addNewDepartment(name){
    connection.query(
        'INSERT INTO department (name) VALUES (?)',
        [
            name
        ],
        function(error, data) {
            if(error) throw error;
            // logic goes here
            console.log(`Added new department ${name}`);
        });
}

function addNewEmployee(first, last, role, manager){
    connection.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',
        [
            first,
            last,
            role,
            manager
        ],
        function(error, data) {
            if(error) throw error;
            // logic goes here
            console.log(`Added new employee ${first} ${last} in role: ${role} with manager: ${manager}`);
        });
}

// update a row in a table
function updateEmployeeRoles(id, newRoleId){
    connection.query(
        'UPDATE employee SET role_id = ? WHERE id = ?',
        [
            newRoleId,
            id
        ],
        function(error, data) {
            if(error) throw error;
            console.log(`Updated employee ${id} with role ${newRoleId}`);
        });
}


//view all employees
// displayTable(allEmployees);

//addNewRole('Janitor',35000,1);
//addNewDepartment("Nursing");
//updateEmployeeRoles(19, 18);

connection.end();