export class User {
    constructor(
      public accountName: string,
      public accountBalance: string,
      public createAt: Date,
      public accountIcon: string,
      private defaultAccount:Number
    ) {}
  }
  