"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

// The form (and its server action) is only fetched the first time the dialog opens.
const ContactForm = dynamic(() => import("./contact-form").then((m) => m.ContactForm), {
  ssr: false,
  loading: () => <p className="text-muted text-sm">Loading…</p>,
});

const ContactDialogContext = createContext<(() => void) | null>(null);

export function ContactDialogProvider({
  email,
  children,
}: {
  email: string | null;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  // Bumped on every open. Keying the content on it rebuilds the form fresh each time, so a sent
  // or half-filled form never carries over, with no dependence on close-event timing.
  const [session, setSession] = useState(0);
  const titleId = useId();

  const show = useCallback(() => {
    setSession((n) => n + 1);
    if (!ref.current?.open) ref.current?.showModal();
  }, []);

  return (
    <ContactDialogContext.Provider value={show}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby={titleId}
        // A click on the backdrop lands on the <dialog> element itself, not on its content.
        onClick={(e) => {
          if (e.target === ref.current) ref.current?.close();
        }}
        className="bg-bg text-fg border-control m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto border p-6 backdrop:bg-black/70 sm:p-8"
      >
        {session > 0 ? (
          <div key={session}>
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-accent font-mono text-xs tracking-widest uppercase">
                  Contact
                </p>
                <h2 id={titleId} className="font-display mt-2 text-2xl">
                  Let&apos;s talk
                </h2>
                <p className="text-muted mt-2 text-sm">
                  Hiring for a graduate full-stack or ML role, or have something to build?
                </p>
              </div>
              <button
                type="button"
                onClick={() => ref.current?.close()}
                aria-label="Close contact form"
                className="text-muted hover:text-fg border-control inline-flex h-9 w-9 shrink-0 items-center justify-center border"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
            <ContactForm email={email} />
          </div>
        ) : null}
      </dialog>
    </ContactDialogContext.Provider>
  );
}

type TriggerProps = {
  className?: string;
  children: ReactNode;
  "aria-current"?: "page";
};

/**
 * A normal link to /contact that opens the dialog instead. Without JavaScript, outside the
 * provider, or when already on /contact, it simply navigates as a regular link.
 */
export function ContactTrigger({ className, children, ...rest }: TriggerProps) {
  const show = useContext(ContactDialogContext);
  const pathname = usePathname();

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (!show || pathname === "/contact") return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // keep "open in new tab"
    e.preventDefault();
    show();
  }

  return (
    <a href="/contact" onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  );
}
