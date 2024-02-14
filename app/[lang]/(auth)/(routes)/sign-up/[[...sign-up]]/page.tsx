import { SignUp } from "@clerk/nextjs";
import { Locale } from "@/i18n";

/**
 * Renders the Page component.
 *
 * @return {JSX.Element} The rendered SignUp component.
 */
export default function Page({ params }: { params: { lang: Locale } }): JSX.Element {
  const { lang } = params;

  return <SignUp redirectUrl={`${process.env.NEXT_PUBLIC_APP_URL}/${lang}`} />;
}