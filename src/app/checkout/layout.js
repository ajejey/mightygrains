import SupportBanner from '@/components/SupportBanner';
import SuspendedPostHogPageView from '../PostHogPageView';

export default function CheckoutLayout({ children }) {
  return (
    <div>
      <SuspendedPostHogPageView />
      {children}
      <SupportBanner />
    </div>
  );
}
