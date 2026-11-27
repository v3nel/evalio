import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { EvolutionPoint } from '@/api/types.ts'
import { VALIDATION_THRESHOLD } from '@/lib/grade.ts'

interface EvolutionChartProps {
  points: EvolutionPoint[]
}

function tickMonth(iso: string) {
  return new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(new Date(iso))
}

export function EvolutionChart({ points }: EvolutionChartProps) {
  const data = points.map((point) => ({
    ...point,
    label: tickMonth(point.date),
  }))

  return (
    <div className="h-[170px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="var(--line)" vertical={false} />
          <XAxis dataKey="label" hide />
          <YAxis
            domain={[10, 16]}
            ticks={[10, 12, 14, 16]}
            tick={{ fill: 'var(--muted)', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value) => {
              const numeric = typeof value === 'number' ? value : Number(value)
              return [
                Number.isFinite(numeric)
                  ? numeric.toLocaleString('fr-FR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : '—',
                'Moyenne',
              ]
            }}
            labelFormatter={(label) => String(label)}
            contentStyle={{
              borderRadius: 8,
              border: '1px solid var(--line)',
              fontSize: 12,
            }}
          />
          <ReferenceLine
            y={VALIDATION_THRESHOLD}
            stroke="var(--muted)"
            strokeDasharray="4 4"
          />
          <Line
            type="monotone"
            dataKey="average"
            stroke="var(--brand)"
            strokeWidth={2}
            dot={{ r: 3, fill: 'var(--surface)', stroke: 'var(--brand)', strokeWidth: 2 }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
