import { logoMarkPaths } from "@/lib/logo-mark";

type BrandLockupProps = {
  compact?: boolean;
  align?: "left" | "center";
};

export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {logoMarkPaths.map((d) => <path key={d} d={d} fill="currentColor" fillRule="evenodd" />)}
    </svg>
  );
}

export function BrandLockup({
  compact = false,
  align = "left",
}: BrandLockupProps) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-teal ${
        align === "center" ? "flex-col text-center" : ""
      }`}
    >
      <LogoMark className={compact ? "h-8 w-8" : "h-12 w-12"} />
      <span className={align === "center" ? "block" : "block"}>
        <span
          className={`block font-semibold leading-none tracking-[0.16em] text-ink ${
            compact ? "text-base" : "text-2xl"
          }`}
        >
          ESHANA
        </span>
        <span
          className={`mt-1 block font-medium uppercase leading-none tracking-[0.22em] text-muted ${
            compact ? "text-[0.6rem]" : "text-[0.68rem]"
          }`}
        >
          SOFTWARE SOLUTIONS
        </span>
      </span>
    </span>
  );
}
