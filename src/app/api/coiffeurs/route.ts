import isSamePass from '@/lib/bcrypt/compare';
import { bodyLoginSchema } from '@/lib/zod/user.schema';
import { NextResponse } from 'next/server';
import { getUser } from '@/lib/prisma/user';

export async function GET(request: Request) {
    return new Response("GET COIFFEURS FROM DB", { 
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
}

export async function POST(request: Request) {
    const {email, mot_de_passe} = bodyLoginSchema.parse(await request.json());

    const user = await getUser(email);

    if (!user) {
        return new Response("No user found with this email", {
            status: 401
        })
    }

    const checkPass = await isSamePass(mot_de_passe, user?.password as string);

    if (!checkPass) {
        return new Response("Password don't match", {
            status: 401
        })
    }

    return NextResponse.json({user});
}

export async function PUT(request: Request) {

}

export async function DELETE(request: Request) {

}

export async function PATCH(request: Request) {

}