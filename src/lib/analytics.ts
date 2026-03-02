import posthog from "posthog-js";

function capture(event: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && posthog.__loaded) {
    posthog.capture(event, properties);
  }
}

export function trackFormStep(step: number, stepName: string) {
  capture("form_step_completed", { step, step_name: stepName });
}

export function trackTemplateSelect(templateId: string) {
  capture("template_selected", { template_id: templateId });
}

export function trackPdfDownload(templateId: string) {
  capture("pdf_downloaded", { template_id: templateId });
}

export function trackPaymentStart(plan: string) {
  capture("payment_started", { plan });
}

export function trackShareCreate() {
  capture("share_link_created");
}
