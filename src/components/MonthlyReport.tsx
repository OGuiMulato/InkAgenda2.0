import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { toast } from "sonner";
import { Appointment } from "./AppointmentForm";
import { isThisMonth, format } from "date-fns";
import jsPDF from "jspdf";

type MonthlyReportProps = {
  appointments: Appointment[];
};

export const MonthlyReport = ({ appointments }: MonthlyReportProps) => {
  const handleExportPDF = () => {
    try {
      // Criar nova instância do PDF
      const doc = new jsPDF();
      
      // Configurar fonte e tamanho
      doc.setFont("helvetica");
      doc.setFontSize(16);
      
      // Adicionar título
      doc.text("Relatório Mensal", 20, 20);
      
      // Adicionar data do relatório
      doc.setFontSize(12);
      doc.text(`Data do relatório: ${format(new Date(), 'dd/MM/yyyy')}`, 20, 30);
      
      // Filtrar agendamentos do mês
      const monthlyAppointments = appointments.filter(appointment => 
        isThisMonth(appointment.date)
      );
      
      // Calcular totais
      const totalRevenue = monthlyAppointments.reduce((total, appointment) => 
        total + Number(appointment.value), 0
      );
      
      // Adicionar resumo
      doc.text(`Total de Agendamentos: ${monthlyAppointments.length}`, 20, 45);
      doc.text(`Faturamento Total: R$ ${totalRevenue.toFixed(2)}`, 20, 55);
      
      // Adicionar lista de agendamentos
      doc.setFontSize(14);
      doc.text("Detalhamento dos Agendamentos:", 20, 70);
      
      doc.setFontSize(10);
      let yPosition = 85;
      
      monthlyAppointments.forEach((appointment, index) => {
        if (yPosition > 270) { // Verificar se precisa de nova página
          doc.addPage();
          yPosition = 20;
        }
        
        const appointmentDate = format(appointment.date, 'dd/MM/yyyy');
        doc.text(`${index + 1}. Cliente: ${appointment.client}`, 20, yPosition);
        doc.text(`   Data: ${appointmentDate}`, 20, yPosition + 5);
        doc.text(`   Hora: ${appointment.time}`, 20, yPosition + 10);
        doc.text(`   Valor: R$ ${Number(appointment.value).toFixed(2)}`, 20, yPosition + 15); 
        
        yPosition += 20;
      });
      
      // Salvar o PDF
      doc.save(`relatorio-mensal-${format(new Date(), 'MM-yyyy')}.pdf`);
      
      toast.success("Relatório exportado com sucesso!");
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      toast.error("Erro ao exportar o relatório. Tente novamente.");
    }
  };

  // Filtrar apenas os agendamentos do mês atual
  const monthlyAppointments = appointments.filter(appointment => 
    isThisMonth(appointment.date)
  );

  // Calcular o faturamento total somando os valores dos agendamentos
  const totalRevenue = monthlyAppointments.reduce((total, appointment) => 
    total + Number(appointment.value), 0
  );

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