export function getStatusColor(status: string): string {
  if (status === "Dead") return "bg-rose-600";
  if (status === "Alive") return "bg-green-600";
  return "bg-yellow-400";
}
