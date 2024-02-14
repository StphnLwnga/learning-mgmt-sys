import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionary";

/**
 * Render a dashboard layout with a sidebar and children components.
 *
 * @param {Object} props - The props for the DashboardLayout component.
 * @param {React.ReactNode} props.children - The children components to render inside the layout.
 * @return {JSX.Element} The rendered dashboard layout.
 */
const DashboardLayout = async ({ children, params }: { children: React.ReactNode, params: { lang: Locale } }): Promise<JSX.Element> => {
  const t = await getDictionary(params.lang);

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-49 navbar">
        <Navbar lang={params.lang} dict={t} />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar lang={params.lang} dict={t} />
      </div>
      <main className="md:pl-56 pt-[80px] h-full main-body">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;