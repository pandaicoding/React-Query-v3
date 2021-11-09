export function DateFormatter(date: string | undefined) {
  return new Date(date!).toLocaleString("id-ID");
}