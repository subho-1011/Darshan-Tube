// utils/auth-rate-limiter.ts
const loginAttempts = new Map<
    string,
    { attempts: number; lastAttempt: Date }
>();

const MAX_ATTEMPTS = 3;
const BLOCK_TIME = 1 * 60 * 1000; // 5 minutes

export const authRateLimiter = async (email: string) => {
    const now = new Date();
    const userAttempts = loginAttempts.get(email);

    if (userAttempts) {
        const timeDifference =
            now.getTime() - userAttempts.lastAttempt.getTime();

        if (timeDifference > BLOCK_TIME) {
            loginAttempts.set(email, { attempts: 1, lastAttempt: now });
            return { success: true };
        }

        if (userAttempts.attempts >= MAX_ATTEMPTS) {
            return { success: false };
        }

        userAttempts.attempts += 1;
        userAttempts.lastAttempt = now;
        loginAttempts.set(email, userAttempts);
    } else {
        loginAttempts.set(email, { attempts: 1, lastAttempt: now });
    }

    return { success: true };
};
