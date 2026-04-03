import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [certificateId, setCertificateId] = useState("");
  const navigate = useNavigate();

  const handleVerifyClick = () => {
    const trimmedId = certificateId.trim();
    if (!trimmedId) {
      return;
    }

    navigate(`/certificates/${encodeURIComponent(trimmedId)}`);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-orange-50 px-6 text-slate-900">
      <section className="w-full max-w-2xl rounded-2xl border border-orange-200 bg-white p-8 text-center shadow-sm md:p-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-orange-700">
          Certificate Portal
        </p>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Certify Platform
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-slate-600 md:text-base">
          Verify official certificates issued by Certify platform.
        </p>

        <input
          type="text"
          placeholder="Enter certificate ID"
          className="mt-8 w-full rounded-xl border border-orange-200 px-4 py-3 text-sm outline-none transition focus:border-orange-600"
          value={certificateId}
          onChange={(event) => setCertificateId(event.target.value)}
        />

        <button
          className="mt-4 rounded-xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
          onClick={handleVerifyClick}
        >
          Verify
        </button>
      </section>
    </main>
  );
}

export default HomePage;
