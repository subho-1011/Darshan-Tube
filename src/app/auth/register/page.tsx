import { RegisterForm } from "@/components/auth";
import { Suspense } from "react";

const RegisterPage = () => {
    return (
        <Suspense>
            <RegisterForm />
        </Suspense>
    );
};

export default RegisterPage;
