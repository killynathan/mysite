import Typography from "typography"
import fairyGateTheme from "typography-theme-fairy-gates"

const typography = new Typography({
  baseFontSize: "16px",
  headerFontFamily: [
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
  bodyFontFamily: [
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
})

export const { scale, rythm, options } = typography
export default typography
