"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks";
import React from "react";

type ProfilePageProps = {
    // Add any necessary props here
};

const ProfilePage: React.FC<ProfilePageProps> = () => {
    const user = useCurrentUser();

    return (
        <div className="w-full flex flex-1 justify-center">
            {user && (
                <Card className="w-full max-w-3xl">
                    <CardHeader>
                        <CardTitle>Profile Page</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Welcome, {user.name}!</p>
                        {/* Add your profile details here */}
                        <ul className="space-y-3">
                            <li>Email: {user.email}</li>
                            <li>Image: {user.image} </li>
                            <li>Name: {user.name}</li>
                        </ul>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default ProfilePage;
