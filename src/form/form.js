import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./style.css"; // Import external CSS file
// import companyLogo from "../v1_42.png";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  companyName: Yup.string(),
  address: Yup.string(),
  howDidYouHear: Yup.string().required("How did you hear about us is required"),
  inquiry: Yup.string().required("Inquiry is required"),
});

const initialValues = {
  name: "",
  phoneNumber: "",
  email: "",
  companyName: "",
  address: "",
  howDidYouHear: "",
  inquiry: "",
};

const BeautifulForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);
    setIsSubmitted(false);

    try {
      // Simulate a delay for sending data
      await new Promise((resolve) => setTimeout(resolve, 5000));

      // Mock API call to simulate submission to backend
      const response = await axios.post("http://localhost:5000/submit", values);

      console.log("Backend response:", response.data);

      // After submission, show success message and clear form
      setIsSubmitted(true);
      setShowThankYouMessage(true);
      resetForm();

      // Remove the success message and form after 5 seconds
      // setTimeout(() => {
      //   setShowThankYouMessage(false);
      // }, 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = (resetForm) => {
    resetForm();
    setIsSubmitted(false);
    setShowThankYouMessage(false); // Ensure thank you message is hidden on clear
  };

  const imagePath = "/images/v1_42.png";

  return (
    <>
      <div className="frame-19">
        <img className="mask-group" src="mask-group0.svg" />
        <div className="rectangle-14">
          <div className="left-corner">
            <div className="take-back-your-time-and-leave-the-cleaning-to-the-best-cleaning-experts">
              Take back your time and leave the cleaning to the best cleaning
              experts.
            </div>
            <div className="crypto-ipsum-bitcoin-ethereum-dogecoin-litecoin-filecoin-elrond-dogecoin-tether-arweave-ankr-tether-quant-tezos-kusama-stellar-gala-cosmos-kadena-ox-amp-stacks-decentraland-zcash-stellar-dai-chainlink-maker">
              Hiring someone to clean your home can feel like a big decision as
              you want to hire the best house cleaning service you can. So, we
              gathered some details about professional cleaning franchises to
              help you!
            </div>
            <div className="_55-654-541-17" >
              <p> Whatsapp Us Now on</p>
              <div className="call-sign">
              <img src={imagePath} alt="image not found"/>
              </div>
              <p> +55-654-541-17 </p>
            </div>
          </div>

          <div className="right-corner">
            <div className="form-container">
              <h2 className="form-title">Request A Quote</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, resetForm }) => (
                  <Form className={`form ${isSubmitted ? "submitted" : ""}`}>
                    <div
                      className={`form-group-grid ${
                        isSubmitted ? "hidden" : ""
                      }`}
                    >
                      {/* <h2 className="form-title">Request A Quote</h2> */}
                      <div className="grid-row">
                        <div className="form-group">
                          <Field
                            name="name"
                            className="form-field"
                            placeholder="Name"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="error-message"
                          />
                        </div>
                        <div className="form-group">
                          <Field
                            name="email"
                            className="form-field"
                            placeholder="Email Address"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </div>
                      <div className="grid-row">
                        <div className="form-group">
                          <Field
                            name="phoneNumber"
                            className="form-field"
                            placeholder="Phone Number"
                          />
                          <ErrorMessage
                            name="phoneNumber"
                            component="div"
                            className="error-message"
                          />
                        </div>
                        <div className="form-group">
                          <Field
                            name="companyName"
                            className="form-field"
                            placeholder="Company Name"
                          />
                          <ErrorMessage
                            name="companyName"
                            component="div"
                            className="error-message"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`form-group ${isSubmitted ? "hidden" : ""}`}
                    >
                      <Field
                        name="address"
                        className="form-field"
                        placeholder="Address"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div
                      className={`form-group ${isSubmitted ? "hidden" : ""}`}
                    >
                      <Field
                        as="select"
                        name="howDidYouHear"
                        className="form-field"
                      >
                        <option
                          className="option"
                          value=""
                          label="How did you hear about us"
                        />
                        <option
                          className="option"
                          value="google"
                          label="Google"
                        />
                        <option
                          className="option"
                          value="facebook"
                          label="Facebook"
                        />
                        <option
                          className="option"
                          value="twitter"
                          label="Twitter"
                        />
                        <option
                          className="option"
                          value="linkedin"
                          label="LinkedIn"
                        />
                      </Field>
                      <ErrorMessage
                        name="howDidYouHear"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div
                      className={`form-group ${isSubmitted ? "hidden" : ""}`}
                    >
                      <Field
                        as="textarea"
                        name="inquiry"
                        className="form-field text-area"
                        placeholder="How can we help you?"
                      />
                      <ErrorMessage
                        name="inquiry"
                        component="div"
                        className="error-message"
                      />
                    </div>
                    <div
                      className={`form-group ${isSubmitted ? "" : "hidden"}`}
                    >
                      {isLoading ? (
                        <p className="loading-message">Submitting...</p>
                      ) : (
                        <p className="success-message">
                          Form submitted successfully!
                        </p>
                      )}
                    </div>
                    <div
                      className={`form-group btns${
                        isSubmitted ? "hidden" : ""
                      }`}
                    >
                      <button
                        type="submit"
                        className="submit-button"
                        disabled={isSubmitting || isLoading}
                      >
                        {isLoading ? "Submitting..." : "Submit"}
                      </button>
                      <button
                        type="button"
                        className="clear-button"
                        onClick={() => handleClear(resetForm)}
                        disabled={isSubmitting || isLoading}
                      >
                        Clear
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              {showThankYouMessage && (
                <div className="thank-you-message">
                  <p>
                    We have received your query. We will contact you soon. Thank
                    you for choosing us.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BeautifulForm;
