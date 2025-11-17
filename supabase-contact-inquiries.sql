-- 문의 폼을 위한 contact_inquiries 테이블 생성
-- Supabase Dashboard > SQL Editor에서 실행하세요

CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT, -- NextAuth의 user.id는 TEXT 타입일 수 있음
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 추가 (조회 성능 향상)
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_user_id ON contact_inquiries(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries(created_at DESC);

-- RLS (Row Level Security) 정책 설정
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 자신의 문의만 조회 가능 (NextAuth 사용 시)
CREATE POLICY "Users can view their own inquiries"
  ON contact_inquiries
  FOR SELECT
  USING (true); -- 임시로 모든 사용자가 조회 가능 (필요시 수정)

-- 모든 사용자가 문의 생성 가능 (인증은 애플리케이션 레벨에서 처리)
CREATE POLICY "Allow insert for all"
  ON contact_inquiries
  FOR INSERT
  WITH CHECK (true);

-- 관리자만 모든 문의 조회 가능 (필요시)
-- CREATE POLICY "Admins can view all inquiries"
--   ON contact_inquiries
--   FOR SELECT
--   USING (auth.jwt() ->> 'role' = 'admin');

