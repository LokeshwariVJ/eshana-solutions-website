import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={
        variant === "primary"
          ? "inline-flex min-h-12 items-center justify-center border border-charcoal bg-charcoal px-5 py-3 text-sm font-medium text-ivory transition hover:-translate-y-0.5 hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal motion-reduce:hover:translate-y-0"
          : "inline-flex min-h-12 items-center justify-center border border-line bg-transparent px-5 py-3 text-sm font-medium text-charcoal transition hover:-translate-y-0.5 hover:border-teal hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal motion-reduce:hover:translate-y-0"
      }
    >
      {children}
    </Link>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-teal">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold leading-tight text-ink md:text-5xl">
        {title}
      </h2>
      {children ? (
        <div className="mt-6 space-y-4 text-pretty text-lg leading-8 text-muted">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  children,
  actions,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="section-pad border-b border-line">
      <div className="container-grid">
        <div className="max-w-4xl">
          {eyebrow ? (
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-teal">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-balance text-5xl font-semibold leading-[0.95] text-ink md:text-7xl">
            {title}
          </h1>
          <div className="mt-7 max-w-3xl space-y-5 text-pretty text-lg leading-8 text-muted md:text-xl md:leading-9">
            {children}
          </div>
          {actions ? <div className="mt-9 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {tags.map((tag) => (
        <li
          key={tag}
          className="border border-line bg-paper px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export function WorkPreview({
  title,
  summary,
  href,
  tags,
  image,
}: {
  title: string;
  summary: string;
  href: string;
  tags: string[];
  image: string;
}) {
  return (
    <article className="group border border-line bg-surface transition hover:-translate-y-1 hover:border-teal motion-reduce:hover:translate-y-0">
      <Link
        href={href}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
      >
        <div className="border-b border-line bg-paper p-4">
          <Image
            src={image}
            alt=""
            width={900}
            height={520}
            className="aspect-[16/10] w-full object-cover"
          />
        </div>
        <div className="space-y-5 p-6 md:p-7">
          <div>
            <h3 className="text-2xl font-semibold text-ink">{title}</h3>
            <p className="mt-2 text-base leading-7 text-muted">{summary}</p>
          </div>
          <TagList tags={tags} />
        </div>
      </Link>
    </article>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-7 text-muted">
          <span className="mt-3 h-px w-5 shrink-0 bg-teal" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
