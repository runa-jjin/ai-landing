-- NextAuth 사용 시 RLS 정책 수정
-- Supabase Dashboard > SQL Editor에서 실행하세요

-- user_usage 테이블의 기존 정책 삭제
DROP POLICY IF EXISTS "Users can view own usage" ON user_usage;

-- Service Role (서버)에서 모든 작업 허용하는 정책으로 교체
-- NextAuth를 사용하므로 Supabase Auth의 auth.uid()를 사용하지 않음
CREATE POLICY "Service role access for user_usage" 
  ON user_usage 
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- 혹은 더 간단하게: RLS를 완전히 비활성화 (개발 단계에서만 권장)
-- ALTER TABLE user_usage DISABLE ROW LEVEL SECURITY;

-- 완료!
SELECT '✅ RLS 정책이 NextAuth에 맞게 수정되었습니다!' as status;

