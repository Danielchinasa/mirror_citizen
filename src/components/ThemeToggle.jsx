import React from "react";
import { Switch, Button } from "antd";
import { MoonFilled, SunFilled } from "@ant-design/icons";
import { useTheme } from "./ThemeProvider";

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Switch
      checked={isDark}
      onChange={toggleTheme}
      checkedChildren={
        <>
          Light <SunFilled />
        </>
      }
      unCheckedChildren={
        <>
          Dark <MoonFilled />
        </>
      }
    />
  );
};
