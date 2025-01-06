import { useState } from "react";
import { DailyReport } from "@/components/DailyReport";
import { AppointmentForm, Appointment } from "@/components/AppointmentForm";
import { MonthlyCalendar } from "@/components/MonthlyCalendar";
import { MonthlyReport } from "@/components/MonthlyReport";
import { FinancialForecast } from "@/components/FinancialForecast";
import { Button } from "@/components/ui/button";
import { Calendar, FileText } from "lucide-react";

const Index = () => {
  const [activeView, setActiveView] = useState<"daily" | "calendar" | "report">("daily");
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleNewAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <Button
            variant={activeView === "daily" ? "default" : "outline"}
            onClick={() => setActiveView("daily")}
          >
            Diário
          </Button>
          <Button
            variant={activeView === "calendar" ? "default" : "outline"}
            onClick={() => setActiveView("calendar")}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Calendário
          </Button>
          <Button
            variant={activeView === "report" ? "default" : "outline"}
            onClick={() => setActiveView("report")}
          >
            <FileText className="w-4 h-4 mr-2" />
            Relatório
          </Button>
        </div>
        <AppointmentForm onAppointmentCreated={handleNewAppointment} />
      </div>

      {activeView === "daily" && (
        <div className="grid gap-6">
          <FinancialForecast appointments={appointments} />
          <DailyReport appointments={appointments} />
        </div>
      )}
      {activeView === "calendar" && <MonthlyCalendar appointments={appointments} />}
      {activeView === "report" && <MonthlyReport appointments={appointments} />}
    </div>
  );
};

export default Index;