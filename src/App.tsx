import { QuoteEditor } from './components/QuoteEditor';
import { defaultQuote } from './types/quote';

function App() {
  return (
    <QuoteEditor initialData={defaultQuote} isDarkMode={true} />
  );
}

export default App;

