import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

export type Appointment = {
  id: number;
  client: string;
  date: Date;
  time: string;
  value: string; // Changed from service to value
};

type AppointmentFormProps = {
  onAppointmentCreated: (appointment: Appointment) => void;
};

export const AppointmentForm = ({ onAppointmentCreated }: AppointmentFormProps) => {
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    client: "",
    time: "",
    value: "", // Changed from service to value
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date) {
      toast.error("Selecione uma data para o agendamento");
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now(),
      client: formData.client,
      date: date,
      time: formData.time,
      value: formData.value, // Changed from service to value
    };

    onAppointmentCreated(newAppointment);
    toast.success("Agendamento realizado com sucesso!");
    
    setFormData({ client: "", time: "", value: "" });
    setDate(undefined);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full md:w-auto">
          Novo Agendamento
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo Agendamento</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Cliente</Label>
            <Input 
              id="name" 
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label>Data</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={ptBR}
              className="rounded-md border"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Horário</Label>
            <Input 
              id="time" 
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Valor</Label>
            <Input 
              id="value"
              type="number"
              min="0"
              step="0.01"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              required 
            />
          </div>
          <Button type="submit" className="w-full">
            Agendar
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};