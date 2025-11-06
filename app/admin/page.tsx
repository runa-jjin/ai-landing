"use client";

import { useState, useEffect } from "react";
import {
  verifyAdminPassword,
  getAllUsers,
  searchUsers,
  updateUserPlan,
  resetUserUsage,
  deleteUser,
} from "@/app/actions/admin";

type User = {
  id: string;
  email: string;
  name: string | null;
  created_at: string;
  user_usage: Array<{
    usage_count: number;
    plan_type: string;
    last_reset_at: string;
  }> | null;
};

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await verifyAdminPassword(password);
    if (isValid) {
      setIsAuthenticated(true);
      loadUsers();
    } else {
      alert("비밀번호가 올바르지 않습니다.");
    }
  };

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    const result = await getAllUsers();
    if (result.success && result.data) {
      setUsers(result.data as User[]);
    } else {
      setError(result.error || "Failed to load users");
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadUsers();
      return;
    }
    setLoading(true);
    setError(null);
    const result = await searchUsers(searchQuery);
    if (result.success && result.data) {
      setUsers(result.data as User[]);
    } else {
      setError(result.error || "Failed to search users");
    }
    setLoading(false);
  };

  const handleUpgradeToPro = async (userId: string) => {
    if (!confirm("이 사용자를 Pro 플랜으로 업그레이드하시겠습니까?")) return;
    const result = await updateUserPlan(userId, "pro");
    if (result.success) {
      alert("Pro 플랜으로 업그레이드되었습니다!");
      loadUsers();
    } else {
      alert(`에러: ${result.error}`);
    }
  };

  const handleDowngradeToFree = async (userId: string) => {
    if (!confirm("이 사용자를 Free 플랜으로 다운그레이드하시겠습니까?")) return;
    const result = await updateUserPlan(userId, "free");
    if (result.success) {
      alert("Free 플랜으로 변경되었습니다!");
      loadUsers();
    } else {
      alert(`에러: ${result.error}`);
    }
  };

  const handleResetUsage = async (userId: string) => {
    if (!confirm("이 사용자의 사용량을 초기화하시겠습니까?")) return;
    const result = await resetUserUsage(userId);
    if (result.success) {
      alert("사용량이 초기화되었습니다!");
      loadUsers();
    } else {
      alert(`에러: ${result.error}`);
    }
  };

  const handleDeleteUser = async (userId: string, email: string) => {
    if (!confirm(`정말로 "${email}" 사용자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`)) return;
    const result = await deleteUser(userId);
    if (result.success) {
      alert("사용자가 삭제되었습니다!");
      loadUsers();
    } else {
      alert(`에러: ${result.error}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <form onSubmit={handleLogin} className="card w-full max-w-md space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">🔐 관리자 로그인</h1>
            <p className="mt-2 text-sm text-slate-400">
              관리자 비밀번호를 입력하세요
            </p>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm"
            required
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            로그인
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 py-8">
      <div className="card space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">👤 사용자 관리</h1>
          <button
            onClick={loadUsers}
            className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-semibold hover:bg-slate-600"
          >
            새로고침
          </button>
        </div>

        {/* 검색 */}
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            placeholder="이메일 또는 이름 검색..."
            className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm"
          />
          <button
            onClick={handleSearch}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700"
          >
            검색
          </button>
        </div>

        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/50 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8 text-slate-400">로딩 중...</div>
        ) : (
          <div className="text-sm text-slate-400">
            총 {users.length}명의 사용자
          </div>
        )}
      </div>

      {/* 사용자 목록 */}
      <div className="space-y-4">
        {users.map((user) => {
          const usage = user.user_usage?.[0];
          const isPro = usage?.plan_type === "pro";

          return (
            <div key={user.id} className="card space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{user.email}</h3>
                    {isPro && (
                      <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-semibold text-yellow-300">
                        PRO
                      </span>
                    )}
                  </div>
                  {user.name && (
                    <p className="text-sm text-slate-400">{user.name}</p>
                  )}
                  <p className="text-xs text-slate-500">
                    가입일: {new Date(user.created_at).toLocaleDateString('ko-KR')}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm">
                    사용량: <span className="font-semibold">{usage?.usage_count || 0}</span>회
                  </p>
                  <p className="text-xs text-slate-500">
                    플랜: {isPro ? "Pro" : "Free"}
                  </p>
                </div>
              </div>

              {/* 액션 버튼 */}
              <div className="flex flex-wrap gap-2">
                {isPro ? (
                  <button
                    onClick={() => handleDowngradeToFree(user.id)}
                    className="rounded-lg bg-slate-700 px-3 py-1.5 text-xs font-semibold hover:bg-slate-600"
                  >
                    ⬇️ Free로 변경
                  </button>
                ) : (
                  <button
                    onClick={() => handleUpgradeToPro(user.id)}
                    className="rounded-lg bg-yellow-600 px-3 py-1.5 text-xs font-semibold hover:bg-yellow-700"
                  >
                    ⬆️ Pro로 업그레이드
                  </button>
                )}
                <button
                  onClick={() => handleResetUsage(user.id)}
                  className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold hover:bg-blue-700"
                >
                  🔄 사용량 초기화
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id, user.email)}
                  className="rounded-lg bg-red-600/80 px-3 py-1.5 text-xs font-semibold hover:bg-red-600"
                >
                  🗑️ 삭제
                </button>
              </div>
            </div>
          );
        })}

        {!loading && users.length === 0 && (
          <div className="card text-center py-8 text-slate-400">
            사용자가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

