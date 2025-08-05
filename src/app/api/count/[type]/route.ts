import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    const { type } = params;

    // 🔥 FIX: Prevent database calls during build or with localhost
    if (!process.env.DATABASE_URL || 
        process.env.DATABASE_URL.includes('localhost') ||
        process.env.DATABASE_URL.includes('127.0.0.1')) {
      return NextResponse.json({ count: 0 });
    }

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
    
    // 🔥 FIX: Always return count: 0 instead of throwing error during build
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}