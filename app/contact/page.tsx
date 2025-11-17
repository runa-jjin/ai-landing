"use client";

import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ContactPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          router.push("/generate");
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative z-10 container mx-auto max-w-2xl px-6 py-24">
      <div className="card space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">유료 전환 문의</h1>
          <p className="text-slate-400">
            유료 플랜으로 전환을 원하시면 아래 폼을 작성해주세요.
            <br />
            빠른 시일 내에 연락드리겠습니다.
          </p>
        </div>

        {submitStatus === "success" && (
          <div className="rounded-lg border border-green-500/60 bg-green-500/10 px-4 py-3 text-sm text-green-200">
            문의가 성공적으로 전송되었습니다. 곧 연락드리겠습니다.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="rounded-lg border border-rose-500/60 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-200 mb-2">
              이름
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-base text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-2">
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-base text-white"
              required
            />
            <p className="mt-1 text-xs text-slate-400">
              연락받을 이메일 주소를 입력해주세요. (예: tears0427@gmail.com)
            </p>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-200 mb-2">
              문의 내용
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={6}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-base text-white"
              placeholder="유료 플랜 전환에 대한 문의 내용을 작성해주세요."
              required
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/40 transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-700"
            >
              {isSubmitting ? "전송 중..." : "문의 남기기"}
            </button>
            <Link
              href="/generate"
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-800"
            >
              취소
            </Link>
          </div>
        </form>

        <div className="rounded-lg bg-slate-800/50 p-4 text-sm text-slate-300">
          <p className="font-semibold mb-2">📧 직접 연락하기</p>
          <p>
            이메일: <a href="mailto:tears0427@gmail.com" className="text-primary hover:underline">tears0427@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}

