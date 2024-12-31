import SuspendedPostHogPageView from '@/app/PostHogPageView';
import SupportBanner from '@/components/SupportBanner';

export default function OrderDetailsLayout({ children }) {
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <SuspendedPostHogPageView />
        {children}
      </div>
      <SupportBanner />
    </>
  );
}