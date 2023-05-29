import { useFormik } from "formik";
import MaskedInput from "react-text-mask";
import InputMask from "react-input-mask";
import mc_symbol from "../assets/mc_symbol.svg";
import verified_badge from "../assets/verified-badge.svg";
import dots from "../assets/dots.svg";

const mastercardMask = [ /[0-9]/,/\d/,/\d/,/\d/," ","-"," ",/\d/,/\d/,/\d/,/\d/," ","-"," ",/\d/,/\d/,/\d/,/\d/," ","-"," ",/\d/,/\d/,/\d/,/\d/,];

const cvvMask = [/[0-9]/, /\d/, /\d/, /\d/];
  
let monthMask = "mM";
let formatChars = {
    m: "[0-1]",
    M: "[0-9]",
  };
  
  let beforeMaskedValueChange = (newState, oldState, userInput) => {
    let { value } = newState;
  
    let dateParts = value.split("-");
    let monthPart = dateParts[0];
  
    // Conditional mask for the 2nd digit of month based on the first digit
    if (monthPart.startsWith("1")) {
      formatChars["M"] = "[0-2]"; // To block 13, 15, etc.
    } else formatChars["M"] = "[1-9]"; // To allow 05, 08, etc - but blocking 00.
  
    return { value, selection: newState.selection };
  };
  
  // End of month mask
  
  const yearMask = [/[2]/, /[4-9]/];
  
  const validate = (values) => {
    const errors = {};

    if (!values.mastercard) {
      errors.mastercard = "Required";
    } else if (values.mastercard.trim().length !== 25) {
      errors.mastercard = "Invalid card details. Must be 16 digits";
    }

    if (!values.month.trim()) {
      errors.month = "Required";
    } else if (values.month.trim() == 0) {
        errors.month = "Required";

    }

    if (!values.year) {
      errors.year = "Required";
    } else if (values.year.trim().length !== 2) {
      errors.year = "Invalid year";
    }

    if (!values.cvv) {
      errors.cvv = "Required";
    } else if (
      !(values.cvv.trim().length === 3 || values.cvv.trim().length === 4)
    ) {
      errors.cvv = "Invalid cvv details";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.trim().length < 7) {
      errors.password = "Password must be at least 7 characters";
    }

    return errors;
  };
function Form() {
  const formik = useFormik({
    initialValues: {
      mastercard: "",
      cvv: "",
      month: "",
      year: "",
      password: "",
    },

    validate,
    onSubmit: (values, { resetForm }) => {
      window.alert(JSON.stringify(values, null, 2));
      resetForm({ values: "" });
    },
  });
  return (
    <div className="col-span-12 md:col-span-8">
      <div className="form">
        <header className="form-header">
          <div className="logo">
            <span className="logo-circle"></span>
            <h1>
              AceCoin<span className="lean">Pay</span>
            </h1>
          </div>
          <div className="timer">
            <span className="timer-box">0</span>
            <span className="timer-box">1</span>
            <span className="timer-divider">:</span>
            <span className="timer-box">1</span>
            <span className="timer-box">9</span>
          </div>
        </header>
        <section className="form-body">
          <form onSubmit={formik.handleSubmit} action="">
            <div className="input-group">
              <div className="header">
                <div className="description">
                  <h2 className="title">card number</h2>
                  <p className="desc">
                    Enter the 16-digit card number on the card
                  </p>
                </div>
                <button type="button" className="edit">
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <g>
                        <path
                          d="M311.18,78.008L32.23,356.958L0.613,485.716c-1.771,7.209,0.355,14.818,5.604,20.067
                                              c5.266,5.266,12.88,7.368,20.067,5.604l128.759-31.617l278.95-278.95L311.18,78.008z M40.877,471.123l10.871-44.271l33.4,33.4
                                              L40.877,471.123z"
                        />
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          d="M502.598,86.818L425.182,9.402c-12.536-12.536-32.86-12.536-45.396,0l-30.825,30.825l122.812,122.812l30.825-30.825
                                              C515.134,119.679,515.134,99.354,502.598,86.818z"
                        />
                      </g>
                    </g>
                  </svg>
                  <span className="btn-desc">Edit</span>
                </button>
              </div>
              <div className="main">
                <img src={mc_symbol} alt="" className="leading-icon" />
                <MaskedInput
                  mask={mastercardMask}
                  guide={false}
                  id="mastercard"
                  type="text"
                  placeholder="2412   -   7512   -   3412   -   3456"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mastercard}
                />

                <img src={verified_badge} alt="" className="trailing-icon" />
              </div>
              {formik.touched.mastercard && formik.errors.mastercard ? (
                <div style={{ color: "red" }}>{formik.errors.mastercard}</div>
              ) : null}
            </div>
            <div className="input-group __col">
              <div className="header">
                <div className="description">
                  <h2 className="title">CVV number</h2>
                  <p className="desc">
                    Enter the 3 or 4 digit number on the card
                  </p>
                </div>
              </div>
              <div className="main">
                <MaskedInput
                  mask={cvvMask}
                  guide={false}
                  id="cvv"
                  type="text"
                  placeholder="327"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cvv}
                />
                
                <img src={dots} alt="" className="trailing-icon" />
             
              </div>
              
            </div>
            <div
              id="errordiv"
              style={{
                marginBottom: "20px",
              }}
            > {formik.touched.cvv && formik.errors.cvv ? (
                <div style={{ color: "red",
                marginLeft: "300px",
                marginTop: "-30px", }}>{formik.errors.cvv}</div>
              ) : null}</div>
            

            <div className="input-group __col">
              <div className="header">
                <div className="description">
                  <h2 className="title">expiry date</h2>
                  <p className="desc">Enter the expiration date of the card</p>
                </div>
              </div>
              <div className="grp">
                <div className="main __date">
                  <InputMask
                    formatChars={formatChars}
                    maskChar={" "}
                    mask={monthMask}
                    id="month"
                    type="text"
                    placeholder="09"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.month}
                    beforeMaskedValueChange={beforeMaskedValueChange}
                  />
                </div>

                <span className="divider">/</span>
                <div className="main __date">
                  <MaskedInput
                    mask={yearMask}
                    guide={false}
                    id="year"
                    type="text"
                    placeholder="22"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.year}
                  />
                </div>
              </div>
            </div>
            <div
              id="errordiv"
              style={{
                marginBottom: "30px",
                // display: "inline-flex"

              }}
            >
              {formik.touched.month && formik.errors.month ? (
                <div
                  style={{
                    color: "red",
                    marginLeft: "300px",
                    marginTop: "-28px",
                  }}
                >
                  {formik.errors.month}
                </div>
              ) : null}
              {formik.touched.year && formik.errors.year ? (
                <div
                  style={{
                    color: "red",
                    marginLeft: "520px",
                    marginTop: "-26px",
                  }}
                >
                  {formik.errors.year}
                </div>
              ) : null}
            </div>

            <div className="input-group __col">
              <div className="header">
                <div className="description">
                  <h2 className="title">password</h2>
                  <p className="desc">Enter your Dynamic password</p>
                </div>
              </div>
              <div className="main">
                <input
                  id="password"
                  type="password"
                  placeholder="******"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                
                <img src={dots} alt="" className="trailing-icon" />
              </div>
            </div>
            <div
              id="errordiv"
              style={{
                marginBottom: "20px",
              }}
            > {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red",   marginLeft: "300px",
                marginTop: "-30px", }}>{formik.errors.password}</div>
              ) : null}</div>

            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn-submit"
            >
              pay now
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Form;