import React, { useMemo } from 'react';
import type { QuoteData } from '../types/quote';
import { numberToWords } from '../utils/numberToWords';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DocumentPreviewProps {
  data: QuoteData;
  isDarkMode?: boolean;
  brandKey?: string;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ data, isDarkMode = false, brandKey = 'maketa' }) => {
  const total = useMemo(() => {
    return data.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }, [data.items]);

  const totalWords = useMemo(() => {
    const amountInt = Math.floor(total);
    const amountDec = Math.round((total - amountInt) * 100);
    const words = numberToWords(amountInt);
    const cents = amountDec.toString().padStart(2, '0');
    
    return `(${words} PESOS ${cents}/100 MN)`;
  }, [total]);

  return (
    <div id="quote-document">
      {data.includeQuotePage && (
        <div 
          className="letter-page relative"
          style={{ backgroundColor: isDarkMode ? data.colors.secondary : '#ffffff' }}
        >
          {/* Header */}
          <div className="flex justify-between items-start z-10" style={{ pageBreakInside: 'avoid' }}>
            <div className="flex items-center gap-4">
              {data.logo ? (
                <img src={data.logo} alt="Logo" className="h-16 w-auto object-contain" />
              ) : (
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary" style={{ backgroundColor: data.colors.primary }} />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className={`text-2xl font-black block ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                      {brandKey === 'hypernetics' ? 'Hyper' : 'Maketa'}
                    </span>
                    <span className={`text-xl font-light italic block -mt-1 ${isDarkMode ? 'text-primary' : 'text-slate-500'}`} style={{ color: isDarkMode ? data.colors.primary : undefined }}>
                      {brandKey === 'hypernetics' ? 'netics' : 'Studio'}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="text-right pr-4">
              <p className={`text-sm mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{data.date}</p>
              <h1 className="text-4xl font-bold tracking-tight" style={{ color: data.colors.primary }}>
                {data.packageName}
              </h1>
              <p className="text-slate-400 font-medium text-lg">Folio: {data.folio}</p>
            </div>
          </div>

          {/* Greeting */}
          <div className="mt-16 z-10 max-w-[80%]" style={{ pageBreakInside: 'avoid' }}>
            <div className="mb-6">
              <p className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-primary' : 'text-slate-400'}`}>Atención a:</p>
              <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                {data.clientName}
              </h2>
              <p className={`text-lg font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {data.company}
              </p>
            </div>
            <p className={`mt-4 text-lg leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              Por este medio le enviamos un cordial saludo y la cotización solicitada para el desarrollo de su proyecto digital.
            </p>
          </div>

          {/* Items List */}
          <div className="mt-10 flex-grow z-10 max-w-[85%]">
            <div className="space-y-8">
              {data.items.map((item) => (
                <div key={item.id} className="relative pl-8 flex justify-between items-start gap-4">
                  <div 
                    className="absolute left-0 top-2.5 w-3 h-3 rounded-full" 
                    style={{ backgroundColor: data.colors.primary }}
                  />
                  <div className="flex-grow">
                    <h3 className={`text-xl font-bold leading-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-700'}`}>
                      {item.description.split('\n')[0]}
                    </h3>
                    {item.description.split('\n').slice(1).map((line, i) => (
                      <p key={i} className={`text-base mt-1 font-medium leading-snug ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{line}</p>
                    ))}
                  </div>
                  {data.showItemPrices && (
                    <div className="text-right whitespace-nowrap pt-1">
                      <span className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                        {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(item.price * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                          {item.quantity} x {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(item.price)}
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
                <p className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Tiempo de desarrollo:</p>
                <p className={`text-base font-medium mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{data.deliveryTime}</p>
              </div>
              {data.note && (
                <div>
                  <p className={`text-sm font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>NOTA:</p>
                  <p className={`text-base font-medium mt-1 italic ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {data.note}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Total Section */}
          <div 
            className="mt-8 p-10 text-white relative z-10 -mx-[0.5in] px-[0.5in]"
            style={{ backgroundColor: data.colors.secondary, pageBreakInside: 'avoid' }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-4xl font-bold tracking-tight">
                  Precio Final: ${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}MXN*
                </h4>
                <p className="text-sm opacity-90 mt-1 font-medium tracking-wide">({totalWords})</p>
                <p className="text-xs mt-3 font-extrabold tracking-widest">{data.observations}</p>
              </div>
            </div>
          </div>

          {/* Clauses */}
          <div className={`mt-8 text-[9px] leading-[1.3] z-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <p className={`font-bold uppercase mb-2 tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>CLÁUSULAS DE CONTRATACIÓN:</p>
            <ul className="space-y-1 list-none">
              {data.clauses.map((clause, index) => (
                <li key={index} className="flex gap-1">
                  <span>-</span>
                  <span>{clause}</span>
                </li>
              ))}
            </ul>
            <p className="font-bold mt-3 uppercase tracking-tighter text-[8px]">{data.observations}</p>
          </div>
        </div>
      )}

      {/* Second Page: Scope */}
      {data.includeScopePage && (
        <div 
          className={cn(
            "letter-page relative pt-16",
            data.includeQuotePage && "mt-4 border-t-4 border-dashed border-slate-100"
          )}
          style={{ 
            backgroundColor: isDarkMode ? data.colors.secondary : '#ffffff'
          }}
        >
          <div className="z-10">
            <h2 className="text-3xl font-bold mb-8 tracking-tight" style={{ color: data.colors.primary }}>
              Alcance del Proyecto
            </h2>
            
            <div className="space-y-8 max-w-[90%]">
              {(data.scope || []).map((section, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className={`text-lg font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {section.title}
                  </h3>
                  <ul className="space-y-1">
                    {(section.items || []).map((item, i) => (
                      <li key={i} className={`text-sm flex gap-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        <span className="text-primary font-bold" style={{ color: data.colors.primary }}>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {(data.notIncluded || []).length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <h2 className="text-2xl font-bold mb-4 tracking-tight text-red-500">
                  No incluido
                </h2>
                <ul className="space-y-1 max-w-[90%]">
                  {(data.notIncluded || []).map((item, i) => (
                    <li key={i} className={`text-sm flex gap-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span className="text-red-500 font-bold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Third Page: Details */}
      {(data.includeDetailsPage || false) && (
        <div 
          className={cn(
            "letter-page relative pt-16",
            (data.includeQuotePage || data.includeScopePage) && "mt-8"
          )}
          style={{ backgroundColor: isDarkMode ? data.colors.secondary : '#ffffff' }}
        >
          <div className="z-10 space-y-12">
            {/* Milestones / Cronograma */}
            <section>
              <h2 className="text-3xl font-bold mb-6 tracking-tight" style={{ color: data.colors.primary }}>
                Cronograma y Entregables
              </h2>
              <div className="space-y-4">
                {(data.milestones || []).map((ms, i) => (
                  <div key={i} className={`p-4 border rounded-2xl flex gap-6 items-center ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                    <div className="min-w-[100px] text-center">
                      <p className="text-[10px] font-black uppercase text-primary" style={{ color: data.colors.primary }}>{ms.time}</p>
                    </div>
                    <div className="flex-grow">
                      <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{ms.title}</h4>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        <span className="font-bold">Entregable:</span> {ms.deliverable}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-2 gap-8">
              {/* Payment Conditions */}
              <section>
                <h3 className="text-xl font-bold mb-4 tracking-tight" style={{ color: data.colors.primary }}>
                  Condiciones de Pago
                </h3>
                <ul className="space-y-2">
                  {(data.paymentConditions || []).map((cond, i) => (
                    <li key={i} className={`text-xs flex gap-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span className="text-primary font-bold" style={{ color: data.colors.primary }}>•</span>
                      {cond}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Platform Cost */}
              {data.platformCost && 
               data.platformCost.cost !== '0' && 
               data.platformCost.cost !== '$0.00' && 
               !data.platformCost.cost.toLowerCase().includes('sin costo') && (
                <section>
                  <h3 className="text-xl font-bold mb-4 tracking-tight" style={{ color: data.colors.primary }}>
                    Costo de Licencia
                  </h3>
                  <div className={`p-6 rounded-3xl text-center border-2 border-dashed ${isDarkMode ? 'bg-primary/10 border-primary/20' : 'bg-primary/5 border-primary/20'}`}>
                    <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{data.platformCost.name}</p>
                    <p className="text-4xl font-black mt-2" style={{ color: data.colors.primary }}>{data.platformCost.cost}</p>
                    <p className={`text-[10px] font-bold mt-1 uppercase ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{data.platformCost.period}</p>
                  </div>
                </section>
              )}
            </div>

            {/* Portfolio */}
            <section>
              <h2 className="text-3xl font-bold mb-6 tracking-tight" style={{ color: data.colors.primary }}>
                Portafolio Seleccionado
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {(data.portfolio || []).map((proj, i) => (
                  <div key={i} className={`p-4 border rounded-2xl space-y-2 ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                    <h4 className={`text-xs font-black uppercase ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{proj.title}</h4>
                    <a 
                      href={proj.link.startsWith('http') ? proj.link : `https://${proj.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-primary font-bold underline block hover:opacity-80 transition-opacity" 
                      style={{ color: data.colors.primary }}
                    >
                      {proj.link}
                    </a>
                    <p className={`text-[10px] leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Additional Links */}
            {(data.additionalLinks || []).length > 0 && (
              <section className="pt-2">
                <h3 className={`text-[9px] font-black uppercase tracking-[0.2em] mb-3 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                  Otros Proyectos de Referencia
                </h3>
                <div className="flex flex-wrap gap-x-5 gap-y-1">
                  {(data.additionalLinks || []).map((link, i) => (
                    <a 
                      key={i}
                      href={link.link.startsWith('http') ? link.link : `https://${link.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-[9px] font-bold underline hover:opacity-70 transition-opacity ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}
                    >
                      {link.title}
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* Add-ons */}
            {(data.addons || []).length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6 tracking-tight" style={{ color: data.colors.primary }}>
                  Add-ons / Servicios Complementarios
                </h2>
                <div className={`overflow-hidden border rounded-3xl ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className={isDarkMode ? 'bg-slate-900/60' : 'bg-slate-50'}>
                        <th className={`p-4 text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Servicio</th>
                        <th className={`p-4 text-xs font-black uppercase tracking-widest text-right ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Costo Est.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.addons?.map((addon, i) => (
                        <tr key={i} className={`border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                          <td className={`p-4 text-sm font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{addon.service}</td>
                          <td className={`p-4 text-sm font-black text-right ${isDarkMode ? 'text-primary' : 'text-primary'}`} style={{ color: data.colors.primary }}>{addon.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Support Box */}
            <div className={`p-8 rounded-[40px] border-l-8 ${isDarkMode ? 'bg-slate-900 border-primary' : 'bg-slate-100 border-primary'}`} style={{ borderColor: data.colors.primary }}>
               <h3 className="text-xl font-bold mb-2 tracking-tight">Esquema de Soporte</h3>
               <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                 Ofrecemos un esquema de soporte post-lanzamiento que incluye mantenimiento técnico, actualizaciones de seguridad y asistencia prioritaria. 
                 <br/><br/>
                 <span className="font-bold">Costo Base:</span> Incluido en desarrollo los primeros 30 días. Posteriores desde $1,500 MXN mensuales.
               </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
