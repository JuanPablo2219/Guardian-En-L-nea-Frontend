import { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useQuery } from "react-query";
import { getAllAlerts } from "../../../shared/services/alertService";
import { alertNames } from "../../../consts/alertTypes";
import './Stats.styles.css';

export default function Stats() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const { data: alerts } = useQuery(["alert-stats"], () =>
    getAllAlerts().then((res) => res.data)
  );
//   console.log(alerts);
  const [alertsStats, setAlertStats] = useState<number[]>([]);

  useEffect(() => {
    if (alerts) {
      const alertTypeCount: { [key in keyof typeof alertNames]: number } = {
        incendio: 0,
        acoso: 0,
        emergenciaMedica: 0,
        problemasEstructurales: 0,
        robo: 0,
        alertaGeneral: 0,
      };

      for (let alert of alerts) {
        switch (alert.type) {
          case alertNames.incendio:
            alertTypeCount.incendio++;
            break;
          case alertNames.acoso:
            alertTypeCount.acoso++;
            break;
          case alertNames.emergenciaMedica:
            alertTypeCount.emergenciaMedica++;
            break;
          case alertNames.problemasEstructurales:
            alertTypeCount.problemasEstructurales++;
            break;
          case alertNames.robo:
            alertTypeCount.robo++;
            break;
          case alertNames.alertaGeneral:
            alertTypeCount.alertaGeneral++;
            break;
        }
      }
      setAlertStats([
        alertTypeCount.acoso,
        alertTypeCount.emergenciaMedica,
        alertTypeCount.incendio,
        alertTypeCount.problemasEstructurales,
        alertTypeCount.robo,
        alertTypeCount.alertaGeneral
      ]);
    }
  }, [alerts]);

  useEffect(() => {
    const data = {
      labels: [
        alertNames.acoso,
        alertNames.emergenciaMedica,
        alertNames.incendio,
        alertNames.problemasEstructurales,
        alertNames.robo,
        alertNames.alertaGeneral
      ],
      datasets: [
        {
          label: "Tipos de Alertas",
          data: alertsStats,
          backgroundColor: [
            "rgba(255, 99, 71, 0.8)",
            "rgba(0, 191, 255, 0.8)",
            "rgba(255, 0, 0, 0.8)",
            "rgba(128, 128, 128, 0.8)",
            "rgba(0, 0, 255, 0.8)",
            "rgba0, 128, 0, 0.8)",
          ],
          borderColor: [
            "rgb(255, 99, 71, 0)",
            "rgb(0, 191, 255, 0.8)",
            "rgb(255, 0, 0, 0.8)",
            "rgb(128, 128, 128, 0.8)",
            "rgb(0, 0, 255, 0.8)",
            "rgb(0, 128, 0, 0.8)",
          ],
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

    setChartData(data);
    setChartOptions(options);
  }, [alertsStats]);

  return (
    <div className="card">
        <h1> Estadísticas de Alertas</h1>
      <Chart className="Chart" type="bar" data={chartData} options={chartOptions} />
    </div>
  );
}
