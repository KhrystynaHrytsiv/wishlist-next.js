import React, {FC, PropsWithChildren} from 'react';
import ContextProvider from "@/app/Context";

const Layout:FC<PropsWithChildren> = ({children}) => {
    return (
        <div>
            <ContextProvider>
                {children}
            </ContextProvider>
        </div>
    );
};

export default Layout;