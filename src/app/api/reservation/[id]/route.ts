import { container } from "@/config/inversify.config";
import reservationUseCase from "@/modules/reservation/domain/usecase/reservationUseCase";
import { headers } from "@/shared/lib/utils";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  const useCase = container.get<reservationUseCase>(reservationUseCase);
  try {
    const reservations = await useCase.getReservations(id as string);
    return new Response(JSON.stringify(reservations), {
      status: 200,
      headers: headers,
    });
  } catch (error: any) {
    return new Response(JSON.stringify(error.message), {
      status: 200,
      headers: headers,
    });
  }
}
