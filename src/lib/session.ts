import { cookies } from 'next/headers'
import {JWTPayload, SignJWT, jwtVerify} from 'jose'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: JWTPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d') // 7 days expiration
        .sign(encodedKey)
}
export async function decrypt(session: string| undefined = '') {
    try{
        const { payload } = await jwtVerify(session, encodedKey, 
            { algorithms: ['HS256'], })

        return payload
    }
    catch (error) {
        console.log("Failed to decrypt session:", error)
    }   
}

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 hour from now
  const session = await encrypt({userId , expiresAt})
  const cookiesStore = await cookies()
    cookiesStore.set('session', session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: expiresAt,
    })
    
    return session
}

export async function updateSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')?.value
    const payload = await decrypt(session)

    if(!session || !payload) {
        return null
    }
    
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    const cookiesStore = await cookies()
    cookiesStore.set('session', session, {
        httpOnly: true,
        secure:true,
        expires:expires,
        sameSite:'lax',
        path: '/'

    })
}

export async function deleteSession() {
    const cookiesStore = await cookies()
    cookiesStore.delete('session')
}
export async function getSession() {
    const cookiesStore = await cookies()
    return cookiesStore.get('session')
}

export async function userValidation(){
    const session = await getSession()
    return !!session;
}    
