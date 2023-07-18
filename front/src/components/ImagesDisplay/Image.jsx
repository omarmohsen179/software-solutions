import Lightbox from "yet-another-react-lightbox";

import { ApiBaseUrl } from "../../services/config";
export default function Image({ open, setOpen, idx = 0, data }) {
  console.log();
  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={data.map((element) => ({
          src:
            typeof element == "string"
              ? ApiBaseUrl + element
              : URL.createObjectURL(element),
        }))}
        index={idx}
        toolbar
      />
    </>
  );
}
