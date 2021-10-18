import { useEffect } from "react";

interface HeadProps {
  title: string;
  description?: string;
}

const Head = (props: HeadProps) => {
  useEffect(() => {
    document.title = props.title + " | Dogs";
    const metaDescription = document.querySelector("meta[name='description']");
    if (props.description && metaDescription) {
      metaDescription.setAttribute("content", props.description || "");
    }
  }, [props]);

  return <></>;
};

export default Head;
