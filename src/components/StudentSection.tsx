"use client";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

import {
  fetchStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../redux/thunks/studentThunks";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { Student, NewStudent } from "@/types/student";

import { format } from "date-fns";

const StudentSection: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);

  const [newStudent, setNewStudent] = useState<NewStudent>({
    studentName: "",
    cohort: "",
    courses: [],
  });

  const dispatch = useAppDispatch();
  const { list }: { list: Student[] } = useAppSelector(
    (state) => state.students
  );

  const cohort = ["2024-2025", "2023-2024"];
  const grade = ["9", "10", "11", "12"];
  const courses = ["CBSE 9 Science", "CBSE 9 Math"];

  const [selectedCohort, setSelectedCohort] = useState<string>(cohort[0]);
  const [selectedGrade, setSelectedGrade] = useState<string>(grade[0]);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      newStudent.studentName === "" ||
      newStudent.cohort === "" ||
      newStudent.courses.length === 0
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    dispatch(addStudent(newStudent))
      .then((response) => {
        if (response) {
          toast.success("Student added successfully!");
          setNewStudent({
            studentName: "",
            cohort: "",
            courses: [],
          });
          setOpen(false);
        }
      })
      .catch((error) => {
        console.error("Error adding student:", error);
        toast.error("Failed to add student. Please try again.");
      });
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      newStudent.studentName === "" ||
      newStudent.cohort === "" ||
      newStudent.courses.length === 0
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    await dispatch(updateStudent({ id: selectedStudent, updates: newStudent }))
      .then((response) => {
        if (response) {
          toast.success("Student updated successfully!");
          setNewStudent({
            studentName: "",
            cohort: "",
            courses: [],
          });
          setOpenUpdate(false);
        }
      })
      .catch((error) => {
        console.error("Error updating student:", error);
        toast.error("Failed to update student. Please try again.");
      });
  };

  const handleDeleteStudent = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(deleteStudent(selectedStudent))
      .then((response) => {
        if (response) {
          toast.success("Student deleted successfully!");
          setNewStudent({
            studentName: "",
            cohort: "",
            courses: [],
          });
          setOpenUpdate(false);
        }
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
        toast.error("Failed to delete student. Please try again.");
      });
  };

  const handleOnClick = (data: Student) => {
    setNewStudent({
      studentName: data.studentName,
      cohort: data.cohort,
      courses: data.courses,
    });

    setSelectedStudent(data.id);
    setOpenUpdate(true);
  };

  return (
    <div className="w-full min-h-[88vh] p-[15.5px] flex flex-col gap-[40px] bg-white rounded-[12px]">
      <div className="w-full flex flex-col gap-5 md:flex-row md:justify-between md:items-center">
        <div className="flex gap-[10px]">
          <Select onValueChange={(e) => setSelectedCohort(e)}>
            <SelectTrigger className="py-[7px] px-[15px] gap-[10px] text-[16px] font-bold text-[#3F526E] rounded-[6px] bg-[#E9EDF1] border-0 focus:ring-0">
              <SelectValue placeholder={`AY ${selectedCohort}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {cohort.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    AY {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(e) => setSelectedGrade(e)}>
            <SelectTrigger className="py-[7px] px-[15px] gap-[10px] text-[16px] font-bold text-[#3F526E] rounded-[6px] bg-[#E9EDF1] border-0 focus:ring-0">
              <SelectValue placeholder={`CBSE ${selectedGrade}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {grade.map((item, index) => (
                  <SelectItem key={index} value={item}>
                    CBSE {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="py-[7px] px-[15px] gap-[10px] text-[16px] font-bold text-[#3F526E] rounded-[6px] bg-[#E9EDF1] hover:bg-[#E9EDF1] border-0 focus:ring-0"
            >
              <Plus className="w-5 h-5" /> Add new Student
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-[18px] font-bold">
                Add new student
              </DialogTitle>
              <DialogDescription>
                Please fill in the required fields to add a new student.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddStudent} className="grid gap-4 py-4">
              <div className="space-y-1">
                <Label htmlFor="studentName" className="text-[12px] font-bold">
                  Student Name
                </Label>
                <Input
                  id="studentName"
                  value={newStudent.studentName}
                  onChange={(e) =>
                    setNewStudent({
                      ...newStudent,
                      studentName: e.target.value,
                    })
                  }
                  required
                  className="col-span-3"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="cohort" className="text-[12px] font-bold">
                  Cohort
                </Label>

                <Select
                  onValueChange={(e) =>
                    setNewStudent({ ...newStudent, cohort: e })
                  }
                  required
                >
                  <SelectTrigger className="py-[7px] px-[15px] gap-[10px] text-[16px] font-bold text-[#3F526E] rounded-[6px] bg-[#E9EDF1] border-0 focus:ring-0">
                    <SelectValue placeholder={`AY ${cohort[0]}`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {cohort.map((item, index) => (
                        <SelectItem key={index} value={item}>
                          AY {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="courses" className="text-[12px] font-bold">
                  Courses
                </Label>

                <div className="border rounded-[6px] py-[7px] px-[15px] space-y-2">
                  {courses.map((item, index) => (
                    <div
                      key={index}
                      className="w-full flex justify-start items-center gap-[8px]"
                    >
                      <Checkbox
                        checked={newStudent.courses.includes(item)}
                        onCheckedChange={(checked) => {
                          setNewStudent((prev) => {
                            const updatedCourses = checked
                              ? [...prev.courses, item] // Add the course if checked
                              : prev.courses.filter(
                                  (course) => course !== item
                                ); // Remove the course if unchecked
                            return { ...prev, courses: updatedCourses };
                          });
                        }}
                      />
                      <Label className="text-[16px]">{item}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end mt-5">
                <Button
                  type="submit"
                  className="py-[7px] px-[15px] rounded-[6px] border-0 focus:ring-0"
                >
                  Add Student
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table className="!min-w-full !table-auto">
        <TableHeader>
          <TableRow>
            <TableHead className="text-[12px] font-bold text-black">
              Student Name
            </TableHead>
            <TableHead className="text-[12px] font-bold text-black">
              Cohort
            </TableHead>
            <TableHead className="text-[12px] font-bold text-black">
              Courses
            </TableHead>
            <TableHead className="text-[12px] font-bold text-black">
              Date Joined
            </TableHead>
            <TableHead className="text-[12px] font-bold text-black">
              Last Login
            </TableHead>
            <TableHead className="text-[12px] font-bold text-black">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((item, index) => (
            <TableRow
              key={index}
              onClick={() => handleOnClick(item)}
              className="cursor-pointer"
            >
              <TableCell className="text-[12px] text-black">
                {item?.studentName}
              </TableCell>
              <TableCell className="text-[12px] text-black">
                AY {item?.cohort}
              </TableCell>
              <TableCell className="text-black flex flex-wrap gap-[10px]">
                {item?.courses?.map((course, index) => (
                  <span
                    key={index}
                    className="py-[2px] px-[4px] flex flex-nowrap text-nowrap gap-[4px] text-[12px] font-medium bg-[#F6F8FA] rounded-[6px]"
                  >
                    {course === "CBSE 9 Math" ? (
                      <Avatar className="w-[20px] h-[20px] rounded-[4px]">
                        <AvatarImage src="/image2.png" />
                        <AvatarFallback>IS</AvatarFallback>
                      </Avatar>
                    ) : (
                      <Avatar className="w-[20px] h-[20px] rounded-[4px]">
                        <AvatarImage src="/image.png" />
                        <AvatarFallback>IS</AvatarFallback>
                      </Avatar>
                    )}
                    {course}
                  </span>
                ))}
              </TableCell>
              <TableCell className="text-[12px] text-black">
                {format(new Date(item?.createdAt), "dd, MMM, yyyy")}
              </TableCell>
              <TableCell className="text-[12px] text-black">
                {format(new Date(item?.updatedAt), "dd, MMM, yyyy hh:mm a")}
              </TableCell>
              <TableCell className="text-[12px] text-black flex justify-center">
                <div className="w-[14px] h-[14px] rounded-full bg-[#4AEA40]" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Student</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-1">
              <Label htmlFor="studentName" className="text-[12px] font-bold">
                Student Name
              </Label>
              <Input
                id="studentName"
                value={newStudent.studentName}
                onChange={(e) =>
                  setNewStudent({
                    ...newStudent,
                    studentName: e.target.value,
                  })
                }
                required
                className="col-span-3"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="cohort" className="text-[12px] font-bold">
                Cohort
              </Label>

              <Select
                onValueChange={(e) =>
                  setNewStudent({ ...newStudent, cohort: e })
                }
                required
              >
                <SelectTrigger className="py-[7px] px-[15px] gap-[10px] text-[16px] font-bold text-[#3F526E] rounded-[6px] bg-[#E9EDF1] border-0 focus:ring-0">
                  <SelectValue placeholder={`AY ${cohort[0]}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {cohort.map((item, index) => (
                      <SelectItem key={index} value={item}>
                        AY {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="courses" className="text-[12px] font-bold">
                Courses
              </Label>

              <div className="border rounded-[6px] py-[7px] px-[15px] space-y-2">
                {courses.map((item, index) => (
                  <div
                    key={index}
                    className="w-full flex justify-start items-center gap-[8px]"
                  >
                    <Checkbox
                      checked={newStudent.courses.includes(item)}
                      onCheckedChange={(checked) => {
                        setNewStudent((prev) => {
                          const updatedCourses = checked
                            ? [...prev.courses, item] // Add the course if checked
                            : prev.courses.filter((course) => course !== item); // Remove the course if unchecked
                          return { ...prev, courses: updatedCourses };
                        });
                      }}
                    />
                    <Label className="text-[16px]">{item}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            {/* <div className="flex justify-end mt-5"> */}
            <Button
              variant="outline"
              onClick={handleDeleteStudent}
              className="py-[7px] px-[15px] rounded-[6px] border-[#EA4E40] text-[#EA4E40] focus:ring-0"
            >
              Delete Student
            </Button>
            <Button
              onClick={handleUpdateStudent}
              className="py-[7px] px-[15px] rounded-[6px] border-0 focus:ring-0"
            >
              Update Student
            </Button>
            {/* </div> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentSection;
