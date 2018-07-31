import {
    createMuiTheme
} from 'react-material/styles'
import merge from 'deepmerge'
import {
    teal,
    blue,
    red,
    green,
    grey,
    blueGrey,
    yellow,
    orange,
    cyan,
    amber,
} from 'react-material/colors'

const originTheme = createMuiTheme()
const theme = createMuiTheme({
    palette: {
        primary: {
            light: blue[400],
            main: blue[700],
            dark: blue[800],
            contrastText: '#fff',
        },
        active: {
            main: '#009688',
        },
        // amber
        warning: {
            light: orange['300'],
            main: orange['500'],
            dark: orange['700']
        },
        success: {
            light: green['300'],
            main: green['500'],
            dark: green['700']
        },
        progress: {
            light: green['300'],
            main: green['500'],
            dark: green['700']
        },
        background: {
            header: blue[600],
            footer: 'rgba(0,0,0,0.77)',
            body: 'rgba(0,0,0,0.03)',
            table: {
                gray: '#f6f6f6',
                blue: 'rgba(33,150,243, 0.04)',
                odd: 'white',
                even: '#fbfbfb',
                hover: blue[200],
                selected: blue[300],
            },
            textField: '#fbfbfb',
            lightBlue: blue[300],
            textField2: cyan[50],
            okButton: green[500],
            container: '#fff',
            lightGrey: '#eee',
            selected: 'rgba(30, 136, 229, 0.1)'
        },
        color: {
            title: '#fff',
            link: blue[300],
            red: red[400],
            green: green[500],
            amber: amber[400]
        },
        text: {
            color: {
                1: 'rgba(0, 0, 0, 0.87)', // 标题 重要文字
                2: '#666', // 次要文字
                3: '#999', // 最弱文字
                4: '#FFF', // 重要文字（深色背景）
                5: 'rgba(255, 255, 255, 0.8)', // 次要文字（深色背景）,
                6: 'rgba(255, 255, 255, 0.54)',
            }
        },
        line: {
            light: `1px solid ${blue[300]}`,
            dark: `1px solid #e5e5e5`,
            white: `1px dashed rgba(255, 255, 255, 0.25)`,
            dashedDark: `1px dashed rgba(0, 0, 0, 0.25)`
        },
        gray: {
            primary: 'rgba(0, 0, 0, .87)',
            secondary: 'rgba(0, 0, 0, .68)',
            disabledHint: 'rgba(0, 0, 0, .54)',
            dividers: 'rgba(0, 0, 0, .12)',
            background: 'rgba(0, 0, 0, .03)',
        },
        white: {
            primary: 'rgba(255, 255, 255, 1.0)',
            secondary: 'rgba(255, 255, 255, .7)',
            disabledHint: 'rgba(255, 255, 255, .5)',
            dividers: 'rgba(255, 255, 255, .12)',
        }
    },
    typography: {
        fontFamily: "\"Roboto\", \"Microsoft YaHei\", \"Helvetica\", \"Arial\", sans-serif",
        display4: {
            fontFamily: "\"Roboto\", \"Microsoft YaHei\", \"Helvetica\", \"Arial\", sans-serif",
        },
        display3: {
            fontFamily: "\"Roboto\", \"Microsoft YaHei\", \"Helvetica\", \"Arial\", sans-serif",
        },
        display2: {
            fontFamily: "\"Roboto\", \"Microsoft YaHei\", \"Helvetica\", \"Arial\", sans-serif",
        },
        display1: {
            fontFamily: "\"Roboto\", \"Microsoft YaHei\", \"Helvetica\", \"Arial\", sans-serif",
        },
        headline: {
            fontFamily: "\"Roboto\", \"Microsoft YaHei\", \"Helvetica\", \"Arial\", sans-serif",
        },
        title: {
            fontSize: '1.125rem',
            fontWeight: 600,
            fontFamily: "\"Roboto\", \"Microsoft YaHei\", \"Helvetica\", \"Arial\", sans-serif",
        },
        subheading: {
            fontWeight: 600,
            fontSize: '0.875rem',
            fontFamily: "\"Roboto\", \"Microsoft YaHei\", \"Helvetica\", \"Arial\", sans-serif",
        },
        caption: {
            fontFamily: "\"Roboto\", \"Microsoft YaHei\", \"Helvetica\", \"Arial\", sans-serif",
        },
        body1: {
            color: '#666',
            fontFamily: "\"Roboto\", \"Microsoft YaHei\", \"Helvetica\", \"Arial\", sans-serif",
        },
        // body2: {
        //   fontWeight: 300,
        //   color: 'rgba(255, 255, 255, 0.8)'
        // },
        body3: {
            ...originTheme.typography.body2,
            fontWeight: 300,
            color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: "\"Roboto\", \"Microsoft YaHei\", \"Helvetica\", \"Arial\", sans-serif",
        },
        button: {
            fontWeight: 400,
            fontFamily: "\"Roboto\", \"Microsoft YaHei\", \"Helvetica\", \"Arial\", sans-serif",
            textTransform: 'inherit'
        },
        table: {
            head: {
                light: {
                    border: 'none',
                    ...originTheme.typography.body2,
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: 400
                },
                dark: {}
            },
            cell: {
                light: {
                    border: 'none',
                    ...originTheme.typography.body2,
                    color: 'rgba(255, 255, 255, 0.54)',
                    fontWeight: 300
                },
                dark: {}
            }
        }
    },
    page: {
        padding: "24px 48px",
    },
    img: {
        default: 'https://avatars3.githubusercontent.com/u/1763968?s=400&v=4'
    }
});

export default theme