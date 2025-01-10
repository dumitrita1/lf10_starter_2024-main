import {Qualification} from "./EmployeeDummy";
import {Employee} from "./EmployeeDummy";

const qualificationSoftware = new Qualification(1, 'Software Developer');
const qualificationDesigner = new Qualification(2, 'Designer');

const employeeJohn = new Employee(1, 'https://placehold.co/400', 'Doe', 'John', 'Main Street 1', '12345', 'Berlin', '0123456789', [qualificationSoftware]);
const employeeJane = new Employee(2, 'https://placehold.co/400', 'Doe', 'Jane', 'Second Street 2', '23456', 'Hamburg', '9876543210', [qualificationDesigner]);
const employeeJack = new Employee(3, 'https://placehold.co/400', 'Doe', 'Jack', 'Third Street 3', '34567', 'Munich', '1234567890', [qualificationSoftware, qualificationDesigner]);
const employeeJill = new Employee(4, 'https://placehold.co/400', 'Doe', 'Jill', 'Fourth Street 4', '45678', 'Frankfurt', '0987654321', [qualificationSoftware]);
const employeeJill2 = new Employee(5, 'https://placehold.co/400', 'Doe', 'Jill', 'Fourth Street 4', '45678', 'Frankfurt', '0987654321', [qualificationSoftware]);
const employeeJill3 = new Employee(6, 'https://placehold.co/400', 'Doe', 'Jill', 'Fourth Street 4', '45678', 'Frankfurt', '0987654321', [qualificationSoftware]);


export const employees = [employeeJohn, employeeJane, employeeJack, employeeJill, employeeJill2, employeeJill3];
export const qualifications = [qualificationSoftware, qualificationDesigner];
