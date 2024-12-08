"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Lightbulb, Loader2 } from "lucide-react";
import { useState } from "react";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { PasswordInput } from "@/components/shared/password-input";
import { ChangePasswordSchema } from "@/defs/auth-schema";
import { changePasswordAction } from "@/actions/auth";
import { useRouter } from "next/navigation";

interface ResetPasswordFormProps {
	token?: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
	const router = useRouter();
	const [isSuccess, setIsSuccess] = useState(false);

	const { form, handleSubmitWithAction } = useHookFormAction(
		changePasswordAction,
		zodResolver(ChangePasswordSchema),
		{
			actionProps: {
				onSuccess: () => {
					setIsSuccess(true);
				},
			},
			formProps: {
				defaultValues: {
					token: token || "",
					password: "",
					confirmPassword: "",
				},
			},
		},
	);

	if (!token) {
		return (
			<Card className="w-[400px]">
				<CardHeader>
					<CardTitle className="text-2xl text-center">
						Link Tidak Valid
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-center text-muted-foreground">
						Link reset password tidak valid atau sudah kadaluarsa.
					</p>
					<Button asChild className="w-full">
						<Link href="/forgot">Minta Link Baru</Link>
					</Button>
				</CardContent>
			</Card>
		);
	}

	if (isSuccess) {
		return (
			<Card className="w-[400px]">
				<CardHeader>
					<CardTitle className="text-2xl text-center">
						Password Diperbarui
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-center text-muted-foreground">
						Password Anda telah berhasil diperbarui. Anda akan dialihkan ke
						halaman login.
					</p>
					<Button asChild className="w-full">
						<Link href="/login">Kembali ke Login</Link>
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4">
			<Link href="/" className="flex flex-col items-center gap-2 mb-8">
				<div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground">
					<Lightbulb className="w-6 h-6" />
				</div>
				<span className="text-lg font-semibold">KelasInvotif.com</span>
			</Link>
			<Card className="max-w-sm mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">Reset Password</CardTitle>
					<CardDescription>
						Masukkan password baru untuk akun Anda.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={handleSubmitWithAction} className="space-y-8">
							<div className="grid gap-4">
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormLabel htmlFor="password">Password Baru</FormLabel>
											<FormControl>
												<PasswordInput
													id="password"
													placeholder="********"
													{...field}
													disabled={form.formState.isSubmitting}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormLabel htmlFor="confirmPassword">
												Konfirmasi Password
											</FormLabel>
											<FormControl>
												<PasswordInput
													id="confirmPassword"
													placeholder="********"
													{...field}
													disabled={form.formState.isSubmitting}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								{form.formState.errors.root && form.formState.isDirty ? (
									<p className="text-sm font-medium text-destructive">
										{form.formState.errors.root.message}
									</p>
								) : null}

								<Button type="submit" disabled={form.formState.isSubmitting}>
									{form.formState.isSubmitting ? (
										<>
											<Loader2 className="w-4 h-4 mr-2 animate-spin" />
											Memuat...
										</>
									) : (
										"Simpan Password Baru"
									)}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
