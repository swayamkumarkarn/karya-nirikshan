import React, { useState } from "react";
import { FaPlus, FaPaperPlane } from "react-icons/fa6";
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { useSelector } from "react-redux";
import SearchBar from "../Common/Searchbar";
import CustomButton from "../Common/CustomButton";
import NotificationTable from "../NotificationAction";
import navigateToPage from "../../lib/functionality/navigation";
import { fetchSearchData } from "../../services/searchService";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const userData = useSelector((state) => state?.auth?.user?.data);

  const handleSearch = async () => {
    if (!searchQuery) {
      alert("कृपया खोजने के लिए कुछ दर्ज करें!");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetchSearchData(searchQuery.toUpperCase());
      setSearchResults(response.data);
      if (response.data.id) {
        navigateToPage(`/track-doc/${response.data.id}`);
      } else {
        alert(`दस्तावेज़ नहीं मिला: ${searchQuery}`);
      }
    } catch (err) {
      console.error("खोजने में विफल:", err.message);
      alert("खोजने में त्रुटि हुई। कृपया पुनः प्रयास करें।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header
      className={`text-black px-6 py-4 flex items-center transition-all duration-300 ${
        isSidebarOpen ? "w-[100%]" : "w-full"
      }`}
    >
      <div className="flex items-start space-x-4 flex-grow">
        <CustomButton
          onlyIcon
          color="white"
          background="black"
          startIcon={<HiMiniAdjustmentsHorizontal className="text-xl" />}
          onClick={() => console.log("बटन क्लिक किया गया!")}
          size="small"
        />
        <div className="flex gap-4 items-center">
          <SearchBar
            placeholder="दस्तावेज़ विवरण से खोजें..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <CustomButton
            onlyIcon
            color="white"
            background="black"
            startIcon={<FaPaperPlane className="text-md" />}
            onClick={handleSearch}
            size="small"
            disabled={isLoading} // Disable while loading
          />
          <CustomButton
            text="नया दस्तावेज"
            color="yellow"
            startIcon={<FaPlus className="text-xl font-bold" />}
            onClick={() => navigateToPage("/form")}
            size="small"
          />
        </div>
        <CustomButton
          text="आवक दस्तावेज"
          variant="contained"
          size="small"
          onClick={() => setOpen(true)}
        />
      </div>
      <button onClick={toggleSidebar}>
        <div
          className={`flex items-center space-x-4 cursor-pointer p-2 px-4 rounded-lg bg-black text-white transition-all duration-300 ${
            isSidebarOpen ? "mr-80" : "mr-0"
          }`}
        >
          <div className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center font-bold">
            {userData?.department_name[0]}
          </div>
          <div className="text-center">
            <p className="text-md">{userData?.department_hindi_name}</p>
            <p className="text-sm">{userData?.name}</p>
          </div>
        </div>
      </button>
      <NotificationTable open={open} setOpen={setOpen} />
    </header>
  );
};

export default Header;
