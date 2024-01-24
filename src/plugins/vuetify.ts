/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { ThemeDefinition, createVuetify } from "vuetify";
import colors from "vuetify/util/colors";

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: colors.teal.base,
    "on-primary": colors.shades.white,
    secondary: colors.orange.base,
    "on-secondary": colors.shades.white,
    success: colors.green.base,
    "on-success": colors.shades.white,
    info: colors.cyan.base,
    "on-info": colors.shades.white,
    warning: colors.amber.base,
    "on-warning": colors.shades.white,
    error: colors.red.base,
    "on-error": colors.shades.white,
    background: colors.shades.white,

    "nature-mood": colors.green.base,
    "relax-mood": colors.cyan.base,
    "history-mood": colors.amber.base,
    "culture-mood": colors.orange.base,
    "party-mood": colors.purple.base,
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "lightTheme",
    themes: {
      lightTheme,
    },
  },
});
