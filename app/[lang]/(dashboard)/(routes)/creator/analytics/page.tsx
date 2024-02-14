import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { getAnalytics } from "@/actions/get-analytics";
import DataCard from "./_components/data-card";
import Chart from "./_components/chart";
import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/i18n";

const AnalyticsPage = async ({ params }: { params: { lang: Locale } }): Promise<JSX.Element> => {
  const {lang} = params;

  const { userId } = auth();
  if (!userId) return redirect(`/${lang}`);

  const { data, totalSales, totalRevenue, } = await getAnalytics(userId);

  const t = await getDictionary(lang);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard value={totalRevenue} label={t.analytics.totalRevenue} shouldFormat />
        <DataCard value={totalSales} label={t.analytics.totalSales} />
      </div>
      <Chart data={data}/>
    </div>
  );
}

export default AnalyticsPage;