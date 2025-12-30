'use client'

import dynamic from 'next/dynamic'
import { ApexOptions } from 'apexcharts'

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

interface TopPagesChartProps {
  data: { path: string; count: number }[]
}

export function TopPagesChart({ data }: TopPagesChartProps) {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      background: 'transparent',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
        barHeight: '60%',
        distributed: true,
      },
    },
    colors: ['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#ffedd5', '#fff7ed', '#fef3e2', '#fef9f3'],
    dataLabels: {
      enabled: true,
      formatter: (val: number) => val.toString(),
      style: {
        fontSize: '12px',
        colors: ['#fff'],
      },
    },
    xaxis: {
      categories: data.map(d => d.path.length > 20 ? d.path.substring(0, 20) + '...' : d.path),
      labels: {
        style: { colors: '#94a3b8', fontSize: '12px' },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#cbd5e1', fontSize: '12px' },
      },
    },
    grid: {
      borderColor: '#334155',
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (val: number) => `${val} views` },
    },
    legend: { show: false },
  }

  const series = [{ data: data.map(d => d.count) }]

  return (
    <Chart
      options={chartOptions}
      series={series}
      type="bar"
      height={300}
    />
  )
}

interface StatsRadialChartProps {
  value: number
  label: string
  color: string
  max?: number
}

export function StatsRadialChart({ value, label, color, max = 100 }: StatsRadialChartProps) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0

  const chartOptions: ApexOptions = {
    chart: {
      type: 'radialBar',
      sparkline: { enabled: true },
    },
    colors: [color],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '65%',
        },
        track: {
          background: '#1e293b',
          strokeWidth: '100%',
        },
        dataLabels: {
          name: {
            show: true,
            offsetY: -8,
            fontSize: '12px',
            color: '#94a3b8',
          },
          value: {
            show: true,
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#fff',
            offsetY: 4,
            formatter: () => value.toLocaleString(),
          },
        },
      },
    },
    labels: [label],
  }

  return (
    <Chart
      options={chartOptions}
      series={[percentage]}
      type="radialBar"
      height={200}
    />
  )
}

interface TrafficAreaChartProps {
  data: { date: string; value: number }[]
}

export function TrafficAreaChart({ data }: TrafficAreaChartProps) {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      background: 'transparent',
      sparkline: { enabled: false },
    },
    colors: ['#f97316'],
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: data.map(d => d.date),
      labels: {
        style: { colors: '#94a3b8', fontSize: '11px' },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#94a3b8', fontSize: '11px' },
        formatter: (val: number) => Math.round(val).toString(),
      },
    },
    grid: {
      borderColor: '#334155',
      strokeDashArray: 4,
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (val: number) => `${val} views` },
    },
  }

  const series = [{ name: 'Views', data: data.map(d => d.value) }]

  return (
    <Chart
      options={chartOptions}
      series={series}
      type="area"
      height={280}
    />
  )
}

interface DonutChartProps {
  labels: string[]
  values: number[]
  colors?: string[]
}

export function DonutChart({ labels, values, colors }: DonutChartProps) {
  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
    },
    colors: colors || ['#f97316', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'],
    labels,
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              fontSize: '14px',
              color: '#94a3b8',
              formatter: () => values.reduce((a, b) => a + b, 0).toLocaleString(),
            },
            value: {
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#fff',
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    legend: {
      position: 'bottom',
      labels: { colors: '#cbd5e1' },
    },
    tooltip: {
      theme: 'dark',
    },
  }

  return (
    <Chart
      options={chartOptions}
      series={values}
      type="donut"
      height={280}
    />
  )
}
