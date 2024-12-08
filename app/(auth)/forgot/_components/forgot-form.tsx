"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Lightbulb, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

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
import { Input } from "@/components/ui/input";
import { ForgotSchema } from "@/defs/auth-schema";
import { forgotAction } from "@/actions/auth";
import { useRouter } from "next/navigation";

export function ForgotForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { form, handleSubmitWithAction, resetFormAndAction } =
		useHookFormAction(forgotAction, zodResolver(ForgotSchema), {
			actionProps: {
				onSuccess: (result) => {
					if (result.data?.data?.successful) {
						router.push("/forgot/success");
					}
				},
				onError: ({ error }) => {
					setIsLoading(false);
					if (error.validationErrors?.email?._errors?.length) {
						form.setError("email", {
							message: error.validationErrors.email._errors[0],
						});
					} else if (error.validationErrors?._errors?.length) {
						form.setError("root", {
							message: error.validationErrors._errors[0],
						});
					} else if (error.serverError) {
						form.setError("root", {
							message: error.serverError,
						});
					} else {
						form.setError("root", {
							message: "Terjadi kesalahan saat memproses permintaan",
						});
					}
				},
			},
			formProps: {
				defaultValues: {
					email: "",
				},
			},
			errorMapProps: {
				joinBy: " dan ",
			},
		});

	// Clear root error when form fields change
	useEffect(() => {
		const subscription = form.watch(() => {
			if (form.formState.errors.root) {
				form.clearErrors("root");
			}
		});

		return () => subscription.unsubscribe();
	}, [form]);

	const onSubmit = async (e: React.FormEvent) => {
		setIsLoading(true);
		await handleSubmitWithAction(e);
	};

	return (
		<div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center px-4">
			<Link href="/" className="flex flex-col items-center gap-2 mb-8">
				<div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground">
					<Lightbulb className="w-6 h-6" />
				</div>
				<span className="text-lg font-semibold">KelasInovatif.com</span>
			</Link>
			<Card className="w-full max-w-sm mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl">Lupa Password</CardTitle>
					<CardDescription>
						Masukkan email Anda untuk menerima link reset password.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={onSubmit} className="space-y-6">
							<div className="grid gap-4">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormLabel htmlFor="email">Email</FormLabel>
											<FormControl>
												<Input
													id="email"
													placeholder="alamat@email.com"
													type="email"
													autoComplete="email"
													autoFocus
													{...field}
													disabled={isLoading}
												/>
											</FormControl>
											<FormMessage className="text-destructive" />
										</FormItem>
									)}
								/>

								{form.formState.errors.root && (
									<div className="p-3 border rounded-md bg-destructive/10 border-destructive">
										<p className="text-sm font-medium text-destructive">
											{form.formState.errors.root.message}
										</p>
									</div>
								)}

								<Button type="submit" disabled={isLoading} className="w-full">
									{isLoading ? (
										<>
											<Loader2 className="w-4 h-4 mr-2 animate-spin" />
											Memproses...
										</>
									) : (
										"Kirim Link Reset"
									)}
								</Button>
							</div>
						</form>
					</Form>
					<div className="mt-4 space-y-2 text-sm text-center">
						<p>
							Ingat password?{" "}
							<Link href="/login" className="text-primary hover:underline">
								Masuk
							</Link>
						</p>
						<p>
							<Link
								href="/"
								className="transition-colors text-muted-foreground hover:text-foreground"
							>
								Kembali ke Beranda
							</Link>
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
