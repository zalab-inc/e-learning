import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "./prisma";
import { sendEmail } from "./email";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "mysql",
	}),
	plugins: [openAPI(), nextCookies()],
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: false,
		resetPasswordPath: "/reset-password",
		resetPasswordTokenQueryParam: "token",
		sendResetPassword: async ({ user, token }) => {
			const resetUrl = `${BASE_URL}/reset-password?token=${token}`;
			await sendEmail({
				to: user.email,
				subject: "Reset Password | KelasInvotif.com",
				html: `
					<h1>Reset Password</h1>
					<p>Halo,</p>
					<p>Anda telah meminta untuk mereset password. Klik link di bawah ini untuk mengatur password baru:</p>
					<p><a href="${resetUrl}">Reset Password</a></p>
					<p>Jika Anda tidak meminta ini, abaikan email ini.</p>
					<p>Link ini akan kadaluarsa dalam 1 jam.</p>
				`,
				text: `Reset password Anda: ${resetUrl}`,
			});
		},
	},
	trustedOrigins: [
		"http://localhost:3000",
		"http://localhost:3001",
		"http://e-learning.kelasinovatif.com:3000",
		"https://e-learning.kelasinovatif.com",
	],
	baseUrl: BASE_URL,
});
