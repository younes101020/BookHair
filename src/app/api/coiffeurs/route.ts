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

}

export async function PUT(request: Request) {

}

export async function DELETE(request: Request) {

}

export async function PATCH(request: Request) {

}