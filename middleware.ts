import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  console.log('API request received:', req.method);

  const response = NextResponse.next();

  const ALLOWED_ORIGINS = ['http://localhost:3000']; // Replace with your allowed origins
  const origin = req.headers.get('Origin');

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Content-Type', 'Application/json');
  }

  
  return response;
}

export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
    // Add the following matcher to apply this middleware to all API routes:
    matcher: '/api/:path*'
  },
};