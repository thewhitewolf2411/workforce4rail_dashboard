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

  const [paid, setPaid] = useState(0);
  const [paidThisMonth, setPaidThisMonth] = useState(0);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [totalInvoicesThisMonth, setTotalInvoicesThisMonth] = useState(0);
  const [invoicesNumberByMonth, setInvoiceNumbersByMonth] = useState({'Januar':0, 'Februar':0, 'März':0, 'April':0, 'Mai':0, 'Juni':0, 'Juli':0, 'August':0, 'September':0, 'Oktober':0, 'November':0, 'Dezember':0});
  const [invoicesTotalByMonth, setInvoicesTotalByMonth] = useState({'Januar':0, 'Februar':0, 'März':0, 'April':0, 'Mai':0, 'Juni':0, 'Juli':0, 'August':0, 'September':0, 'Oktober':0, 'November':0, 'Dezember':0});

  const labels = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

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

  const invoiceStatusData = {
    labels: ['Unpaid', 'Paid'],
    datasets: [
      {
        label: '# of Votes',
        data: [totalInvoices - paid, paid],
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

  const invoiceStatusMonthData = {
    labels: ['Unpaid', 'Paid'],
    datasets: [
      {
        label: '# of Votes',
        data: [totalInvoicesThisMonth - paidThisMonth, paidThisMonth],
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
  }

  const topCustomersDataByNumberOfInvoices = {
    labels: ['Unpaid', 'Paid'],
    datasets: [
      {
        label: '# of Votes',
        data: [totalInvoices - paid, paid],
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
  }

  const topCustomersDataByEarning = {
    labels: ['Unpaid', 'Paid'],
    datasets: [
      {
        label: '# of Votes',
        data: [totalInvoices - paid, paid],
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
  }

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchClients = async () => {
      try{
        const responseData = await sendRequest(`http://localhost:5000/api/invoices/all`);

        let paidCounter = 0;
        let paidThisMonthCounter = 0;
        let totalThisMonth = 0;

        let invoicesNumberByMonthCounter = invoicesNumberByMonth;
        let invoicesTotalByMonthCounter = invoicesTotalByMonth;

        for(let i = 0; i<responseData.invoices.length; i++){
          let paidDate = new Date(responseData.invoices[i].createdAt);
          let thisMonth = new Date();

          if(paidDate.getFullYear() === thisMonth.getFullYear()){
            switch(paidDate.getMonth()){
              case 0:
                invoicesNumberByMonthCounter.Januar++;
                invoicesTotalByMonthCounter.Januar += responseData.invoices[i].invoiceTotal;
                break;
              case 1:
                invoicesNumberByMonthCounter.Februar++;
                invoicesTotalByMonthCounter.Januar += responseData.invoices[i].invoiceTotal;
                break;
              case 2:
                invoicesNumberByMonthCounter.März++;
                invoicesTotalByMonthCounter.Januar += responseData.invoices[i].invoiceTotal;
                break;
              case 3:
                invoicesNumberByMonthCounter.April++;
                invoicesTotalByMonthCounter.Januar += responseData.invoices[i].invoiceTotal;
                break;
              case 4:
                invoicesNumberByMonthCounter.Mai++;
                invoicesTotalByMonthCounter.Januar += responseData.invoices[i].invoiceTotal;
                break;
              case 5:
                invoicesNumberByMonthCounter.Juni++;
                invoicesTotalByMonthCounter.Januar += responseData.invoices[i].invoiceTotal;
                break;
              case 6:
                invoicesNumberByMonthCounter.Juli++;
                invoicesTotalByMonthCounter.Januar += responseData.invoices[i].invoiceTotal;
                break;
              case 7:
                invoicesNumberByMonthCounter.August++;
                invoicesTotalByMonthCounter.Januar += responseData.invoices[i].invoiceTotal;
                break;
              case 8:
                invoicesNumberByMonthCounter.September++;
                invoicesTotalByMonthCounter.Januar += responseData.invoices[i].invoiceTotal;
                break;
              case 9:
                invoicesNumberByMonthCounter.Oktober++;
                invoicesTotalByMonthCounter.Januar += responseData.invoices[i].invoiceTotal;
                break;
              case 10:
                invoicesNumberByMonthCounter.November++;
                invoicesTotalByMonthCounter.Januar += responseData.invoices[i].invoiceTotal;
                break;
              case 11:
                invoicesNumberByMonthCounter.Dezember++;
                invoicesTotalByMonthCounter.Januar += responseData.invoices[i].invoiceTotal;
                break;
            }
          }

          if(paidDate.getMonth() === thisMonth.getMonth() && paidDate.getFullYear() === thisMonth.getFullYear()){
            totalThisMonth++;
            if(responseData.invoices[i].paid){
              paidThisMonthCounter++;
            }
          }
          if(responseData.invoices[i].paid){
            paidCounter++;
          }
        }

        setPaid(paidCounter);
        setPaidThisMonth(paidThisMonthCounter);
        setTotalInvoices(responseData.invoices.length);
        setTotalInvoicesThisMonth(totalThisMonth);

        setInvoiceNumbersByMonth(invoicesNumberByMonthCounter);
        setInvoicesTotalByMonth(invoicesTotalByMonthCounter);

      } catch(err){}
    }

    fetchClients();
  }, [sendRequest]);

  const invoiceNumberByMonthData = {
    labels,
    datasets: [
      {
        label: 'Invoices by month',
        data: Object.values(invoicesNumberByMonth),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const invoiceTotalByMonthData = {
    labels,
    datasets: [
      {
        label: 'Invoices by month',
        data: Object.values(invoicesTotalByMonth),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return (
    <div className="dashboard-container">
      <div className="charts-container">
        <Card className="chart__single">
          {isLoading && <ActivityIndicator asOverlay />}
          <h1>Invoices status</h1>
          <Doughnut data={invoiceStatusData} width={100} height={100}/>
        </Card>
        <Card className="chart__single">
          {isLoading && <ActivityIndicator asOverlay />}
          <h1>Invoices status (this month)</h1>
          <Doughnut data={invoiceStatusMonthData} />
        </Card>
        <Card className="chart__single chart__last">
          {isLoading && <ActivityIndicator asOverlay />}
          <h1>Number of invoices by month</h1>
          <Line options={options} data={invoiceNumberByMonthData} />
        </Card>
        <Card className="chart__single chart__last">
          {isLoading && <ActivityIndicator asOverlay />}
          <h1>Pricing of invoices by month</h1>
          <Line options={options} data={invoiceTotalByMonthData} />
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;