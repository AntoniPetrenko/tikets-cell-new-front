import { Suspense } from "react";
import ResultClient from "./ResultClient";

const SearchFallback = () => {
  return <div>Обробка результату платежу...</div>;
};

export default function ResultPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <ResultClient />
    </Suspense>
  );
}
