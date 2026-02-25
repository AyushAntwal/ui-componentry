import React from "react";
import Link from "next/link";

interface DashboardCardProps {
  icon?: React.ReactNode;
  title?: string;
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
    <div className="flex items-center gap-3">
      {icon && (
        <div
          className="
            flex h-10 w-10 items-center justify-center rounded-lg
            bg-gray-100 text-gray-200
            dark:bg-gray-800 dark:text-gray-300
            transition-colors
          ">
          {icon}
        </div>
      )}

      {title && (
        <h3 className="text-sm mb-3 font-semibold text-gray-700 dark:text-gray-200">
          {title}
        </h3>
      )}
    </div>

    {/* Content */}
    <div className="text-2xl font-bold text-gray-900 dark:text-white">
      {children}
    </div>

    {/* Footer */}
    {footer && (
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        {footer}
      </div>
    )}
  </>
);

export default function Card(props: DashboardCardProps) {
  const baseClass = `
    block rounded-xl border
    border-gray-200 dark:border-gray-700
    bg-white dark:bg-black
    p-4
    transition-all duration-200
    hover:shadow-md
    hover:bg-gray-50 dark:hover:bg-gray-900
  `;

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
