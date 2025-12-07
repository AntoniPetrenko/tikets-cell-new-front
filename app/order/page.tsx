"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomSelect } from "../components/CustomSelect/CustomSelect";
import { TextField } from "../components/TextField/TextField";
import { useProductStore } from "@/app/store/productStore";
import { Region } from "../const/ukraineRegions";
import { ProductsType } from "../types";
import { useRouter } from "next/navigation";

import Script from "next/script";
import { enqueueSnackbar } from "notistack";
import { Modal } from "../components/Modal/Modal";

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
  const items = useProductStore((state) => state.items);
  const getTotal = useProductStore((state) => state.getTotal);

  const [region, setRegion] = useState<Region | null>(null);
  const [selectedPayment, setSelectedPayment] = useState(paymentOptions[0]);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");

  const hasProducts = items.some((i) => i.customId === ProductsType.products);
  const formType = hasProducts ? "extended" : "basic";

  const basicForm = useForm<BasicForm>({
    resolver: zodResolver(basicSchema),
    mode: "onChange",
  });

  const extendedForm = useForm<ExtendedForm>({
    resolver: zodResolver(extendedSchema),
    mode: "onChange",
  });

  // ------------------- Загрузка данных из localStorage -------------------
  useEffect(() => {
    const savedBasic = localStorage.getItem("basicForm");
    if (savedBasic) basicForm.reset(JSON.parse(savedBasic));

    const savedExtended = localStorage.getItem("extendedForm");
    if (savedExtended) extendedForm.reset(JSON.parse(savedExtended));

    const savedRegion = localStorage.getItem("region");
    if (savedRegion) {
      const regionObj = JSON.parse(savedRegion);
      setRegion(regionObj);
      extendedForm.setValue("region", regionObj);
    }

    const savedPayment = localStorage.getItem("selectedPayment");
    if (savedPayment) setSelectedPayment(savedPayment);
  }, [extendedForm, basicForm]);

  // ------------------- Слежение за изменениями -------------------
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

  // ------------------- Отправка формы -------------------
  const handleSubmit = async (data: any) => {
    const payload = {
      name: data.firstName,
      tel: data.phone,
      email: data.email,
    };

    Object.entries(payload).forEach(([key, value]) =>
      localStorage.setItem(
        key,
        Array.isArray(value) ? JSON.stringify(value) : (value as string)
      )
    );

    const params = new URLSearchParams(payload as any);
    const result = await fetch(`/api/payment/${String(2)}?${params}`).then(
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

    if (result.invoiceId) {
      try {
        window.location.href = result.pageUrl;
        return;
      } catch (e: any) {
        enqueueSnackbar(e.message, { variant: "error" });
        return;
      }
    }

    (window as any).LiqPayCheckoutCallback = function () {
      (window as any).LiqPayCheckout.init({
        data: result.data,
        signature: result.signature,
        mode: "popup",
      })
        .on("liqpay.callback", function ({ status, info: rawInfo }: any) {
          (window as any).LiqPayCheckout.lastStatus = status;
          const info = JSON.parse(rawInfo);
          (window as any).LiqPayCheckout.info = info;
          enqueueSnackbar(status, { variant: "success" });
        })
        .on("liqpay.close", function () {
          if ((window as any).LiqPayCheckout.lastStatus === "success") {
            const query = new URLSearchParams({
              paymentIds: items.map((i) => i.id).join(","),
            }).toString();
            useProductStore.getState().clearCart();
            router.push(`/result?${query}`);
          }
        });
    };

    (window as any).LiqPayCheckoutCallback();
  };

  return (
    <>
      <Script
        src="//static.liqpay.ua/libjs/checkout.js"
        strategy="afterInteractive"
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Інформація"
      >
        {modalContent}
      </Modal>

      <div className="min-h-screen bg-black text-white p-6 flex justify-center pt-24">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Форма */}
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
                />
                <TextField
                  label="E-mail адреса"
                  name="email"
                  type="email"
                  register={basicForm.register}
                  error={basicForm.formState.errors.email}
                  required
                />

                <button
                  type="submit"
                  disabled={!basicForm.formState.isValid || !agreeTerms}
                  className="mt-4 w-full bg-orange-400 text-black font-bold py-3 rounded-lg hover:bg-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Підтвердити замовлення
                </button>
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

                {/* CustomSelect с синхронизацией */}
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

                <button
                  type="submit"
                  disabled={!extendedForm.formState.isValid || !agreeTerms}
                  className="mt-4 w-full bg-orange-400 text-black font-bold py-3 rounded-lg hover:bg-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Підтвердити замовлення
                </button>
              </form>
            )}
          </div>

          {/* Корзина */}
          <div className="bg-neutral-900 rounded-2xl p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">Ваше замовлення</h2>
            <div className="space-y-4 text-neutral-300">
              {items.length === 0 ? (
                <p className="text-neutral-400">У кошику немає товарів.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.title} × {item.qty}
                    </span>
                    <span>{(item.price * item.qty).toLocaleString()} ₴</span>
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
          </div>
        </div>
      </div>
    </>
  );
}
