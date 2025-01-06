import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Appointment } from "./AppointmentForm";
import { isToday, isThisWeek, isThisMonth, format } from "date-fns";
import { ptBR } from "date-fns/locale";

type FinancialForecastProps = {
  appointments: Appointment[];
};

export const FinancialForecast = ({ appointments }: FinancialForecastProps) => {
  // Filtrar agendamentos por período
  const todayAppointments = appointments.filter(appointment => isToday(appointment.date));
  const weeklyAppointments = appointments.filter(appointment => isThisWeek(appointment.date));
  const monthlyAppointments = appointments.filter(appointment => isThisMonth(appointment.date));

  // Calcular totais
  const calculateTotal = (apps: Appointment[]) => {
    return apps.reduce((total, app) => total + Number(app.value), 0);
  };

  const dailyTotal = calculateTotal(todayAppointments);
  const weeklyTotal = calculateTotal(weeklyAppointments);
  const monthlyTotal = calculateTotal(monthlyAppointments);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Previsão Financeira</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-secondary">
            <p className="text-sm text-muted-foreground">Previsão Diária</p>
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(dailyTotal)}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-secondary">
            <p className="text-sm text-muted-foreground">Previsão Semanal</p>
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(weeklyTotal)}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-secondary">
            <p className="text-sm text-muted-foreground">Previsão Mensal</p>
            <p className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(monthlyTotal)}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Agendamentos de Hoje</h3>
          <ScrollArea className="h-[200px] w-full">
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
                      <p className="font-medium">{appointment.client}</p>
                    </div>
                    <span className="font-medium">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(appointment.value))}
                    </span>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};