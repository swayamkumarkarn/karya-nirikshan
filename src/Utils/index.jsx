import { createTheme } from "@mui/material"

export const bgColor = {
    primary: "#1B1A55",
}

export const muiTheme = createTheme({
    palette: {
        primary: {
            main: bgColor.primary
        }
    }
})