import { handlers } from "@/auth"
import { NextRequest, NextResponse } from "next/server"

// NextAuth handlers를 래핑하여 에러 정보를 URL에 포함
// handlers가 제대로 초기화되었는지 확인
if (!handlers) {
  console.error('[auth] ❌ CRITICAL: NextAuth handlers are not initialized!')
  throw new Error('NextAuth handlers are not initialized. Check AUTH_SECRET and providers configuration.')
}

const originalHandlers = handlers

export async function GET(request: NextRequest) {
  try {
    const response = await originalHandlers.GET(request)
    
    // 응답이 리디렉션이고 에러 페이지로 가는 경우 에러 정보 추가
    if (response.status === 307 || response.status === 308) {
      const location = response.headers.get('location')
      if (location?.includes('/auth/signin') && location.includes('error=')) {
        const errorUrl = new URL(location, request.url)
        const errorParam = errorUrl.searchParams.get('error')
        const requestUrl = new URL(request.url)
        
        // Configuration 에러인 경우 처리
        if (errorParam === 'Configuration') {
          console.error('[auth] Configuration error detected:', {
            pathname: requestUrl.pathname,
            search: requestUrl.search,
            fullUrl: requestUrl.href
          })
          
          // 환경 변수 상태 확인 (보안을 위해 값은 표시하지 않음)
          const envStatus = {
            hasAuthSecret: !!process.env.AUTH_SECRET,
            authSecretLength: process.env.AUTH_SECRET?.length || 0,
            hasGoogleId: !!process.env.AUTH_GOOGLE_ID,
            hasGoogleSecret: !!process.env.AUTH_GOOGLE_SECRET,
            hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
            nodeEnv: process.env.NODE_ENV
          }
          
          console.error('[auth] Environment variables status:', envStatus)
          
          // 일반 Configuration 에러인 경우 상세 정보 추가
          let errorDescription = 'NextAuth 설정 오류가 발생했습니다.'
          
          if (!envStatus.hasAuthSecret) {
            errorDescription = 'AUTH_SECRET 환경 변수가 설정되지 않았습니다. Vercel 환경 변수 설정을 확인하세요.'
          } else if (!envStatus.hasGoogleId) {
            errorDescription = 'OAuth Provider가 설정되지 않았습니다. Google OAuth 자격 증명을 설정하세요.'
          } else if (!envStatus.hasGoogleId || !envStatus.hasGoogleSecret) {
            errorDescription = 'OAuth Provider 자격 증명이 불완전합니다. AUTH_GOOGLE_ID와 AUTH_GOOGLE_SECRET을 모두 설정하세요.'
          }
          
          errorUrl.searchParams.set('error_description', encodeURIComponent(errorDescription))
          errorUrl.searchParams.set('error_code', 'CONFIG_ERROR')
          
          // 환경 변수 상태를 Base64로 인코딩하여 전달 (디버깅용)
          const envStatusBase64 = Buffer.from(JSON.stringify(envStatus)).toString('base64')
          errorUrl.searchParams.set('env_status', envStatusBase64)
          
          return NextResponse.redirect(errorUrl)
        }
      }
    }
    
    return response
  } catch (error: any) {
    console.error('[auth] GET handler error:', error)
    console.error('[auth] Error details:', error?.details)
    console.error('[auth] Error cause:', error?.cause)
    
    
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await originalHandlers.POST(request)
    
    // 응답이 리디렉션이고 에러 페이지로 가는 경우 에러 정보 추가
    if (response.status === 307 || response.status === 308) {
      const location = response.headers.get('location')
      if (location?.includes('/auth/signin') && location.includes('error=')) {
        const errorUrl = new URL(location, request.url)
        const errorParam = errorUrl.searchParams.get('error')
        const requestUrl = new URL(request.url)
        
        // Configuration 에러인 경우 처리
        if (errorParam === 'Configuration') {
          console.error('[auth] Configuration error detected in POST:', {
            pathname: requestUrl.pathname,
            search: requestUrl.search,
            fullUrl: requestUrl.href
          })
          
          // 환경 변수 상태 확인
          const envStatus = {
            hasAuthSecret: !!process.env.AUTH_SECRET,
            authSecretLength: process.env.AUTH_SECRET?.length || 0,
            hasGoogleId: !!process.env.AUTH_GOOGLE_ID,
            hasGoogleSecret: !!process.env.AUTH_GOOGLE_SECRET,
            hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
            nodeEnv: process.env.NODE_ENV
          }
          
          console.error('[auth] Environment variables status (POST):', envStatus)
          
          // 일반 Configuration 에러인 경우 상세 정보 추가
          let errorDescription = 'NextAuth 설정 오류가 발생했습니다.'
          
          if (!envStatus.hasAuthSecret) {
            errorDescription = 'AUTH_SECRET 환경 변수가 설정되지 않았습니다. Vercel 환경 변수 설정을 확인하세요.'
          } else if (!envStatus.hasGoogleId) {
            errorDescription = 'OAuth Provider가 설정되지 않았습니다. Google OAuth 자격 증명을 설정하세요.'
          } else if (!envStatus.hasGoogleId || !envStatus.hasGoogleSecret) {
            errorDescription = 'OAuth Provider 자격 증명이 불완전합니다. AUTH_GOOGLE_ID와 AUTH_GOOGLE_SECRET을 모두 설정하세요.'
          }
          
          errorUrl.searchParams.set('error_description', encodeURIComponent(errorDescription))
          errorUrl.searchParams.set('error_code', 'CONFIG_ERROR')
          
          // 환경 변수 상태를 Base64로 인코딩하여 전달 (디버깅용)
          const envStatusBase64 = Buffer.from(JSON.stringify(envStatus)).toString('base64')
          errorUrl.searchParams.set('env_status', envStatusBase64)
          
          return NextResponse.redirect(errorUrl)
        }
      }
    }
    
    return response
  } catch (error: any) {
    console.error('[auth] POST handler error:', error)
    console.error('[auth] Error details:', error?.details)
    console.error('[auth] Error cause:', error?.cause)
    
    
    throw error
  }
}

