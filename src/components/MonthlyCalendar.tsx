import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ptBR } from "date-fns/locale";

export const MonthlyCalendar = () => {
  const [date, setDate] = useState<Date>();

  return (
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
  );
};