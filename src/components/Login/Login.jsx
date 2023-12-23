import { useFormik } from "formik";
import style from "./Login.module.css";
import axios from "axios";
import * as yup from "yup";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Puff } from "react-loader-spinner";
import { userContext } from "../../../context/UserContext/UserContext";
import { Helmet } from "react-helmet";



export default function Login() {
  const navigate = useNavigate();
  const [isError, setisError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const { setUserToken,setUserName } = useContext(userContext);

  function toggleShowPassword(e) {
    const inputTarget = e.target.parentElement.querySelector("input");
    if (inputTarget.getAttribute("type") == "password") {
      inputTarget.setAttribute("type", "text");
      e.target.classList.replace("fa-lock", "fa-lock-open");
      e.target.classList.replace("text-danger", "text-success");
    } else {
      inputTarget.setAttribute("type", "password");
      e.target.classList.replace("fa-lock-open", "fa-lock");
      e.target.classList.replace("text-success", "text-danger");
    }
  }

  
  async function LoginAccount(values) {
    setIsLoading(true);
    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res)=>{
        console.log(res.data.user.token)
        setIsLoading(false);
        setUserToken(res.data.token);
        localStorage.setItem("userToken",res.data.token);
        setUserName(res.data.user.name)
        localStorage.setItem('userName',res.data.user.name);
        setIsLoading(false);
        navigate("/");
      })
      .catch((err)=>{
        setIsLoading(false);
        setisError(err.response.data.message);
        console.log(err.response.data.message)
      })
 
     
    } 


  const passwordRegex = /^[A-Z]+[A-Za-z0-9!@$%^&]{8,}$/;
  let validationSchema = yup.object({
    email: yup.string().email("Please enter a valid email address.").required("Email Is Required"),
    password: yup.string().matches(passwordRegex,
        "Password must start with an uppercase letter and be at least 8 characters, including a combination of letters (uppercase and lowercase), numbers, and the special characters: !, @, $, %, ^, &."
      )
      .required("Password is Required"),
  });


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    onSubmit: LoginAccount,
    validationSchema,
  });

  return <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="w-75 mx-auto py-4">
        <h2>Login: </h2>
        <form onSubmit={formik.handleSubmit}>
          {isError ? (
            <div className="alert alert-danger p-3 mt-3"> {isError} </div>
          ) : (
            ""
          )}

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
            id="email"
            className="form-control mt-1 mb-2"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger p-2">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="password">Password:</label>
          <div className="iconToShowPassword position-relative ">
            <input
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              name="password"
              id="password"
              className="form-control mt-1 mb-2"
            />
            <i
              onClick={(e) => {
                toggleShowPassword(e);
              }}
              className={`${style.showPassword}  text-danger fas fa-lock position-absolute end-0 top-50 translate-middle-y`}>
                
              </i>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger p-2">
              {formik.errors.password}
            </div>
          ) : null}
          <Link to='/forgetpassword'  className="d-block resetPassword">Forget Password ?</Link>

          <button disabled={!(formik.dirty &&formik.isValid)} type="submit" className="bg-main btn text-white mt-3">
            {isLoading ? (
              <>
                <Puff
                  height="35"
                  width="35"
                  radius={1}
                  color="#fff"
                  ariaLabel="puff-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />{" "}
              </>
            ) : (
              "Login"
            )}{" "}
          </button>
        </form>

      </div>

    </>
  
}
