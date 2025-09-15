import { memo, useRef, useState } from "react";
import useIntersection from "../../../utils/IntersectionObserver";

const Contact = memo(({ setToastMessage, setToastError, setShowToast }) => {
  const formRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [errorIn, setErrorIn] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldValues, setFieldValues] = useState({
    name: "",
    email: "",
    query: "",
  });

  useIntersection(formRef, setReady, 0.05);

  const fieldValuesHandler = (e) => {
    setFieldValues((prv) => ({
      ...prv,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async () => {
    if (loading) return;
    const name = fieldValues.name;
    const email = fieldValues.email;
    const message = fieldValues.query;

    if (name.length === 0 || name.length > 100) {
      setErrorIn("name");
      setToastMessage("Name must be between 1 and 100 characters.");
      setToastError(true);
      setShowToast(true);

      return;
    }

    if (email.length === 0 || email.length > 254 || !email.includes("@")) {
      setErrorIn("email");
      setToastMessage("Enter a valid email address.");
      setToastError(true);
      setShowToast(true);

      return;
    }

    if (message.length === 0 || message.length > 1000) {
      setErrorIn("query");
      setToastMessage("Message must be between 1 and 1000 characters.");
      setToastError(true);
      setShowToast(true);

      return;
    }

    const formData = new FormData(formRef.current);

    try {
      setLoading(true);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        setLoading(false);
        setToastMessage("Thanks for reaching out! Your email was delivered successfully.");
        setToastError(false);
        setShowToast(true);

        setFieldValues({
          name: "",
          email: "",
          query: "",
        });
      } else {
        setLoading(false);
        setToastMessage("Oops! Something went wrong. Please try again later");
        setToastError(true);
        setShowToast(true);
      }
    } catch (err) {
      setLoading(false);
      setToastMessage("Something went wrong. Please try again.");
      setToastError(true);
      setShowToast(true);
    }
  };

  const handleKeyDown = (e) => {
    if (errorIn === e.target.name) setErrorIn("");
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitHandler();
    }
  };

  return (
    <div className={`text-black w-full flex flex-col justify-center gap-8 mt-2 mb-8 lg:mb-18 transform ${ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-400 ease-linear`}>
      <h2 className="text-3xl lg:text-4xl w-fit font-semibold font-heading tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 -mb-2.5 lg:mb-0 self-start">
        Contact Me
      </h2>
      <p className="text-justify lg:text-lg tracking-wider font-medium font-content text-white">
        Have a question, an opportunity, or just want to say hello? Drop me a message and I’ll get back to you soon.
      </p>

      <form
        ref={formRef}
        className="p-4 lg:p-5 border-2 border-[#53eafd] w-[95%] lg:w-[55%] max-lg:mx-auto flex flex-col gap-2 rounded-xl mx-auto backdrop-blur-md"
      >
        <input
          type="hidden"
          name="access_key"
          value={import.meta.env.VITE_WEB_3_FORMS_ACCESS_KEY}
        ></input>
        <div className="relative mb-5">
          <input
            type="text"
            onKeyDown={handleKeyDown}
            value={fieldValues.name}
            onChange={fieldValuesHandler}
            name="name"
            placeholder="Enter your name"
            className={`w-full text-white bg-blue-500/40 placeholder:text-blue-300 py-2 lg:py-3 outline-none px-3 lg:px-4 rounded-md border dark:border-2 ${errorIn === "name" ? "border-red-500" : "border-transparent"}`}
          />
          <p
            className={`absolute right-1 text-xs font-medium mt-1 ${fieldValues.name.length >= 100 ? "text-red-500" : "text-[#53eafd]"
              }`}
          >{`${fieldValues.name.length}/100`}</p>
        </div>
        <div className="relative mb-5">
          <input
            type="email"
            onKeyDown={handleKeyDown}
            value={fieldValues.email}
            onChange={fieldValuesHandler}
            name="email"
            placeholder="Enter your email"
            className={`w-full text-white bg-blue-500/40 placeholder:text-blue-300 py-2 lg:py-3 outline-none px-3 lg:px-4 rounded-md border dark:border-2 ${errorIn === "email" ? "border-red-500" : "border-transparent"}`}
          />
          <p
            className={`absolute right-1 text-xs font-medium mt-1 ${fieldValues.email.length >= 254 ? "text-red-500" : "text-[#53eafd]"
              }`}
          >{`${fieldValues.email.length}/254`}</p>
        </div>
        <div className="relative mb-5">
          <textarea
            name="query"
            onKeyDown={handleKeyDown}
            value={fieldValues.query}
            onChange={fieldValuesHandler}
            placeholder="Type your message..."
            className={`w-full text-white bg-blue-500/40 placeholder:text-blue-300 py-2 lg:py-3 outline-none px-3 lg:px-4 rounded-md min-h-48 lg:min-h-60 border-[1px] dark:border-2 ${errorIn === "query" ? "border-red-500" : "border-transparent"}`}
          ></textarea>
          <p
            className={`absolute right-1 text-xs font-medium ${fieldValues.query.length >= 1000
              ? "text-red-500"
              : "text-[#53eafd]"
              }`}
          >{`${fieldValues.query.length}/1000`}</p>
        </div>
      </form>

      <button
        onClick={submitHandler}
        disabled={loading}
        className={`py-2 px-6 mx-auto font-semibold rounded-md ${loading ? "bg-blue-600/40 text-blue-300 border border-blue-400" : "active:scale-95 hover:bg-primary bg-blue-500 text-white "} transition-transform ease-in-out duration-75 cursor-pointer flex items-center gap-2.5`}
      >
        {loading ? "Sending" : "Send Email"}
        {loading && <div className="mx-auto block border-4 border-t-black border-blue-400 animate-spin rounded-[50%] h-6 w-6"></div>}
      </button>
    </div>
  );
});

export default Contact;
