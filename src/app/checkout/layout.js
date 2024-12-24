import SupportBanner from '@/components/SupportBanner';

export default function CheckoutLayout({ children }) {
  return (
    <div>
      {children}
      <SupportBanner />
    </div>
  );
}
