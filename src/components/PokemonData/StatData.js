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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StatData({ pokemon }) {
    const labels = pokemon.stats.map((stats) => capitalizeLetter(stats.stat.name));
    const dataValues = pokemon.stats.map((stat) => stat.base_stat);
  
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Base Stats",
          data: dataValues,
          backgroundColor: "rgba(54, 162, 235, 1)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const style = {
        
    }
  
    return (
      <div>
        <Bar options={options} data={data} style={style} />
      </div>
    );
  }
  