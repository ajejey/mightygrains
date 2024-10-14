import Link from "next/link";

export const CtaButton = ({ href, icon: Icon, text, primary = false }) => (
    <Link href={href} className={`
      flex items-center justify-center 
      ${primary ? 'bg-white text-amber-600 hover:bg-amber-100' : 'bg-amber-700 text-white hover:bg-amber-800'}
      py-3 px-6 rounded-full text-lg font-semibold transition-colors duration-300 mb-4 md:mb-0
    `}>
      <Icon className="mr-2" />
      {text}
    </Link>
  );