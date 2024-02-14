import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionary";
import CoursesList from "@/components/courses-list";
import InfoCard from "./_components/infocard";
import { CheckCircle, Clock } from "lucide-react";

export default async function Dashboard({ params }: { params: { lang: Locale } }): Promise<JSX.Element> {
  const { lang } = params;

  const { userId } = auth();
  if (!userId) return redirect(`/${lang}`);

  const t = await getDictionary(lang);

  const { completedCourses, coursesInProgress } = await getDashboardCourses(userId);

  return (
    <div className="h-full p-6 space-y-4">
      <div className="grid grid-cols sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label={t.infocard.inProgress}
          numebrOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label={t.infocard.completed}
          numebrOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CoursesList
        t={t}
        lang={lang}
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  )
}
