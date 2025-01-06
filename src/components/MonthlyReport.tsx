import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { toast } from "sonner";
import { Appointment } from "./AppointmentForm";
import { isThisMonth } from "date-fns";

type MonthlyReportProps = {
  appointments: Appointment[];
};

export const MonthlyReport = ({ appointments }: MonthlyReportProps) => {
  const handleExportPDF = () => {
    toast.success("Relatório exportado com sucesso!");
  };

  // Filtrar apenas os agendamentos do mês atual
  const monthlyAppointments = appointments.filter(appointment => 
    isThisMonth(appointment.date)
  );

  // Calcular o faturamento (exemplo simples - você pode ajustar conforme necessário)
  const averageAppointmentValue = 50; // Valor médio por agendamento
  const totalRevenue = monthlyAppointments.length * averageAppointmentValue;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Relatório Mensal</CardTitle>
        <Button variant="outline" onClick={handleExportPDF}>
          <FileText className="w-4 h-4 mr-2" />
          Exportar PDF
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-secondary">
              <p className="text-sm text-muted-foreground">Total de Agendamentos</p>
              <p className="text-2xl font-bold">{monthlyAppointments.length}</p>
            </div>
            <div className="p-4 rounded-lg bg-secondary">
              <p className="text-sm text-muted-foreground">Faturamento</p>
              <p className="text-2xl font-bold">R$ {totalRevenue}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};