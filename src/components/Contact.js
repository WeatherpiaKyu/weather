import { useState } from "react";
import useFetchKakaoMap from "../fetch/useFetchKakaoMap";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function Contact(props) {
  const [count, setCount] = useState(0);
  const { coord, setCoord } = useFetchKakaoMap(count);

  return (
    <div className="flex justify-center">
      <button onClick={() => setCount((prev) => prev + 1)}>Refresh</button>
      {coord.x && coord.y && (
        <div className="h-fit w-fit rounded-2xl p-10">
          <Map
            center={{
              lat: coord.y,
              lng: coord.x,
            }}
            level={3}
            style={{ width: "400px", height: "400px" }}
          >
            <MapMarker
              position={{
                lat: coord.y,
                lng: coord.x,
              }}
              title="웨더피아"
            >
              웨더피아
            </MapMarker>
          </Map>
        </div>
      )}
    </div>
  );
}
