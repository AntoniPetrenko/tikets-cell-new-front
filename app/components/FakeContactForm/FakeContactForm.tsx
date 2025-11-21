"use client";

import { useState } from "react";
import Input from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "../Button/Button";

const validationSchema = Yup.object({
  name: Yup.string().min(2, "Введіть коректне ім’я").required("Обовʼязково"),
  tel: Yup.string()
    .matches(/^\+?[0-9\s\-()]{7,20}$/, "Має бути дійсний номер телефону")
    .required("Потрібно вказати номер телефону"),
});

export const FakeContactForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [success, setSuccess] = useState(false);

  const formatPhone = (value: string) => {
    if (!value) return "";

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

  return (
    <>
      {success ? (
        <div>
          <div className="text-black mb-4 mt-4 font-medium text-xl">
            Для уточнення наявності товару на складі з вами звʼяжеться менеджер
            найближчим часом.
          </div>

          <Button onClick={onSuccess} variant="pink">
            Закрити
          </Button>
        </div>
      ) : (
        <Formik
          initialValues={{ name: "", tel: "" }}
          validationSchema={validationSchema}
          validateOnMount
          onSubmit={(values) => {
            console.log(values);
            setSuccess(true);
          }}
        >
          {({ values, errors, touched, isValid, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Ім’я</label>
                <Field
                  name="name"
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-black"
                  placeholder="Ваше ім’я"
                />
                <ErrorMessage name="name">
                  {(msg) => <p className="text-sm text-red-600">{msg}</p>}
                </ErrorMessage>
              </div>

              <div>
                <label className="block text-sm font-medium">Телефон</label>
                <Input
                  defaultCountry="UA"
                  countries={["UA"]}
                  value={values.tel}
                  international
                  onChange={(value) =>
                    setFieldValue("tel", formatPhone(value || ""))
                  }
                  className="phone-input-custom"
                  placeholder="+380 XX XXX XXXX"
                />
                {errors.tel && touched.tel && (
                  <p className="text-sm text-red-600">{errors.tel}</p>
                )}
              </div>

              <Button
                type="submit"
                variant="pink"
                disabled={!isValid || !values.name || !values.tel}
                className={`${
                  !isValid || !values.name || !values.tel
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                Відправити
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};
