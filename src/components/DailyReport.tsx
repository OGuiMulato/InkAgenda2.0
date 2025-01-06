import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockAppointments = [
  { id: 1, time: "09:00", client: "João Silva", service: "Corte de Cabelo" },
  { id: 2, time: "10:30", client: "Maria Santos", service: "Manicure" },
  { id: 3, time: "14:00", client: "Pedro Oliveira", service: "Barba" },
];

export const DailyReport = () => {
  const today = new Date().toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl capitalize">{today}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full">
          <div className="space-y-4">
            {mockAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary"
              >
                <div className="flex items-center gap-4">
                  <span className="text-primary font-medium">{appointment.time}</span>
                  <div>
                    <p className="font-medium">{appointment.client}</p>
                    <p className="text-sm text-muted-foreground">{appointment.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};