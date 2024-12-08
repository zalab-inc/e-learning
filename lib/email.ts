import { Resend } from "resend";
import type { ReactElement } from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
	to: string;
	subject: string;
	text?: string;
	html?: string;
	react?: ReactElement;
}

export async function sendEmail({
	to,
	subject,
	text,
	html,
	react,
}: SendEmailProps) {
	try {
		const emailData = {
			from: "onboarding@resend.dev",
			to,
			subject,
		} as const;

		if (react) {
			const { data, error } = await resend.emails.send({
				...emailData,
				react,
			});

			if (error) throw error;
			return data;
		}

		if (html) {
			const { data, error } = await resend.emails.send({
				...emailData,
				html,
				text: text || undefined,
			});

			if (error) throw error;
			return data;
		}

		const { data, error } = await resend.emails.send({
			...emailData,
			text: text || "",
		});

		if (error) throw error;
		return data;
	} catch (error) {
		console.error("Error sending email:", error);
		throw error;
	}
}
