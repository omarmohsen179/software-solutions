import * as React from "react";
import { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

import Image from "./Image";
import { ApiBaseUrl } from "../../services/config";
export default function ImagesDisplay({ data, handleRemoveImage }) {
  const [open, setOpen] = React.useState(false);
  const [idx, setIdx] = React.useState(0);
  useEffect((e) => setIdx(0), [data]);

  return (
    <>
      {data.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "100px",

            gap: "20px",
            flexWrap: "wrap",
            margin: 10,
            position: "relative",
          }}
        >
          {data.map((element, index) => {
            return (
              <div
                style={{
                  height: "200px",
                  position: "relative",
                  cursor: "pointer",
                  padding: 5,
                }}
                onClick={() => {
                  setOpen(true);
                  setIdx(index);
                }}
              >
                {handleRemoveImage != null && (
                  <AiFillCloseCircle
                    style={{
                      position: "absolute",
                      top: "5%",
                      right: "3%",
                      cursor: "pointer",
                    }}
                    onClick={() => handleRemoveImage(element)}
                  />
                )}

                <img
                  alt={"img"}
                  style={{
                    width: "auto",
                    height: "auto",
                    maxHeight: "200px",
                  }}
                  src={
                    typeof element == "string"
                      ? ApiBaseUrl + element
                      : URL.createObjectURL(element)
                  }
                />
              </div>
            );
          })}
          <Image open={open} setOpen={setOpen} idx={idx} data={data} />
        </div>
      )}
    </>
  );
}
