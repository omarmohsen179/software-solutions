import React, { useCallback } from "react";

function CrudForm({ data, setdata, ElementForm }) {
  const handleChange = useCallback(
    ({ name, value }) => {
      setdata({ ...data, [name]: value });
    },
    [data]
  );

  let handleGetImages = (event) => {
    let files = event.target.files;
    setdata({ ...data, Image: files[0], ImagePath: "" });
  };
  let handleRemoveImage = useCallback(() => {
    setdata({ ...data, Image: "", ImagePath: "" });
  }, [data]);

  return (
    <div style={{ width: "100%" }}>
      <ElementForm
        data={data}
        handleRemoveImage={handleRemoveImage}
        handleGetImages={handleGetImages}
        HandleChange={handleChange}
      />
    </div>
  );
}

export default CrudForm;
