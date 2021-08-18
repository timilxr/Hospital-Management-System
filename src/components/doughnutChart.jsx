import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = (props) => {
    return(
        <div>
            <Doughnut 
            data={{
                labels: props.labels,
                datasets: props.datasets
            }}
            // height={400}
            // width={400}
            options={{
                responsive: true,
                // maintainAspectRation: false,
                // scales: {
                //     y:{
                //         beginAtZero: true
                //     }
                // },
                plugins: {
                    legend: {
                        labels: {
                            font:{
                                weight: ''
                            }
                        }
                    }
                }
            }}
            />
        </div>
    )
}

export default DoughnutChart;