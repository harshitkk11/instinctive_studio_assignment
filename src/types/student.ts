export interface Student {
  id: number;
  studentName: string;
  cohort: string;
  courses: string[];
  dateOfJoin: string;
  lastLogin?: string;
  status: boolean;
}
