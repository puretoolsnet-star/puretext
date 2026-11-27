"use client";

import { useI18n } from "@/i18n/context";
import type { SeoContentBlock } from "@/i18n/tools/types";

export function PageSeoSection({ content }: { content: SeoContentBlock }) {
  const { t } = useI18n();

  return (
    <section
      className="mt-10 min-w-0 max-w-full glass-card rounded-2xl border border-slate-800/80 p-4 sm:p-5"
      aria-labelledby="puretext-seo-usage-heading"
    >
      <h2 id="puretext-seo-usage-heading" className="text-sm font-semibold text-white">
        {t.seoPage.usageHeading}
      </h2>
      <p className="mt-2 max-w-3xl break-words text-xs leading-relaxed text-slate-400">{content.seoUsage}</p>
      <h3 className="mt-5 text-sm font-semibold text-teal-200">{t.seoPage.benefitsHeading}</h3>
      <p className="mt-2 max-w-3xl break-words text-xs leading-relaxed text-slate-400">{content.seoBenefits}</p>
      <h3 className="mt-5 text-sm font-semibold text-white">{t.seoPage.faqHeading}</h3>
      <dl className="mt-3 space-y-3">
        {content.seoFaq.map((item) => (
          <div key={item.question}>
            <dt className="text-xs font-medium text-teal-200/90">{item.question}</dt>
            <dd className="mt-1 max-w-3xl break-words text-xs leading-relaxed text-slate-500">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}