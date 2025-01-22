import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  standalone: true,
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      // Hier dann Mitarbeiterdaten laden
    });
  }



  employeeName() {
    // Platzhalter
    return "Parima Thomson";
  }

  employeeDescription() {
    // Platzhalter
    return "nown printer took a galley of type and scrambled it to make a type specimen book. " +
      "It has survived not only five centuries, but also the leap into electronic typesetting, " +
      "remaining essentially unchanged. It was popularised in the 1960s with the release of " +
      "Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing " +
      "software like Aldus PageMaker including versions of Lorem Ipsum";
  }

  employeeDepartment() {
    // Platzhalter
    return "Fachinformatik";
  }

  employeeEmail() {
    // Platzhalter
    return "blabla@gmail.com"
  }

  employeePhonenumber() {
    // Platzhalter
    return "1234 4 44 44"
  }


  employeePosition() {
    // Platzhalter
    return "Softwareentwickler";
  }


  // Buttons
  addFavorite() {
    // Platzhalter
    console.log('Adding to favorites');
  }

  deleteEmployee() {
    // Platzhalter
    console.log('Deleting employee');
  }

  logout() {
    // Platzhalter
    console.log('Logging out');
  }
}
