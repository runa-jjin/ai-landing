-- Supabase RLS 경고 해결 SQL
-- Supabase Dashboard > SQL Editor에서 실행하세요

-- verification_tokens 테이블에 RLS 활성화
ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;

-- verification_tokens는 NextAuth가 관리하므로 인증 시스템에서만 접근 가능하도록 설정
-- 일반 사용자는 직접 접근할 필요 없음
CREATE POLICY "Service role only for verification_tokens" ON verification_tokens
  FOR ALL USING (false);

-- 혹시 다른 테이블에서도 경고가 뜨면 아래 주석을 해제하세요:

-- users 테이블 RLS (이미 되어있어야 함)
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
-- CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- accounts 테이블 RLS (이미 되어있어야 함)
-- ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users can view own accounts" ON accounts FOR SELECT USING (auth.uid() = user_id);

-- sessions 테이블 RLS (이미 되어있어야 함)
-- ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users can view own sessions" ON sessions FOR SELECT USING (auth.uid() = user_id);

-- user_usage 테이블 RLS (이미 되어있어야 함)
-- ALTER TABLE user_usage ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users can view own usage" ON user_usage FOR ALL USING (auth.uid() = user_id);

-- generated_copies 테이블 RLS (이미 되어있어야 함)
-- ALTER TABLE generated_copies ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Users can view own copies" ON generated_copies FOR ALL USING (auth.uid() = user_id);

-- 완료!
SELECT 'RLS 설정이 완료되었습니다!' as status;

