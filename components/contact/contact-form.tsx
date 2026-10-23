"use client";

import { useActionState, useId } from "react";
import { sendMessage, type ContactState } from "@/app/(site)/contact/actions";
import { Button } from "@/components/ui/button";

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
  const uid = useId();
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
        <label htmlFor={`${uid}-name`} className="text-sm font-medium">
          Name
        </label>
        <input
          id={`${uid}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={v?.name}
          aria-invalid={state.errors?.name ? true : undefined}
          aria-describedby={state.errors?.name ? `${uid}-name-error` : undefined}
          className={field}
        />
        {state.errors?.name ? (
          <p id={`${uid}-name-error`} className="text-danger mt-2 text-sm">
            {state.errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={`${uid}-email`} className="text-sm font-medium">
          Email
        </label>
        <input
          id={`${uid}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={v?.email}
          aria-invalid={state.errors?.email ? true : undefined}
          aria-describedby={state.errors?.email ? `${uid}-email-error` : undefined}
          className={field}
        />
        {state.errors?.email ? (
          <p id={`${uid}-email-error`} className="text-danger mt-2 text-sm">
            {state.errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={`${uid}-message`} className="text-sm font-medium">
          Message
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={7}
          required
          defaultValue={v?.message}
          aria-invalid={state.errors?.message ? true : undefined}
          aria-describedby={state.errors?.message ? `${uid}-message-error` : undefined}
          className={field}
        />
        {state.errors?.message ? (
          <p id={`${uid}-message-error`} className="text-danger mt-2 text-sm">
            {state.errors.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <Button type="submit" disabled={pending} className="h-12 rounded-none px-7">
          {pending ? "Sending…" : "Send message"}
        </Button>
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
