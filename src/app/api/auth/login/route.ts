import { NextRequest ,NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";



const prisma = new PrismaClient()
export async function POST(req: NextRequest) {

    const body = await req.json()
    const {email, password} = body

    if(!email || !password)
        return NextResponse.json({error: 'Please enter the email and password'}, {status: 400})
    
    const user = await prisma.user.findUnique({
        where:{
            email: body.email
        }
    })

    if(!user)
        return NextResponse.json({error:'Please Enter valid email or password'}, {status: 401})
    
    const passCheck = await bcrypt.compare(body.password, user.password_hash)
    if(!passCheck)
        return NextResponse.json({error: 'Please enter valid email or password'}, {status: 400})
    const token = await createSession(user.id)
    return NextResponse.json({token: token}, {status:200})
    
}
