import React from "react";
import {LoadingOverlay, Box} from "@mantine/core";


interface PageOverlayProps {
    visible?: boolean;
}
export const PageOverlay: React.FC<PageOverlayProps> = ({visible = true}) => (
    <LoadingOverlay
        visible={visible}
        zIndex={1000}
        overlayProps={{radius: "sm", blur: 2}}
        loaderProps={{
            type: 'bars'
        }}
    />
)

const PageLoadIndicatorContext = React.createContext({
    loading: false,
    setLoading: (_: boolean) => {},
    overlay: <PageOverlay />
});


interface PageLoadIndicatorProviderProps {
    children: React.ReactNode | React.ReactNode[];
}

export const PageLoadIndicatorProvider = ({children}: PageLoadIndicatorProviderProps) => {
    const [loading, setLoading] = React.useState(false);

    return (
        <PageLoadIndicatorContext.Provider value={{
            loading,
            setLoading,
            overlay: <PageOverlay visible={loading} />
        }}>
            {children}
        </PageLoadIndicatorContext.Provider>
    );
}

export const usePageLoadIndicator = () => React.useContext(PageLoadIndicatorContext);