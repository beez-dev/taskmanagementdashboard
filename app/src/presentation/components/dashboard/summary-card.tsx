import { AppCard, AppCardContent } from "@/src/presentation/components/ui/app-card";

interface SummaryCardProps {
  label: string;
  count: number;
}

export function SummaryCard({ label, count }: SummaryCardProps) {
  return (
    <AppCard>
      <AppCardContent className="p-3 sm:p-6">
        <p className="text-center text-xs font-medium text-muted-foreground sm:text-left sm:text-sm">{label}</p>
        <p className="mt-1 text-center text-xl font-bold sm:mt-2 sm:text-left sm:text-4xl">{count}</p>
      </AppCardContent>
    </AppCard>
  );
}
