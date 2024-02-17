import { Locale } from "@/i18n";
import { SignIn } from "@clerk/nextjs";

/**
 * Renders the Page component.
 *
 * @return {JSX.Element} The rendered SignIn component.
 */
export default function Page({ params }: { params: { lang: Locale } }): JSX.Element {
  const { lang } = params;

  return (
  <div className="p-10">
    <SignIn redirectUrl={`${process.env.NEXT_PUBLIC_APP_URL}/${lang}`} />
  </div>
  );
}
