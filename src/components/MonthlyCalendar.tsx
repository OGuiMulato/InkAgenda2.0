import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ptBR } from "date-fns/locale";
import { isSameDay, isThisMonth } from "date-fns";
import { Appointment } from "./AppointmentForm";

type MonthlyCalendarProps = {
  appointments: Appointment[];
};

export const MonthlyCalendar = ({ appointments }: MonthlyCalendarProps) => {
  const [date, setDate] = useState<Date>();

  // Filtrar agendamentos para o dia selecionado
  const selectedDayAppointments = date
    ? appointments
        .filter((appointment) => isSameDay(appointment.date, date))
        .sort((a, b) => a.time.localeCompare(b.time))
    : [];

  // Filtrar agendamentos do mês atual
  const currentMonthAppointments = appointments.filter(appointment => 
    isThisMonth(appointment.date)
  );

  // Calcular valor total dos serviços do mês
  const totalMonthValue = currentMonthAppointments.reduce((total, appointment) => 
    total + Number(appointment.value), 0
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Resumo do Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-secondary">
                <p className="text-sm text-muted-foreground">Total de Agendamentos</p>
                <p className="text-2xl font-bold">{currentMonthAppointments.length}</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary">
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold">
                  {new Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  }).format(totalMonthValue)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Calendário Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={ptBR}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>
            {date
              ? date.toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Selecione uma data'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full">
            <div className="space-y-4">
              {selectedDayAppointments.length === 0 ? (
                <p className="text-center text-muted-foreground">
                  {date ? 'Nenhum agendamento para este dia' : 'Selecione uma data para ver os agendamentos'}
                </p>
              ) : (
                selectedDayAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-primary font-medium">{appointment.time}</span>
                      <div>
                        <p className="font-medium">{appointment.client}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Intl.NumberFormat('pt-BR', { 
                            style: 'currency', 
                            currency: 'BRL' 
                          }).format(Number(appointment.value))}
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
    </div>
  );
};