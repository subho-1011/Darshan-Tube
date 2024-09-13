import React from "react";

interface AuthPageLayoutProps {
    children: React.ReactNode;
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col w-full justify-center place-items-center min-h-screen">
            <div className="flex-grow -ml-16">{children}</div>
        </div>
    );
};

export default AuthPageLayout;
