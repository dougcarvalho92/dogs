import { useEffect } from "react";

interface HeadProps {
  title: string;
  description?: string;
}

const Head = ({ title, description }: HeadProps) => {
  useEffect(() => {
    document.title = title + " | Dogs";
    const metaDescription = document.querySelector("meta[name='description']");
    if (description && metaDescription) {
      metaDescription.setAttribute("content", description || "");
    }
  }, [title, description]);

  return <></>;
};

export default Head;
