// Colors

import { ThemeOptions } from '@mui/material/styles/createTheme';

const neutral = {
  100: '#F3F4F6',
  200: '#E5E7EB',
  300: '#D1D5DB',
  400: '#9da4ae',
  500: '#444552',
  600: '#313241',
  700: '#1C1D2E',
  800: '#171928',
  900: '#121522',
};

const background = {
  default: '#0D101C',
  hover: '#1E253B',
  active: '#181f34',
  paper: '#101826',
  input: '#232b42',
};

const divider = '#2D3748';

const primary = {
  main: '#5048E5',
  light: '#7771E8',
  dark: '#423BBD',
  paper: '#ececf1',
  contrastText: '#F1F1F4',
  contrastTextLight: '#d0d0d6',
};
const option = {
  primaryActive: '#B2AFED',
  primaryHover: '#9590EB',
  hover: '#131136',
};

const secondary = {
  main: '#10B981',
  light: '#3FC79A',
  dark: '#0B815A',
  contrastText: neutral[900],
};

const success = {
  main: '#14B8A6',
  light: '#43C6B7',
  dark: '#0E8074',
  contrastText: neutral[900],
};

const info = {
  main: '#2196F3',
  light: '#64B6F7',
  dark: '#0B79D0',
  contrastText: neutral[900],
};

const warning = {
  main: '#FFB020',
  light: '#FFBF4C',
  dark: '#B27B16',
  contrastText: neutral[900],
};

const error = {
  main: '#D14343',
  light: '#DA6868',
  dark: '#922E2E',
  contrastText: neutral[900],
};

const text = {
  primary: '#EDF2F7',
  secondary: '#A0AEC0',
  tertiary: '#A0AEC0',
  disabled: 'rgba(255, 255, 255, 0.48)',
};

const selector = {
  default: '#E6E5E5',
  gray: '#BEBEBE',
  brown: '#B26045',
  orange: '#F6832B',
  yellow: '#FAB92F',
  green: '#6AE66A',
  blue: '#2CA2EE',
  purple: '#942CE4',
  pink: '#F41B7D',
  red: '#E7391B',
};

const selectorText = {
  default: '#0B0F19',
  gray: '#0B0F19',
  brown: '#0B0F19',
  orange: '#0B0F19',
  yellow: '#0B0F19',
  green: '#0B0F19',
  blue: '#0B0F19',
  purple: '#0B0F19',
  pink: '#0B0F19',
  red: '#0B0F19',
};

export const darkThemeOptions = {
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[500],
          color: '#FFFFFF',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-filledDefault': {
            backgroundColor: neutral[600],
            '& .MuiChip-deleteIcon': {
              color: neutral[500],
            },
          },
          '&.MuiChip-outlinedDefault': {
            borderColor: neutral[500],
            '& .MuiChip-deleteIcon': {
              color: neutral[700],
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&::placeholder': {
            opacity: 1,
            color: text.secondary,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: divider,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: 'solid',
          borderWidth: 1,
          backgroundColor: 'rgba(45, 45, 45, 0.15)',
          backdropFilter: 'blur(15px)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(45, 45, 45, 0.15)',
          backdropFilter: 'blur(15px)',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: 'rgba(45, 45, 45, 0.15)',
          backdropFilter: 'blur(15px)',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: 'solid',
          borderWidth: 1,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: neutral[700],
        },
        track: {
          backgroundColor: neutral[500],
          opacity: 1,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${divider}`,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[600],
          '.MuiTableCell-root': {
            color: neutral[300],
          },
        },
      },
    },
  },
  palette: {
    action: {
      active: neutral[400],
      hover: 'rgba(255, 255, 255, 0.04)',
      selected: 'rgba(255, 255, 255, 0.08)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      disabled: 'rgba(255, 255, 255, 0.26)',
    },
    background,
    divider,
    error,
    info,
    mode: 'dark',
    neutral,
    primary,
    secondary,
    success,
    text,
    warning,
    selector,
    selectorText,
    option,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.24)',
    '0px 1px 2px rgba(0, 0, 0, 0.24)',
    '0px 1px 4px rgba(0, 0, 0, 0.24)',
    '0px 1px 5px rgba(0, 0, 0, 0.24)',
    '0px 1px 6px rgba(0, 0, 0, 0.24)',
    '0px 2px 6px rgba(0, 0, 0, 0.24)',
    '0px 3px 6px rgba(0, 0, 0, 0.24)',
    '0px 4px 6px rgba(0, 0, 0, 0.24)',
    '0px 5px 12px rgba(0, 0, 0, 0.24)',
    '0px 5px 14px rgba(0, 0, 0, 0.24)',
    '0px 5px 15px rgba(0, 0, 0, 0.24)',
    '0px 6px 15px rgba(0, 0, 0, 0.24)',
    '0px 7px 15px rgba(0, 0, 0, 0.24)',
    '0px 8px 15px rgba(0, 0, 0, 0.24)',
    '0px 9px 15px rgba(0, 0, 0, 0.24)',
    '0px 10px 15px rgba(0, 0, 0, 0.24)',
    '0px 12px 22px -8px rgba(0, 0, 0, 0.24)',
    '0px 13px 22px -8px rgba(0, 0, 0, 0.24)',
    '0px 14px 24px -8px rgba(0, 0, 0, 0.24)',
    '0px 20px 25px rgba(0, 0, 0, 0.24)',
    '0px 25px 50px rgba(0, 0, 0, 0.24)',
    '0px 25px 50px rgba(0, 0, 0, 0.24)',
    '0px 25px 50px rgba(0, 0, 0, 0.24)',
    '0px 25px 50px rgba(0, 0, 0, 0.24)',
  ],
};
