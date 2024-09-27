export function timeAgo(watchedAt: Date): string {
    const ONE_SECOND_IN_MS = 1000;
    const ONE_MINUTE_IN_MS = ONE_SECOND_IN_MS * 60;
    const ONE_HOUR_IN_MS = ONE_MINUTE_IN_MS * 60;
    const ONE_DAY_IN_MS = ONE_HOUR_IN_MS * 24;
    const ONE_MONTH_IN_MS = ONE_DAY_IN_MS * 30;
    const ONE_YEAR_IN_MS = ONE_DAY_IN_MS * 365;

    const now = new Date();
    const timeDifference = now.getTime() - new Date(watchedAt).getTime();

    if (timeDifference < ONE_SECOND_IN_MS) {
        return "just now";
    }

    if (timeDifference < ONE_MINUTE_IN_MS) {
        return `${Math.floor(timeDifference / ONE_SECOND_IN_MS)} seconds ago`;
    }

    if (timeDifference < ONE_HOUR_IN_MS) {
        return `${Math.floor(timeDifference / ONE_MINUTE_IN_MS)} minutes ago`;
    }

    if (timeDifference < ONE_DAY_IN_MS) {
        return `${Math.floor(timeDifference / ONE_HOUR_IN_MS)} hours ago`;
    }

    if (timeDifference < ONE_MONTH_IN_MS) {
        return `${Math.floor(timeDifference / ONE_DAY_IN_MS)} days ago`;
    }

    if (timeDifference < ONE_YEAR_IN_MS) {
        return `${Math.floor(timeDifference / ONE_MONTH_IN_MS)} months ago`;
    }

    return `${Math.floor(timeDifference / ONE_YEAR_IN_MS)} years ago`;
}
