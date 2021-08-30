import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
      background: {
        default: "#fff",
      },
      primary: {
        main: "#3b1d8f",
      },
      outline: {
        grey: "#ddd"
      },
    },
  });

  export {theme}