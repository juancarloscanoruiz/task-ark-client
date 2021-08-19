import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getTasksLastWeek } from '../../services/task';
import { Bar } from 'react-chartjs-2';

const TasksChart = () => {
    const { isLoading, data } = useQuery('tasksLastWeek', getTasksLastWeek);
    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);
   
    useEffect(() => {
        if (data) {
            const days = data.map((task) => task.day)
            setXAxis(days);
            const tasks = data.map((task) => task.value);
            setYAxis(tasks)
        }
    }, [data])
    return (
      <div>
        <Bar 
          options={{ 
            maintainAspectRatio: true,
            scales: {
              y: {
                  suggestedMin: 0,
                  suggestedMax: 20
              }
            }
          }}
          width={600}
          height={400}
          data={{
            labels: [...xAxis],
            datasets: [{
                label: 'Tareas cumplidas',
                data: [...yAxis],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',

                ],
                borderWidth: 1
            }]
          }}
        />
      </div>
    )
}

export default TasksChart
