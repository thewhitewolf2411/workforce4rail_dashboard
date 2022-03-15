import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import Card from "../../../app/common/Card";
import { useHttpClient } from "../../../app/util/CustomHooks";
import ActivityIndicator from "../../../app/common/ActivityIndicator";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

function Dashboard() {

  const [paid, setPaid] = useState();

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const data = {
    labels: ['Unpaid', 'Paid'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchClients = async () => {
      try{
        const responseData = await sendRequest(`http://localhost:5000/api/invoices/all`);

        for(let i = 0; i<responseData.invoices.length; i++){
          
        }

      } catch(err){}
    }

    fetchClients();
  }, [sendRequest]);

  const data2 = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [1, 2, 3],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [1, 2, 3],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <div className="charts-container">
        <Card className="chart__single">
          {isLoading && <ActivityIndicator asOverlay />}
          <h1>Invoices status</h1>
          <Doughnut data={data} width={100} height={100}/>
        </Card>
        <Card className="chart__single">
          {isLoading && <ActivityIndicator asOverlay />}
          <h1>Issued invoices</h1>
          <Doughnut data={data} />
        </Card>
        <Card className="chart__single">
          {isLoading && <ActivityIndicator asOverlay />}
          <h1>Invoices status</h1>
          <Doughnut data={data} />
        </Card>
        <Card className="chart__single">
          {isLoading && <ActivityIndicator asOverlay />}
          <h1>Invoices status</h1>
          <Doughnut data={data} />
        </Card>
        <Card className="chart__single chart__last">
          {isLoading && <ActivityIndicator asOverlay />}
          <h1>Invoices status</h1>
          <Line options={options} data={data2} />;
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;