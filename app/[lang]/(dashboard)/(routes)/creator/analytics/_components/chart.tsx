"use client"

import {
  Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';

import { Card } from "@/components/ui/card";

interface ChartProps {
  data: {
    name: string;
    total: number
  }[];
}

const Chart = ({ data }: ChartProps) => {
  return (
    <Card className="">
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            stroke='#8884d8'
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={12}
            stroke='#8884d8'
            tickFormatter={(value) => `$${value}`}
          />
          <Bar
            dataKey="total"
            fill="#0369a1"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default Chart;