import React from 'react';
import type { QuoteData, LineItem } from '../types/quote';
import { HYPERNETICS_TEMPLATES } from '../types/quote';
import { 
  Plus, 
  Trash2, 
  Download, 
  RefreshCcw, 
  Copy, 
  Type, 
  Palette, 
  Image as ImageIcon,
  FileText,
  User,
  Layers,
  Sparkles,
  FilePlus2,
  Calendar
} from 'lucide-react';

interface SidebarProps {
  data: QuoteData;
  updateQuote: (newData: Partial<QuoteData>) => void;
  resetQuote: () => void;
  duplicateQuote: () => void;
  exportPdf: () => void;
  isDarkMode?: boolean;
  brandKey: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  data, 
  updateQuote, 
  resetQuote, 
  duplicateQuote,
  exportPdf,
  isDarkMode = false,
  brandKey
}) => {
  
  const handleItemChange = (id: string, field: keyof LineItem, value: any) => {
    const newItems = data.items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    updateQuote({ items: newItems });
  };

  const addItem = () => {
    const newItem: LineItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: 'Nuevo concepto\nDescripción detallada',
      quantity: 1,
      price: 0
    };
    updateQuote({ items: [...data.items, newItem] });
  };

  const removeItem = (id: string) => {
    updateQuote({ items: data.items.filter(item => item.id !== id) });
  };

  const applyTemplate = (templateId: string) => {
    const template = HYPERNETICS_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      updateQuote({
        packageName: template.packageName,
        clientName: template.clientName,
        company: template.company,
        deliveryTime: template.deliveryTime,
        note: (template as any).note || '',
        items: template.items,
        showItemPrices: (template as any).showItemPrices ?? false,
        scope: (template as any).scope || [],
        notIncluded: (template as any).notIncluded || [],
        milestones: (template as any).milestones || [],
        platformCost: (template as any).platformCost,
        portfolio: (template as any).portfolio || [],
        paymentConditions: (template as any).paymentConditions || [],
        addons: (template as any).addons || [],
        clauses: (template as any).clauses || data.clauses
      });
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateQuote({ logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`w-96 border-r h-screen overflow-y-auto p-6 flex flex-col gap-8 no-print transition-colors ${isDarkMode ? 'bg-[#0f111a] border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className="flex items-center justify-between">
        <h2 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          <FileText className="w-5 h-5 text-primary" />
          Editor de Cotización
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        <button 
          onClick={exportPdf}
          className="w-full bg-primary hover:brightness-110 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-95"
        >
          <Download className="w-5 h-5" />
          Exportar PDF
        </button>
        
        <div className="flex flex-col gap-2 p-3 border rounded-xl border-dashed">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Incluir en PDF:</p>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={data.includeQuotePage}
                onChange={(e) => updateQuote({ includeQuotePage: e.target.checked })}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span className={`text-[11px] font-bold ${isDarkMode ? 'text-slate-400 group-hover:text-white' : 'text-slate-500 group-hover:text-slate-800'}`}>Cotización</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={data.includeScopePage}
                onChange={(e) => updateQuote({ includeScopePage: e.target.checked })}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span className={`text-[11px] font-bold ${isDarkMode ? 'text-slate-400 group-hover:text-white' : 'text-slate-500 group-hover:text-slate-800'}`}>Alcances</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={data.includeDetailsPage}
                onChange={(e) => updateQuote({ includeDetailsPage: e.target.checked })}
                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span className={`text-[11px] font-bold ${isDarkMode ? 'text-slate-400 group-hover:text-white' : 'text-slate-500 group-hover:text-slate-800'}`}>Detalles</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={resetQuote}
            title="Nueva Cotización"
            className={`font-medium py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
          >
            <FilePlus2 className="w-4 h-4" />
          </button>
          <button 
            onClick={duplicateQuote}
            title="Duplicar (Nuevo Folio)"
            className={`font-medium py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
          >
            <Copy className="w-4 h-4" />
          </button>
          <button 
            onClick={resetQuote}
            title="Restablecer valores"
            className={`font-medium py-2 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {brandKey === 'hypernetics' && (
        <section className="space-y-4">
          <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <Sparkles className="w-4 h-4" />
            Plantillas Hypernetics
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {HYPERNETICS_TEMPLATES.map(template => (
              <button
                key={template.id}
                onClick={() => applyTemplate(template.id)}
                className={`text-left p-3 rounded-xl border text-xs transition-all ${
                  data.packageName.includes(template.id) || data.packageName.includes(template.name.split('— ')[1])
                    ? 'border-primary bg-primary/10 text-primary font-bold'
                    : isDarkMode 
                      ? 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700' 
                      : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'
                }`}
              >
                {template.name}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          <User className="w-4 h-4" />
          Información General
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Título del Paquete</label>
            <input 
              type="text" 
              value={data.packageName}
              onChange={(e) => updateQuote({ packageName: e.target.value })}
              className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'}`}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Nombre del Cliente</label>
            <input 
              type="text" 
              value={data.clientName}
              onChange={(e) => updateQuote({ clientName: e.target.value })}
              className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'}`}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Empresa</label>
            <input 
              type="text" 
              value={data.company}
              onChange={(e) => updateQuote({ company: e.target.value })}
              className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'}`}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Folio</label>
              <input 
                type="text" 
                value={data.folio}
                onChange={(e) => updateQuote({ folio: e.target.value })}
                className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'}`}
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Fecha</label>
              <input 
                type="text" 
                value={data.date}
                onChange={(e) => updateQuote({ date: e.target.value })}
                className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'}`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <Layers className="w-4 h-4" />
            Conceptos
          </h3>
          <button 
            onClick={addItem}
            className="p-1.5 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id} className={`p-4 border rounded-2xl space-y-3 relative group transition-all ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-lg hover:shadow-slate-100'}`}>
              <button 
                onClick={() => removeItem(item.id)}
                className="absolute -top-2 -right-2 p-1.5 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md z-20"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <textarea 
                value={item.description}
                onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                className={`w-full border rounded-xl p-3 text-xs focus:ring-2 focus:ring-primary outline-none min-h-[70px] resize-none transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'}`}
                placeholder="Descripción del concepto"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Cantidad</label>
                  <input 
                    type="number" 
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, 'quantity', parseFloat(e.target.value))}
                    className={`w-full border rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'}`}
                  />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Precio Unit.</label>
                  <input 
                    type="number" 
                    value={item.price}
                    onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value))}
                    className={`w-full border rounded-xl p-2.5 text-xs focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          <Palette className="w-4 h-4" />
          Personalización
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Logo de Empresa</label>
            <div className="flex items-center gap-3">
              {data.logo && (
                <img src={data.logo} alt="Preview" className="w-12 h-12 object-contain border border-slate-200 rounded-xl p-2 bg-white" />
              )}
              <label className="flex-grow">
                <div className={`flex items-center justify-center gap-2 px-3 py-3 border-2 border-dashed rounded-xl text-xs transition-all cursor-pointer ${isDarkMode ? 'border-slate-800 text-slate-500 hover:border-primary hover:text-primary' : 'border-slate-200 text-slate-400 hover:border-primary hover:text-primary'}`}>
                  <ImageIcon className="w-4 h-4" />
                  {data.logo ? 'Cambiar logo' : 'Subir logo'}
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Color Primario</label>
              <input 
                type="color" 
                value={data.colors.primary}
                onChange={(e) => updateQuote({ colors: { ...data.colors, primary: e.target.value } })}
                className="w-full h-12 rounded-xl cursor-pointer border-none p-0 overflow-hidden"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Color Secundario</label>
              <input 
                type="color" 
                value={data.colors.secondary}
                onChange={(e) => updateQuote({ colors: { ...data.colors, secondary: e.target.value } })}
                className="w-full h-12 rounded-xl cursor-pointer border-none p-0 overflow-hidden"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 border rounded-xl border-dashed cursor-pointer hover:border-primary transition-all" onClick={() => updateQuote({ showItemPrices: !data.showItemPrices })}>
            <input 
              type="checkbox" 
              checked={data.showItemPrices}
              onChange={(e) => updateQuote({ showItemPrices: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
            />
            <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Mostrar precios por concepto</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <FileText className="w-4 h-4" />
            Cláusulas
          </h3>
          <button 
            onClick={() => updateQuote({ clauses: [...data.clauses, 'Nueva cláusula'] })}
            className="p-1.5 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {data.clauses.map((clause, index) => (
            <div key={index} className="flex gap-2 group">
              <textarea 
                value={clause}
                onChange={(e) => {
                  const newClauses = [...data.clauses];
                  newClauses[index] = e.target.value;
                  updateQuote({ clauses: newClauses });
                }}
                className={`flex-grow border rounded-xl p-2 text-[10px] focus:ring-2 focus:ring-primary outline-none min-h-[50px] resize-none transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-600'}`}
              />
              <button 
                onClick={() => {
                  const newClauses = data.clauses.filter((_, i) => i !== index);
                  updateQuote({ clauses: newClauses });
                }}
                className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all self-center"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <Plus className="w-4 h-4" />
            Alcance del Proyecto
          </h3>
          <button 
            onClick={() => updateQuote({ scope: [...data.scope, { title: 'Nueva sección', items: ['Nuevo alcance'] }] })}
            className="p-1.5 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-6">
          {(data.scope || []).map((section, idx) => (
            <div key={idx} className={`p-4 border rounded-2xl space-y-3 relative group ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
              <button 
                onClick={() => updateQuote({ scope: data.scope.filter((_, i) => i !== idx) })}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              <input 
                type="text" 
                value={section.title}
                onChange={(e) => {
                  const newScope = [...data.scope];
                  newScope[idx].title = e.target.value;
                  updateQuote({ scope: newScope });
                }}
                className={`w-full font-bold text-xs bg-transparent outline-none ${isDarkMode ? 'text-white' : 'text-slate-700'}`}
              />
              <div className="space-y-2">
                {(section.items || []).map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <input 
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newScope = [...data.scope];
                        newScope[idx].items[i] = e.target.value;
                        updateQuote({ scope: newScope });
                      }}
                      className={`flex-grow text-[10px] bg-transparent border-b border-transparent focus:border-primary outline-none ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
                    />
                  </div>
                ))}
                <button 
                  onClick={() => {
                    const newScope = [...data.scope];
                    newScope[idx].items.push('Nuevo punto');
                    updateQuote({ scope: newScope });
                  }}
                  className="text-[9px] text-primary font-bold hover:underline"
                >
                  + Añadir punto
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 pb-10">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <Plus className="w-4 h-4" />
            No Incluido
          </h3>
          <button 
            onClick={() => updateQuote({ notIncluded: [...data.notIncluded, 'Nuevo punto no incluido'] })}
            className="p-1.5 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {(data.notIncluded || []).map((item, idx) => (
            <div key={idx} className="flex gap-2 group">
              <input 
                type="text" 
                value={item}
                onChange={(e) => {
                  const newNotIncluded = [...data.notIncluded];
                  newNotIncluded[idx] = e.target.value;
                  updateQuote({ notIncluded: newNotIncluded });
                }}
                className={`flex-grow border rounded-xl p-2 text-[10px] focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'}`}
              />
              <button 
                onClick={() => updateQuote({ notIncluded: data.notIncluded.filter((_, i) => i !== idx) })}
                className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all self-center"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <Calendar className="w-4 h-4" />
            Cronograma (Hitos)
          </h3>
          <button 
            onClick={() => updateQuote({ milestones: [...data.milestones, { title: 'Nueva Fase', time: 'Semana X', deliverable: 'Nuevo entregable' }] })}
            className="p-1.5 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-3">
          {data.milestones?.map((ms, idx) => (
            <div key={idx} className={`p-3 border rounded-xl space-y-2 relative group ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
              <button 
                onClick={() => updateQuote({ milestones: data.milestones.filter((_, i) => i !== idx) })}
                className="absolute top-2 right-2 p-1 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3 h-3" />
              </button>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={ms.time}
                  onChange={(e) => {
                    const newMs = [...data.milestones];
                    newMs[idx].time = e.target.value;
                    updateQuote({ milestones: newMs });
                  }}
                  className={`w-24 text-[10px] font-black uppercase bg-transparent outline-none ${isDarkMode ? 'text-primary' : 'text-primary'}`}
                />
                <input 
                  type="text" 
                  value={ms.title}
                  onChange={(e) => {
                    const newMs = [...data.milestones];
                    newMs[idx].title = e.target.value;
                    updateQuote({ milestones: newMs });
                  }}
                  className={`flex-grow text-[11px] font-bold bg-transparent outline-none ${isDarkMode ? 'text-white' : 'text-slate-700'}`}
                />
              </div>
              <input 
                type="text" 
                value={ms.deliverable}
                placeholder="Entregable..."
                onChange={(e) => {
                  const newMs = [...data.milestones];
                  newMs[idx].deliverable = e.target.value;
                  updateQuote({ milestones: newMs });
                }}
                className={`w-full text-[10px] bg-transparent outline-none ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}
              />
            </div>
          ))}
        </div>
      </section>

      {data.platformCost && (
        <section className="space-y-4">
          <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <Sparkles className="w-4 h-4" />
            Costo de Plataforma
          </h3>
          <div className={`p-4 border rounded-2xl space-y-3 ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
            <input 
              type="text" 
              value={data.platformCost.name}
              onChange={(e) => updateQuote({ platformCost: { ...data.platformCost!, name: e.target.value } })}
              className={`w-full text-[10px] font-bold uppercase bg-transparent outline-none ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
            />
            <div className="flex gap-2 items-baseline">
              <input 
                type="text" 
                value={data.platformCost.cost}
                onChange={(e) => updateQuote({ platformCost: { ...data.platformCost!, cost: e.target.value } })}
                className={`text-2xl font-black bg-transparent outline-none w-32 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}
              />
              <input 
                type="text" 
                value={data.platformCost.period}
                onChange={(e) => updateQuote({ platformCost: { ...data.platformCost!, period: e.target.value } })}
                className={`text-[10px] font-bold uppercase bg-transparent outline-none ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}
              />
            </div>
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <Plus className="w-4 h-4" />
            Condiciones de Pago
          </h3>
          <button 
            onClick={() => updateQuote({ paymentConditions: [...data.paymentConditions, 'Nueva condición'] })}
            className="p-1.5 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {data.paymentConditions?.map((cond, idx) => (
            <div key={idx} className="flex gap-2 group">
              <input 
                type="text" 
                value={cond}
                onChange={(e) => {
                  const newCond = [...data.paymentConditions];
                  newCond[idx] = e.target.value;
                  updateQuote({ paymentConditions: newCond });
                }}
                className={`flex-grow border rounded-xl p-2 text-[10px] focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'}`}
              />
              <button 
                onClick={() => updateQuote({ paymentConditions: data.paymentConditions.filter((_, i) => i !== idx) })}
                className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all self-center"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <Plus className="w-4 h-4" />
            Add-ons / Complementos
          </h3>
          <button 
            onClick={() => updateQuote({ addons: [...(data.addons || []), { service: 'Nuevo Servicio', cost: '$0.00' }] })}
            className="p-1.5 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-2">
          {(data.addons || []).map((addon, idx) => (
            <div key={idx} className="flex gap-2 group">
              <div className="flex-grow space-y-2">
                <input 
                  type="text" 
                  value={addon.service}
                  onChange={(e) => {
                    const newAddons = [...(data.addons || [])];
                    newAddons[idx].service = e.target.value;
                    updateQuote({ addons: newAddons });
                  }}
                  placeholder="Servicio..."
                  className={`w-full border rounded-xl p-2 text-[10px] focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'}`}
                />
                <input 
                  type="text" 
                  value={addon.cost}
                  onChange={(e) => {
                    const newAddons = [...(data.addons || [])];
                    newAddons[idx].cost = e.target.value;
                    updateQuote({ addons: newAddons });
                  }}
                  placeholder="Costo..."
                  className={`w-full border rounded-xl p-2 text-[10px] focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'}`}
                />
              </div>
              <button 
                onClick={() => updateQuote({ addons: data.addons?.filter((_, i) => i !== idx) })}
                className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all self-center"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 pb-20">
        <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          <Copy className="w-4 h-4" />
          Portafolio
        </h3>
        <div className="space-y-3">
          {data.portfolio?.map((proj, idx) => (
            <div key={idx} className={`p-3 border rounded-xl space-y-1 ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
              <input 
                type="text" 
                value={proj.title}
                onChange={(e) => {
                  const newPort = [...data.portfolio];
                  newPort[idx].title = e.target.value;
                  updateQuote({ portfolio: newPort });
                }}
                className={`w-full text-[10px] font-black uppercase bg-transparent outline-none ${isDarkMode ? 'text-white' : 'text-slate-800'}`}
              />
              <input 
                type="text" 
                value={proj.link}
                onChange={(e) => {
                  const newPort = [...data.portfolio];
                  newPort[idx].link = e.target.value;
                  updateQuote({ portfolio: newPort });
                }}
                className="w-full text-[10px] text-primary font-bold bg-transparent outline-none"
              />
              <textarea 
                value={proj.description}
                onChange={(e) => {
                  const newPort = [...data.portfolio];
                  newPort[idx].description = e.target.value;
                  updateQuote({ portfolio: newPort });
                }}
                className={`w-full text-[10px] bg-transparent outline-none resize-none ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}
                rows={2}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 pb-10">
        <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          <Type className="w-4 h-4" />
          Textos Adicionales
        </h3>
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Tiempo de entrega</label>
            <textarea 
              value={data.deliveryTime}
              onChange={(e) => updateQuote({ deliveryTime: e.target.value })}
              className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none min-h-[100px] resize-none transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'}`}
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Nota importante</label>
            <textarea 
              value={data.note || ''}
              onChange={(e) => updateQuote({ note: e.target.value })}
              className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none min-h-[80px] resize-none transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'}`}
              placeholder="Ej: La cotización no incluye..."
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Observaciones (IVA, etc)</label>
            <input 
              type="text" 
              value={data.observations}
              onChange={(e) => updateQuote({ observations: e.target.value })}
              className={`w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'}`}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
