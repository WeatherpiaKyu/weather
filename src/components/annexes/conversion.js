const RE = 6371.00877; // Earth radius (km)
const GRID = 5.0; // Grid interval (km)
const SLAT1 = 30.0; // Projection latitude 1 (degree)
const SLAT2 = 60.0; // Projection latitude 2 (degree)
const OLON = 126.0; // Reference longitude (degree)
const OLAT = 38.0; // Reference latitude (degree)
const XO = 43; // Reference X coordinate (GRID)
const YO = 136; // Reference Y coordinate (GRID)
const DEGRAD = Math.PI / 180.0;
const RADDEG = 180.0 / Math.PI;

export const positionConversion = (code, v1, v2) => {
  // LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )
  // 소스출처 : http://www.kma.go.kr/weather/forecast/digital_forecast.jsp  내부에 있음
  // https://gist.github.com/fronteer-kr/14d7f779d52a21ac2f16

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn =
    Math.tan(Math.PI * 0.25 + slat2 * 0.5) /
    Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  const rs = {};
  if (code === "toXY") {
    rs.lat = v1;
    rs.lng = v2;
    let ra = Math.tan(Math.PI * 0.25 + v1 * DEGRAD * 0.5);
    ra = (re * sf) / Math.pow(ra, sn);
    let theta = v2 * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;
    rs.x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    rs.y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
  } else {
    rs.x = v1;
    rs.y = v2;
    const xn = v1 - XO;
    const yn = ro - v2 + YO;
    let ra = Math.sqrt(xn * xn + yn * yn);
    if (sn < 0.0) {
      ra = -ra;
    }
    let alat = Math.pow((re * sf) / ra, 1.0 / sn);
    alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

    let theta;
    if (Math.abs(xn) <= 0.0) {
      theta = 0.0;
    } else {
      if (Math.abs(yn) <= 0.0) {
        theta = Math.PI * 0.5;
        if (xn < 0.0) {
          theta = -theta;
        }
      } else {
        theta = Math.atan2(xn, yn);
      }
    }
    const alon = theta / sn + olon;
    rs.lat = alat * RADDEG;
    rs.lng = alon * RADDEG;
  }
  return rs;
};

export const findClosest = (xValue, yValue, data) => {
  function calcDistance(x1, y1, x2, y2) {
    const X = x2 - x1;
    const Y = y2 - y1;
    return Math.sqrt(X * X + Y * Y);
  }
  let closestObject = null;
  let minDistance = 0.1;
  data.forEach((entry) => {
    const distance = calcDistance(
      xValue,
      yValue,
      entry["latitude"],
      entry["longitude"],
    );
    if (minDistance === null || distance < minDistance) {
      minDistance = distance;
      closestObject = entry;
    }
  });
  return closestObject;
};
