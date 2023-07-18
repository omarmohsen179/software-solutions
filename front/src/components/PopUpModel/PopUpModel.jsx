import React, { useCallback, useEffect, useState } from "react";
import { Popup } from "devextreme-react/popup";
import ScrollView from "devextreme-react/scroll-view";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useHistory } from "react-router-dom";

function PopUpModel({
  maxWidth = 1000,
  minHeight = 200,
  setdialog,
  dailog,
  children,
  Submit,
}) {
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    // if (!finishStatus) {
    //   if (window.confirm("Are you sure")) {
    //     setfinishStatus(true);
    //     // your logic
    //     // props.history.push("/");
    //     setdialog(false);
    //   } else {
    //     window.history.pushState(null, null, window.location.pathname);
    //     setfinishStatus(false);
    //   }
    // }
  };
  const history = useHistory();

  return (
    <Popup
      maxWidth={maxWidth}
      title={""}
      minWidth={150}
      height={500}
      minHeight={minHeight}
      showTitle={true}
      dragEnabled={false}
      visible={dailog}
      //  fullScreen={isMobile}
      fullScreen={true}
      onHiding={() => setdialog(false)}
    >
      <ScrollView showScrollbar="onHover">
        {" "}
        <div style={{ margin: "10px" }} className="row">
          {children}
          {Submit ? (
            <ButtonComponent
              title={"Submit"}
              onClick={Submit}
              onEnter={dailog}
            />
          ) : null}
        </div>
      </ScrollView>
    </Popup>
  );
}

export default React.memo(PopUpModel);
