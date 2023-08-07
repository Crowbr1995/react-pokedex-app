import React from 'react';
import { capitalizeLetter } from '../../utils';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels'; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels 
);

export default function StatData({ pokemon }) {
  const labels = pokemon.stats.map((stats) => capitalizeLetter(stats.stat.name));
  const dataValues = pokemon.stats.map((stat) => stat.base_stat);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: "#fcba03",
        borderColor: "#fcba03",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      y: {
        beginAtZero: true,
        color: 'white', 
        ticks: {
          color: 'white', 
          font: {
            size: 11, 
          },
        },
      },
      x: {
        suggestedMax: 150,
        color: 'white', 
        ticks: {
          color: 'white', 
          font: {
            size: 16, 
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: { 
        color: 'white',
        font: {
          size: 16,
        },
        anchor: 'end',
        align: 'start',
        formatter: (value) => value, 
        offset: -35,
      },
      border: {
        borderColor: 'white',
        borderWidth: 2
      }
    },
    maintainAspectRatio: false,
    color: 'white', 
    barThickness: 30,
  };

  return (
    <div className='StatData'>
      <h2 className='title'>Stats</h2>
      <div className='stat-graph type-border'>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}
