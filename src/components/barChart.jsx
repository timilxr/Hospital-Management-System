import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {
    return (
        <div>
            <Bar
                data={{
                    labels: props.labels,
                    datasets: props.datasets
                }}
                height={400}
                // width={800}
                options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        y:{
                            beginAtZero: true
                        }
                    }
                }} />
        </div>
    )
}

export default BarChart;