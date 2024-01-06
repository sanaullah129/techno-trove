'use client';

import React from 'react'
import { Chart as ChartJS, BarElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import HeadingDesign from '../components/HeadingDesign';

interface BarGraphProp{
    data: GraphData[];
};

type GraphData = { day: string; date: string; totalAmount: number; };

ChartJS.register(BarElement, LinearScale, CategoryScale, Tooltip, Legend);

const BarGraph: React.FC<BarGraphProp> = ({ data }) => {
    const label = data.map(item => item.day);
    const amount = data.map(item => item.totalAmount);

    const chartData = {
        labels: label,
        datasets:[{
            label: 'Sale Amount',
            data: amount,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const options = {
        scales:{
            y:{
                beginAtZero: true,
            }
        },
    };

  return (
    <div className='mt-8'>
    <hr/>
        <div className='mb-4 mt-5'>
                <HeadingDesign title='Sales Analytics' center />
            </div>
        <Bar options={options} data={chartData} ></Bar>
    </div>
  )
}

export default BarGraph