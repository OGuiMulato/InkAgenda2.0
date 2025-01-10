import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { toast } from "sonner";
import { Appointment } from "./AppointmentForm";
import { format, isThisMonth, compareAsc } from 'date-fns';
import jsPDF from "jspdf";

type MonthlyReportProps = {
  appointments: Appointment[];
};

// Função para comparar datas
const compareDates = (a, b) => compareAsc(new Date(a.date), new Date(b.date));

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
      
      // Filtrar e ordenar agendamentos do mês
      const monthlyAppointments = appointments
        .filter(appointment => isThisMonth(appointment.date))
        .sort(compareDates);
      
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
        
        const appointmentDate = format(new Date(appointment.date), 'dd/MM/yyyy');
        doc.text(`${index + 1}. Cliente: ${appointment.client}`, 20, yPosition);
        doc.text(`   Data: ${appointmentDate}`, 20, yPosition + 5);
        doc.text(`   Hora: ${appointment.time}`, 20, yPosition