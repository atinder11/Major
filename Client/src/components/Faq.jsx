import React from "react";

function Faq() {
  return (
    <div className="bg-[#f9f9f9]">

    
    <div className="w-[80%] mx-auto p-2 bg-[#f9f9f9]">
      <div className="collapse collapse-arrow bg-base-[#f9f9f9] border border-base-[#f9f9f9]">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-center">
          What is Opinion 
          Analysis?
        </div>
        <div className="collapse-content text-md">
        Opinion analysis uses AI to analyze and classify opinions from text, such as reviews or comments, into positive, negative, or neutral sentiments.        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-[#f9f9f9] border border-base-[#f9f9f9] mt-2">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-center">
        Is my data stored or shared?
        </div>
        <div className="collapse-content text-sm">
        Basic analysis is available without an account, but signing up provides access to advanced features and history tracking.   
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-[#f9f9f9] border border-base-[#f9f9f9] mt-2">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-center">
        Is Opinion Analysis 100% accurate?
        </div>
        <div className="collapse-content text-sm">
        While our AI model is highly accurate, sentiment analysis may sometimes misinterpret sarcasm, context, or complex emotions.
        </div>

      </div>
      <div className="collapse collapse-arrow bg-base-[#f9f9f9] border border-base-[#f9f9f9] mt-2">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold text-center">
        Do I need to sign up to use the platform?

        </div>
        <div className="collapse-content text-sm">
        Basic analysis is available without an account, but signing up provides access to advanced features and AI Feedback.
        </div>
        
      </div>
    </div>
    </div>
  );
}

export default Faq;
