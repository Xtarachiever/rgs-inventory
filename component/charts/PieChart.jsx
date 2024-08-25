import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
  
  export function PieChart({data}) {
    const pieData = {
      labels: Object.entries(data).map(([key]) => key),
      datasets: [{
        data: Object.entries(data).map(([, value]) => value),
        backgroundColor: ['#0A9F4D', '#36A2EB', '#FFCE56','#FF484E']
      }],
    };

    const options = {
      plugins: {
        legend: {
          position: 'left',
          rtl : true,
          labels: {
            usePointStyle: true,
            // pointStyle: 'circle',
            padding: 20,
          }
        }
      },
  }
    

    return (
      <div className="w-full">
        <Pie data={pieData} options={options}/>
      </div>
    );
  }