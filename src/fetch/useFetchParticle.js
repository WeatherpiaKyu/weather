import { useEffect, useState } from "react";

export default function useFetchParticle(city, isLocated) {
  const [pm10, setPm10] = useState({});
  const [pm25, setPm25] = useState({});
  const [globalIndex, setGlobalIndex] = useState({});
  const [isDusted, setIsDusted] = useState(false);
  const [allItems, setAllItems] = useState([]);

  const serviceKey = process.env.REACT_APP_WEATHER_FLORIAN;

  const cityDustUrl =
    "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty";

  useEffect(() => {
    const abortController = new AbortController();
    const getDustStation = async () => {
      const urlDust = `${cityDustUrl}?serviceKey=${serviceKey}&returnType=json&stationName=${city.station}&dataTerm=DAILY&ver=1.5`;
      try {
        const response = await fetch(urlDust, {
          headers: {
            Accept: "application / json",
          },
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Error fetch dust");
        }
        const jsonResponse = await response.json();
        setPm10({
          value: parseInt(jsonResponse.response.body.items[0].pm10Value),
          grade: parseInt(jsonResponse.response.body.items[0].pm10Grade1h),
          city: jsonResponse.response.body.items[0].sidoName,
          station: jsonResponse.response.body.items[0].stationName,
          time: jsonResponse.response.body.items[0].dataTime,
          flag: jsonResponse.response.body.items[0].pm10Flag,
        });
        setPm25({
          value: parseInt(jsonResponse.response.body.items[0].pm25Value),
          grade: parseInt(jsonResponse.response.body.items[0].pm25Grade1h),
          city: jsonResponse.response.body.items[0].sidoName,
          station: jsonResponse.response.body.items[0].stationName,
          time: jsonResponse.response.body.items[0].dataTime,
          flag: jsonResponse.response.body.items[0].pm25Flag,
        });
        setAllItems(jsonResponse.response.body.items[0]);
      } catch (error) {
        console.log(`Dust fetch error: ${error}`);
      }
    };
    if (isLocated) {
      let fetchAll = async () => {
        try {
          await getDustStation();
          setIsDusted(true);
        } catch (e) {
          console.log(e);
          setIsDusted(false);
        }
      };
      fetchAll();
    }
    return () => {
      abortController.abort();
      setIsDusted(false);
    };
  }, [isLocated]);

  return {
    pm10,
    setPm10,
    pm25,
    setPm25,
    globalIndex,
    setGlobalIndex,
    isDusted,
    setIsDusted,
    allItems,
    setAllItems,
  };
}
