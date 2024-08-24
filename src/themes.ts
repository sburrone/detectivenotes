import { ColorMode } from './types.ts'

export const themes = {
    [ColorMode.LIGHT]: {
        breakpoints: {
            keys: ['xs', 'sm', 'md', 'lg', 'xl'],
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
            unit: 'px',
        },
        direction: 'ltr',
        shape: {
            borderRadius: 4,
        },
        tones: {
            primary: {
                '0': '#000000',
                '4': '#00120a',
                '6': '#00170f',
                '10': '#002116',
                '12': '#002519',
                '17': '#003122',
                '20': '#003828',
                '22': '#003d2c',
                '24': '#00422f',
                '30': '#00513b',
                '40': '#006c4f',
                '50': '#008865',
                '60': '#24a37c',
                '70': '#49bf96',
                '80': '#68dbb0',
                '87': '#7cefc3',
                '90': '#85f8cb',
                '92': '#8bfed1',
                '94': '#abffdb',
                '95': '#bcffe1',
                '96': '#cbffe6',
                '98': '#e7fff2',
                '99': '#f4fff7',
                '100': '#ffffff',
            },
            secondary: {
                '0': '#000000',
                '4': '#00120a',
                '6': '#02170f',
                '10': '#092017',
                '12': '#0d241b',
                '17': '#182e25',
                '20': '#1f352b',
                '22': '#233930',
                '24': '#273e34',
                '30': '#354b41',
                '40': '#4c6358',
                '50': '#647c71',
                '60': '#7e968a',
                '70': '#98b1a4',
                '80': '#b3ccbf',
                '87': '#c6e0d2',
                '90': '#cfe9da',
                '92': '#d4eee0',
                '94': '#daf4e6',
                '95': '#ddf7e9',
                '96': '#dffaeb',
                '98': '#e7fff2',
                '99': '#f4fff7',
                '100': '#ffffff',
            },
            tertiary: {
                '0': '#000000',
                '4': '#001018',
                '6': '#00161f',
                '10': '#001f2a',
                '12': '#002330',
                '17': '#002e3e',
                '20': '#093544',
                '22': '#103949',
                '24': '#163d4e',
                '30': '#254b5c',
                '40': '#3e6374',
                '50': '#577c8e',
                '60': '#7196a9',
                '70': '#8bb1c4',
                '80': '#a6cce0',
                '87': '#b9e0f4',
                '90': '#c2e8fd',
                '92': '#ccedff',
                '94': '#daf1ff',
                '95': '#e0f4ff',
                '96': '#e7f6ff',
                '98': '#f4faff',
                '99': '#fafcff',
                '100': '#ffffff',
            },
            neutral: {
                '0': '#000000',
                '4': '#0c0f0d',
                '6': '#111412',
                '10': '#191c1a',
                '12': '#1d201e',
                '17': '#272b29',
                '20': '#2e312f',
                '22': '#323633',
                '24': '#373a38',
                '30': '#444845',
                '40': '#5c5f5c',
                '50': '#757875',
                '60': '#8e918e',
                '70': '#a9aca9',
                '80': '#c5c7c4',
                '87': '#d8dbd7',
                '90': '#e1e3df',
                '92': '#e7e9e5',
                '94': '#eceeeb',
                '95': '#eff1ee',
                '96': '#f2f4f0',
                '98': '#f8faf6',
                '99': '#fbfdf9',
                '100': '#ffffff',
            },
            neutralVariant: {
                '0': '#000000',
                '4': '#08100c',
                '6': '#0d1511',
                '10': '#151d19',
                '12': '#19211d',
                '17': '#232c28',
                '20': '#29322e',
                '22': '#2e3732',
                '24': '#323b36',
                '30': '#404944',
                '40': '#57615b',
                '50': '#707974',
                '60': '#89938d',
                '70': '#a4ada7',
                '80': '#bfc9c2',
                '87': '#d3dcd6',
                '90': '#dbe5de',
                '92': '#e1ebe4',
                '94': '#e7f0e9',
                '95': '#e9f3ec',
                '96': '#ecf6ef',
                '98': '#f2fcf5',
                '99': '#f5fff7',
                '100': '#ffffff',
            },
            error: {
                '0': '#000000',
                '4': '#280001',
                '6': '#310001',
                '10': '#410002',
                '12': '#490002',
                '17': '#5c0004',
                '20': '#690005',
                '22': '#710005',
                '24': '#790006',
                '30': '#93000a',
                '40': '#ba1a1a',
                '50': '#de3730',
                '60': '#ff5449',
                '70': '#ff897d',
                '80': '#ffb4ab',
                '87': '#ffcfc9',
                '90': '#ffdad6',
                '92': '#ffe2de',
                '94': '#ffe9e6',
                '95': '#ffedea',
                '96': '#fff0ee',
                '98': '#fff8f7',
                '99': '#fffbff',
                '100': '#ffffff',
            },
        },
        components: {
            MuiCssBaseline: {
                defaultProps: {
                    enableColorScheme: true,
                },
                styleOverrides: {
                    '*::-webkit-scrollbar': {
                        display: 'none',
                    },
                },
            },
            MuiAccordion: {
                styleOverrides: {
                    root: {
                        boxShadow:
                            '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                        border: '0px solid #bfc9c2',
                        color: '#191c1a',
                        backgroundColor: '#f8faf6',
                        '&:before': {
                            backgroundColor: '#f8faf6',
                            display: 'none',
                        },
                        '&.Mui-disabled': {
                            backgroundColor: '#eff1ee',
                            color: '#2e312f',
                            border: '0px solid #bfc9c2',
                        },
                        '& .MuiAccordionSummary-root > .MuiAccordionSummary-expandIconWrapper ':
                            {
                                color: '#191c1a',
                            },
                    },
                },
            },
            MuiAlert: {
                defaultProps: {
                    variant: 'standard',
                },
                styleOverrides: {
                    root: {
                        borderRadius: '20px',
                    },
                    standardError: {
                        background: '#ffdad6',
                        color: '#410002',
                    },
                    standardInfo: {
                        background: '#c2e8ff',
                        color: '#001e2b',
                    },
                    standardWarning: {
                        background: '#ffdf9f',
                        color: '#261a00',
                    },
                    standardSuccess: {
                        background: '#92f8b5',
                        color: '#00210f',
                    },
                    filledError: {
                        background: '#ba1a1a',
                        color: '#ffffff',
                    },
                    filledInfo: {
                        background: '#006688',
                        color: '#ffffff',
                    },
                    filledWarning: {
                        background: '#795900',
                        color: '#ffffff',
                    },
                    filledSuccess: {
                        background: '#006d3d',
                        color: '#ffffff',
                    },
                    outlinedError: {
                        color: '#ba1a1a',
                    },
                    outlinedInfo: {
                        color: '#006688',
                    },
                    outlinedWarning: {
                        color: '#795900',
                    },
                    outlinedSuccess: {
                        color: '#006d3d',
                    },
                },
            },
            MuiAppBar: {
                defaultProps: {
                    elevation: 0,
                    color: 'default',
                },
                styleOverrides: {
                    colorDefault: {
                        background: '#eceeeb',
                        color: '#191c1a',
                    },
                    colorPrimary: {
                        background: '#f8faf6',
                        color: '#191c1a',
                    },
                },
            },
            MuiBadge: {
                defaultProps: {
                    color: 'default',
                },
                variants: [
                    {
                        props: {
                            color: 'default',
                        },
                        style: {
                            '.MuiBadge-badge': {
                                backgroundColor: '#ba1a1a',
                                color: '#ffffff',
                            },
                        },
                    },
                ],
            },
            MuiSvgIcon: {
                styleOverrides: {
                    root: {
                        fontSize: '2rem',
                        padding: '0.25rem',
                    },
                },
            },
            MuiButton: {
                defaultProps: {
                    variant: 'tonal',
                },
                styleOverrides: {
                    root: {
                        borderRadius: '30px',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        '&:has(>svg)': {
                            padding: '8px',
                            borderRadius: '50%',
                            minWidth: '1em',
                            minHeight: '1em',
                        },
                    },
                },
                variants: [
                    {
                        props: {
                            variant: 'elevated',
                        },
                        style: {
                            boxShadow:
                                '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            backgroundColor: '#f2f4f0',
                            color: '#006c4f',
                            '&:hover': {
                                background: '#e0e6e1',
                                boxShadow:
                                    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                background: '#d8e0d9',
                            },
                            '&:active': {
                                background: '#d8e0d9',
                            },
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(25, 28, 26, 0.12)',
                                color: 'rgba(25, 28, 26, 0.38)',
                                boxShadow: 'none',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'filled',
                        },
                        style: {
                            backgroundColor: '#006c4f',
                            color: '#ffffff',
                            boxShadow: 'none',
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(25, 28, 26, 0.12)',
                                color: 'rgba(25, 28, 26, 0.38)',
                                boxShadow: 'none',
                            },
                            '&:hover': {
                                backgroundColor: '#2a765b',
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                backgroundColor: '#367b61',
                                boxShadow: 'none',
                            },
                            '&:active': {
                                backgroundColor: '#367b61',
                                boxShadow: 'none',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'tonal',
                        },
                        style: {
                            backgroundColor: '#cfe9da',
                            color: '#092017',
                            boxShadow: 'none',
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(25, 28, 26, 0.12)',
                                color: 'rgba(25, 28, 26, 0.38)',
                                boxShadow: 'none',
                            },
                            '&:hover': {
                                backgroundColor: '#bcd5c7',
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                backgroundColor: '#b2ccbe',
                                boxShadow: 'none',
                            },
                            '&:active': {
                                backgroundColor: '#b2ccbe',
                                boxShadow: 'none',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'outlined',
                        },
                        style: {
                            color: '#006c4f',
                            borderColor: '#707974',
                            borderWidth: '1px',
                            boxShadow: 'none',
                            '&.Mui-disabled': {
                                borderColor: 'rgba(25, 28, 26, 0.12)',
                                color: 'rgba(25, 28, 26, 0.38)',
                            },
                            '&:hover': {
                                backgroundColor: '#e6ece6',
                                borderColor: '#6b7871',
                            },
                            '&:focus': {
                                backgroundColor: '#dce5de',
                                borderColor: '#006c4f',
                            },
                            '&:active': {
                                backgroundColor: '#dce5de',
                                borderColor: '#697770',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'text',
                        },
                        style: {
                            backgroundColor: 'transparent',
                            color: '#006c4f',
                            boxShadow: 'none',
                            padding: '5px 15px',
                            '&.Mui-disabled': {
                                color: 'rgba(25, 28, 26, 0.38)',
                            },
                            '&:hover': {
                                backgroundColor: '#e6ece6',
                            },
                            '&:focus': {
                                backgroundColor: '#dce5de',
                            },
                            '&:active': {
                                backgroundColor: '#dce5de',
                            },
                        },
                    },
                ],
            },
            MuiIconButton: {
                defaultProps: {
                    variant: 'tonal',
                },
                styleOverrides: {
                    root: {
                        borderRadius: '30px',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        '&:has(>svg)': {
                            padding: '8px',
                            borderRadius: '50%',
                            minWidth: '1em',
                            minHeight: '1em',
                        },
                    },
                },
                variants: [
                    {
                        props: {
                            variant: 'elevated',
                        },
                        style: {
                            boxShadow:
                                '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            backgroundColor: '#f2f4f0',
                            color: '#006c4f',
                            '&:hover': {
                                background: '#e0e6e1',
                                boxShadow:
                                    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                background: '#d8e0d9',
                            },
                            '&:active': {
                                background: '#d8e0d9',
                            },
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(25, 28, 26, 0.12)',
                                color: 'rgba(25, 28, 26, 0.38)',
                                boxShadow: 'none',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'filled',
                        },
                        style: {
                            backgroundColor: '#006c4f',
                            color: '#ffffff',
                            boxShadow: 'none',
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(25, 28, 26, 0.12)',
                                color: 'rgba(25, 28, 26, 0.38)',
                                boxShadow: 'none',
                            },
                            '&:hover': {
                                backgroundColor: '#2a765b',
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                backgroundColor: '#367b61',
                                boxShadow: 'none',
                            },
                            '&:active': {
                                backgroundColor: '#367b61',
                                boxShadow: 'none',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'tonal',
                        },
                        style: {
                            backgroundColor: '#cfe9da',
                            color: '#092017',
                            boxShadow: 'none',
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(25, 28, 26, 0.12)',
                                color: 'rgba(25, 28, 26, 0.38)',
                                boxShadow: 'none',
                            },
                            '&:hover': {
                                backgroundColor: '#bcd5c7',
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                backgroundColor: '#b2ccbe',
                                boxShadow: 'none',
                            },
                            '&:active': {
                                backgroundColor: '#b2ccbe',
                                boxShadow: 'none',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'outlined',
                        },
                        style: {
                            color: '#006c4f',
                            borderColor: '#707974',
                            borderWidth: '1px',
                            boxShadow: 'none',
                            '&.Mui-disabled': {
                                borderColor: 'rgba(25, 28, 26, 0.12)',
                                color: 'rgba(25, 28, 26, 0.38)',
                            },
                            '&:hover': {
                                backgroundColor: '#e6ece6',
                                borderColor: '#6b7871',
                            },
                            '&:focus': {
                                backgroundColor: '#dce5de',
                                borderColor: '#006c4f',
                            },
                            '&:active': {
                                backgroundColor: '#dce5de',
                                borderColor: '#697770',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'text',
                        },
                        style: {
                            backgroundColor: 'transparent',
                            color: '#006c4f',
                            boxShadow: 'none',
                            padding: '5px 15px',
                            '&.Mui-disabled': {
                                color: 'rgba(25, 28, 26, 0.38)',
                            },
                            '&:hover': {
                                backgroundColor: '#e6ece6',
                            },
                            '&:focus': {
                                backgroundColor: '#dce5de',
                            },
                            '&:active': {
                                backgroundColor: '#dce5de',
                            },
                        },
                    },
                ],
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: '20px',
                        padding: '10px 6px',
                    },
                },
                variants: [
                    {
                        props: {
                            variant: 'elevation',
                        },
                        style: {
                            boxShadow:
                                '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            backgroundColor: '#f2f4f0',
                            transition:
                                'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                            '&:hover': {
                                background: '#e0e6e1',
                                boxShadow:
                                    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                                background: '#d8e0d9',
                            },
                            '&:active': {
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                                background: '#d8e0d9',
                            },
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(242, 244, 240, 0.38)',
                                color: '#dbe5de',
                                boxShadow: 'none',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'filled',
                        },
                        style: {
                            boxShadow: 'none',
                            backgroundColor: '#e1e3df',
                            transition:
                                'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                            '&:hover': {
                                background: '#d1d7d2',
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                boxShadow: 'none',
                                background: '#cad2cb',
                            },
                            '&:active': {
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                                background: '#cad2cb',
                            },
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(225, 227, 223, 0.38)',
                                color: '#dbe5de',
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'outlined',
                        },
                        style: {
                            boxShadow: 'none',
                            backgroundColor: '#f8faf6',
                            borderColor: '#707974',
                            transition:
                                'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                            '&:hover': {
                                background: '#e6ece6',
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                boxShadow: 'none',
                                background: '#dce5de',
                            },
                            '&:active': {
                                boxShadow:
                                    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
                                background: '#cad2cb',
                            },
                            '&.Mui-disabled': {
                                borderColor: 'rgba(225, 227, 223, 0.12)',
                                boxShadow: 'none',
                            },
                        },
                    },
                ],
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        border: '0px',
                        background: '#eceeeb',
                        color: '#404944',
                    },
                },
            },
            MuiFab: {
                defaultProps: {
                    color: 'secondary',
                },
                styleOverrides: {
                    root: {
                        boxShadow:
                            '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                        borderRadius: '18px',
                    },
                },
                variants: [
                    {
                        props: {
                            color: 'primary',
                        },
                        style: {
                            backgroundColor: '#85f8cb',
                            color: '#002116',
                            '&:hover': {
                                background: '#79e3b9',
                                boxShadow:
                                    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                background: '#73d9b1',
                                boxShadow:
                                    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                            },
                            '&:active': {
                                background: '#73d9b1',
                                boxShadow:
                                    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                            },
                        },
                    },
                    {
                        props: {
                            color: 'secondary',
                        },
                        style: {
                            backgroundColor: '#cfe9da',
                            color: '#092017',
                            '&:hover': {
                                background: '#bcd5c7',
                                boxShadow:
                                    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                background: '#b2ccbe',
                                boxShadow:
                                    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                            },
                            '&:active': {
                                background: '#b2ccbe',
                                boxShadow:
                                    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                            },
                        },
                    },
                    {
                        props: {
                            color: 'surface',
                        },
                        style: {
                            backgroundColor: '#eceeeb',
                            color: '#006c4f',
                            '&:hover': {
                                background: '#dbe1dc',
                                boxShadow:
                                    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                background: '#d3dbd5',
                                boxShadow:
                                    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                            },
                            '&:active': {
                                background: '#d3dbd5',
                                boxShadow:
                                    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                            },
                        },
                    },
                    {
                        props: {
                            color: 'tertiary',
                        },
                        style: {
                            backgroundColor: '#c2e8fd',
                            color: '#001f2a',
                            '&:hover': {
                                background: '#afd4e8',
                                boxShadow:
                                    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                background: '#a6cbde',
                                boxShadow:
                                    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                            },
                            '&:active': {
                                background: '#a6cbde',
                                boxShadow:
                                    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                            },
                        },
                    },
                ],
            },
            MuiListItem: {
                styleOverrides: {
                    root: {
                        paddingTop: 1,
                        paddingBottom: 1,
                        '& .MuiListItemButton-root': {
                            paddingTop: 8,
                            paddingBottom: 8,
                        },
                    },
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 50,
                        color: '#404944',
                        '&:hover': {
                            backgroundColor: '#dcdeda',
                            color: '#3d4541',
                        },
                        '&:active': {
                            backgroundColor: '#d0d4cf',
                            color: '#3b443f',
                        },
                        '&.Mui-selected': {
                            color: '#092017',
                            background: '#cfe9da',
                            '& > .MuiListItemText-root > .MuiTypography-root': {
                                fontWeight: 'bold',
                            },
                            '&:hover': {
                                backgroundColor: '#bcd5c7',
                                color: '#192f25',
                            },
                            '&:active': {
                                backgroundColor: '#b2ccbe',
                                color: '#20362c',
                            },
                        },
                    },
                },
            },
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        color: 'inherit',
                        minWidth: 32,
                        '&.Mui-selected': {
                            fontWeight: 'bold',
                        },
                    },
                },
            },
            MuiMenu: {
                defaultProps: {
                    color: 'default',
                },
                styleOverrides: {
                    root: {},
                    paper: {
                        backgroundColor: '#f2f4f0',
                        boxShadow:
                            '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                        color: '#191c1a',
                    },
                },
            },
            MuiSwitch: {
                styleOverrides: {
                    root: {
                        width: 42,
                        height: 26,
                        padding: 0,
                        marginLeft: 12,
                        marginRight: 8,
                        borderColor: '#707974',
                        '& .MuiSwitch-switchBase': {
                            padding: 0,
                            margin: 7,
                            transitionDuration: '100ms',
                            '&.Mui-checked': {
                                transform: 'translateX(16px)',
                                margin: 4,
                                '& + .MuiSwitch-track': {
                                    backgroundColor: '#006c4f',
                                    opacity: 1,
                                    border: 0,
                                },
                                '& .MuiSwitch-thumb': {
                                    color: '#ffffff',
                                    width: 18,
                                    height: 18,
                                },
                                '&.Mui-disabled + .MuiSwitch-track': {
                                    backgroundColor: 'rgba(25, 28, 26, 0.1)',
                                },
                                '&.Mui-disabled .MuiSwitch-thumb': {
                                    color: 'rgba(248, 250, 246, 0.8)',
                                },
                            },
                            '&.Mui-focusVisible .MuiSwitch-thumb': {
                                color: '#006c4f',
                                border: '6px solid #ffffff',
                            },
                            '&.Mui-disabled .MuiSwitch-thumb': {
                                color: 'rgba(25, 28, 26, 0.3)',
                            },
                        },
                        '& .MuiSwitch-thumb': {
                            boxSizing: 'border-box',
                            color: '#707974',
                            width: 12,
                            height: 12,
                            '&:before': {
                                content: "''",
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                left: 0,
                                top: 0,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                            },
                        },
                        '& .MuiSwitch-track': {
                            borderRadius: 20,
                            border: '2px solid #707974',
                            backgroundColor: '#e1e3df',
                            opacity: 1,
                            transition: 'background .2s',
                        },
                    },
                },
            },
            MuiToggleButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '50px',
                        textTransform: 'none',
                        color: '#191c1a',
                        '&.Mui-selected': {
                            color: '#092017',
                            backgroundColor: '#cfe9da',
                        },
                        '&.MuiToggleButton-primary': {
                            borderColor: 'transparent',
                        },
                        '&.MuiToggleButton-primary.Mui-selected': {
                            color: '#ffffff',
                            backgroundColor: '#006c4f',
                        },
                    },
                },
            },
            MuiToggleButtonGroup: {
                styleOverrides: {
                    grouped: {
                        borderRadius: '50px',
                        borderColor: '#707974',
                        '&:not(:first-of-type)': {
                            marginLeft: 0,
                            borderLeft: 0,
                        },
                        '&:hover': {
                            background: '#e6ece6',
                        },
                        '&.Mui-selected:hover': {
                            background: '#bcd5c7',
                        },
                    },
                },
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        background: '#2e312f',
                        color: '#eff1ee',
                    },
                },
            },
        },
        palette: {
            mode: 'light',
            themeMode: 'light',
            primary: {
                main: '#006c4f',
                contrastText: '#ffffff',
                light: 'rgb(51, 137, 114)',
                dark: 'rgb(0, 75, 55)',
            },
            onPrimary: {
                main: '#ffffff',
                contrastText: '#006c4f',
            },
            primaryContainer: {
                main: '#85f8cb',
                contrastText: '#002116',
            },
            onPrimaryContainer: {
                main: '#002116',
                contrastText: '#85f8cb',
            },
            secondary: {
                main: '#4c6358',
                contrastText: '#ffffff',
                light: 'rgb(111, 130, 121)',
                dark: 'rgb(53, 69, 61)',
            },
            onSecondary: {
                main: '#ffffff',
                contrastText: '#4c6358',
            },
            secondaryContainer: {
                main: '#cfe9da',
                contrastText: '#092017',
            },
            onSecondaryContainer: {
                main: '#092017',
                contrastText: '#cfe9da',
            },
            tertiary: {
                main: '#3e6374',
                contrastText: '#ffffff',
            },
            onTertiary: {
                main: '#ffffff',
                contrastText: '#3e6374',
            },
            tertiaryContainer: {
                main: '#c2e8fd',
                contrastText: '#001f2a',
            },
            onTertiaryContainer: {
                main: '#001f2a',
                contrastText: '#c2e8fd',
            },
            error: {
                main: '#ba1a1a',
                contrastText: '#ffffff',
                light: 'rgb(199, 71, 71)',
                dark: 'rgb(130, 18, 18)',
            },
            onError: {
                main: '#ffffff',
                contrastText: '#ba1a1a',
            },
            errorContainer: {
                main: '#ffdad6',
                contrastText: '#410002',
            },
            onErrorContainer: {
                main: '#410002',
                contrastText: '#ffdad6',
            },
            primaryFixed: {
                main: '#85f8cb',
            },
            primaryFixedDim: {
                main: '#68dbb0',
            },
            onPrimaryFixed: {
                main: '#002116',
            },
            onPrimaryFixedVariant: {
                main: '#00513b',
            },
            secondaryFixed: {
                main: '#cfe9da',
            },
            secondaryFixedDim: {
                main: '#b3ccbf',
            },
            onSecondaryFixed: {
                main: '#092017',
            },
            onSecondaryFixedVariant: {
                main: '#354b41',
            },
            tertiaryFixed: {
                main: '#c2e8fd',
            },
            tertiaryFixedDim: {
                main: '#a6cce0',
            },
            onTertiaryFixed: {
                main: '#001f2a',
            },
            onTertiaryFixedVariant: {
                main: '#254b5c',
            },
            surface: {
                main: '#f8faf6',
                contrastText: '#191c1a',
            },
            onSurface: {
                main: '#191c1a',
                contrastText: '#f8faf6',
            },
            surfaceDim: {
                main: '#d8dbd7',
            },
            surfaceBright: {
                main: '#f8faf6',
            },
            surfaceContainerLowest: {
                main: '#ffffff',
            },
            surfaceContainerLow: {
                main: '#f2f4f0',
            },
            surfaceContainer: {
                main: '#eceeeb',
            },
            surfaceContainerHigh: {
                main: '#e7e9e5',
            },
            surfaceContainerHighest: {
                main: '#e1e3df',
            },
            surfaceVariant: {
                main: '#dbe5de',
                contrastText: '#404944',
            },
            onSurfaceVariant: {
                main: '#404944',
                contrastText: '#dbe5de',
            },
            outline: {
                main: '#707974',
            },
            outlineVariant: {
                main: '#bfc9c2',
            },
            inversePrimary: {
                main: '#68dbb0',
                contrastText: '',
            },
            inverseOnPrimary: {
                main: '',
                contrastText: '#68dbb0',
            },
            inverseSurface: {
                main: '#2e312f',
                contrastText: '#2e312f',
            },
            inverseOnSurface: {
                main: '#eff1ee',
                contrastText: '#2e312f',
            },
            shadow: {
                main: '#000000',
            },
            scrim: {
                main: '#000000',
            },
            surfaceTintColor: {
                main: '#006c4f',
            },
            background: {
                default: '#eceeeb',
                paper: '#f8faf6',
            },
            onBackground: {
                main: '#191c1a',
            },
            common: {
                white: '#f8faf6',
                black: '#191c1a',
            },
            text: {
                primary: '#191c1a',
                secondary: '#092017',
                disabled: 'rgba(0, 0, 0, 0.38)',
            },
            info: {
                main: '#006688',
                contrastText: '#ffffff',
                light: 'rgb(51, 132, 159)',
                dark: 'rgb(0, 71, 95)',
            },
            onInfo: {
                main: '#ffffff',
                contrastText: '#006688',
            },
            infoContainer: {
                main: '#c2e8ff',
                contrastText: '#001e2b',
            },
            onInfoContainer: {
                main: '#001e2b',
                contrastText: '#c2e8ff',
            },
            success: {
                main: '#006d3d',
                contrastText: '#ffffff',
                light: 'rgb(51, 138, 99)',
                dark: 'rgb(0, 76, 42)',
            },
            onSuccess: {
                main: '#ffffff',
                contrastText: '#006d3d',
            },
            successContainer: {
                main: '#92f8b5',
                contrastText: '#00210f',
            },
            onSuccessContainer: {
                main: '#00210f',
                contrastText: '#92f8b5',
            },
            warning: {
                main: '#795900',
                contrastText: '#ffffff',
                light: 'rgb(147, 122, 51)',
                dark: 'rgb(84, 62, 0)',
            },
            onWarning: {
                main: '#ffffff',
                contrastText: '#795900',
            },
            warningContainer: {
                main: '#ffdf9f',
                contrastText: '#261a00',
            },
            onWarningContainer: {
                main: '#261a00',
                contrastText: '#ffdf9f',
            },
            divider: '#707974',
            grey: {
                '50': '#fafafa',
                '100': '#f5f5f5',
                '200': '#eeeeee',
                '300': '#e0e0e0',
                '400': '#bdbdbd',
                '500': '#9e9e9e',
                '600': '#757575',
                '700': '#616161',
                '800': '#424242',
                '900': '#212121',
                A100: '#f5f5f5',
                A200: '#eeeeee',
                A400: '#bdbdbd',
                A700: '#616161',
            },
            contrastThreshold: 3,
            tonalOffset: 0.2,
            action: {
                active: 'rgba(0, 0, 0, 0.54)',
                hover: 'rgba(0, 0, 0, 0.04)',
                hoverOpacity: 0.04,
                selected: 'rgba(0, 0, 0, 0.08)',
                selectedOpacity: 0.08,
                disabled: 'rgba(0, 0, 0, 0.26)',
                disabledBackground: 'rgba(0, 0, 0, 0.12)',
                disabledOpacity: 0.38,
                focus: 'rgba(0, 0, 0, 0.12)',
                focusOpacity: 0.12,
                activatedOpacity: 0.12,
            },
        },
        unstable_sxConfig: {
            border: {
                themeKey: 'borders',
            },
            borderTop: {
                themeKey: 'borders',
            },
            borderRight: {
                themeKey: 'borders',
            },
            borderBottom: {
                themeKey: 'borders',
            },
            borderLeft: {
                themeKey: 'borders',
            },
            borderColor: {
                themeKey: 'palette',
            },
            borderTopColor: {
                themeKey: 'palette',
            },
            borderRightColor: {
                themeKey: 'palette',
            },
            borderBottomColor: {
                themeKey: 'palette',
            },
            borderLeftColor: {
                themeKey: 'palette',
            },
            borderRadius: {
                themeKey: 'shape.borderRadius',
            },
            color: {
                themeKey: 'palette',
            },
            bgcolor: {
                themeKey: 'palette',
                cssProperty: 'backgroundColor',
            },
            backgroundColor: {
                themeKey: 'palette',
            },
            p: {},
            pt: {},
            pr: {},
            pb: {},
            pl: {},
            px: {},
            py: {},
            padding: {},
            paddingTop: {},
            paddingRight: {},
            paddingBottom: {},
            paddingLeft: {},
            paddingX: {},
            paddingY: {},
            paddingInline: {},
            paddingInlineStart: {},
            paddingInlineEnd: {},
            paddingBlock: {},
            paddingBlockStart: {},
            paddingBlockEnd: {},
            m: {},
            mt: {},
            mr: {},
            mb: {},
            ml: {},
            mx: {},
            my: {},
            margin: {},
            marginTop: {},
            marginRight: {},
            marginBottom: {},
            marginLeft: {},
            marginX: {},
            marginY: {},
            marginInline: {},
            marginInlineStart: {},
            marginInlineEnd: {},
            marginBlock: {},
            marginBlockStart: {},
            marginBlockEnd: {},
            displayPrint: {
                cssProperty: false,
            },
            display: {},
            overflow: {},
            textOverflow: {},
            visibility: {},
            whiteSpace: {},
            flexBasis: {},
            flexDirection: {},
            flexWrap: {},
            justifyContent: {},
            alignItems: {},
            alignContent: {},
            order: {},
            flex: {},
            flexGrow: {},
            flexShrink: {},
            alignSelf: {},
            justifyItems: {},
            justifySelf: {},
            gap: {},
            rowGap: {},
            columnGap: {},
            gridColumn: {},
            gridRow: {},
            gridAutoFlow: {},
            gridAutoColumns: {},
            gridAutoRows: {},
            gridTemplateColumns: {},
            gridTemplateRows: {},
            gridTemplateAreas: {},
            gridArea: {},
            position: {},
            zIndex: {
                themeKey: 'zIndex',
            },
            top: {},
            right: {},
            bottom: {},
            left: {},
            boxShadow: {
                themeKey: 'shadows',
            },
            width: {},
            maxWidth: {},
            minWidth: {},
            height: {},
            maxHeight: {},
            minHeight: {},
            boxSizing: {},
            fontFamily: {
                themeKey: 'typography',
            },
            fontSize: {
                themeKey: 'typography',
            },
            fontStyle: {
                themeKey: 'typography',
            },
            fontWeight: {
                themeKey: 'typography',
            },
            letterSpacing: {},
            textTransform: {},
            lineHeight: {},
            textAlign: {},
            typography: {
                cssProperty: false,
                themeKey: 'typography',
            },
        },
        mixins: {
            toolbar: {
                minHeight: 56,
                '@media (min-width:0px)': {
                    '@media (orientation: landscape)': {
                        minHeight: 48,
                    },
                },
                '@media (min-width:600px)': {
                    minHeight: 64,
                },
            },
        },
        shadows: [
            'none',
            '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
            '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
            '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
            '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
            '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
            '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
            '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
            '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
            '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
            '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
            '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
            '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
            '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
            '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
            '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
            '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
            '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
            '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
            '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
            '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
            '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
            '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
            '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
            '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
        ],
        typography: {
            htmlFontSize: 16,
            fontFamily: '"Bai Jamjuree", sans-serif',
            fontSize: 14,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
            h1: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 300,
                fontSize: '6rem',
                lineHeight: 1.167,
                letterSpacing: '-0.01562em',
            },
            h2: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 300,
                fontSize: '3.75rem',
                lineHeight: 1.2,
                letterSpacing: '-0.00833em',
            },
            h3: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 400,
                fontSize: '3rem',
                lineHeight: 1.167,
                letterSpacing: '0em',
            },
            h4: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 400,
                fontSize: '2.125rem',
                lineHeight: 1.235,
                letterSpacing: '0.00735em',
            },
            h5: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 400,
                fontSize: '1.5rem',
                lineHeight: 1.334,
                letterSpacing: '0em',
            },
            h6: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 500,
                fontSize: '1.25rem',
                lineHeight: 1.6,
                letterSpacing: '0.0075em',
            },
            subtitle1: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 400,
                fontSize: '1rem',
                lineHeight: 1.75,
                letterSpacing: '0.00938em',
            },
            subtitle2: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 500,
                fontSize: '0.875rem',
                lineHeight: 1.57,
                letterSpacing: '0.00714em',
            },
            body1: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 400,
                fontSize: '1rem',
                lineHeight: 1.5,
                letterSpacing: '0.00938em',
            },
            body2: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 400,
                fontSize: '0.875rem',
                lineHeight: 1.43,
                letterSpacing: '0.01071em',
            },
            button: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 500,
                fontSize: '1.5rem',
                lineHeight: 1.75,
                letterSpacing: '0.02857em',
                textTransform: 'uppercase',
            },
            caption: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 400,
                fontSize: '0.75rem',
                lineHeight: 1.66,
                letterSpacing: '0.03333em',
            },
            overline: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 400,
                fontSize: '0.75rem',
                lineHeight: 2.66,
                letterSpacing: '0.08333em',
                textTransform: 'uppercase',
            },
            inherit: {
                fontFamily: 'inherit',
                fontWeight: 'inherit',
                fontSize: 'inherit',
                lineHeight: 'inherit',
                letterSpacing: 'inherit',
            },
        },
        transitions: {
            easing: {
                easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
                easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
                easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
                sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
            },
            duration: {
                shortest: 150,
                shorter: 200,
                short: 250,
                standard: 300,
                complex: 375,
                enteringScreen: 225,
                leavingScreen: 195,
            },
        },
        zIndex: {
            mobileStepper: 1000,
            fab: 1050,
            speedDial: 1050,
            appBar: 1100,
            drawer: 1200,
            modal: 1300,
            snackbar: 1400,
            tooltip: 1500,
        },
    },
    [ColorMode.DARK]: {
        breakpoints: {
            keys: ['xs', 'sm', 'md', 'lg', 'xl'],
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
            unit: 'px',
        },
        direction: 'ltr',
        components: {
            MuiCssBaseline: {
                defaultProps: {
                    enableColorScheme: true,
                },
                styleOverrides: {
                    '*::-webkit-scrollbar': {
                        display: 'none',
                    },
                },
            },
            MuiAccordion: {
                styleOverrides: {
                    root: {
                        boxShadow:
                            '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                        border: '0px solid #404943',
                        color: '#e1e3df',
                        backgroundColor: '#373a37',
                        '&:before': {
                            backgroundColor: '#373a37',
                            display: 'none',
                        },
                        '&.Mui-disabled': {
                            backgroundColor: '#2e312f',
                            color: '#e1e3df',
                            border: '0px solid #404943',
                        },
                        '& .MuiAccordionSummary-root > .MuiAccordionSummary-expandIconWrapper ':
                            {
                                color: '#e1e3df',
                            },
                    },
                },
            },
            MuiAlert: {
                defaultProps: {
                    variant: 'standard',
                },
                styleOverrides: {
                    root: {
                        borderRadius: '20px',
                    },
                    standardError: {
                        background: '#93000a',
                        color: '#ffdad6',
                    },
                    standardInfo: {
                        background: '#004d67',
                        color: '#c2e8ff',
                    },
                    standardWarning: {
                        background: '#5b4300',
                        color: '#ffdf9f',
                    },
                    standardSuccess: {
                        background: '#005229',
                        color: '#91f8af',
                    },
                    filledError: {
                        background: '#ffb4ab',
                        color: '#690005',
                    },
                    filledInfo: {
                        background: '#75d1ff',
                        color: '#003548',
                    },
                    filledWarning: {
                        background: '#f8bd26',
                        color: '#402d00',
                    },
                    filledSuccess: {
                        background: '#75db95',
                        color: '#00391b',
                    },
                    outlinedError: {
                        color: '#ffb4ab',
                    },
                    outlinedInfo: {
                        color: '#75d1ff',
                    },
                    outlinedWarning: {
                        color: '#f8bd26',
                    },
                    outlinedSuccess: {
                        color: '#75db95',
                    },
                },
            },
            MuiAppBar: {
                defaultProps: {
                    elevation: 0,
                    color: 'default',
                },
                styleOverrides: {
                    colorDefault: {
                        background: '#1d201e',
                        color: '#e1e3df',
                    },
                    colorPrimary: {
                        background: '#111412',
                        color: '#e1e3df',
                    },
                },
            },
            MuiBadge: {
                defaultProps: {
                    color: 'default',
                },
                variants: [
                    {
                        props: {
                            color: 'default',
                        },
                        style: {
                            '.MuiBadge-badge': {
                                backgroundColor: '#ffb4ab',
                                color: '#690005',
                            },
                        },
                    },
                ],
            },
            MuiSvgIcon: {
                styleOverrides: {
                    root: {
                        fontSize: '2rem',
                        padding: '0.25rem',
                    },
                },
            },
            MuiIconButton: {
                defaultProps: {
                    variant: 'tonal',
                },
                styleOverrides: {
                    root: {
                        borderRadius: '30px',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        '&:has(>svg)': {
                            padding: '8px',
                            borderRadius: '50%',
                            minWidth: '1em',
                            minHeight: '1em',
                        },
                    },
                },
                variants: [
                    {
                        props: {
                            variant: 'elevated',
                        },
                        style: {
                            boxShadow:
                                '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            backgroundColor: '#191c1a',
                            color: '#6fdba9',
                            '&:hover': {
                                background: '#232a26',
                                boxShadow:
                                    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                background: '#28312c',
                            },
                            '&:active': {
                                background: '#28312c',
                            },
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(225, 227, 223, 0.12)',
                                color: 'rgba(225, 227, 223, 0.38)',
                                boxShadow: 'none',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'filled',
                        },
                        style: {
                            backgroundColor: '#6fdba9',
                            color: '#003824',
                            boxShadow: 'none',
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(225, 227, 223, 0.12)',
                                color: 'rgba(225, 227, 223, 0.38)',
                                boxShadow: 'none',
                            },
                            '&:hover': {
                                backgroundColor: '#66cc9d',
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                backgroundColor: '#61c497',
                                boxShadow: 'none',
                            },
                            '&:active': {
                                backgroundColor: '#61c497',
                                boxShadow: 'none',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'tonal',
                        },
                        style: {
                            backgroundColor: '#364b40',
                            color: '#cfe9d8',
                            boxShadow: 'none',
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(225, 227, 223, 0.12)',
                                color: 'rgba(225, 227, 223, 0.38)',
                                boxShadow: 'none',
                            },
                            '&:hover': {
                                backgroundColor: '#41564b',
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                backgroundColor: '#465c50',
                                boxShadow: 'none',
                            },
                            '&:active': {
                                backgroundColor: '#465c50',
                                boxShadow: 'none',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'outlined',
                        },
                        style: {
                            color: '#6fdba9',
                            borderColor: '#8a938c',
                            borderWidth: '1px',
                            boxShadow: 'none',
                            '&.Mui-disabled': {
                                borderColor: 'rgba(225, 227, 223, 0.12)',
                                color: 'rgba(225, 227, 223, 0.38)',
                            },
                            '&:hover': {
                                backgroundColor: '#1c231f',
                                borderColor: '#8b988f',
                            },
                            '&:focus': {
                                backgroundColor: '#222a25',
                                borderColor: '#6fdba9',
                            },
                            '&:active': {
                                backgroundColor: '#222a25',
                                borderColor: '#8b9b90',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'text',
                        },
                        style: {
                            backgroundColor: 'transparent',
                            color: '#6fdba9',
                            boxShadow: 'none',
                            padding: '5px 15px',
                            '&.Mui-disabled': {
                                color: 'rgba(225, 227, 223, 0.38)',
                            },
                            '&:hover': {
                                backgroundColor: '#1c231f',
                            },
                            '&:focus': {
                                backgroundColor: '#222a25',
                            },
                            '&:active': {
                                backgroundColor: '#222a25',
                            },
                        },
                    },
                ],
            },
            MuiButton: {
                defaultProps: {
                    variant: 'tonal',
                },
                styleOverrides: {
                    root: {
                        borderRadius: '30px',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        '&:has(>svg)': {
                            padding: '8px',
                            borderRadius: '50%',
                            minWidth: '1em',
                            minHeight: '1em',
                        },
                    },
                },
                variants: [
                    {
                        props: {
                            variant: 'elevated',
                        },
                        style: {
                            boxShadow:
                                '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            backgroundColor: '#191c1a',
                            color: '#6fdba9',
                            '&:hover': {
                                background: '#232a26',
                                boxShadow:
                                    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                background: '#28312c',
                            },
                            '&:active': {
                                background: '#28312c',
                            },
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(225, 227, 223, 0.12)',
                                color: 'rgba(225, 227, 223, 0.38)',
                                boxShadow: 'none',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'filled',
                        },
                        style: {
                            backgroundColor: '#6fdba9',
                            color: '#003824',
                            boxShadow: 'none',
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(225, 227, 223, 0.12)',
                                color: 'rgba(225, 227, 223, 0.38)',
                                boxShadow: 'none',
                            },
                            '&:hover': {
                                backgroundColor: '#66cc9d',
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                backgroundColor: '#61c497',
                                boxShadow: 'none',
                            },
                            '&:active': {
                                backgroundColor: '#61c497',
                                boxShadow: 'none',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'tonal',
                        },
                        style: {
                            backgroundColor: '#364b40',
                            color: '#cfe9d8',
                            boxShadow: 'none',
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(225, 227, 223, 0.12)',
                                color: 'rgba(225, 227, 223, 0.38)',
                                boxShadow: 'none',
                            },
                            '&:hover': {
                                backgroundColor: '#41564b',
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                backgroundColor: '#465c50',
                                boxShadow: 'none',
                            },
                            '&:active': {
                                backgroundColor: '#465c50',
                                boxShadow: 'none',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'outlined',
                        },
                        style: {
                            color: '#6fdba9',
                            borderColor: '#8a938c',
                            borderWidth: '1px',
                            boxShadow: 'none',
                            '&.Mui-disabled': {
                                borderColor: 'rgba(225, 227, 223, 0.12)',
                                color: 'rgba(225, 227, 223, 0.38)',
                            },
                            '&:hover': {
                                backgroundColor: '#1c231f',
                                borderColor: '#8b988f',
                            },
                            '&:focus': {
                                backgroundColor: '#222a25',
                                borderColor: '#6fdba9',
                            },
                            '&:active': {
                                backgroundColor: '#222a25',
                                borderColor: '#8b9b90',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'text',
                        },
                        style: {
                            backgroundColor: 'transparent',
                            color: '#6fdba9',
                            boxShadow: 'none',
                            padding: '5px 15px',
                            '&.Mui-disabled': {
                                color: 'rgba(225, 227, 223, 0.38)',
                            },
                            '&:hover': {
                                backgroundColor: '#1c231f',
                            },
                            '&:focus': {
                                backgroundColor: '#222a25',
                            },
                            '&:active': {
                                backgroundColor: '#222a25',
                            },
                        },
                    },
                ],
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: '20px',
                        padding: '10px 6px',
                    },
                },
                variants: [
                    {
                        props: {
                            variant: 'elevation',
                        },
                        style: {
                            boxShadow:
                                '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            backgroundColor: '#191c1a',
                            transition:
                                'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                            '&:hover': {
                                background: '#232a26',
                                boxShadow:
                                    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                                background: '#28312c',
                            },
                            '&:active': {
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                                background: '#28312c',
                            },
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(25, 28, 26, 0.38)',
                                color: '#404943',
                                boxShadow: 'none',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'filled',
                        },
                        style: {
                            boxShadow: 'none',
                            backgroundColor: '#323633',
                            transition:
                                'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                            '&:hover': {
                                background: '#3a413c',
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                boxShadow: 'none',
                                background: '#3d4741',
                            },
                            '&:active': {
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                                background: '#3d4741',
                            },
                            '&.Mui-disabled': {
                                backgroundColor: 'rgba(50, 54, 51, 0.38)',
                                color: '#404943',
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            },
                        },
                    },
                    {
                        props: {
                            variant: 'outlined',
                        },
                        style: {
                            boxShadow: 'none',
                            backgroundColor: '#111412',
                            borderColor: '#8a938c',
                            transition:
                                'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                            '&:hover': {
                                background: '#1c231f',
                                boxShadow:
                                    '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                boxShadow: 'none',
                                background: '#222a25',
                            },
                            '&:active': {
                                boxShadow:
                                    '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
                                background: '#3d4741',
                            },
                            '&.Mui-disabled': {
                                borderColor: 'rgba(50, 54, 51, 0.12)',
                                boxShadow: 'none',
                            },
                        },
                    },
                ],
            },
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        border: '0px',
                        background: '#1d201e',
                        color: '#c0c9c1',
                    },
                },
            },
            MuiFab: {
                defaultProps: {
                    color: 'secondary',
                },
                styleOverrides: {
                    root: {
                        boxShadow:
                            '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                        borderRadius: '18px',
                    },
                },
                variants: [
                    {
                        props: {
                            color: 'primary',
                        },
                        style: {
                            backgroundColor: '#005236',
                            color: '#8bf7c4',
                            '&:hover': {
                                background: '#0f5e40',
                                boxShadow:
                                    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                background: '#166345',
                                boxShadow:
                                    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                            },
                            '&:active': {
                                background: '#166345',
                                boxShadow:
                                    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                            },
                        },
                    },
                    {
                        props: {
                            color: 'secondary',
                        },
                        style: {
                            backgroundColor: '#364b40',
                            color: '#cfe9d8',
                            '&:hover': {
                                background: '#41564b',
                                boxShadow:
                                    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                background: '#465c50',
                                boxShadow:
                                    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                            },
                            '&:active': {
                                background: '#465c50',
                                boxShadow:
                                    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                            },
                        },
                    },
                    {
                        props: {
                            color: 'surface',
                        },
                        style: {
                            backgroundColor: '#1d201e',
                            color: '#6fdba9',
                            '&:hover': {
                                background: '#272d29',
                                boxShadow:
                                    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                background: '#2c342f',
                                boxShadow:
                                    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                            },
                            '&:active': {
                                background: '#2c342f',
                                boxShadow:
                                    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                            },
                        },
                    },
                    {
                        props: {
                            color: 'tertiary',
                        },
                        style: {
                            backgroundColor: '#244c5a',
                            color: '#c0e9fb',
                            '&:hover': {
                                background: '#305765',
                                boxShadow:
                                    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
                            },
                            '&:focus': {
                                background: '#355d6b',
                                boxShadow:
                                    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                            },
                            '&:active': {
                                background: '#355d6b',
                                boxShadow:
                                    '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                            },
                        },
                    },
                ],
            },
            MuiListItem: {
                styleOverrides: {
                    root: {
                        paddingTop: 1,
                        paddingBottom: 1,
                        '& .MuiListItemButton-root': {
                            paddingTop: 8,
                            paddingBottom: 8,
                        },
                    },
                },
            },
            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 50,
                        color: '#c0c9c1',
                        '&:hover': {
                            backgroundColor: '#282b29',
                            color: '#c3cbc3',
                        },
                        '&:active': {
                            backgroundColor: '#2e322f',
                            color: '#c4ccc4',
                        },
                        '&.Mui-selected': {
                            color: '#cfe9d8',
                            background: '#364b40',
                            '& > .MuiListItemText-root > .MuiTypography-root': {
                                fontWeight: 'bold',
                            },
                            '&:hover': {
                                backgroundColor: '#41564b',
                                color: '#c0dac9',
                            },
                            '&:active': {
                                backgroundColor: '#465c50',
                                color: '#b9d2c2',
                            },
                        },
                    },
                },
            },
            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        color: 'inherit',
                        minWidth: 32,
                        '&.Mui-selected': {
                            fontWeight: 'bold',
                        },
                    },
                },
            },
            MuiMenu: {
                defaultProps: {
                    color: 'default',
                },
                styleOverrides: {
                    root: {},
                    paper: {
                        backgroundColor: '#191c1a',
                        boxShadow:
                            '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                        color: '#e1e3df',
                    },
                },
            },
            MuiSwitch: {
                styleOverrides: {
                    root: {
                        width: 42,
                        height: 26,
                        padding: 0,
                        marginLeft: 12,
                        marginRight: 8,
                        borderColor: '#8a938c',
                        '& .MuiSwitch-switchBase': {
                            padding: 0,
                            margin: 7,
                            transitionDuration: '100ms',
                            '&.Mui-checked': {
                                transform: 'translateX(16px)',
                                margin: 4,
                                '& + .MuiSwitch-track': {
                                    backgroundColor: '#6fdba9',
                                    opacity: 1,
                                    border: 0,
                                },
                                '& .MuiSwitch-thumb': {
                                    color: '#003824',
                                    width: 18,
                                    height: 18,
                                },
                                '&.Mui-disabled + .MuiSwitch-track': {
                                    backgroundColor: 'rgba(225, 227, 223, 0.1)',
                                },
                                '&.Mui-disabled .MuiSwitch-thumb': {
                                    color: 'rgba(17, 20, 18, 0.8)',
                                },
                            },
                            '&.Mui-focusVisible .MuiSwitch-thumb': {
                                color: '#6fdba9',
                                border: '6px solid #003824',
                            },
                            '&.Mui-disabled .MuiSwitch-thumb': {
                                color: 'rgba(225, 227, 223, 0.3)',
                            },
                        },
                        '& .MuiSwitch-thumb': {
                            boxSizing: 'border-box',
                            color: '#8a938c',
                            width: 12,
                            height: 12,
                            '&:before': {
                                content: "''",
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                left: 0,
                                top: 0,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                            },
                        },
                        '& .MuiSwitch-track': {
                            borderRadius: 20,
                            border: '2px solid #8a938c',
                            backgroundColor: '#323633',
                            opacity: 1,
                            transition: 'background .2s',
                        },
                    },
                },
            },
            MuiToggleButton: {
                styleOverrides: {
                    root: {
                        borderRadius: '50px',
                        textTransform: 'none',
                        color: '#e1e3df',
                        '&.Mui-selected': {
                            color: '#cfe9d8',
                            backgroundColor: '#364b40',
                        },
                        '&.MuiToggleButton-primary': {
                            borderColor: 'transparent',
                        },
                        '&.MuiToggleButton-primary.Mui-selected': {
                            color: '#003824',
                            backgroundColor: '#6fdba9',
                        },
                    },
                },
            },
            MuiToggleButtonGroup: {
                styleOverrides: {
                    grouped: {
                        borderRadius: '50px',
                        borderColor: '#8a938c',
                        '&:not(:first-of-type)': {
                            marginLeft: 0,
                            borderLeft: 0,
                        },
                        '&:hover': {
                            background: '#1c231f',
                        },
                        '&.Mui-selected:hover': {
                            background: '#41564b',
                        },
                    },
                },
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        background: '#e1e3df',
                        color: '#2e312f',
                    },
                },
            },
        },
        palette: {
            mode: 'light',
            themeMode: 'dark',
            primary: {
                main: '#6fdba9',
                contrastText: '#003824',
                light: 'rgb(139, 226, 186)',
                dark: 'rgb(77, 153, 118)',
            },
            onPrimary: {
                main: '#003824',
                contrastText: '#6fdba9',
            },
            primaryContainer: {
                main: '#005236',
                contrastText: '#8bf7c4',
            },
            onPrimaryContainer: {
                main: '#8bf7c4',
                contrastText: '#005236',
            },
            secondary: {
                main: '#b4ccbd',
                contrastText: '#20352a',
                light: 'rgb(195, 214, 202)',
                dark: 'rgb(125, 142, 132)',
            },
            onSecondary: {
                main: '#20352a',
                contrastText: '#b4ccbd',
            },
            secondaryContainer: {
                main: '#364b40',
                contrastText: '#cfe9d8',
            },
            onSecondaryContainer: {
                main: '#cfe9d8',
                contrastText: '#364b40',
            },
            tertiary: {
                main: '#a5cdde',
                contrastText: '#063543',
            },
            onTertiary: {
                main: '#063543',
                contrastText: '#a5cdde',
            },
            tertiaryContainer: {
                main: '#244c5a',
                contrastText: '#c0e9fb',
            },
            onTertiaryContainer: {
                main: '#c0e9fb',
                contrastText: '#244c5a',
            },
            error: {
                main: '#ffb4ab',
                contrastText: '#690005',
                light: 'rgb(255, 195, 187)',
                dark: 'rgb(178, 125, 119)',
            },
            onError: {
                main: '#690005',
                contrastText: '#ffb4ab',
            },
            errorContainer: {
                main: '#93000a',
                contrastText: '#ffdad6',
            },
            onErrorContainer: {
                main: '#ffdad6',
                contrastText: '#93000a',
            },
            primaryFixed: {
                main: '#8bf7c4',
            },
            primaryFixedDim: {
                main: '#6fdba9',
            },
            onPrimaryFixed: {
                main: '#002114',
            },
            onPrimaryFixedVariant: {
                main: '#005236',
            },
            secondaryFixed: {
                main: '#cfe9d8',
            },
            secondaryFixedDim: {
                main: '#b4ccbd',
            },
            onSecondaryFixed: {
                main: '#0a1f16',
            },
            onSecondaryFixedVariant: {
                main: '#364b40',
            },
            tertiaryFixed: {
                main: '#c0e9fb',
            },
            tertiaryFixedDim: {
                main: '#a5cdde',
            },
            onTertiaryFixed: {
                main: '#001f29',
            },
            onTertiaryFixedVariant: {
                main: '#244c5a',
            },
            surface: {
                main: '#111412',
                contrastText: '#e1e3df',
            },
            onSurface: {
                main: '#e1e3df',
                contrastText: '#111412',
            },
            surfaceDim: {
                main: '#111412',
            },
            surfaceBright: {
                main: '#373a37',
            },
            surfaceContainerLowest: {
                main: '#0c0f0d',
            },
            surfaceContainerLow: {
                main: '#191c1a',
            },
            surfaceContainer: {
                main: '#1d201e',
            },
            surfaceContainerHigh: {
                main: '#272b28',
            },
            surfaceContainerHighest: {
                main: '#323633',
            },
            surfaceVariant: {
                main: '#404943',
                contrastText: '#c0c9c1',
            },
            onSurfaceVariant: {
                main: '#c0c9c1',
                contrastText: '#404943',
            },
            outline: {
                main: '#8a938c',
            },
            outlineVariant: {
                main: '#404943',
            },
            inversePrimary: {
                main: '#006c4a',
                contrastText: '',
            },
            inverseOnPrimary: {
                main: '',
                contrastText: '#006c4a',
            },
            inverseSurface: {
                main: '#e1e3df',
                contrastText: '#e1e3df',
            },
            inverseOnSurface: {
                main: '#2e312f',
                contrastText: '#e1e3df',
            },
            shadow: {
                main: '#000000',
            },
            scrim: {
                main: '#000000',
            },
            surfaceTintColor: {
                main: '#6fdba9',
            },
            background: {
                default: '#1d201e',
                paper: '#111412',
            },
            onBackground: {
                main: '#e1e3df',
            },
            common: {
                white: '#111412',
                black: '#e1e3df',
            },
            text: {
                primary: '#e1e3df',
                secondary: '#cfe9d8',
                disabled: 'rgba(0, 0, 0, 0.38)',
            },
            info: {
                main: '#75d1ff',
                contrastText: '#003548',
                light: 'rgb(144, 218, 255)',
                dark: 'rgb(81, 146, 178)',
            },
            onInfo: {
                main: '#003548',
                contrastText: '#75d1ff',
            },
            infoContainer: {
                main: '#004d67',
                contrastText: '#c2e8ff',
            },
            onInfoContainer: {
                main: '#c2e8ff',
                contrastText: '#004d67',
            },
            success: {
                main: '#75db95',
                contrastText: '#00391b',
                light: 'rgb(144, 226, 170)',
                dark: 'rgb(81, 153, 104)',
            },
            onSuccess: {
                main: '#00391b',
                contrastText: '#75db95',
            },
            successContainer: {
                main: '#005229',
                contrastText: '#91f8af',
            },
            onSuccessContainer: {
                main: '#91f8af',
                contrastText: '#005229',
            },
            warning: {
                main: '#f8bd26',
                contrastText: '#402d00',
                light: 'rgb(249, 202, 81)',
                dark: 'rgb(173, 132, 26)',
            },
            onWarning: {
                main: '#402d00',
                contrastText: '#f8bd26',
            },
            warningContainer: {
                main: '#5b4300',
                contrastText: '#ffdf9f',
            },
            onWarningContainer: {
                main: '#ffdf9f',
                contrastText: '#5b4300',
            },
            divider: '#8a938c',
            grey: {
                '50': '#fafafa',
                '100': '#f5f5f5',
                '200': '#eeeeee',
                '300': '#e0e0e0',
                '400': '#bdbdbd',
                '500': '#9e9e9e',
                '600': '#757575',
                '700': '#616161',
                '800': '#424242',
                '900': '#212121',
                A100: '#f5f5f5',
                A200: '#eeeeee',
                A400: '#bdbdbd',
                A700: '#616161',
            },
            contrastThreshold: 3,
            tonalOffset: 0.2,
            action: {
                active: 'rgba(0, 0, 0, 0.54)',
                hover: 'rgba(0, 0, 0, 0.04)',
                hoverOpacity: 0.04,
                selected: 'rgba(0, 0, 0, 0.08)',
                selectedOpacity: 0.08,
                disabled: 'rgba(0, 0, 0, 0.26)',
                disabledBackground: 'rgba(0, 0, 0, 0.12)',
                disabledOpacity: 0.38,
                focus: 'rgba(0, 0, 0, 0.12)',
                focusOpacity: 0.12,
                activatedOpacity: 0.12,
            },
        },
        shape: {
            borderRadius: 4,
        },
        tones: {
            primary: {
                '0': '#000000',
                '4': '#001209',
                '6': '#00180d',
                '10': '#002114',
                '12': '#002517',
                '17': '#00311f',
                '20': '#003824',
                '22': '#003d28',
                '24': '#00422b',
                '30': '#005236',
                '40': '#006c4a',
                '50': '#00885e',
                '60': '#31a376',
                '70': '#51be8f',
                '80': '#6fdba9',
                '87': '#83efbc',
                '90': '#8bf7c4',
                '92': '#91fdc9',
                '94': '#aeffd5',
                '95': '#beffdc',
                '96': '#cdffe2',
                '98': '#e8ffef',
                '99': '#f4fff6',
                '100': '#ffffff',
            },
            secondary: {
                '0': '#000000',
                '4': '#001209',
                '6': '#03170e',
                '10': '#0a1f16',
                '12': '#0e241a',
                '17': '#192e24',
                '20': '#20352a',
                '22': '#24392e',
                '24': '#283e32',
                '30': '#364b40',
                '40': '#4d6357',
                '50': '#657c6f',
                '60': '#7f9688',
                '70': '#99b1a2',
                '80': '#b4ccbd',
                '87': '#c7e0d0',
                '90': '#cfe9d8',
                '92': '#d5eede',
                '94': '#dbf4e3',
                '95': '#def7e6',
                '96': '#e0fae9',
                '98': '#e8ffef',
                '99': '#f4fff6',
                '100': '#ffffff',
            },
            tertiary: {
                '0': '#000000',
                '4': '#001017',
                '6': '#00161e',
                '10': '#001f29',
                '12': '#00232e',
                '17': '#002e3c',
                '20': '#063543',
                '22': '#0d3947',
                '24': '#133e4c',
                '30': '#244c5a',
                '40': '#3d6473',
                '50': '#567d8c',
                '60': '#6f96a7',
                '70': '#8ab1c2',
                '80': '#a5cdde',
                '87': '#b8e0f2',
                '90': '#c0e9fb',
                '92': '#c8eeff',
                '94': '#d7f2ff',
                '95': '#def4ff',
                '96': '#e5f6ff',
                '98': '#f3faff',
                '99': '#fafdff',
                '100': '#ffffff',
            },
            neutral: {
                '0': '#000000',
                '4': '#0c0f0d',
                '6': '#111412',
                '10': '#191c1a',
                '12': '#1d201e',
                '17': '#272b28',
                '20': '#2e312f',
                '22': '#323633',
                '24': '#373a37',
                '30': '#444845',
                '40': '#5c5f5c',
                '50': '#757875',
                '60': '#8f918e',
                '70': '#a9aca8',
                '80': '#c5c7c3',
                '87': '#d8dbd7',
                '90': '#e1e3df',
                '92': '#e7e9e5',
                '94': '#eceeea',
                '95': '#eff1ed',
                '96': '#f2f4f0',
                '98': '#f8faf6',
                '99': '#fbfdf9',
                '100': '#ffffff',
            },
            neutralVariant: {
                '0': '#000000',
                '4': '#08100c',
                '6': '#0d1511',
                '10': '#151d19',
                '12': '#19211d',
                '17': '#232c27',
                '20': '#2a322d',
                '22': '#2e3731',
                '24': '#333b36',
                '30': '#404943',
                '40': '#58605a',
                '50': '#707973',
                '60': '#8a938c',
                '70': '#a4ada6',
                '80': '#c0c9c1',
                '87': '#d3dcd4',
                '90': '#dce5dd',
                '92': '#e1ebe2',
                '94': '#e7f0e8',
                '95': '#eaf3eb',
                '96': '#edf6ee',
                '98': '#f3fcf3',
                '99': '#f5fff6',
                '100': '#ffffff',
            },
            error: {
                '0': '#000000',
                '4': '#280001',
                '6': '#310001',
                '10': '#410002',
                '12': '#490002',
                '17': '#5c0004',
                '20': '#690005',
                '22': '#710005',
                '24': '#790006',
                '30': '#93000a',
                '40': '#ba1a1a',
                '50': '#de3730',
                '60': '#ff5449',
                '70': '#ff897d',
                '80': '#ffb4ab',
                '87': '#ffcfc9',
                '90': '#ffdad6',
                '92': '#ffe2de',
                '94': '#ffe9e6',
                '95': '#ffedea',
                '96': '#fff0ee',
                '98': '#fff8f7',
                '99': '#fffbff',
                '100': '#ffffff',
            },
        },
        unstable_sxConfig: {
            border: {
                themeKey: 'borders',
            },
            borderTop: {
                themeKey: 'borders',
            },
            borderRight: {
                themeKey: 'borders',
            },
            borderBottom: {
                themeKey: 'borders',
            },
            borderLeft: {
                themeKey: 'borders',
            },
            borderColor: {
                themeKey: 'palette',
            },
            borderTopColor: {
                themeKey: 'palette',
            },
            borderRightColor: {
                themeKey: 'palette',
            },
            borderBottomColor: {
                themeKey: 'palette',
            },
            borderLeftColor: {
                themeKey: 'palette',
            },
            borderRadius: {
                themeKey: 'shape.borderRadius',
            },
            color: {
                themeKey: 'palette',
            },
            bgcolor: {
                themeKey: 'palette',
                cssProperty: 'backgroundColor',
            },
            backgroundColor: {
                themeKey: 'palette',
            },
            p: {},
            pt: {},
            pr: {},
            pb: {},
            pl: {},
            px: {},
            py: {},
            padding: {},
            paddingTop: {},
            paddingRight: {},
            paddingBottom: {},
            paddingLeft: {},
            paddingX: {},
            paddingY: {},
            paddingInline: {},
            paddingInlineStart: {},
            paddingInlineEnd: {},
            paddingBlock: {},
            paddingBlockStart: {},
            paddingBlockEnd: {},
            m: {},
            mt: {},
            mr: {},
            mb: {},
            ml: {},
            mx: {},
            my: {},
            margin: {},
            marginTop: {},
            marginRight: {},
            marginBottom: {},
            marginLeft: {},
            marginX: {},
            marginY: {},
            marginInline: {},
            marginInlineStart: {},
            marginInlineEnd: {},
            marginBlock: {},
            marginBlockStart: {},
            marginBlockEnd: {},
            displayPrint: {
                cssProperty: false,
            },
            display: {},
            overflow: {},
            textOverflow: {},
            visibility: {},
            whiteSpace: {},
            flexBasis: {},
            flexDirection: {},
            flexWrap: {},
            justifyContent: {},
            alignItems: {},
            alignContent: {},
            order: {},
            flex: {},
            flexGrow: {},
            flexShrink: {},
            alignSelf: {},
            justifyItems: {},
            justifySelf: {},
            gap: {},
            rowGap: {},
            columnGap: {},
            gridColumn: {},
            gridRow: {},
            gridAutoFlow: {},
            gridAutoColumns: {},
            gridAutoRows: {},
            gridTemplateColumns: {},
            gridTemplateRows: {},
            gridTemplateAreas: {},
            gridArea: {},
            position: {},
            zIndex: {
                themeKey: 'zIndex',
            },
            top: {},
            right: {},
            bottom: {},
            left: {},
            boxShadow: {
                themeKey: 'shadows',
            },
            width: {},
            maxWidth: {},
            minWidth: {},
            height: {},
            maxHeight: {},
            minHeight: {},
            boxSizing: {},
            fontFamily: {
                themeKey: 'typography',
            },
            fontSize: {
                themeKey: 'typography',
            },
            fontStyle: {
                themeKey: 'typography',
            },
            fontWeight: {
                themeKey: 'typography',
            },
            letterSpacing: {},
            textTransform: {},
            lineHeight: {},
            textAlign: {},
            typography: {
                cssProperty: false,
                themeKey: 'typography',
            },
        },
        mixins: {
            toolbar: {
                minHeight: 56,
                '@media (min-width:0px)': {
                    '@media (orientation: landscape)': {
                        minHeight: 48,
                    },
                },
                '@media (min-width:600px)': {
                    minHeight: 64,
                },
            },
        },
        shadows: [
            'none',
            '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
            '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
            '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
            '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
            '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
            '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
            '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
            '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
            '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
            '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
            '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
            '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
            '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
            '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
            '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
            '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
            '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
            '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
            '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
            '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
            '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
            '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
            '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
            '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
        ],
        typography: {
            htmlFontSize: 16,
            fontFamily: '"Bai Jamjuree", sans-serif',
            fontSize: 14,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 500,
            fontWeightBold: 700,
            h1: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 300,
                fontSize: '6rem',
                lineHeight: 1.167,
                letterSpacing: '-0.01562em',
            },
            h2: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 300,
                fontSize: '3.75rem',
                lineHeight: 1.2,
                letterSpacing: '-0.00833em',
            },
            h3: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 400,
                fontSize: '3rem',
                lineHeight: 1.167,
                letterSpacing: '0em',
            },
            h4: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 400,
                fontSize: '2.125rem',
                lineHeight: 1.235,
                letterSpacing: '0.00735em',
            },
            h5: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 400,
                fontSize: '1.5rem',
                lineHeight: 1.334,
                letterSpacing: '0em',
            },
            h6: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 500,
                fontSize: '1.25rem',
                lineHeight: 1.6,
                letterSpacing: '0.0075em',
            },
            subtitle1: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 400,
                fontSize: '1rem',
                lineHeight: 1.75,
                letterSpacing: '0.00938em',
            },
            subtitle2: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 500,
                fontSize: '0.875rem',
                lineHeight: 1.57,
                letterSpacing: '0.00714em',
            },
            body1: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 400,
                fontSize: '1rem',
                lineHeight: 1.5,
                letterSpacing: '0.00938em',
            },
            body2: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 400,
                fontSize: '0.875rem',
                lineHeight: 1.43,
                letterSpacing: '0.01071em',
            },
            button: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 500,
                fontSize: '1.5rem',
                lineHeight: 1.75,
                letterSpacing: '0.02857em',
                textTransform: 'uppercase',
            },
            caption: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 400,
                fontSize: '0.75rem',
                lineHeight: 1.66,
                letterSpacing: '0.03333em',
            },
            overline: {
                fontFamily: '"Bai Jamjuree", sans-serif',
                fontWeight: 400,
                fontSize: '0.75rem',
                lineHeight: 2.66,
                letterSpacing: '0.08333em',
                textTransform: 'uppercase',
            },
            inherit: {
                fontFamily: 'inherit',
                fontWeight: 'inherit',
                fontSize: 'inherit',
                lineHeight: 'inherit',
                letterSpacing: 'inherit',
            },
        },
        transitions: {
            easing: {
                easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
                easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
                easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
                sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
            },
            duration: {
                shortest: 150,
                shorter: 200,
                short: 250,
                standard: 300,
                complex: 375,
                enteringScreen: 225,
                leavingScreen: 195,
            },
        },
        zIndex: {
            mobileStepper: 1000,
            fab: 1050,
            speedDial: 1050,
            appBar: 1100,
            drawer: 1200,
            modal: 1300,
            snackbar: 1400,
            tooltip: 1500,
        },
    },
}
