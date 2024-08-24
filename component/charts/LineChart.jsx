import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, LinearScale,CategoryScale, PointElement);

// export const data = {
//     labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
//     datasets: [
//       {
//         label: 'Profit/Loss Graph',
//         data: [12, '19', 3, 5, 2, 3],
//         backgrounColor:'#0A9F4D',
//         // color:'#0A9F4D',
//         borderWidth: 2,
//         borderColor:'rgba(255, 99, 132, 1)'
//       },
//     ],
//   };
  
  export function LineChart({sales}) {
    const data = {
        labels: Object?.keys(sales),
        datasets: [
          {
            label: 'Profit/Loss Graph',
            data: Object?.values(sales),
            backgrounColor:'#0A9F4D',
            // color:'#0A9F4D',
            borderWidth: 2,
            borderColor:'rgba(255, 99, 132, 1)'
          },
        ],
      };
    return (
      <div className="w-full">
        <Line data={data} />
      </div>
    );
  }