import { Suspense } from "react";
import ResultClient from "./ResultClient";
import { FullScreenLoader } from "../components/FullScreenLoader/FullScreenLoader";

const SearchFallback = () => {
  return <div>Обробка результату платежу...</div>;
};

export default function ResultPage() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <ResultClient />
    </Suspense>
  );
}
