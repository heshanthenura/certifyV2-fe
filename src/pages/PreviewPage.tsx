import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PDFViewer from "../components/PDFViewer";

function PreviewPage() {
  const { id } = useParams();
  const certificateId = id || "Not provided";
  const [certificateBlob, setCertificateBlob] = useState<Blob>();
  const [certificateImg, setCertificateImg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    let objectUrl = "";

    const fetchCertificate = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${import.meta.env.VITE_PUBLIC_BACKEND_API}/certificate/${encodeURIComponent(certificateId)}/preview`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          setError("Failed to fetch certificate preview");
          return;
        }

        const blob = await response.blob();
        objectUrl = URL.createObjectURL(blob);
        setCertificateImg(objectUrl);
        setCertificateBlob(blob);
      } catch (fetchError) {
        if (fetchError instanceof Error && fetchError.name === "AbortError") {
          return;
        }
        setError("Error fetching certificate preview");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();

    return () => {
      controller.abort();
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [certificateId]);

  const handleDownload = () => {
    if (!certificateBlob) {
      return;
    }

    const fileUrl = URL.createObjectURL(certificateBlob);
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = `certificate-${certificateId}.pdf`;
    link.click();
    URL.revokeObjectURL(fileUrl);
  };

  return (
    <main className="h-screen bg-orange-50 p-2 sm:p-4">
      <div className="mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center rounded-2xl border border-orange-200 bg-white p-4 shadow-sm sm:p-6">
        <h1 className="text-center text-lg font-semibold text-slate-900 sm:text-2xl">
          Certificate Preview
        </h1>
        <p className="mt-1 text-center text-xs text-slate-600 sm:text-sm">
          ID: {certificateId}
        </p>

        {loading ? (
          <p className="mt-4 text-sm text-slate-600">Loading certificate...</p>
        ) : null}

        {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

        {certificateImg && !loading && !error && (
          <div className="mt-4 w-full max-w-4xl flex-1 min-h-0 overflow-hidden rounded-xl border border-orange-200 bg-orange-50 p-2 sm:p-3">
            <PDFViewer url={certificateImg} />
          </div>
        )}

        <div className="mt-4 flex w-full max-w-4xl flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300 sm:w-auto"
            onClick={handleDownload}
            disabled={!certificateBlob}
          >
            Download
          </button>
        </div>
      </div>
    </main>
  );
}

export default PreviewPage;
