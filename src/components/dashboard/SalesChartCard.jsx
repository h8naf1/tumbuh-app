import { useMemo, useState } from "react";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";

function SalesChartCard({
  title,
  description,
  presets,
  activePreset,
  onPresetChange,
  dateRange,
  onDateRangeChange,
  data,
}) {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const chartWidth = 720;
  const chartHeight = 220;
  const paddingX = 28;
  const paddingTop = 20;
  const paddingBottom = 28;
  const maxValue = Math.max(...data.map((item) => item.amount), 1);
  const innerWidth = chartWidth - paddingX * 2;
  const innerHeight = chartHeight - paddingTop - paddingBottom;
  const stepX = data.length > 1 ? innerWidth / (data.length - 1) : innerWidth;

  const points = data.map((item, index) => {
    const x = paddingX + stepX * index;
    const y = paddingTop + innerHeight - (item.amount / maxValue) * innerHeight;

    return { ...item, x, y };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight - paddingBottom} L ${points[0].x} ${chartHeight - paddingBottom} Z`;
  const highlightedPoint = points[Math.floor(points.length / 2)];
  const labelStep = data.length > 12 ? Math.ceil(data.length / 6) : 1;

  const tooltipPosition = useMemo(() => {
    if (!hoveredPoint) {
      return null;
    }

    const leftPercent = (hoveredPoint.x / chartWidth) * 100;
    const topPercent = (hoveredPoint.y / chartHeight) * 100;

    return {
      left: `clamp(72px, ${leftPercent}%, calc(100% - 72px))`,
      top: `max(12px, calc(${topPercent}% - 48px))`,
    };
  }, [hoveredPoint]);

  return (
    <section className="rounded-xl border border-[var(--app-border)] bg-[var(--app-surface-strong)] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-colors duration-300 sm:p-5 xl:p-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h2 className="text-lg font-bold text-[var(--app-text)] sm:text-xl">{title}</h2>
          <p className="mt-1 text-sm text-[var(--app-text-soft)]">{description}</p>
        </div>

        <div className="flex w-full flex-col gap-3 xl:w-auto xl:items-end">
          <div className="flex w-full flex-col items-center gap-3 xl:w-auto xl:items-end">
            <DatePickerWithRange
              value={dateRange}
              onChange={onDateRangeChange}
              className="w-full sm:w-60"
            />

            <div className="flex flex-wrap items-center justify-center gap-2 xl:justify-end">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onPresetChange(preset.id)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    activePreset === preset.id
                      ? "bg-blue-500/12 text-blue-500"
                      : "text-[var(--app-text-muted)] hover:text-[var(--app-text)]"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-7">
        <div
          className="relative h-52 overflow-hidden rounded-lg sm:h-56 xl:h-60"
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <div className="absolute inset-0 flex flex-col justify-between py-2">
            {[1, 2, 3, 4].map((line) => (
              <div key={line} className="border-t border-[var(--app-border)]" />
            ))}
          </div>

          {hoveredPoint && tooltipPosition ? (
            <div
              className="pointer-events-none absolute z-10 -translate-x-1/2 rounded-lg border border-[var(--app-border)] bg-[var(--app-surface-strong)] px-3 py-2 text-xs shadow-[0_16px_32px_-20px_rgba(2,6,23,0.35)]"
              style={tooltipPosition}
            >
              <p className="font-semibold text-[var(--app-text)]">
                {hoveredPoint.fullLabel}
              </p>
              <p className="mt-1 text-[var(--app-text-soft)]">
                Indeks penjualan: {hoveredPoint.amount}
              </p>
            </div>
          ) : null}

          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="relative h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="sales-area-gradient"
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >
                <stop offset="0%" stopColor="rgb(59 130 246 / 0.24)" />
                <stop offset="100%" stopColor="rgb(59 130 246 / 0)" />
              </linearGradient>
            </defs>

            <path d={areaPath} fill="url(#sales-area-gradient)" />
            <path
              d={linePath}
              fill="none"
              stroke="rgb(59 130 246)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {points.map((point) => (
              <g
                key={point.fullLabel}
                onMouseEnter={() => setHoveredPoint(point)}
                onFocus={() => setHoveredPoint(point)}
              >
                <circle cx={point.x} cy={point.y} r="10" fill="transparent" />
                <circle cx={point.x} cy={point.y} r="4" fill="rgb(59 130 246)">
                  <title>{`${point.fullLabel} - Indeks penjualan ${point.amount}`}</title>
                </circle>
              </g>
            ))}

            <circle
              cx={highlightedPoint.x}
              cy={highlightedPoint.y}
              r="8"
              fill="rgb(59 130 246 / 0.18)"
            />
            <circle
              cx={highlightedPoint.x}
              cy={highlightedPoint.y}
              r="5"
              fill="rgb(59 130 246)"
            >
              <title>{`${highlightedPoint.fullLabel} - Indeks penjualan ${highlightedPoint.amount}`}</title>
            </circle>
          </svg>
        </div>

        <div
          className="mt-4 grid gap-1 px-1 text-[11px] sm:gap-2 sm:px-2"
          style={{
            gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))`,
          }}
        >
          {data.map((item, index) => {
            const isLabelVisible =
              data.length <= 12 ||
              index === 0 ||
              index === data.length - 1 ||
              index % labelStep === 0;

            return (
              <div
                key={item.fullLabel}
                className="text-center text-[10px] font-medium uppercase tracking-wide text-[var(--app-text-muted)]"
                title={item.fullLabel}
              >
                {isLabelVisible ? item.day : ""}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SalesChartCard;
