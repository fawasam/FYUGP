import React from "react";
import AnimationWrapper from "./common/page-animation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/utils/faqData";

const Faq = () => {
  return (
    <AnimationWrapper>
      <section className="flex items-center justify-center flex-col space-y-10">
        <div className="w-full mt-10">
          <Accordion
            type="single"
            collapsible
            className="w-full  space-y-2 rounded-lg"
          >
            {faqData?.length >= 0 &&
              faqData?.map((faq, key) => (
                <AccordionItem
                  value={faq?.Question}
                  key={key}
                  className="bg-background"
                >
                  <AccordionTrigger className="text-md  p-6">
                    {faq?.Question}
                  </AccordionTrigger>
                  <AccordionContent className="p-6">
                    {faq?.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default Faq;
