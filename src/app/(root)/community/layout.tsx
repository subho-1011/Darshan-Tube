import React from "react";

const CommunityLayout: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    return (
        <div className="container mx-auto w-full px-4 py-8 justify-center">
            <div className="w-full flex flex-col  justify-center items-center space-y-6">
                <React.Fragment>{children}</React.Fragment>
            </div>
        </div>
    );
};

export default CommunityLayout;
