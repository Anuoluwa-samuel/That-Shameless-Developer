"use client";

import { useActionState } from "react";
import { sendMessage, type ContactState } from "@/app/(site)/contact/actions";

const initial: ContactState = { status: "idle" };

const field =
  "mt-2 w-full border border-control bg-surface px-4 py-3 text-base placeholder:text-muted aria-[invalid=true]:border-danger";

function mailtoHref(email: string, v?: ContactState["values"]): string {
  const subject = encodeURIComponent(
    `Portfolio message${v?.name ? ` from ${v.name}` : ""}`,
  );
  const body = encodeURIComponent(v?.message ?? "");
  return `mailto:${email}?subject=${subject}&body=${body}`;
}

export function ContactForm({ email }: { email: string | null }) {
  const [state, action, pending] = useActionState(sendMessage, initial);

  if (state.status === "sent") {
    return (
      <div role="status" className="border-accent border p-6">
        <p className="font-display text-xl">Message sent.</p>
        <p className="text-muted mt-2">
          Thank you. I&apos;ll reply to the email you gave.
        </p>
      </div>
    );
  }

  const v = state.values;
  return (
    <form action={action} noValidate className="space-y-6">
      {state.message ? (
        <p role="alert" className="border-border bg-surface border p-4 text-sm">
          {state.message}
          {state.status === "fallback" && email ? (
            <>
              {" "}
              <a
                href={mailtoHref(email, v)}
                className="text-accent underline underline-offset-4"
              >
                Open my email app
              </a>
              .
            </>
          ) : null}
        </p>
      ) : null}

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={v?.name}
          aria-invalid={state.errors?.name ? true : undefined}
          aria-describedby={state.errors?.name ? "name-error" : undefined}
          className={field}
        />
        {state.errors?.name ? (
          <p id="name-error" className="text-danger mt-2 text-sm">
            {state.errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={v?.email}
          aria-invalid={state.errors?.email ? true : undefined}
          aria-describedby={state.errors?.email ? "email-error" : undefined}
          className={field}
        />
        {state.errors?.email ? (
          <p id="email-error" className="text-danger mt-2 text-sm">
            {state.errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={7}
          required
          defaultValue={v?.message}
          aria-invalid={state.errors?.message ? true : undefined}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          className={field}
        />
        {state.errors?.message ? (
          <p id="message-error" className="text-danger mt-2 text-sm">
            {state.errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <button
          type="submit"
          disabled={pending}
          className="bg-accent text-accent-fg inline-flex h-12 items-center px-7 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Sending…" : "Send message"}
        </button>
        {email ? (
          <a
            href={mailtoHref(email, v)}
            className="text-muted hover:text-fg text-sm underline underline-offset-4"
          >
            Or email me directly
          </a>
        ) : null}
      </div>
    </form>
  );
}
