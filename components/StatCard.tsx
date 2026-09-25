export default function StatCard({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <div className="card p-5">
      <div className="text-3xl font-semibold" style={accent ? { color: accent } : undefined}>
        {value}
      </div>
      <div className="mt-1 text-sm text-ink/60">{label}</div>
    </div>
  );
}
