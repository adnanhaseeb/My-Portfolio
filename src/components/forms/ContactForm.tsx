"use client";

import { CircleAlert, LoaderCircle, Mail, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { useContactForm, type ContactField, type ContactFormStatus } from "@/hooks/useContactForm";
import { isEmailConfigured } from "@/lib/emailjs";
import { cn } from "@/lib/utils";

const fieldClassName = "h-11 rounded-xl bg-background px-3.5 text-base md:text-sm dark:bg-input/30";

const statusAnnouncements: Record<ContactFormStatus, string> = {
  idle: "",
  sending: "Sending your message.",
  success: contact.successMessage,
  error: contact.errorMessage,
};

function errorId(field: ContactField) {
  return `contact-${field}-error`;
}

function renderError(field: ContactField, message?: string) {
  if (!message) return null;

  return (
    <p id={errorId(field)} className="flex items-start gap-1.5 text-sm text-destructive">
      <CircleAlert aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
      {message}
    </p>
  );
}

export function ContactForm() {
  const { values, errors, status, handleChange, handleBlur, handleSubmit } = useContactForm();

  if (!isEmailConfigured) {
    return (
      <div role="status" className="flex flex-col items-start gap-5 rounded-2xl border bg-background/60 p-6 sm:p-8">
        <span className="flex size-10 items-center justify-center rounded-xl border bg-card text-brand-blue">
          <Mail aria-hidden="true" className="size-5" />
        </span>
        <p className="text-base text-pretty text-foreground">{contact.missingConfigMessage}</p>
        <Button asChild size="lg" className="h-11 max-w-full rounded-xl px-5">
          <a href={`mailto:${site.email}`}>
            <Mail aria-hidden="true" />
            <span className="truncate">{site.email}</span>
          </a>
        </Button>
      </div>
    );
  }

  const isSending = status === "sending";

  return (
    <form noValidate onSubmit={handleSubmit} aria-busy={isSending} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-name">Name</Label>
          <Input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? errorId("name") : undefined}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldClassName}
          />
          {renderError("name", errors.name)}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? errorId("email") : undefined}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldClassName}
          />
          {renderError("email", errors.email)}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          name="message"
          rows={6}
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? errorId("message") : undefined}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(fieldClassName, "h-auto min-h-40 resize-y py-3")}
        />
        {renderError("message", errors.message)}
      </div>

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">All fields are required.</p>
        <Button
          type="submit"
          size="lg"
          disabled={isSending}
          className="h-11 w-full rounded-xl bg-gradient-brand px-6 text-white shadow-sm hover:opacity-90 sm:w-auto dark:text-zinc-950"
        >
          {isSending ? (
            <LoaderCircle aria-hidden="true" className="motion-safe:animate-spin" />
          ) : (
            <Send aria-hidden="true" />
          )}
          {isSending ? "Sending..." : "Send message"}
        </Button>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {statusAnnouncements[status]}
      </p>
    </form>
  );
}
