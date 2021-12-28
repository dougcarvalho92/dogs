import React, { useEffect, useState } from "react";
import { StatsProps } from "../../objectType";
import styles from "./UserStatsGraph.module.css";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";
interface UserStatsGraphs {
  data: StatsProps[];
}
interface GraphDataProps {
  x: string;
  y: number;
}
const UserStatsGraph = ({ data }: UserStatsGraphs) => {
  const [graph, setGraph] = useState<GraphDataProps[]>();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const graphData = data.map((item) => {
      return { x: item.title, y: Number(item.acessos) };
    });
    setGraph(graphData);

    const t = data
      .map(({ acessos }) => Number(acessos))
      .reduce((a, b) => a + b);
    setTotal(t);
  }, [data]);
  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={`${styles.graphItem}`}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: "#fff",
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: "#333",
            },
          }}
        />
      </div>
      <div className={`${styles.graphItem}`}>
        <VictoryChart>
          <VictoryBar data={graph} alignment="start" />
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraph;
