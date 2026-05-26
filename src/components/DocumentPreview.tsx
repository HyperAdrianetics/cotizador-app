import React, { useMemo } from "react";
import type { QuoteData } from "../types/quote";
import { numberToWords } from "../utils/numberToWords";

interface DocumentPreviewProps {
  data: QuoteData;
  isDarkMode?: boolean;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  data,
  isDarkMode = false,
}) => {
  const total = useMemo(() => {
    return data.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );
  }, [data.items]);

  const totalWords = useMemo(() => {
    const amountInt = Math.floor(total);
    const amountDec = Math.round((total - amountInt) * 100);
    const words = numberToWords(amountInt);
    const cents = amountDec.toString().padStart(2, "0");

    return `(${words} PESOS ${cents}/100 MN)`;
  }, [total]);

  return (
    <div id="quote-document">
      {data.includeQuotePage && (
        <div
          className="letter-page relative"
          style={{
            backgroundColor: isDarkMode ? data.colors.secondary : "#ffffff",
          }}
        >
          {/* Header */}
          <div
            className="flex justify-between items-start z-10"
            style={{ pageBreakInside: "avoid" }}
          >
            <div className="flex items-center gap-4">
              {data.logo ? (
                <img
                  src={data.logo}
                  alt="Logo"
                  className="h-16 w-auto object-contain"
                />
              ) : (
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div
                      className="w-10 h-10 rounded-full bg-primary"
                      style={{ backgroundColor: data.colors.primary }}
                    />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span
                      className={`text-2xl font-black block ${isDarkMode ? "text-white" : "text-slate-800"}`}
                    >
                      Hyper
                    </span>
                    <span
                      className={`text-xl font-light italic block -mt-1 ${isDarkMode ? "text-primary" : "text-slate-500"}`}
                      style={{
                        color: isDarkMode ? data.colors.primary : undefined,
                      }}
                    >
                      netics
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="text-right pr-4">
              <p
                className={`text-sm mb-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
              >
                {data.date}
              </p>
              <h1
                className="text-4xl font-bold tracking-tight"
                style={{ color: data.colors.primary }}
              >
                {data.packageName}
              </h1>
              <p className="text-slate-400 font-medium text-lg">
                Folio: {data.folio}
              </p>
            </div>
          </div>

          {/* Greeting */}
          <div
            className="mt-16 z-10 max-w-[80%]"
            style={{ pageBreakInside: "avoid" }}
          >
            <div className="mb-6">
              <p
                className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? "text-primary" : "text-slate-400"}`}
              >
                Atención a:
              </p>
              <h2
                className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-slate-800"}`}
              >
                {data.clientName}
              </h2>
              <p
                className={`text-lg font-medium ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
              >
                {data.company}
              </p>
            </div>
            <p
              className={`mt-4 text-lg leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}
            >
              Por este medio le enviamos un cordial saludo y la cotización
              solicitada para el desarrollo de su proyecto digital.
            </p>
          </div>

          {/* Items List */}
          <div className="mt-10 flex-grow z-10 max-w-[85%]">
            <div className="space-y-8">
              {data.items.map((item) => (
                <div
                  key={item.id}
                  className="relative pl-8 flex justify-between items-start gap-4"
                >
                  <div
                    className="absolute left-0 top-2.5 w-3 h-3 rounded-full"
                    style={{ backgroundColor: data.colors.primary }}
                  />
                  <div className="flex-grow">
                    <h3
                      className={`text-xl font-bold leading-tight ${isDarkMode ? "text-slate-100" : "text-slate-700"}`}
                    >
                      {item.description.split("\n")[0]}
                    </h3>
                    {item.description
                      .split("\n")
                      .slice(1)
                      .map((line, i) => (
                        <p
                          key={i}
                          className={`text-base mt-1 font-medium leading-snug ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                        >
                          {line}
                        </p>
                      ))}
                  </div>
                  {data.showItemPrices && (
                    <div className="text-right whitespace-nowrap pt-1">
                      <span
                        className={`text-lg font-black ${isDarkMode ? "text-white" : "text-slate-800"}`}
                      >
                        {new Intl.NumberFormat("es-MX", {
                          style: "currency",
                          currency: "MXN",
                        }).format(item.price * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                          {item.quantity} x{" "}
                          {new Intl.NumberFormat("es-MX", {
                            style: "currency",
                            currency: "MXN",
                          }).format(item.price)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Development Time */}
            <div className="mt-12 flex flex-col gap-4">
              <div>
                <p
                  className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                >
                  Tiempo de desarrollo:
                </p>
                <p
                  className={`text-base font-medium mt-1 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
                >
                  {data.deliveryTime}
                </p>
              </div>
              {data.note && (
                <div>
                  <p
                    className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                  >
                    NOTA:
                  </p>
                  <p
                    className={`text-base font-medium mt-1 italic ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}
                  >
                    {data.note}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Total Section */}
          <div
            className="mt-8 p-10 text-white relative z-10 -mx-[0.5in] px-[0.5in]"
            style={{
              backgroundColor: data.colors.secondary,
              pageBreakInside: "avoid",
            }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-4xl font-bold tracking-tight">
                  Precio Final: $
                  {total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}
                  MXN*
                </h4>
                <p className="text-sm opacity-90 mt-1 font-medium tracking-wide">
                  ({totalWords})
                </p>
                <p className="text-xs mt-3 font-extrabold tracking-widest">
                  {data.observations}
                </p>
              </div>
            </div>
          </div>

          {/* Clauses */}
          <div
            className={`mt-8 text-[9px] leading-[1.3] z-10 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
          >
            <p
              className={`font-bold uppercase mb-2 tracking-wider ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
            >
              CLÁUSULAS DE CONTRATACIÓN:
            </p>
            <ul className="space-y-1 list-none">
              {data.clauses.map((clause, index) => (
                <li key={index} className="flex gap-1">
                  <span>-</span>
                  <span>{clause}</span>
                </li>
              ))}
            </ul>
            <p className="font-bold mt-3 uppercase tracking-tighter text-[8px]">
              {data.observations}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
