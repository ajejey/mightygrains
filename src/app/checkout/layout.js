

export default function CheckoutLayout({ children }) {
  // const router = useRouter();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const session = await account.get();
  //       router.push('/checkout/shipping-info');
  //     } catch (error) {
  //       // No active session, stay on current page
  //       console.log('No active session');
  //     }
  //   };

  //   checkAuth();
  // }, [router]);

  return <>{children}</>;
}
