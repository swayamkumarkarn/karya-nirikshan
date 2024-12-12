import React from "react";
import styles from "./NotFound.module.css"; // Import the CSS module
import SideBar from "../SideBar";
import Header from "../Header";

const NotFound = ({text,message}) => {
  return (
    <div className="bg-gray-100 flex">
      <SideBar />
      <div className="w-[83%] float-right">
        <Header />
        <section className={styles.page_404}>
          <div className="container">
            <div className="row ">
              <div className="col-sm-12">
                <div className="col-sm-10 col-sm-offset-1 text-center ">
                  <div className={`${styles.four_zero_four_bg}` }>
                    <h1 className="text-center">{text}</h1>
                  </div>

                  <div className={styles.contant_box_404}>
                    <h3 className="h2">लगता है कि आप खो गए हैं</h3>
                    <p>{message || "जिस पृष्ठ को आप ढूंढ रहे हैं वह उपलब्ध नहीं है!"}</p>
                    <a href="/" className={styles.link_404}>
                      होम पर जाएं
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotFound;
