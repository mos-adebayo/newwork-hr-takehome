export type Employee = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  department?: string;
  title?: string;
  salary?: number;
  ssn?: string;
};

export type EmployeeFormValues = Omit<Employee, "id">;
