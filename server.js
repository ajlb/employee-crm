const inquirer = require("inquirer");
const connection = require("./config/connection.js");
const query = require("./lib/sql/queries.js");
const Employee = require("./lib/classes/employee");
const Role = require("./lib/classes/role");
const Department = require("./lib/classes/department");
const mysql = require("mysql");

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
showMenu();

// inquirer prompts
function showMenu() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "action",
                choices: [
                    "View all employees",
                    "View all employees by department",
                    "View all employees by manager",
                    "Add an employee",
                    "Add a role",
                    "Add a department",
                    "Update an employee's role",
                    "Update an employee's manager",
                    "QUIT"]
            }
        ])
        .then(function (answers) {
            switch (answers.action) {
                case "View all employees":
                    query.queryAllEmployees();
                    setTimeout(showMenu, 500);
                    break;
                case "View all employees by department":
                    queryByDepartment();
                    break;
                case "View all employees by manager":
                    queryByManager();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Update an employee's role":
                    updateEmployeeRole();
                    break;
                case "Update an employee's manager":
                    updateEmployeeManager();
                    break;
                case "QUIT":
                    connection.end();
            }//end switch

        }); //end inquirer
}

function queryByDepartment() {
    connection.query(
        query.allDepartments,
        [],
        function (error, data) {
            if (error) throw error;
            // logic goes here
            const departments = data.map((row) => {
                return {
                    name: row.name,
                    value: row.id
                };
            });
            inquirer.prompt([
                {
                    type: "list",
                    name: "departmentSelect",
                    message: "Which Department would you like to search by?",
                    choices: departments,
                }
            ]).then((answers) => {
                connection.query(
                    query.allEmployees + "WHERE role.department_id = ?",
                    [
                        answers.departmentSelect
                    ],
                    (err, res) => {
                        if (err) throw err;

                        console.log(`
                  ############################
                  #   View By Department     #
                  ############################
                        `);
                        console.table(res);
                        showMenu();
                    }
                )
            })
        });
}

function queryByManager() {
    connection.query(
        "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS manager, employee.id FROM employee",
        (err, res) => {
            if (err) {
                throw err;
            }
            const managers = res.map((element) => {
                return {
                    name: element.manager,
                    value: element.id,
                };
            });
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "managerSelect",
                        message: "Which Manager would you like to search by?",
                        choices: managers,
                    },
                ])
                .then((answers) => {
                    connection.query(
                        query.allEmployees + "WHERE employee.manager_id = ?",
                        [
                            answers.managerSelect,
                        ],
                        (err, res) => {
                            if (err) {
                                throw err;
                            }
                            console.log(`
                            ############################
                            #   View By Manager        #
                            ############################
                    `);
                            console.table(res);
                            showMenu();
                        }
                    );
                });
        });
}

function addEmployee() {
    connection
        .query("SELECT role.id, role.title FROM role", (err, res) => {
            if (err) {
                throw err;
            }
            const roles = res.map((row) => {
                return {
                    name: row.title,
                    value: row.id,
                };
            });
            connection.query(
                "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS manager, employee.id FROM employee",
                (err, res) => {
                    if (err) {
                        throw err;
                    }
                    const managers = res.map((element) => {
                        return {
                            name: element.manager,
                            value: element.id,
                        };
                    });
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "first",
                                message: "What is the employee's first name?",
                            },
                            {
                                type: "input",
                                name: "last",
                                message: "What is the employee's last name?",
                            },
                            {
                                type: "list",
                                name: "roleSelect",
                                message: "What is their role?",
                                choices: roles,
                            },
                            {
                                type: "list",
                                name: "managerSelect",
                                message: "Who is their Manager?",
                                choices: managers,
                            },
                        ])
                        .then((answers) => {
                            connection.query(
                                "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?)",
                                [
                                    answers.first,
                                    answers.last,
                                    answers.roleSelect,
                                    answers.managerSelect,
                                ],
                                (err, res) => {
                                    if (err) {
                                        throw err;
                                    }
                                    console.log(`
  #=================================================================#
  #                   Employee Succesfully Added                    #
  #=================================================================#
                    `);
                                    showMenu();
                                }
                            );
                        });
                }
            );
        });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the name of the new Depeartment:",
                name: "newDepartment",
            },
        ])
        .then(function ({ newDepartment }) {
            // console.log("New Department " + newDepartment);
            var queryString = `INSERT INTO department (name) VALUES (?);`
            connection.query(queryString,
                [newDepartment],
                function (error, response) {
                    if (error) throw error;
                    console.log(`
  #=================================================================#
  #                 Department Succesfully Added                    #
  #=================================================================#
                \n`);
                    showMenu();
                });
        });
}

function addRole() {
    connection
        .query("SELECT department.id, department.name FROM department", (err, res) => {
            if (err) {
                throw err;
            }
            const departments = res.map((row) => {
                return {
                    name: row.name,
                    value: row.id,
                };
            });
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "roleInput",
                        message: "Enter new role:",
                    },
                    {
                        type: "input",
                        name: "salaryInput",
                        message: "Enter salary for this role:",
                    },
                    {
                        type: "list",
                        name: "departmentSelect",
                        message: "Which department does this role belong to?",
                        choices: departments,
                    }
                ])
                .then((answers) => {
                    connection.query(
                        "INSERT INTO role (title, salary, department_id) VALUES ( ?, ?, ?)",
                        [
                            answers.roleInput,
                            answers.salaryInput,
                            answers.departmentSelect,
                        ],
                        (err, res) => {
                            if (err) {
                                throw err;
                            }
                            console.log(`
  #=================================================================#
  #                     Role Succesfully Added                      #
  #=================================================================#
                    `);
                            showMenu();
                        }
                    );
                });
        });
}
// ----------------------------------------------------------------


// Update items in database
// ----------------------------------------------------------------
function updateEmployeeRole() {
    connection
        .query("SELECT role.id, role.title FROM role", (err, res) => {
            if (err) {
                throw err;
            }
            const roles = res.map((row) => {
                return {
                    name: row.title,
                    value: row.id,
                };
            });
            connection.query(
                "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS currentEmployee, employee.id FROM employee",
                (err, res) => {
                    if (err) {
                        throw err;
                    }
                    const employees = res.map((element) => {
                        return {
                            name: element.currentEmployee,
                            value: element.id,
                        };
                    });
                    inquirer
                        .prompt([
                            {
                                type: "list",
                                name: "employeeSelect",
                                message: "Whose role would you like to update?",
                                choices: employees,
                            },
                            {
                                type: "list",
                                name: "roleSelect",
                                message: "What is their new role?",
                                choices: roles,
                            },
                        ])
                        .then((answers) => {
                            connection.query(
                                "UPDATE employee SET employee.role_id = ? WHERE employee.id = ?;",
                                [
                                    answers.roleSelect,
                                    answers.employeeSelect,
                                ],
                                (err, res) => {
                                    if (err) {
                                        throw err;
                                    }
                                    console.log(`
  #=================================================================#
  #               Employee Role Succesfully Updated                 #
  #=================================================================#
                    `);
                                    showMenu();
                                }
                            );
                        });
                }
            );
        });
}

function updateEmployeeManager() {
    connection.query(
        "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS currentEmployee, employee.id FROM employee",
        (err, res) => {
            if (err) {
                throw err;
            }
            const employees = res.map((element) => {
                return {
                    name: element.currentEmployee,
                    value: element.id,
                };
            });
            inquirer
                .prompt([
                    {
                        type: "list",
                        name: "employeeSelect",
                        message: "Whose manager would you like to update?",
                        choices: employees,
                    },
                    {
                        type: "list",
                        name: "managerSelect",
                        message: "Who is their new manager?",
                        choices: employees,
                    },
                ])
                .then((answers) => {
                    connection.query(
                        "UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?;",
                        [
                            answers.managerSelect,
                            answers.employeeSelect,
                        ],
                        (err, res) => {
                            if (err) {
                                throw err;
                            }
                            console.log(`
  #=================================================================#
  #               Employee manager Succesfully Updated              #
  #=================================================================#
                    `);
                            showMenu();
                        }
                    );
                });
        }
    );
}
