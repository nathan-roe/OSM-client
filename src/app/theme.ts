import {createTheme, MantineColorsTuple} from "@mantine/core";

const primary: MantineColorsTuple = [
    "#e6fcf5",
    "#c3fae8",
    "#96f2d7",
    "#63e6be",
    "#38d9a9",
    "#20c997",
    "#12b886",
    "#0ca678",
    "#099268",
    "#087f5b"
];

const secondary: MantineColorsTuple = [
    "#e9faf0",
    "#d3f9d8",
    "#b2f2bb",
    "#8ce99a",
    "#69db7c",
    "#51cf66",
    "#40c057",
    "#37b24d",
    "#2f9e44",
    "#2b8a3e"
]

const background: MantineColorsTuple = [
    "#f2f7f6",
    "#e7ebea",
    "#cad6d2",
    "#aac1b9",
    "#8fafa4",
    "#7da496",
    "#739e8f",
    "#618a7c",
    "#547b6d",
    "#436b5d"
];

const text: MantineColorsTuple = [
    "#f5f5f5",
    "#e7e7e7",
    "#cdcdcd",
    "#b2b2b2",
    "#9a9a9a",
    "#8b8b8b",
    "#848484",
    "#717171",
    "#656565",
    "#212222"
];

const theme = createTheme({
    primaryColor: 'primary',
    colors: {
        primary,
        secondary,
        background,
        text
    }
});

export default theme;