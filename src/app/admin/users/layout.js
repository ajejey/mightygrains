import SuspendedPostHogPageView from "@/app/PostHogPageView";

export default function UsersLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <SuspendedPostHogPageView />
            {children}
        </div>
    );
}
