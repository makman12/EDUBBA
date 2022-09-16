import { hpe } from "grommet-theme-hpe";
import { Next, Previous } from "grommet-icons";

const myTheme = { ...hpe };

myTheme.carousel = {
  animation: {
    duration: 300,
  },
  icons: {
    color: "brand",
  },
};

myTheme.menu = {
  background: { color: "brand", opacity: "medium" },
  item: {
    justify: "center",
  },
};

export default myTheme;
