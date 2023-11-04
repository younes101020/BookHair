// import { bodyLoginSchema } from '@/shared/lib/zod/user.schema';
// import { NextResponse } from 'next/server';
// import UserService from '@/services/userService';
import { container } from "@/config/inversify.config";
import userUseCase from "@/modules/client/domain/usecase/userUseCase";
import { headers } from '@/shared/lib/utils';

// export async function GET(request: Request) {
//     return new Response("GET COIFFEURS FROM DB", { 
//         status: 200,
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//             'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//         }
//     });
// }

// export async function POST(request: Request) {
//     const {email, mot_de_passe} = bodyLoginSchema.parse(await request.json());
//     try {
//         const userService = new UserService();
//         const user = await userService.Login(email, mot_de_passe);
//         return NextResponse.json(user);
//     } catch (error: any) {
//         return new Response(error.message, {
//             status: 403
//         });
//     }
// }

// export async function PUT(request: Request) {

// }

// export async function DELETE(request: Request) {

// }

// export async function PATCH(request: Request) {

// }
export async function GET(request: Request, { params }: { params: { email: string, mot_de_passe: string } }) {

}

export async function POST(request: Request) {
    const {email, mot_de_passe} = await request.json();
    const useCase = container.get<userUseCase>(userUseCase);
    try {
        const user = await useCase.login(email, mot_de_passe)
        return new Response(JSON.stringify(user), {
            status: 200,
            headers: headers
        });
    } catch (error: any) {
        return new Response(error.message, {
            status: 403,
            headers: headers
        });
    }
}

export async function PUT(request: Request) {

}

export async function DELETE(request: Request) {

}

export async function PATCH(request: Request) {

}