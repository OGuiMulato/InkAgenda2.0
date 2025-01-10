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
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-2">
              <Button
                variant={activeView === "daily" ? "default" : "ghost"}
                onClick={() => setActiveView("daily")}
                className="h-9"
              >
                Diário
              </Button>
              <Button
                variant={activeView === "calendar" ? "default" : "ghost"}
                onClick={() => setActiveView("calendar")}
                className="h-9"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Calendário
              </Button>
              <Button
                variant={activeView === "report" ? "default" : "ghost"}
                onClick={() => setActiveView("report")}
                className="h-9"
              >
                <FileText className="w-4 h-4 mr-2" />
                Relatório
              </Button>
            </div>
            <AppointmentForm onAppointmentCreated={handleNewAppointment} />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          {activeView === "daily" && (
            <div className="grid gap-6">
              <FinancialForecast appointments={appointments} />
              <DailyReport appointments={appointments} />
            </div>
          )}
          {activeView === "calendar" && (
            <div className="calendar-container p-6">
              <MonthlyCalendar appointments={appointments} />
            </div>
          )}
          {activeView === "report" && <MonthlyReport appointments={appointments} />}
        </div>
      </main>
    </div>
  );
};

export default Index;