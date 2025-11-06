-- Supabase search_path 보안 경고 해결 SQL
-- Supabase Dashboard > SQL Editor에서 실행하세요

-- 1단계: 기존 트리거 삭제 (함수 삭제 전에 먼저!)
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_accounts_updated_at ON accounts;
DROP TRIGGER IF EXISTS update_user_usage_updated_at ON user_usage;

-- 2단계: 기존 함수 삭제 (이제 의존성이 없으므로 안전하게 삭제)
DROP FUNCTION IF EXISTS update_updated_at_column();

-- 3단계: search_path를 명시한 안전한 버전으로 함수 재생성
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- 4단계: 트리거 재생성
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accounts_updated_at 
  BEFORE UPDATE ON accounts
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_usage_updated_at 
  BEFORE UPDATE ON user_usage
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- 완료!
SELECT '✅ search_path 보안 설정 완료!' as status;

