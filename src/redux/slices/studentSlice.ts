import { createSlice } from "@reduxjs/toolkit";
import { Student } from "@/types/student";
import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../thunks/studentThunks";

interface StudentState {
  list: Student[];
  status: "idle" | "loading" | "failed";
  error: string | null;
}

const initialState: StudentState = {
  list: [],
  status: "idle",
  error: null,
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload;
      })
      .addCase(fetchStudents.rejected, (state) => {
        state.status = "failed";
        state.error = "Failed to fetch students";
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (student) => student.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (student) => student.id !== action.payload
        );
      });
  },
});

export default studentSlice.reducer;
