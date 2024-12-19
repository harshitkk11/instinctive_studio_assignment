import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
    });

    if (!student)
      return NextResponse.json({ error: "Student not found" }, { status: 404 });

    return NextResponse.json(student);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const updates = await req.json();

  try {
    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(id) },
      data: updates,
    });

    return NextResponse.json(updatedStudent);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update student" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.student.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete student" },
      { status: 500 }
    );
  }
}
