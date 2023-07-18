import React from "react";
import { useTranslation } from "react-i18next";

export default function ContactUs() {
  const { t, i18n } = useTranslation();
  return (
    <>
      {" "}
      <div
        className="vc_row row_padding_top row_padding_bottom small white-section change-header-color"
        data-bgcolor="#fff"
        id="contact"
      >
        <h5 className="has-mask no-margins">Get in Touch</h5>
        <h1 className="has-mask" data-delay={150}>
          <b> {t("Contact Custom Solutions")}</b>
        </h1>
        <hr />
        {/* Contact Formular */}
        <div id="contact-formular">
          <div id="message" />
          <form
            method="post"
            action="contact.php"
            name="contactform"
            id="contactform"
          >
            <div className="name-box has-animation" data-delay={100}>
              <input
                name="name"
                type="text"
                id="name"
                size={30}
                value={""}
                placeholder={t("What's Your Name")}
              />
              <label className="input_label" />
            </div>
            <div className="email-box has-animation" data-delay={150}>
              <input
                name="email"
                type="text"
                id="email"
                size={30}
                value={""}
                placeholder={t("Your Email")}
              />
              <label className="input_label" />
            </div>
            <div className="message-box has-animation" data-delay={100}>
              <textarea
                name="comments"
                cols={40}
                rows={4}
                id="comments"
                placeholder={t("Tell Us About Your Project")}
                defaultValue={""}
              />
              <label className="input_label slow" />
            </div>
            <div className="button-box has-animation" data-delay={100}>
              <div className="shetewytech-button-wrap circle parallax-wrap bigger">
                <div className="shetewy-button parallax-element">
                  <div className="button-border  outline parallax-element-second">
                    <input
                      type="submit"
                      className="send_message"
                      id="submit"
                      defaultValue="Submit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/*/Contact Formular */}
      </div>
    </>
  );
}
