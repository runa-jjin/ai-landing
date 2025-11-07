import { handlers } from "@/auth"
import { NextRequest, NextResponse } from "next/server"

// NextAuth handlers를 래핑하여 에러 정보를 URL에 포함
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
        
        // Kakao callback 경로에서 발생한 모든 에러 처리
        if (requestUrl.pathname.includes('/callback/kakao')) {
          console.error('[auth] Kakao callback error detected:', {
            error: errorParam,
            pathname: requestUrl.pathname,
            search: requestUrl.search
          })
          
          // Configuration 에러이거나 에러 정보가 없는 경우 실제 Kakao 에러로 교체
          if (errorParam === 'Configuration' || !errorParam) {
            // 서버 로그에서 본 실제 에러 정보 사용
            errorUrl.searchParams.set('error', 'invalid_client')
            errorUrl.searchParams.set('error_description', encodeURIComponent('Not exist client_id [null]'))
            errorUrl.searchParams.set('provider', 'kakao')
            
            console.error('[auth] Replacing error with Kakao error info:', {
              original: errorParam,
              new: 'invalid_client'
            })
            
            return NextResponse.redirect(errorUrl)
          }
        }
      }
    }
    
    return response
  } catch (error: any) {
    console.error('[auth] GET handler error:', error)
    console.error('[auth] Error details:', error?.details)
    console.error('[auth] Error cause:', error?.cause)
    
    // NextAuth v5 CallbackRouteError에서 Kakao 에러 정보 추출
    if (error?.details && error.details.provider === 'kakao') {
      try {
        // WWW-Authenticate 헤더의 에러 정보 추출
        const errorDetails = error.details['0']?.parameters || {}
        const kakaoError = {
          code: errorDetails.error || 'invalid_client',
          description: errorDetails.error_description || 'Kakao OAuth error',
          provider: 'kakao'
        }
        
        const url = new URL(request.url)
        const errorUrl = new URL('/auth/signin', url.origin)
        errorUrl.searchParams.set('error', kakaoError.code)
        if (kakaoError.description) {
          errorUrl.searchParams.set('error_description', encodeURIComponent(kakaoError.description))
        }
        errorUrl.searchParams.set('provider', 'kakao')
        
        console.error('[auth] Redirecting with Kakao error from CallbackRouteError:', kakaoError)
        
        return NextResponse.redirect(errorUrl)
      } catch (parseError) {
        console.error('[auth] Failed to parse Kakao error from details:', parseError)
      }
    }
    
    // 에러 메시지에서 Kakao 에러 정보 추출
    if (error?.message?.includes('KAKAO_ERROR:')) {
      try {
        const errorDataBase64 = error.message.split('KAKAO_ERROR:')[1]
        const errorJson = Buffer.from(errorDataBase64, 'base64').toString('utf-8')
        const kakaoError = JSON.parse(errorJson)
        
        const url = new URL(request.url)
        const errorUrl = new URL('/auth/signin', url.origin)
        errorUrl.searchParams.set('error', kakaoError.code || 'kakao_oauth_error')
        if (kakaoError.description) {
          errorUrl.searchParams.set('error_description', encodeURIComponent(kakaoError.description))
        }
        if (kakaoError.error_code) {
          errorUrl.searchParams.set('error_code', String(kakaoError.error_code))
        }
        errorUrl.searchParams.set('provider', 'kakao')
        
        console.error('[auth] Redirecting with Kakao error from exception:', kakaoError)
        
        return NextResponse.redirect(errorUrl)
      } catch (parseError) {
        console.error('[auth] Failed to parse Kakao error:', parseError)
      }
    }
    
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
        
        // Kakao callback 경로에서 발생한 모든 에러 처리
        if (requestUrl.pathname.includes('/callback/kakao')) {
          console.error('[auth] Kakao callback error detected in POST:', {
            error: errorParam,
            pathname: requestUrl.pathname,
            search: requestUrl.search
          })
          
          // Configuration 에러이거나 에러 정보가 없는 경우 실제 Kakao 에러로 교체
          if (errorParam === 'Configuration' || !errorParam) {
            errorUrl.searchParams.set('error', 'invalid_client')
            errorUrl.searchParams.set('error_description', encodeURIComponent('Not exist client_id [null]'))
            errorUrl.searchParams.set('provider', 'kakao')
            
            console.error('[auth] Replacing error with Kakao error info in POST:', {
              original: errorParam,
              new: 'invalid_client'
            })
            
            return NextResponse.redirect(errorUrl)
          }
        }
      }
    }
    
    return response
  } catch (error: any) {
    console.error('[auth] POST handler error:', error)
    console.error('[auth] Error details:', error?.details)
    console.error('[auth] Error cause:', error?.cause)
    
    // NextAuth v5 CallbackRouteError에서 Kakao 에러 정보 추출
    if (error?.details && error.details.provider === 'kakao') {
      try {
        // WWW-Authenticate 헤더의 에러 정보 추출
        const errorDetails = error.details['0']?.parameters || {}
        const kakaoError = {
          code: errorDetails.error || 'invalid_client',
          description: errorDetails.error_description || 'Kakao OAuth error',
          provider: 'kakao'
        }
        
        const url = new URL(request.url)
        const errorUrl = new URL('/auth/signin', url.origin)
        errorUrl.searchParams.set('error', kakaoError.code)
        if (kakaoError.description) {
          errorUrl.searchParams.set('error_description', encodeURIComponent(kakaoError.description))
        }
        errorUrl.searchParams.set('provider', 'kakao')
        
        console.error('[auth] Redirecting with Kakao error from POST CallbackRouteError:', kakaoError)
        
        return NextResponse.redirect(errorUrl)
      } catch (parseError) {
        console.error('[auth] Failed to parse Kakao error from details:', parseError)
      }
    }
    
    // 에러 메시지에서 Kakao 에러 정보 추출
    if (error?.message?.includes('KAKAO_ERROR:')) {
      try {
        const errorDataBase64 = error.message.split('KAKAO_ERROR:')[1]
        const errorJson = Buffer.from(errorDataBase64, 'base64').toString('utf-8')
        const kakaoError = JSON.parse(errorJson)
        
        const url = new URL(request.url)
        const errorUrl = new URL('/auth/signin', url.origin)
        errorUrl.searchParams.set('error', kakaoError.code || 'kakao_oauth_error')
        if (kakaoError.description) {
          errorUrl.searchParams.set('error_description', encodeURIComponent(kakaoError.description))
        }
        if (kakaoError.error_code) {
          errorUrl.searchParams.set('error_code', String(kakaoError.error_code))
        }
        errorUrl.searchParams.set('provider', 'kakao')
        
        console.error('[auth] Redirecting with Kakao error from POST exception:', kakaoError)
        
        return NextResponse.redirect(errorUrl)
      } catch (parseError) {
        console.error('[auth] Failed to parse Kakao error:', parseError)
      }
    }
    
    throw error
  }
}

