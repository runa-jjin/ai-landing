-- 구글 로그인 시 user_usage에 기록이 남도록 수정
-- Supabase Dashboard > SQL Editor에서 실행하세요

-- 1. users 테이블의 id를 TEXT로 변경 (NextAuth의 user.id는 문자열)
-- 기존 테이블 삭제 후 재생성 (데이터가 없는 경우에만 사용)
DROP TABLE IF EXISTS generated_copies CASCADE;
DROP TABLE IF EXISTS user_usage CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS accounts CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- users 테이블 재생성 (id를 TEXT로)
CREATE TABLE users (
  id TEXT PRIMARY KEY,  -- NextAuth user.id는 문자열
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  email_verified TIMESTAMP WITH TIME ZONE,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- accounts 테이블
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(provider, provider_account_id)
);

-- sessions 테이블
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token TEXT UNIQUE NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- user_usage 테이블 (id를 TEXT로)
CREATE TABLE user_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  usage_count INTEGER DEFAULT 0,
  plan_type TEXT DEFAULT 'free',
  last_reset_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- generated_copies 테이블
CREATE TABLE generated_copies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  service_name TEXT,
  industry TEXT,
  content JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_session_token ON sessions(session_token);
CREATE INDEX idx_user_usage_user_id ON user_usage(user_id);
CREATE INDEX idx_generated_copies_user_id ON generated_copies(user_id);

-- 2. RLS 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_copies ENABLE ROW LEVEL SECURITY;

-- 3. RLS 정책: Service Role에서 모든 작업 허용
-- NextAuth는 서버에서 Service Role Key를 사용하므로 이 정책이 필요합니다
CREATE POLICY "Service role full access on users"
  ON users FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access on accounts"
  ON accounts FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access on sessions"
  ON sessions FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access on user_usage"
  ON user_usage FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role full access on generated_copies"
  ON generated_copies FOR ALL
  USING (true)
  WITH CHECK (true);

-- 4. 트리거: updated_at 자동 업데이트
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON accounts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_usage_updated_at BEFORE UPDATE ON user_usage
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 완료!
SELECT '✅ 테이블이 NextAuth에 맞게 재생성되고 RLS 정책이 설정되었습니다!' as status;

