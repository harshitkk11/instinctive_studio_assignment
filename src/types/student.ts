export interface Student {
  id: number;
  studentName: string;
  cohort: string;
  courses: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface NewStudent {
  studentName: string;
  cohort: string;
  courses: string[];
}
