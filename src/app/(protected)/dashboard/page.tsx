import dayjs from "dayjs";
import { headers } from "next/headers";
import { Suspense } from "react";

import { PageContainer } from "@/components/ui/page-container";
import { Skeleton } from "@/components/ui/skeleton";
import { getDashboard } from "@/data/get-dashboard";
import { auth } from "@/lib/auth";

import AppointmentsChart from "./_components/appointments-chart";
import StatsCards from "./_components/stats-cards";
import TodayAppointments from "./_components/today-appointments";
import TopDoctors from "./_components/top-doctors";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const data = await getDashboard({
    from: dayjs().format("YYYY-MM-DD"),
    to: dayjs().add(1, "month").format("YYYY-MM-DD"),
    session: {
      user: {
        clinic: {
          id: session?.user?.clinic?.id || "",
        },
      },
    },
  });

  const formattedTodayAppointments = data.todayAppointments.map((appointment) => ({
    id: appointment.id,
    patientName: appointment.patient.name,
    doctorName: appointment.doctor.name,
    time: new Date(appointment.date).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    status: "scheduled" as const,
  }));

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Visão geral da sua clínica
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <Suspense
            fallback={
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-[120px]" />
                ))}
              </div>
            }
          >
            <StatsCards
              totalRevenue={Number(data.totalRevenue.total) || 0}
              totalAppointments={data.totalAppointments.total}
              totalPatients={data.totalPatients.total}
              totalDoctors={data.totalDoctors.total}
            />
          </Suspense>

          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <Suspense fallback={<Skeleton className="h-[400px]" />}>
              <AppointmentsChart dailyAppointmentsData={data.dailyAppointmentsData} />
            </Suspense>

            <div className="space-y-6">
              <Suspense fallback={<Skeleton className="h-[300px]" />}>
                <TodayAppointments appointments={formattedTodayAppointments} />
              </Suspense>

              <Suspense fallback={<Skeleton className="h-[300px]" />}>
                <TopDoctors doctors={data.topDoctors} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
