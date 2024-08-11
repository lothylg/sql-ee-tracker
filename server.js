const { prompt, default: inquirer } = require('inquirer');
const path = require('path');
const db = require('./db');
const pg = require('pg');

function init() {
    prompt([
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: [
            {
                name:'See All Employee',
                value: 'VIEW_ALL_EMPLOYEE',
            },
            {
                name:'Add an employee',
                value: 'ADD_EMPLOYEE',
            },
            {   name: 'Update Employee Role',
                value: 'UPDATE_EMPLOYEE_ROLE',
            },
            {
                name: 'View All Roles',
                value: 'VIEW_ALL_ROLES',
            },  
            {
                name: 'Add Role',
                value: 'ADD_ROLE',
            },  
            {
                name: 'View All Departments',
                value: 'VIEW_ALL_DEPARTMENTS',
            },   
            {
                name: 'Add Department',
                value: 'ADD_DEPARTMENT',
            }, 
            {
                name: 'Quit',
                value: 'QUIT',
            }, 
        ],
    },
]).then((answers)=>{
    let option = answers.options;
    switch (option) {
        case 'VIEW_ALL_EMPLOYEE':
            viewAllEmployee();
            break;
        case 'ADD_EMPLOYEE':
            addEmployee();
            break;
        case 'UPDATE_EMPLOYEE_ROLE':
            updateEmployee();
            break;
        case 'VIEW_ALL_ROLES':
            viewRoles();
            break;
        case 'ADD_ROLE':
            addRole();
            break;
        case 'VIEW_ALL_DEPARTMENTS':
            viewDepartments();
            break;
        case 'ADD_DEPARTMENT':
            addDepartment();
            break;
        default:
            quit();
    }
});
};

function viewAllEmployee() {
    db.findAllEmployees()
    .then(({rows}) => {
        let employees = rows;
        console.table(employees);
    })
    .then(() => init())
}

async function addEmployee() {
    const { rows } = await db.findAllEmployees();
    const roleChoices = rows.map(({id,title})=> 
    ({
        name: title,
        value: id,
    }));
    const managerChoices = rows.map(({id,first_name})=> 
    ({
        name: first_name,
        value: id,
    }));
    const data = await prompt(
        [
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the first name?'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the last name?'
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'What role does the employee belong to?',
                choices: roleChoices
            },
            {
                type: 'list',
                name: 'managerId',
                message: 'What manager does the employee belong to?',
                choices: managerChoices
            }
        ]
    )
        db.addOneEmployee(data.firstName, data.lastName, data.roleId, data.managerId)
        .then(() => {
            console.log('Employee added successfully!');
        })
        .then(() => init())
  
}

async function updateEmployee() {
        const { rows } = await db.findAllEmployees();
        const roleChoices = rows.map(({id,title})=> 
        ({
            name: title,
            value: id,
        }));
        const managerChoices = rows.map(({id,first_name})=> 
        ({
            name: first_name,
            value: id,
        }));
        const employeeChoices = rows.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
        }));

        const { employeeId } = await prompt({
            type: 'list',
            name: 'employeeId',
            message: 'Which employee do you want to update?',
            choices: employeeChoices
        });

        const newData = await prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the new first name:'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the new last name:'
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Select the new role:',
                choices: roleChoices
            },
            {
                type: 'list',
                name: 'manager_id',
                message: 'Select the new manager:',
                choices: managerChoices
            }
        ]);

        await db.updateOneEmployee(employeeId, newData);
        console.log('Employee updated successfully!');
        await init();
}

function viewRoles() {
    db.viewRole()
    .then(({rows}) => {
        let newRole = rows;
        console.table(newRole);
    })
    .then(() => init())
}

async function addRole() {
    const { rows } = await db.viewDepartment();
    const departmentChoices = rows.map(({id,name})=> 
    ({
        name: name,
        value: id,
    }));
    prompt(
        [
            {
                type: 'input',
                name: 'titleName',
                message: 'What role title would you like to add?'
            },
            {
                type: 'input',
                name: 'salaryAmount',
                message: 'What salary amount would you like to add?'
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'What department for the role?',
                choices: departmentChoices
            }
        ]
    ).then((data) => {
        db.addRoles(data.titleName, data.salaryAmount, data.departmentId)
        .then(() => {
            console.log('Role created successfully!');
        })
        .then(() => init())
    })
}

function viewDepartments() {
    db.viewDepartment()
    .then(({rows}) => {
        let departments = rows;
        console.table(departments);
    })
    .then(() => init())
}

function addDepartment() {
    prompt(
        [
            {
                type: 'input',
                name: 'departmentName',
                message: 'What department would you like to add?'
            }
        ]
    ).then((data) => {
        db.addDepartment(data.departmentName)
        .then(() => {
            console.log('Department created successfully!');
        })
        .then(() => init())
    })
}

function quit() {
    db.quitNow();
}

// Function call to intialize app
init();