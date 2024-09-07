import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
  
  export function PieChart({data}) {

    const shuffleArray = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    };
    
    const getRandomFive = (data) => {
      // Randomize and pick the first 5 entries
      const shuffledEntries = shuffleArray(Object.entries(data)).slice(0, 7);
      const labels = shuffledEntries.map(([key]) => key);
      const values = shuffledEntries.map(([, value]) => value);
      return { labels, values };
    };
    
    //'data' is an object with key-value pairs
    const randomData = getRandomFive(data);
    
    const pieData = {
      labels: randomData.labels,
      datasets: [{
        data: randomData.values,
        backgroundColor: ['#0A9F4D', '#36A2EB', '#FFCE56','#CFFF9F','#FF484E', '#02B7AC','#3F51B5']
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