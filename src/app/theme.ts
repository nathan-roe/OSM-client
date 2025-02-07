import {createTheme, MantineColorsTuple} from "@mantine/core";

const primary: MantineColorsTuple = [
    "#f1f9f6",
    "#e4eeea",
    "#c3ddd3",
    "#a0ccba",
    "#82bda5",
    "#6fb497",
    "#64b090",
    "#539a7d",
    "#47896e",
    "#37775e"
];

const secondary: MantineColorsTuple = [
    "#eff0fb",
    "#dbddef",
    "#b3b8e2",
    "#8991d5",
    "#666fca",
    "#505ac4",
    "#4550c2",
    "#3741ab",
    "#303999",
    "#191970"
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