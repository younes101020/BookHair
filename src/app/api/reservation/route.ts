import { container } from '@/config/inversify.config';
import reservationUseCase from '@/modules/reservation/domain/usecase/reservationUseCase';
import { type NextRequest } from 'next/server'
import { headers } from '@/shared/lib/utils';
 
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    const useCase = container.get<reservationUseCase>(reservationUseCase);
    try {
        const reservations = await useCase.getReservations(id as string)
        return new Response(JSON.stringify(reservations), {
            status: 200,
            headers: headers
        });
    } catch (error: any) {
        return new Response(JSON.stringify(error.message), {
            status: 200,
            headers: headers
        });
    }
}