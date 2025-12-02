import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
}

export default function ServiceCard({
  title,
  description,
  href,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group block border-2 border-border bg-card p-6 rounded-xl hover:border-primary hover:shadow-md transition-all duration-300"
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <h3 className="text-xl font-bold text-primary mb-3 font-serif">
            {title}
          </h3>
          <p className="text-foreground/80 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-2 text-secondary font-bold text-sm group-hover:gap-3 transition-all">
          <span>التفاصيل</span>
          <ArrowLeft className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
