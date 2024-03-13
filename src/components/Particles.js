import { useEffect, useState } from "react";
import useFetchParticle from "../fetch/useFetchParticle";
import { positionConversion, findClosest } from "./annexes/conversion";
import dataimport from "../data/dataimport.json";

export default function Particles(props) {
  const [locationCoord, setLocationCoord] = useState({});
  const [isLocated, setIsLocated] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const {
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
  } = useFetchParticle(locationCoord, isLocated);

  const succesLocation = async (position) => {
    let temporary = positionConversion(
      "toXY",
      position.coords.latitude,
      position.coords.longitude,
    );
    let cityName = findClosest(
      temporary.lat,
      temporary.lng,
      dataimport.filter(
        (word) => word.nx === temporary.x && word.ny === temporary.y,
      ),
    );
    setLocationCoord({
      lat: cityName.latitude,
      long: cityName.longitude,
      도시: cityName.Part1,
      구: cityName.Part2,
      동: cityName.Part3,
      station: cityName.stationName,
    });
    setIsLocated(true);
  };

  const errorLocation = () => {
    window.console.log("Unable to retrieve your location");
    setIsLocated(false);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(succesLocation, errorLocation);
    return () => {
      setIsLocated(false);
      setLocationCoord({});
    };
  }, [refresh]);

  useEffect(() => {
    console.log(allItems);
  }, [isDusted]);

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <button
        className="mb-10 h-fit w-fit self-center justify-self-center rounded-2xl bg-wpblue-500 p-2 text-white"
        onClick={() => setRefresh((prev) => prev + 1)}
      >
        Get Position
      </button>
      <div className="flex h-[550px] w-full flex-col flex-wrap gap-2 bg-wpblue-100 p-5 sm:h-fit lg:w-3/6">
        {locationCoord
          ? Object.entries(locationCoord).map(([key, value]) => (
              <p>
                {key}: {value}
              </p>
            ))
          : ""}
        <br />
        {Object.entries(allItems).map(([key, value]) => (
          <p>{`${key}: ${value}`}</p>
        ))}
      </div>
      <div className="flex flex-col gap-1 whitespace-pre-line px-4 py-2 text-xs">
        <span>
          *데이터는 실시간 관측된 자료이며 측정소 현지 사정이나 예기치 않은 문제
          등으로 오류가 있을 수 있습니다
        </span>
        <span>데이터 출처: 대기오염정보 (한국환경공단)</span>
      </div>
    </div>
  );
}
