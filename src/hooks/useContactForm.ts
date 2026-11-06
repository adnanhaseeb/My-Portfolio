import { useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { toast } from "sonner";

import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { sendContactMessage, type ContactMessage } from "@/lib/emailjs";

export type ContactField = keyof ContactMessage;

export type ContactFormStatus = "idle" | "sending" | "success" | "error";

export type ContactFormErrors = Partial<Record<ContactField, string>>;

const fieldOrder: ContactField[] = ["name", "email", "message"];

const emptyValues: ContactMessage = { name: "", email: "", message: "" };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const minimumMessageLength = 10;

function validateField(field: ContactField, rawValue: string): string | undefined {
  const value = rawValue.trim();

  if (field === "name") {
    return value ? undefined : "Enter your name.";
  }

  if (field === "email") {
    if (!value) return "Enter your email address.";
    return emailPattern.test(value) ? undefined : "Enter a valid email address, like name@company.com.";
  }

  if (!value) return "Enter a message.";
  return value.length >= minimumMessageLength
    ? undefined
    : `Write at least ${minimumMessageLength} characters so I have some context.`;
}

function validateAll(values: ContactMessage): ContactFormErrors {
  return fieldOrder.reduce<ContactFormErrors>((errors, field) => {
    const error = validateField(field, values[field]);
    return error ? { ...errors, [field]: error } : errors;
  }, {});
}

export function useContactForm() {
  const [values, setValues] = useState<ContactMessage>(emptyValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");

  function setFieldError(field: ContactField, error: string | undefined) {
    setErrors((current) => {
      if (current[field] === error) return current;
      const next = { ...current };
      if (error) {
        next[field] = error;
      } else {
        delete next[field];
      }
      return next;
    });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as ContactField;
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    if (status === "success" || status === "error") setStatus("idle");
    if (errors[field]) setFieldError(field, validateField(field, value));
  }

  function handleBlur(event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as ContactField;
    if (!event.target.value && !errors[field]) return;
    setFieldError(field, validateField(field, event.target.value));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const nextErrors = validateAll(values);
    setErrors(nextErrors);

    const firstInvalid = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalid) {
      const target = event.currentTarget.elements.namedItem(firstInvalid);
      if (target instanceof HTMLElement) target.focus();
      return;
    }

    setStatus("sending");

    try {
      await sendContactMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });
      setStatus("success");
      setValues(emptyValues);
      setErrors({});
      toast.success(contact.successMessage);
    } catch (error) {
      setStatus("error");
      console.error(error);
      toast.error(contact.errorMessage, {
        description: site.email,
        action: {
          label: "Email me",
          onClick: () => {
            window.location.href = `mailto:${site.email}`;
          },
        },
      });
    }
  }

  return {
    values,
    errors,
    status,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
