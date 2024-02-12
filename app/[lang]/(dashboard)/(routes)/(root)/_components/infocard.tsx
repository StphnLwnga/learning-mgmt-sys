import IconBadge from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  numebrOfItems: number;
  variant?: "default" | "success";
}

const InfoCard = ({ icon: Icon, label, numebrOfItems, variant, }: InfoCardProps): JSX.Element => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge icon={Icon} variant={variant} />
      <div>
        <p className="font-medium text-slate-700">{label}</p>
        <p className="text-sm text-gray-500">{`${numebrOfItems} Course${numebrOfItems !== 1 ? 's' : ''}`}</p>
      </div>
    </div>
  );
}

export default InfoCard;