import { PortfolioProvider } from "./context/PortfolioContext";
import { Header } from "./components/Header";
import { StepNavigation } from "./components/StepNavigation";
import { PortfolioBuilder } from "./components/PortfolioBuilder";

function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        <StepNavigation />
        <PortfolioBuilder />
      </div>
    </PortfolioProvider>
  );
}

export default App;
