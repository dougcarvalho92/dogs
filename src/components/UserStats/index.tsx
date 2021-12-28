import React, { useEffect, useState } from "react";
import Error from "../../helpers/Error/Error";
import Loading from "../../helpers/Loading";
import { StatsProps } from "../../objectType";
import { StatsServices } from "../../services/StatsServices";
import Head from "../Head";
import UserStatsGraph from "../UserStatsGraph";
const UserStatsGraphs = React.lazy(() => import("../UserStatsGraph"));
// import { Container } from './styles';

const UserStats = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<StatsProps[]>();
  useEffect(() => {
    function getData() {
      StatsServices.getStats().then((result) => {
        setData(result.data);
      });
    }
    getData();
  }, []);
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (data) {
    return (
      <React.Suspense fallback={<div></div>}>
        <Head
          title="Estatisticas"
          description="Página de estatisticas de foto"
        />

        <UserStatsGraph data={data} />
      </React.Suspense>
    );
  } else return null;
};

export default UserStats;
