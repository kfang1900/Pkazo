import React, { useState } from 'react';
import 'twin.macro';

function Faq() {
  const [open, setOpen] = useState(`accordion-item--3`);

  const handleOpen = (getID: any) => {
    setOpen(getID);
  }

  const sampleAccordionData = [
    {
      title: "How do I hang it?",
      content: "Lorem ipsum dolor amet gastropub church-key gentrify actually tacos."
    },
    {
      title: "How do I hang it?",
      content: "Slow-carb knausgaard health goth kombucha tousled four loko. Messenger bag cronut +1."
    },
    {
      title: "How do I hang it?",
      content: "Health goth humblebrag live-edge meggings pork belly actually ugh kombucha banh mi plaid etsy waistcoat."
    },
    {
      title: "How do I hang it?",
      content: "Tbh next level subway tile ennui cloud bread. Master cleanse vaporware food truck"
    },
  ];

  return (
    <div tw='hidden lg:block'>
      <h4 tw='mb-[30px] font-bold text-[20px]'>Frequently Asked Questions</h4>
      <div tw="sm:px-6 flex flex-col gap-4" id="accordionExample">
        {sampleAccordionData && sampleAccordionData.map((item, i) => (
          <div key={i} tw="bg-white rounded-2xl overflow-hidden border border-[#8B8B8B] border-[1.5px]">
            <button onClick={() => handleOpen(`accordion-item--${i}`)} tw="relative flex items-center w-full py-[14px] px-[24px] font-semibold text-base text-[#65676B] text-left bg-white border-0 rounded-none transition focus:outline-none" type="button">
              {item.title}
              <span tw='ml-auto'>
                <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.6871 0.273877C14.3219 -0.0912924 13.7298 -0.0912924 13.3646 0.273877L7.48026 6.15828L1.59586 0.273877C1.23071 -0.091293 0.638616 -0.091293 0.273465 0.273876C-0.0916853 0.639055 -0.0916853 1.23111 0.273465 1.59629L6.81906 8.14188C7.18421 8.50703 7.77631 8.50703 8.14146 8.14188L14.6871 1.59629C15.0522 1.23112 15.0522 0.639056 14.6871 0.273877Z" fill="#8B8B8B" />
                </svg>
              </span>
            </button>
            {open && open === `accordion-item--${i}` &&
              <div tw="pb-4 px-5 text-[14px] text-[#8B8B8B]">
                {item.content}
              </div>}
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default Faq