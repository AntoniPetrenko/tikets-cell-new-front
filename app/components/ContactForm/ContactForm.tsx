"use client";

import Input from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../Button/Button";
import { enqueueSnackbar } from "notistack";
import { useParams, useRouter } from "next/navigation";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Введіть коректне ім’я")
    .required("Обовʼязкове поле"),
  email: Yup.string().email("Невірний email").required("Обовʼязкове поле"),
  tel: Yup.string()
    .matches(/^\+?[0-9\s\-()]{7,20}$/, "Має бути дійсний номер телефону")
    .required("Потрібно вказати номер телефону"),
});

export const ContactForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { id } = useParams();
  const router = useRouter();

  const formatPhone = (value: string) => {
    let numbers = value.replace(/\D/g, "");

    if (numbers.startsWith("38")) numbers = numbers.slice(2);
    if (numbers.startsWith("0")) numbers = numbers.slice(1);

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

  const handlePayment = async (data: any) => {
    const params = new URLSearchParams(data);

    const result = await fetch(`/api/payment/${String(id)}?${params}`).then(
      (res) => res.json()
    );

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
            const paymentInfo = (window as any).LiqPayCheckout?.info || {};
            const query = new URLSearchParams(
              paymentInfo as Record<string, string>
            ).toString();
            onSuccess();
            router.push(`/result?${query}`);
          }
        });
    };

    (window as any).LiqPayCheckoutCallback();
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", tel: "" }}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={(values) => handlePayment(values)}
    >
      {({ values, setFieldValue, isValid, isSubmitting }) => {
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
                {() => (
                  <Input
                    defaultCountry="UA"
                    countries={["UA"]}
                    value={values.tel}
                    international
                    onChange={(value) =>
                      setFieldValue("tel", formatPhone(value || ""))
                    }
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
              variant="pink"
              type="submit"
              disabled={isDisabled}
              className={`${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Відправити
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};
