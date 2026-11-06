import { send, EmailJSResponseStatus } from "@emailjs/browser";

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
};

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

export const isEmailConfigured = Boolean(serviceId && templateId && publicKey);

export class ContactSendError extends Error {
  readonly status: number | null;

  constructor(message: string, status: number | null, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "ContactSendError";
    this.status = status;
  }
}

function describeFailure(error: unknown): ContactSendError {
  if (error instanceof EmailJSResponseStatus) {
    return new ContactSendError(error.text || "EmailJS rejected the request", error.status, { cause: error });
  }

  if (error instanceof Error) {
    return new ContactSendError(error.message, null, { cause: error });
  }

  return new ContactSendError("EmailJS request failed", null, { cause: error });
}

export async function sendContactMessage({ name, email, message }: ContactMessage): Promise<void> {
  if (!isEmailConfigured) {
    throw new ContactSendError("EmailJS environment variables are not set", null);
  }

  try {
    const time = new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
    await send(serviceId, templateId, { name, email, message, time }, { publicKey });
  } catch (error) {
    throw describeFailure(error);
  }
}
