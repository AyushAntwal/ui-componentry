import React from "react";
import Link from "next/link";

interface DashboardCardProps {
  icon?: React.ReactNode;
  title: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  href?: string;
}

const CardContent = ({
  icon,
  title,
  footer,
  children,
}: Omit<DashboardCardProps, "href">) => (
  <>
    {/* Header */}
    <div className="mb-3 flex items-center gap-3">
      {icon && (
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg
                        bg-gray-100 text-gray-700
                        dark:bg-neutral-800 dark:text-neutral-300"
        >
          {icon}
        </div>
      )}

      <h3 className="text-sm font-semibold text-gray-700 dark:text-neutral-300">
        {title}
      </h3>
    </div>

    {/* Content */}
    <div className="text-2xl font-bold text-gray-900 dark:text-white">
      {children}
    </div>

    {/* Footer */}
    {footer && (
      <div className="mt-2 text-xs text-gray-500 dark:text-neutral-400">
        {footer}
      </div>
    )}
  </>
);

export default function Card(props: DashboardCardProps) {
  const baseClass =
    "block rounded-xl border border-gray-200 bg-white p-4 transition-all " +
    "hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900";

  if (props.href) {
    return (
      <Link href={props.href} className={baseClass}>
        <CardContent {...props} />
      </Link>
    );
  }

  return (
    <div className={baseClass}>
      <CardContent {...props} />
    </div>
  );
}
