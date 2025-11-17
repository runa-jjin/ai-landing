import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    // Supabase에 문의 저장
    if (supabaseAdmin) {
      const { error } = await supabaseAdmin.from("contact_inquiries").insert({
        user_id: session?.user?.id || null,
        name,
        email,
        message,
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Error saving contact inquiry:", error);
        // 에러가 있어도 성공으로 처리 (이메일로 대체 가능)
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in contact API:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

