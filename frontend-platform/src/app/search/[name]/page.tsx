import { Navbar } from "@/components/navbar/navbar";
import { SearchResults } from "@/components/search-results";

const SearchPage = () => {

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <SearchResults />
        </div>
    )
};

export default SearchPage;
