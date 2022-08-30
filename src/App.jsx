import { CrudsProvider } from "./context/useCRUDS/useCRUDS";
import SearchBar from "./layout/searchBar/SearchBar";
import TopBar from "./layout/topBar/TopBar";
import Home from "./pages/home/Home";

const baseUrl = "http://localhost:8000/products";

function App() {
	return (
		<>
			<CrudsProvider crudsBaseUrl={baseUrl}>
				<TopBar />
				<SearchBar />
				<Home />
			</CrudsProvider>
		</>
	);
}

export default App;
