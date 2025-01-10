
export class Qualification {
  constructor(public id?: number,
              public name?: string) {
  }
}

export class Employee {
  constructor(public id?: number,
              public avatarUri?: string,
              public lastName?: string,
              public firstName?: string,
              public street?: string,
              public postcode?: string,
              public city?: string,
              public phone?: string,
              public qualifications?: Qualification[]
              ) {
  }
}

