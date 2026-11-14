export interface EstimatePayload {
  fullName: string;
  phone: string;
  email: string;
  serviceNeeded: string;
  message: string;
  source: string;
}

export type EstimateSubmissionResult =
  | { mode: 'live'; statusText: string }
  | { mode: 'demo'; formattedSummary: string; mailtoHref: string };

export const DEMO_CONTACT = {
  phoneLabel: '(000) 000-0000 (Demo)',
  email: 'estimates@naph-hvac-demo.example',
  areaLabel: 'United States · Residential & Commercial (Demo)',
};

export async function submitEstimateRequest(
  payload: EstimatePayload
): Promise<EstimateSubmissionResult> {
  const endpoint = import.meta.env['VITE_ESTIMATE_ENDPOINT'] as string | undefined;

  const formattedSummary = [
    'Naph — Estimate Request Summary',
    `Full Name: ${payload.fullName}`,
    `Phone Number: ${payload.phone}`,
    `Email Address: ${payload.email}`,
    `Service Needed: ${payload.serviceNeeded}`,
    `Message: ${payload.message || 'No additional notes provided.'}`,
  ].join('\n');

  const mailtoSubject = encodeURIComponent(
    `HVAC Estimate Request: ${payload.serviceNeeded} — ${payload.fullName}`
  );
  const mailtoBody = encodeURIComponent(formattedSummary);
  const mailtoHref = `mailto:${DEMO_CONTACT.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  if (endpoint && endpoint.trim().length > 0) {
    const response = await fetch(endpoint.trim(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Submission failed with status ${response.status}.`);
    }

    return {
      mode: 'live',
      statusText: 'Your estimate request was submitted to the configured endpoint.',
    };
  }

  return {
    mode: 'demo',
    formattedSummary,
    mailtoHref,
  };
}
