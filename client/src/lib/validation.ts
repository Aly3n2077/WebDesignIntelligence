import { z } from "zod";

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Please enter your name",
  }),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  subject: z.string().min(3, {
    message: "Please select or enter a subject",
  }).default("General Inquiry"),
  message: z.string().optional(),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Please accept the privacy policy",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
