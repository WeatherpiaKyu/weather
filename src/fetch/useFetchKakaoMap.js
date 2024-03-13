import { useEffect, useState } from "react";

export default function useFetchKakaoMap(count) {
  const [coord, setCoord] = useState(false);

  const serviceKey = process.env.REACT_APP_KAKAO_KEY;

  const urlMap = "https://dapi.kakao.com/v2/local/search/address.json";
  const fullAdress = "서울 영등포구 의사당대로1길 34 9층 901호";

  useEffect(() => {
    const getKakaoMap = async () => {
      const urlForFetch = `${urlMap}?query=${fullAdress}`;
      try {
        const response = await fetch(urlForFetch, {
          headers: {
            Authorization: `KakaoAK ${serviceKey}`,
          },
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Error fetch dust");
        }
        const jsonResponse = await response.json();
        setCoord(jsonResponse.documents[0].address);
      } catch (e) {
        console.log(e);
      }
    };
    getKakaoMap();
  }, [count]);

  return { coord, setCoord };
}
