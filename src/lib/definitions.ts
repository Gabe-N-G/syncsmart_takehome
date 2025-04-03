//creating a alias for customer data for ts integration:

export interface User  {
    id: string;
    properties: {
      firstname: string;
      lastname: string;
       email: string;
    }
  }