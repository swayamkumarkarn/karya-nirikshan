import React from "react";
import { useState } from "react";
import { CgArrowLongUpR } from "react-icons/cg";
import { TiPin } from "react-icons/ti";
import { SlArrowRightCircle } from "react-icons/sl";
import { SlArrowLeftCircle } from "react-icons/sl";

const RightSidebar = ({ isOpen, toggleSidebar }) => {
  const dummyNotifications = [
    {
      id: 1,
      number: "562",
      text: "हेड क्लर्क से अनुमोदन के लिए दस्तावेज़ अनुरोध",
      category: "हेड क्लर्क",
    },
    {
      id: 2,
      number: "355",
      text: "चिकित्सा विभाग में सत्यापन के लिए चिह्नित अनुरोध",
      category: "चिकित्सा",
    },
    {
      id: 3,
      number: "123",
      text: "आपातकालीन स्थिति के तहत प्रस्तुत प्रतिपूर्ति अनुरोध",
      category: "आपातकालीन",
    },
    {
      id: 1,
      number: "562",
      text: "हेड क्लर्क से अनुमोदन के लिए दस्तावेज़ अनुरोध",
      category: "हेड क्लर्क",
    },
    {
      id: 2,
      number: "355",
      text: "चिकित्सा विभाग में सत्यापन के लिए चिह्नित अनुरोध",
      category: "चिकित्सा",
    },
    {
      id: 3,
      number: "123",
      text: "आपातकालीन स्थिति के तहत प्रस्तुत प्रतिपूर्ति अनुरोध",
      category: "आपातकालीन",
    },
    // More notifications...
  ];

  const pinnedDocuments = [
    {
      id: 1,
      number: "856",
      title: "चिकित्सा प्रतिपूर्ति अनुरोध",
      department: "वित्त",
      date: "20 नवम्बर 2024, सोमवार, 12:42pm",
      status: "चालू",
      statusColor: "text-green-500",
    },
    {
      id: 2,
      number: "856",
      title: "चिकित्सा प्रतिपूर्ति अनुरोध",
      department: "चिकित्सा",
      date: "20 नवम्बर 2024, सोमवार, 12:42pm",
      status: "आगे बढ़ा",
      statusColor: "text-blue-500",
    },
    {
      id: 3,
      number: "856",
      title: "चिकित्सा प्रतिपूर्ति अनुरोध",
      department: "हेड क्लर्क",
      date: "20 नवम्बर 2024, सोमवार, 12:42pm",
      status: "प्रारंभ",
      statusColor: "text-yellow-500",
    },
  ];

  const [showAll, setShowAll] = useState(false);

  const truncateText = (text, length = 20) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const notificationsToDisplay = showAll
    ? dummyNotifications
    : dummyNotifications.slice(0, 3);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform z-50 duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white shadow-sm">
        <h2 className="text-lg font-bold text-black ">सूचनाएँ</h2>
      </div>

      <div className="h-full overflow-y-auto p-4">
        <section className="mb-6">
          <ul className="space-y-3">
            {notificationsToDisplay.map((notification) => (
              <li
                key={notification.id}
                className="text-sm flex justify-between items-center"
              >
                <div className="flex space-x-4 items-center flex-grow">
                  <span className="text-gray-700 font-bold w-12 text-left">
                    {notification.number}
                  </span>
                  <span className="text-gray-700 font-medium flex-grow">
                    {truncateText(notification.text, 15)}
                  </span>
                </div>

                <span className="text-gray-500 whitespace-nowrap">
                  {notification.category}
                </span>
              </li>
            ))}
          </ul>
          {!showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="mt-3 text-gray-500 text-right flex flex-row-reverse text-sm hover:underline"
            >
              और देखें
            </button>
          )}
        </section>

        <section className="">
          <div className="flex flex-row justify-between">
            <h3 className="text-sm font-semibold text-gray-600 mb-3 flex items-center">
              पिन किए गए दस्तावेज़{" "}
              <span className="ml-2 text-yellow-500">
                <TiPin className="text-xl " />
              </span>
            </h3>
            <div className="flex flex-row gap-3 text-lg font-semibold">
              <SlArrowLeftCircle />
              <SlArrowRightCircle />
            </div>
          </div>
          <div className="space-y-4 mb-20">
            {pinnedDocuments.map((document, index) => (
              <div key={document.id}>
                <div className="p-4 bg-gray-50 border border-gray-500 rounded-md shadow-sm">
                  <p className="text-sm font-semibold text-gray-800">
                    {document.number}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    {document.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 gap-2">
                    विभाग{" "}
                    <span className="text-black font-semibold">
                      - {document.department}
                    </span>
                    <br />
                    <span className="text-gray-700 font-semibold gap-2">
                      {document.date}
                    </span>
                  </p>
                  <span
                    className={`block text-sm font-semibold mt-2 text-right text-gray-700`}
                  >
                    {document.status}
                  </span>
                </div>

                {index !== pinnedDocuments.length - 1 && (
                  <CgArrowLongUpR
                    className=" mx-auto text-gray-500 mt-1 "
                    size={30}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RightSidebar;
