import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    const { type } = params;

    const modelMap: Record<string, any> = {
      admin: prisma.admin,
      teacher: prisma.teacher,
      student: prisma.student,
      parent: prisma.parent,
    };

    if (!modelMap[type]) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const count = await modelMap[type].count();
    
    return NextResponse.json({ count });
  } catch (error) {
    console.error("Error fetching count:", error);
    return NextResponse.json({ count: 0 });
  }
}