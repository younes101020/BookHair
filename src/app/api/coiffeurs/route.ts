import isSamePass from '@/lib/bcrypt/compare';
import { prisma } from '@/db';
import { bodyLoginSchema } from '@/lib/user.schema';

export async function GET(request: Request) {
    return new Response("GET COIFFEURS FROM DB", { 
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': process.env.ALLOWED_CORS as string,
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
}

export async function POST(request: Request) {
    const {email, mot_de_passe} = bodyLoginSchema.parse(await request.json());

    const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
    })

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

    return new Response(JSON.stringify(user), { status: 200, statusText: "User gets successfully" });
}

export async function PUT(request: Request) {

}

export async function DELETE(request: Request) {

}

export async function PATCH(request: Request) {

}