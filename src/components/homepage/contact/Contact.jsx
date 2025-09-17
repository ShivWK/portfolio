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

  useIntersection(formRef, setReady, 0.03);

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

     <div className="relative w-full mt-4 lg:mt-10">
       <div className="flex mx-auto justify-between items-center w-full">
        <div className="basis-[45%] hidden lg:block shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="370" height="370" viewBox="0 0 743 743" xmlnsXlink="http://www.w3.org/1999/xlink" role="img" artist="Katerina Limpitsouni" source="https://undraw.co/"><path d="M743,371.5c0,108.41992-46.4502,206-120.54004,273.91016-12.95996,11.88965-26.76953,22.86963-41.33008,32.83008-8.67969,5.94971-17.62012,11.52979-26.80957,16.71973-9.66992,5.49023-19.61035,10.5498-29.80078,15.16016-.62988.29004-1.25977.56982-1.89941.84961-15.7998,7.05029-32.19043,13.02051-49.06055,17.83008-4.51953,1.29004-9.06934,2.5-13.65918,3.61035-20.38086,4.97998-41.41992,8.27979-62.95996,9.72998-8.41016.56982-16.89062.85986-25.44043.85986-29.84961,0-58.87012-3.52002-86.67969-10.16992-2.91016-.68994-5.82031-1.41992-8.7002-2.2002-2.87988-.75-5.75-1.5498-8.60059-2.37988-13.75977-4-27.18945-8.78027-40.23926-14.28027C93.74023,657.66016,0,525.52002,0,371.5,0,166.33008,166.33008,0,371.5,0s371.5,166.33008,371.5,371.5Z" fill="#0099ff"/><path d="M459.90039,601.96973v130.44043c-20.38086,4.97998-41.41992,8.27979-62.95996,9.72998-8.41016.56982-16.89062.85986-25.44043.85986-29.84961,0-58.87012-3.52002-86.67969-10.16992-2.91016-.68994-5.82031-1.41992-8.7002-2.2002-2.87988-.75-5.75-1.5498-8.60059-2.37988v-126.28027h192.38086Z" fill="#090814"/><path d="M268.50992,373.77992l-53.59256,149.12683-53.59192-12.3232,66.12213-151.46237c-4.90639-9.95337-5.73946-22.82758-1.26682-35.35646,7.82596-21.9223,28.8774-34.44332,47.02-27.96668,18.14258,6.47668,26.50579,29.49823,18.67983,51.42061-4.47266,12.52893-13.27055,21.96493-23.37058,26.56123l-.00008.00005Z" fill="#ed9da0"/><path d="M272.07783,377.13352c-.49172,0-.98834-.05554-1.47843-.17153-1.90644-.44598-3.48779-1.71367-4.33727-3.47799l-16.60743-34.47438c-.95567-1.98322-.83805-4.28826.31366-6.1653l38.01608-62.00586c1.02918-1.67773,2.74122-2.78043,4.6934-3.02547l6.84979-.85602c2.64157-.32182,5.26844,1.03735,6.50836,3.40447l15.09469,28.81714c1.06349,2.03223.9622,4.49737-.26301,6.43811l-43.35313,68.51748c-.40024.63058-.90013,1.18111-1.48496,1.63689-1.1468.89359-2.53375,1.36244-3.95174,1.36244Z"/><path d="M273.62814,363.66428c-.1993,0-.40024-.01144-.60281-.03594-1.86887-.22217-3.44205-1.45556-4.10367-3.21824l-8.37723-22.31368c-.54726-1.45883-.39534-3.05651.41657-4.38301l33.32758-54.48301c.90503-1.48006,2.47984-2.37692,4.21475-2.39979,1.80679.02124,3.33586.83642,4.28173,2.29361l13.283,20.52649c1.0978,1.6957,1.07329,3.87496-.06208,5.54779l-38.23498,56.26857c-.9426,1.38858-2.49291,2.19723-4.14287,2.19723Z" fill="#6c63ff"/><path d="M434.1146,273.28165c1.98393-42.58959-30.9335-78.72366-73.52306-80.7076-42.58959-1.98395-78.72394,30.93349-80.7079,73.52305-1.60899,34.54047,19.73947,64.83093,50.58376,76.10644l10.31825,99.21681,78.94785-59.79112s-15.44362-21.67708-23.14984-45.66703c21.45306-12.84057,36.2803-35.8334,37.53089-62.68054h.00005Z" fill="#ed9da0"/><path d="M280.75,690.7998l-8.20996-9.46973,15.5-79.36035,7.55957-38.70996,1.52051-7.81982,30.62988-156.81982,3.33984-21.74023,2.89062-.93994.36914-.12012,68.18066-22.26978.92969-.31006,9.59961-3.13013,25.93066,20.91016,34.56934,357.77979c-4.51953,1.29004-9.06934,2.5-13.65918,3.61035-20.38086,4.97998-41.41992,8.27979-62.95996,9.72998-8.41016.56982-16.89062.85986-25.44043.85986-29.84961,0-58.87012-3.52002-86.67969-10.16992-10.9502-18.08984,9.46973-26.41016,9.46973-26.41016l-13.54004-15.62012Z" fill="#6c63ff"/><path d="M336.9502,394.43994l-.74023,2.97998-39.08984,158.02002-1.16016,4.70996-.36035,3.10986-4.50977,38.70996-10.33984,88.83008-4.62988,39.83008c-2.87988-.75-5.75-1.5498-8.60059-2.37988-13.75977-4-27.18945-8.78027-40.23926-14.28027,2.45996-59.0498,20.7002-145.75977,21-147.20996-11.75,21.74023-95.35059,45.15039-95.35059,45.15039l-33.44922-23.36035v-65.2998l31.7793-43.5,33.45996-55.2002c2.12988-6.90967,5.31055-11.83008,9.2002-15.25977,4.16016-3.68994,9.12988-5.66016,14.48047-6.54004,16.46973-2.7002,36.55957,4.96973,47.7998,5.27979,3.17969.1001,5.66016-.3999,7.13965-1.87988.75-.75,1.58008-1.46973,2.48047-2.15967,11.16016-8.6001,32.64941-12.90039,32.64941-12.90039l34.29004-26.65991.08984.62012,1.5,10.76978,2.60059,18.62012Z" fill="#090814"/><path d="M386.26574,219.00038c-8.91852,3.71198-19.72877,2.44328-27.54551-3.2328-19.1339,10.33299-42.1478,13.2618-63.25989,8.05062-3.14521,8.35076-9.48281,15.45354-17.42266,19.52624-.31279-11.56038,3.65192-23.18834,10.96188-32.14966-6.63591,2.98236-13.27182,5.9647-19.90773,8.94706,4.95483-7.15679,9.90969-14.3136,14.86453-21.4704l1.13006-.97663c-5.98894-1.63892-11.97786-3.27787-17.96681-4.91679,11.3248-5.83711,24.49944-8.01636,37.10069-6.13686-2.20986-5.21387-7.21462-9.14198-12.80425-10.04969,13.21702-2.7977,26.43404-5.59537,39.65106-8.39307l-.45211,1.62717c17.72845-3.99517,35.97124-8.01201,53.92534-5.19955,17.9541,2.81246,35.80099,14.08315,40.89835,31.52667l.08434-.9357c10.76472.23566,21.28863,5.75919,27.59738,14.48463,6.3088,8.72544,8.25603,20.45021,5.1063,30.74649-3.77801,12.3501-14.37059,22.85637-13.81648,35.75953l-.48585.10085c3.50739,19.70575-30.9628,48.54091-47.593,59.67889,7.04644-3.28634,15.3769-15.90464,13.38265-23.41964-1.99425-7.51501,16.1129-35.76931,8.36416-35.12946-4.34978.35919-27.95954-6.23358-31.21014-15.65959-2.73862-7.94138-5.50041-16.5257-3.10001-24.57576.94699-3.17589,2.66189-6.08592,3.55247-9.27808s.78598-6.98192-1.50309-9.37838l.44833.45392Z" fill="#090814"/><path d="M235.33228,515.493l32.19101-117.7072s-34.67823,23.41964-55.78672-18.40115l-58.80224,98.69706,82.39796,37.41128Z" fill="#090814"/><path d="M581.12988,678.24023c-8.67969,5.94971-17.62012,11.52979-26.80957,16.71973l7.59961-21.14014,19.20996,4.42041Z" fill="#ed9da0"/><path d="M622.45996,645.41016c-12.95996,11.88965-26.76953,22.86963-41.33008,32.83008-8.67969,5.94971-17.62012,11.52979-26.80957,16.71973-9.66992,5.49023-19.61035,10.5498-29.80078,15.16016-.62988.29004-1.25977.56982-1.89941.84961-15.7998,7.05029-32.19043,13.02051-49.06055,17.83008-4.51953,1.29004-9.06934,2.5-13.65918,3.61035-20.38086,4.97998-41.41992,8.27979-62.95996,9.72998-4.9209-41.30029-10.12012-91.87012-12.87012-140.17041-3.80078-66.68994-2.93066-129.03955,9.7793-156.6499,0,0,5.48047-25.17969,8.35059-50.40967,1.7998-15.84033,2.58008-31.69019.33008-41.36011-1.16016-5.01001-3.14062-8.36011-6.2002-9.19995,0,0,1.21973-.04004,3.26953-.01025h.01074c11.0498.2002,46.33008,2.71021,47.73926,26.68018l97.03027,40.1499,78.08008,234.24023Z" fill="#090814"/><path d="M533.53027,668.75977l-9.01074,41.36035c-.62988.29004-1.25977.56982-1.89941.84961l9.18945-42.15967-30.06934-107.93018,1.60938-.43994,30.18066,108.31982Z" fill="#fff"/></svg>
        </div>
        <form
          ref={formRef}
          className="p-4 lg:p-5 border-2 border-[#53eafd] w-[96%] lg:w-full max-lg:mx-auto flex flex-col gap-2 rounded-xl mx-auto backdrop-blur-md shrink-0 basis-full lg:basis-[50%]"
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

          <button
            type="button"
            onClick={submitHandler}
            disabled={loading}
            className={`py-2 px-6 mx-auto font-semibold rounded-md ${loading ? "bg-blue-600/40 text-blue-300 border border-blue-400" : "active:scale-95 hover:bg-primary bg-blue-500 text-white "} transition-transform ease-in-out duration-75 cursor-pointer flex items-center gap-2.5`}
          >
            {loading ? "Sending" : "Send Email"}
            {loading && <div className="mx-auto block border-4 border-t-black border-blue-400 animate-spin rounded-[50%] h-6 w-6"></div>}
          </button>
        </form>
      </div>
     </div>
    </div>
  );
});

export default Contact;
