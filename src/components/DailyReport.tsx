import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Appointment } from "./AppointmentForm";
import { format, isAfter, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";

type DailyReportProps = {
  appointments: Appointment[];
};

export const DailyReport = ({ appointments }: DailyReportProps) => {
  const today = startOfDay(new Date());

  // Filtrar apenas os próximos agendamentos
  const upcomingAppointments = appointments
    .filter(appointment => isAfter(appointment.date, today))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Próximos Agendamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
          <div className="space-y-4">
            {upcomingAppointments.length === 0 ? (
              <p className="text-center text-muted-foreground">Nenhum agendamento futuro</p>
            ) : (
              upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">
                        {format(appointment.date, "dd 'de' MMMM", { locale: ptBR })}
                      </span>
                      <span className="text-primary font-medium">{appointment.time}</span>
                    </div>
                    <div>
                      <p className="font-medium">{appointment.client}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(appointment.value))}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};