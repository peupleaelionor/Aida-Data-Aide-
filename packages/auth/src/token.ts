import jwt from 'jsonwebtoken'

export interface JwtPayload {
  sub: string
  email: string
  role: string
  iat?: number
  exp?: number
}

export function createToken(payload: Omit<JwtPayload, 'iat' | 'exp'>, secret: string, expiresIn = '7d'): string {
  return jwt.sign(payload, secret, { expiresIn })
}

export function verifyToken(token: string, secret: string): JwtPayload {
  return jwt.verify(token, secret) as JwtPayload
}
