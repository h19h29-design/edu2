import clsx from "clsx";

type ProgressBarProps = {
  value: number;
  label?: string;
  className?: string;
};

export default function ProgressBar({ value, label, className }: ProgressBarProps) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      {label ? <span className="text-sm font-semibold text-slate-600">{label}</span> : null}
      <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 transition-all duration-500"
          style={{ width: `${safe}%` }}
        />
      </div>
      <span className="min-w-12 rounded-full bg-violet-100 px-3 py-1 text-center text-sm font-black text-violet-700">
        {Math.round(safe)}%
      </span>
    </div>
  );
}
