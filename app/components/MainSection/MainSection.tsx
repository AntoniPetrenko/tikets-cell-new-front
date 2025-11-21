"use client";

export const MainSection = () => {
  return (
    <section className=" w-full min-h-screen flex items-center justify-center">

      <div className="relative z-10 text-white text-center p-8" style={{ maxWidth: "800px" }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Підбір авто та запчастин
        </h1>
        <p className="font-medium text-lg" style={{ marginTop: "2rem" }} >
          Ми допоможемо вам обрати автомобіль, який ідеально відповідає вашому
          стилю життя та бюджету.
        </p>
      </div>
    </section>
  );
};
