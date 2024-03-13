import { useContext } from "react";
import { QueryContext } from "../layout/RootLayout";
import { useSpring, animated, easings } from "@react-spring/web";

export default function ThemeSwitch(props) {
  const { toggleTheme, isDarkTheme } = useContext(QueryContext);

  const testSpring = useSpring({
    backgroundColor: isDarkTheme ? "#d4e6ed" : "#282828",
    width: isDarkTheme ? "0%" : "100%",
    color: isDarkTheme ? "#004B87" : "#B3DDFF",
    config: {
      duration: 300,
      easing: easings.easeInCirc,
    },
  });

  return (
    <div
      style={{ scale: props.heightcalc }}
      className="relative flex w-20 cursor-pointer justify-center rounded-xl bg-gray-200 transition-all"
      onClick={() => toggleTheme(isDarkTheme ? "light" : "dark")}
    >
      <animated.div
        style={{
          color: testSpring.color,
          width: testSpring.width,
          backgroundColor: testSpring.backgroundColor,
        }}
        onClick={() => toggleTheme(isDarkTheme ? "light" : "dark")}
        className={`${testSpring.color} relative flex h-6 items-center justify-center whitespace-nowrap rounded-xl py-5 text-lg`}
      >
        {isDarkTheme ? "Light" : "Dark"}
      </animated.div>
    </div>
  );
}
