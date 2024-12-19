import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Student, NewStudent } from "@/types/student";

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get("/api/student");
    return response.data;
  }
);

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (student: NewStudent) => {
    const response = await axios.post("/api/student", student);
    return response.data;
  }
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async ({ id, updates }: { id: number | null; updates: Partial<Student> }) => {
    const response = await axios.put(`/api/student/${id}`, updates);
    return response.data;
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id: number | null) => {
    await axios.delete(`/api/student/${id}`);
    return id;
  }
);
