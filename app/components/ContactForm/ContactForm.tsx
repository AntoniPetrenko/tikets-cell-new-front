"use client";

import Input from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button/Button";
import { useParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(2, "Введіть коректне ім’я"),
  email: z.string().email("Невірний email"),
  tel: z
    .string()
    .min(1, "Потрібно вказати номер телефону")
    .regex(/^\+?[0-9\s\-()]{7,20}$/, "Має бути дійсний номер телефону"),
});

type FormFields = z.infer<typeof schema>;

export const ContactForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { id } = useParams();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const formatPhone = (value: string) => {
    let numbers = value.replace(/\D/g, "");

    if (numbers.startsWith("38")) {
      numbers = numbers.slice(2);
    }

    if (numbers.startsWith("0")) {
      numbers = numbers.slice(1);
    }

    numbers = numbers.slice(0, 9);

    if (numbers.length <= 2) return `+38 0${numbers}`;
    if (numbers.length <= 5)
      return `+38 0${numbers.slice(0, 2)} ${numbers.slice(2)}`;
    if (numbers.length <= 7)
      return `+38 0${numbers.slice(0, 2)} ${numbers.slice(
        2,
        5
      )} ${numbers.slice(5)}`;
    return `+38 0${numbers.slice(0, 2)} ${numbers.slice(2, 5)} ${numbers.slice(
      5,
      9
    )}`;
  };

  const onSubmit = async (data: FormFields) => {
    const params = new URLSearchParams(data);

    const result = await fetch(`/api/payment/${String(id)}?${params}`).then(
      (res) => res.json()
    );

    (window as any).LiqPayCheckoutCallback = function () {
      (window as any).LiqPayCheckout.init({
        data: result.data,
        signature: result.signature,
        mode: "popup", // embed || popup,
      })
        .on("liqpay.callback", function ({ status, info: rawInfo }: any) {
          (window as any).LiqPayCheckout.lastStatus = status;
          const info = JSON.parse(rawInfo);
          (window as any).LiqPayCheckout.info = info;
          console.log("status", status);
          enqueueSnackbar(status, { variant: "success" });
        })

        .on("liqpay.close", function () {
          if ((window as any).LiqPayCheckout.lastStatus === "success") {
            const paymentInfo = (window as any).LiqPayCheckout?.info || {};
            const query = new URLSearchParams(
              paymentInfo as Record<string, string>
            ).toString();

            router.push(`/result?${query}`);
          }
        });
    };
    (window as any).LiqPayCheckoutCallback();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Ім’я</label>
        <input
          {...register("name")}
          className="mt-1 w-full rounded-lg border px-3 py-2 text-black"
          placeholder="Ваше ім’я"
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Телефон</label>
        <Controller
          control={control}
          name="tel"
          render={({ field }) => (
            <Input
              defaultCountry="UA"
              countries={["UA"]}
              value={field.value}
              international
              onChange={(value) => field.onChange(formatPhone(value || ""))}
              className="phone-input-custom"
              placeholder="+380 XX XXX XXXX"
            />
          )}
        />
        {errors.tel && (
          <p className="text-sm text-red-600">{errors.tel.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          {...register("email")}
          className="mt-1 w-full rounded-lg border px-3 py-2 text-black"
          placeholder="example@mail.com"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <Button variant="pink">Відправити</Button>
    </form>
  );
};
