"use client";

import Input from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button/Button";
import { useParams } from "next/navigation";
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

export const FakeContactForm = ({ onSuccess }: { onSuccess: () => void }) => {
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

  return (
    <form onSubmit={handleSubmit(() => onSuccess())} className="space-y-4">
      <div className="text-black mb-4 mt-4">
        Залиште свой контактний номер телефона та ваше їмʼя і з вами звʼяжеться
        наш менеджер
      </div>
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

      <Button onClick={() => onSuccess()} variant="pink">
        Відправити
      </Button>
    </form>
  );
};
