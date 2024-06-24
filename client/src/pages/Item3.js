import React, { useState } from "react";
import Navbar from "../components/Navbar";
import LefftView from "../components/ItemPage/LeftView";
import MidView from "../components/ItemPage/MidView";
import RightView from "../components/ItemPage/RightView";
import Footer from "../components/Footer";
import data from "../data.json";

function Item3() {
  const pID = data[2].id;
  const title = data[2].title;
  const price = data[2].price;
  const pic = data[2].pic;
  const pic_url = data[2].pic_url;
  const href = data[2].href;

  return (
    <>
      <Navbar />
      <div className="item_page_container">
        <div className="arrows_container">
          <a href="/item2">
            <i class="fa-solid fa-arrow-left"></i>
            <span> Previous Item</span>
          </a>
        </div>
        <div className="itemsMidSection">
          <LefftView />
          <div className="image_buttons_pair">
            <MidView image={pic} />
            <RightView
              id={pID}
              price={price}
              title={title}
              pic_url={pic_url}
              href={href}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Item3;
