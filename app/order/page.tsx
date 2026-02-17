"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomSelect } from "../components/CustomSelect/CustomSelect";
import { TextField } from "../components/TextField/TextField";
import { Region } from "../const/ukraineRegions";
import { ProductsType } from "../types";
import { useRouter } from "next/navigation";

import Script from "next/script";
import { enqueueSnackbar } from "notistack";
import { Modal } from "../components/Modal/Modal";
import { useCartStore } from "../store/cardStore";

const phoneRegex = /^\+380\d{9}$/;

const basicSchema = z.object({
  firstName: z.string().min(1, "Обов'язкове поле"),
  lastName: z.string().min(1, "Обов'язкове поле"),
  phone: z.string().regex(phoneRegex, "Введіть номер у форматі +380XXXXXXXXX"),
  email: z.string().email("Невірний формат email"),
});

const extendedSchema = basicSchema.extend({
  street: z.string().min(1, "Обов'язкове поле"),
  city: z.string().min(1, "Обов'язкове поле"),
  zip: z.string().min(1, "Обов'язкове поле"),
  region: z.object({ name: z.string(), code: z.string(), id: z.number() }),
});

type BasicForm = z.infer<typeof basicSchema>;
type ExtendedForm = z.infer<typeof extendedSchema>;

const paymentOptions = ["Оплата карткою", "Apple Pay", "Google Pay"];

export default function OrderPage() {
  const router = useRouter();

  const item = useCartStore((state) => state.item);
  const getTotal = () => (item ? item.price * item.qty : 0);
  const clearCart = useCartStore((state) => state.clearCart);

  const [region, setRegion] = useState<Region | null>(null);
  const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0]);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto">("card");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");

  const hasProducts = item?.customId === ProductsType.products;
  const formType = hasProducts ? "extended" : "basic";

  const basicForm = useForm<BasicForm>({
    resolver: zodResolver(basicSchema),
    mode: "onChange",
  });

  const extendedForm = useForm<ExtendedForm>({
    resolver: zodResolver(extendedSchema),
    mode: "onChange",
  });

  const items = item ? [item] : [];

  useEffect(() => {
    const savedBasic = localStorage.getItem("basicForm");
    if (savedBasic) {
      const data = JSON.parse(savedBasic);
      Object.entries(data).forEach(([key, value]) =>
        basicForm.setValue(key as keyof BasicForm, value as any, {
          shouldValidate: true,
          shouldDirty: true,
        })
      );
      basicForm.trigger();
    }

    const savedExtended = localStorage.getItem("extendedForm");
    if (savedExtended) {
      const data = JSON.parse(savedExtended);
      Object.entries(data).forEach(([key, value]) =>
        extendedForm.setValue(key as keyof ExtendedForm, value as any, {
          shouldValidate: true,
          shouldDirty: true,
        })
      );
      extendedForm.trigger();
    }

    const savedRegion = localStorage.getItem("region");
    if (savedRegion) {
      const regionObj = JSON.parse(savedRegion);
      setRegion(regionObj);
      extendedForm.setValue("region", regionObj as any, {
        shouldValidate: true,
        shouldDirty: true,
      });
      extendedForm.trigger("region");
    }

    const savedPayment = localStorage.getItem("selectedPayment");
    if (savedPayment) setSelectedPayment(savedPayment);

    const savedPaymentMethod = localStorage.getItem("paymentMethod");
    if (savedPaymentMethod) setPaymentMethod(savedPaymentMethod as "card" | "crypto");
  }, []);

  useEffect(() => {
    const sub = basicForm.watch((v) =>
      localStorage.setItem("basicForm", JSON.stringify(v))
    );
    return () => sub.unsubscribe();
  }, [basicForm]);

  useEffect(() => {
    const sub = extendedForm.watch((v) =>
      localStorage.setItem("extendedForm", JSON.stringify(v))
    );
    return () => sub.unsubscribe();
  }, [extendedForm]);

  useEffect(() => {
    if (region) localStorage.setItem("region", JSON.stringify(region));
  }, [region]);

  useEffect(
    () => localStorage.setItem("selectedPayment", selectedPayment),
    [selectedPayment]
  );

  useEffect(
    () => localStorage.setItem("paymentMethod", paymentMethod),
    [paymentMethod]
  );

  const handleSubmit = async (data: any) => {
    const payload = {
      name: data.firstName,
      tel: data.phone,
      email: data.email,
      paymentMethod
    };

    Object.entries(payload).forEach(([key, value]) =>
      localStorage.setItem(
        key,
        Array.isArray(value) ? JSON.stringify(value) : (value as string)
      )
    );

    const params = new URLSearchParams(payload as any);
    const result = await fetch(`/api/payment/${item?.id}?${params}`).then(
      (res) => res.json()
    );

    if (result.error && result.statusCode === 403) {
      setModalContent(
        "Товари тимчасово недоступні! Ми вже працюємо над новим надходженням. Слідкуйте за оновленнями!"
      );
      setIsModalOpen(true);
      return;
    }

    if (result.error) {
      enqueueSnackbar(result.message, { variant: "error" });
      return;
    }

    if (result.url) {
      try {
        window.location.href = result.url;
        return;
      } catch (e: any) {
        enqueueSnackbar(e.message, { variant: "error" });
        return;
      }
    }
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Інформація"
      >
        {modalContent}
      </Modal>

      <div className="min-h-screen bg-black text-white p-6 flex justify-center pt-24">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h1 className="text-3xl font-bold mb-8">Оформлення замовлення</h1>

            {formType === "basic" ? (
              <form
                onSubmit={basicForm.handleSubmit(handleSubmit)}
                className="grid gap-6"
              >
                <TextField
                  label="Ім'я"
                  name="firstName"
                  register={basicForm.register}
                  error={basicForm.formState.errors.firstName}
                  required
                />
                <TextField
                  label="Прізвище"
                  name="lastName"
                  register={basicForm.register}
                  error={basicForm.formState.errors.lastName}
                  required
                />
                <TextField
                  label="Телефон"
                  name="phone"
                  type="tel"
                  placeholder="+380XXXXXXXXX"
                  register={basicForm.register}
                  error={basicForm.formState.errors.phone}
                  required
                  onChange={(e) => {
                    let digits = e.target.value.replace(/\D/g, "");
                    if (!digits.startsWith("38")) digits = "38" + digits;
                    digits = digits.slice(0, 12);
                    basicForm.setValue("phone", digits ? "+" + digits : "", {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                />
                <TextField
                  label="E-mail адреса"
                  name="email"
                  type="email"
                  register={basicForm.register}
                  error={basicForm.formState.errors.email}
                  required
                />
              </form>
            ) : (
              <form
                onSubmit={extendedForm.handleSubmit(handleSubmit)}
                className="grid gap-6"
              >
                <TextField
                  label="Ім'я"
                  name="firstName"
                  register={extendedForm.register}
                  error={extendedForm.formState.errors.firstName}
                  required
                />
                <TextField
                  label="Прізвище"
                  name="lastName"
                  register={extendedForm.register}
                  error={extendedForm.formState.errors.lastName}
                  required
                />
                <TextField
                  label="Телефон"
                  name="phone"
                  type="tel"
                  placeholder="+380XXXXXXXXX"
                  register={extendedForm.register}
                  error={extendedForm.formState.errors.phone}
                  required
                  onChange={(e) => {
                    let digits = e.target.value.replace(/\D/g, "");
                    if (!digits.startsWith("38")) digits = "38" + digits;
                    digits = digits.slice(0, 12);
                    extendedForm.setValue("phone", digits ? "+" + digits : "", {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                />
                <TextField
                  label="E-mail адреса"
                  name="email"
                  type="email"
                  register={extendedForm.register}
                  error={extendedForm.formState.errors.email}
                  required
                />
                <TextField
                  label="Назва вулиці"
                  name="street"
                  register={extendedForm.register}
                  error={extendedForm.formState.errors.street}
                  required
                />
                <TextField
                  label="Місто / Село"
                  name="city"
                  register={extendedForm.register}
                  error={extendedForm.formState.errors.city}
                  required
                />
                <TextField
                  label="Поштовий індекс"
                  name="zip"
                  register={extendedForm.register}
                  error={extendedForm.formState.errors.zip}
                  required
                />
                <div>
                  <label className="block mb-1">
                    Область <span className="text-red-500">*</span>
                  </label>
                  <CustomSelect
                    value={region}
                    onChange={(value) => {
                      setRegion(value);
                      extendedForm.setValue("region", value as any);
                    }}
                  />
                  {extendedForm.formState.errors.region && (
                    <p className="text-red-500 text-sm mt-1">
                      {extendedForm.formState.errors.region.message as string}
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>

          <div className="bg-neutral-900 rounded-2xl p-6 h-fit flex flex-col">
            <h2 className="text-2xl font-bold mb-6">Ваше замовлення</h2>
            <div className="space-y-4 text-neutral-300">
              {items.length === 0 ? (
                <p className="text-neutral-400">У кошику немає товарів.</p>
              ) : (
                items.map((i) => (
                  <div key={i.id} className="flex justify-between">
                    <span>
                      {i.title} × {i.qty}
                    </span>
                    <span>{(i.price * i.qty).toLocaleString()} ₴</span>
                  </div>
                ))
              )}
              {items.length > 0 && (
                <div className="flex justify-between font-semibold text-white pt-2 border-t border-neutral-700">
                  <span>Загалом</span>
                  <span>{getTotal().toLocaleString()} ₴</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-neutral-400">
              <input
                type="checkbox"
                className="accent-orange-400"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
              />
              <span>
                Я прочитав (а) і погоджуюся з{" "}
                <a href="/public-offer" className="text-orange-400">
                  правилами та умовами
                </a>
              </span>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-sm text-neutral-300 font-medium">
                Спосіб оплати
              </p>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value as "card" | "crypto")}
                    className="accent-orange-400"
                  />
                  <span>Оплата карткою</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="crypto"
                    checked={paymentMethod === "crypto"}
                    onChange={(e) => setPaymentMethod(e.target.value as "card" | "crypto")}
                    className="accent-orange-400"
                  />
                  <span>Оплата криптовалютою</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              onClick={() => {
                if (formType === "basic") {
                  basicForm.handleSubmit(handleSubmit)();
                } else {
                  extendedForm.handleSubmit(handleSubmit)();
                }
              }}
              disabled={!agreeTerms || items.length === 0}
              className="mt-4 w-full bg-orange-400 text-black font-bold py-3 rounded-lg hover:bg-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Підтвердити замовлення
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
