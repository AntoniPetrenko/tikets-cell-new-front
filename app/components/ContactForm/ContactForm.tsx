"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useParams, useRouter } from "next/navigation";
import Input from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { enqueueSnackbar } from "notistack";
import { Button } from "../Button/Button";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Введіть коректне ім’я")
    .required("Обовʼязкове поле"),
  email: Yup.string().email("Невірний email").required("Обовʼязкове поле"),
  tel: Yup.string()
    .required("Потрібно вказати номер телефону")
    .test(
      "exactLength",
      "Номер телефону повинен містити рівно 12 цифр",
      (value) => {
        const numbers = value?.replace(/\D/g, "") || "";
        return numbers.length === 12;
      }
    ),
});

export const ContactForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { id } = useParams();
  const router = useRouter();
  const [initialValues] = useState(() => {
    if (typeof window === "undefined") {
      return { name: "", email: "", tel: "" };
    }
    return {
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      tel: localStorage.getItem("tel") || "",
    };
  });

  const [openBlocked, setOpenBlocked] = useState(false);

  const handlePayment = async (data: any) => {
    Object.entries(data).forEach(([key, value]) =>
      localStorage.setItem(key, value as string)
    );
    const params = new URLSearchParams(data);
    const result = await fetch(`/api/payment/${String(id)}?${params}`).then(
      (res) => res.json()
    );

    const isBlocked = result.error && result.statusCode === 403;
    if (isBlocked) {
      setOpenBlocked(isBlocked);
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
            const query = new URLSearchParams({ paymentId: id } as Record<
              string,
              string
            >).toString();
            onSuccess();
            router.push(`/result?${query}`);
          }
        });
    };

    (window as any).LiqPayCheckoutCallback();
  };

  return (
    <>
      {openBlocked ? (
        <div className="text-black mb-4 mt-4 font-medium text-xl">
          {id !== undefined && Number(id) >= 0 && Number(id) <= 6
            ? "Клубні карти"
            : "Товари"}{" "}
          тимчасово недоступні! Ми вже працюємо над новим надходженням.
          Слідкуйте за оновленнями!
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnMount
          validateOnBlur
          onSubmit={(values) => handlePayment(values)}
        >
          {({
            values,
            setFieldValue,
            isValid,
            isSubmitting,
            setFieldTouched,
          }) => {
            const isDisabled =
              !isValid ||
              isSubmitting ||
              !values.name ||
              !values.email ||
              !values.tel;

            return (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Ім’я</label>
                  <Field
                    name="name"
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-black"
                    placeholder="Ваше ім’я"
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="text-sm text-red-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Телефон</label>
                  <Field name="tel">
                    {({ field }: any) => (
                      <Input
                        defaultCountry="UA"
                        countries={["UA"]}
                        international
                        value={field.value || ""}
                        onChange={(incomingValue: string | undefined) => {
                          const digits = (incomingValue || "").replace(
                            /\D/g,
                            ""
                          );
                          setFieldValue("tel", "+" + digits);
                          setFieldTouched("tel", true, false);
                        }}
                        onBlur={() => setFieldTouched("tel", true, true)}
                        placeholder="+380 XX XXX XXXX"
                        className="phone-input-custom"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="tel"
                    component="p"
                    className="text-sm text-red-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="mt-1 w-full rounded-lg border px-3 py-2 text-black"
                    placeholder="example@mail.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-sm text-red-600"
                  />
                </div>

                <Button
                  variant="orange"
                  type="submit"
                  disabled={isDisabled}
                  className={`${
                    isDisabled ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Відправити
                </Button>
              </Form>
            );
          }}
        </Formik>
      )}
    </>
  );
};
