"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "../_lib/components/ui/button";
import { useAuthContext } from "../_contexts/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema } from "../_forms/schemas/user";
import { z } from "zod";
import ThemeToggleBar from "../_components/ThemeToggle";
import { FloatingLabelInput } from "../_components/FloatingLabelInput";
import { OAuthProviders } from "../_components/OAuthProviders";
import LoadingSpinner from "../_components/LoadingSpinner";

type SignUpFormData = z.infer<typeof signupFormSchema>;

export default function SignUp() {
  const router = useRouter();
  const { user, isInitializing, signup } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupFormSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    if (data.password !== data.passwordConfirmation) {
      return;
    }

    try {
      const response = await signup({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      console.log("Cadastro realizado com sucesso:", response);
    } catch (error) {
      console.error("Erro ao realizar o cadastro:", error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  if (isInitializing || user) {
    return <LoadingSpinner text="Carregando..." />;
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Header com Logo */}
      <div className="relative mb-[50px]">
        <ThemeToggleBar />

        <h1 className="mb-[30px] h-[26px] text-[24px] font-semibold">
          Criar sua conta
        </h1>
        <p className="text-sm font-normal">
          Se já possui uma conta, você consegue fazer{" "}
          <Link
            href="/signin"
            className="font-semibold text-[var(--primary)] underline decoration-[var(--primary)] underline-offset-4"
          >
            Login aqui!
          </Link>
        </p>
      </div>

      {/* Form */}
      <form
        className="mb-[50px] w-full space-y-[20px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative">
          <FloatingLabelInput
            id="firstName"
            type="text"
            label="Nome"
            {...register("firstName", { required: true })}
          />

          {errors.firstName && (
            <p className="p-1 text-sm text-[var(--danger)]">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="relative">
          <FloatingLabelInput
            id="lastName"
            type="text"
            label="Sobrenome"
            {...register("lastName", { required: true })}
          />

          {errors.lastName && (
            <p className="p-1 text-sm text-[var(--danger)]">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="relative">
          <FloatingLabelInput
            id="email"
            type="email"
            label="Email"
            {...register("email", { required: true })}
          />

          {errors.email && (
            <p className="p-1 text-sm text-[var(--danger)]">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <FloatingLabelInput
              id="password"
              type={showPassword ? "text" : "password"}
              label="Senha"
              {...register("password", { required: true })}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-[22px] -translate-y-1/2 text-[var(--muted-foreground)]"
            >
              {showPassword ? (
                <Eye className="h-4 w-4 cursor-pointer" />
              ) : (
                <EyeOff className="h-4 w-4 cursor-pointer" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="p-1 text-sm text-[var(--danger)]">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <div className="relative">
            <FloatingLabelInput
              id="passwordConfirmation"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirme sua senha"
              {...register("passwordConfirmation", { required: true })}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-[22px] -translate-y-1/2 text-[var(--muted-foreground)]"
            >
              {showConfirmPassword ? (
                <Eye className="h-4 w-4 cursor-pointer" />
              ) : (
                <EyeOff className="h-4 w-4 cursor-pointer" />
              )}
            </button>
          </div>
          {errors.passwordConfirmation && (
            <p className="p-1 text-sm text-[var(--danger)]">
              {errors.passwordConfirmation.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="min-h-[62px] w-full cursor-pointer rounded-[12px] bg-[var(--primary-button)] py-[22px] hover:bg-[var(--primary-button-hover)]"
        >
          Criar Conta
        </Button>
      </form>
      <OAuthProviders />
    </main>
  );
}
