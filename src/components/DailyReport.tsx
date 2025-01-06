import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Appointment } from "./AppointmentForm";
import { format, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";

type DailyReportProps = {
  appointments: Appointment[];
};

export const DailyReport = ({ appointments }: DailyReportProps) => {
  const today = new Date().toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Filtrar apenas os agendamentos de hoje
  const todayAppointments = appointments.filter(appointment => 
    isToday(appointment.date)
  ).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl capitalize">{today}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
          <div className="space-y-4">
            {todayAppointments.length === 0 ? (
              <p className="text-center text-muted-foreground">Nenhum agendamento para hoje</p>
            ) : (
              todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-primary font-medium">{appointment.time}</span>
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