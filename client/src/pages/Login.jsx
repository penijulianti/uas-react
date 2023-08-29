import { useState } from "react"
import { Navigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Input from "../Komponen/Input";
import Btn from "../Komponen/Btn";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Login(){
    const [login,setLogin] = useState({
        email:"",
        password:"",
    });
    const navigate = useNavigate();
    const [akun,setAkun] = useOutletContext();


    if(akun){
        return <Navigate to="/" />
    }else{
        return(
 <main  id="login" className="py-32 pl-0 bg-cover flex justify-center items-center h-full w-full">
<div className="bg-cover flex justify-center items-center h-full w-full">
    <form
          onSubmit={async (e) => {
            e.preventDefault();
            const response = await fetch("http://localhost:3001/api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(login),
            });
            if (response.ok) {
              const auth = await response.json();
              localStorage.setItem("token", auth.token);
              setAkun(auth.akun);
              navigate("/");
            } else {
              const message = await response.text();
              alert(message);
            }
          }}>
<MainContainer className="flex items-center flex-col h-full w-full">
      <WelcomeText>Welcome to</WelcomeText>
      <div>KZone</div>
      <InputContainer>
        <Input 
            type="email" 
            placeholder="Email"
            required
            autoFocus
            onChange={(e) => setLogin({ ...login, email: e.target.value })} />
        <Input 
            type="password" 
            placeholder="Password"
            required
            onChange={(e) => setLogin({ ...login, password: e.target.value })} />
      </InputContainer>
      <ButtonContainer >
        <Btn type="submit" content="Login" />
      </ButtonContainer>
      <ButtonContainer>
        <Link to={"/regist"}>
        <Btn content="Regist"/>
        </Link>

        </ButtonContainer>
      <HorizontalRule />
    </MainContainer>

    </form>
</div>
</main>
        )
        }}
    const MainContainer = styled.div`
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(8.5px);
    -webkit-backdrop-filter: blur(8.5px);
    border-radius: 10px;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.4rem;
    @media only screen and (max-width: 320px) {
      width: 100%;
      height: 100%;
      hr {
        margin-bottom: 0.3rem;
      }
      h4 {
        font-size: small;
      }
    }
    @media only screen and (min-width: 360px) {
      width: 80vw;
      height: 90vh;
      h4 {
        font-size: small;
      }
    }
    @media only screen and (min-width: 411px) {
      width: 80vw;
      height: 90vh;
    }
  
    @media only screen and (min-width: 768px) {
      width: 80vw;
      height: 80vh;
    }
    @media only screen and (min-width: 1024px) {
      width: 70vw;
      height: 50vh;
    }
    @media only screen and (min-width: 1280px) {
      width: 30vw;
      height: 80vh;
    }
  `;
  
  const WelcomeText = styled.h2`
    margin: 3rem 0 2rem 0;
  `;
  
  const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 20%;
    width: 100%;
    gap:15px;
  `;
  
  const ButtonContainer = styled.div`
    margin: 4rem 0 2rem 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const HorizontalRule = styled.hr`
    width: 90%;
    height: 0.3rem;
    border-radius: 0.8rem;
    border: none;
    background: linear-gradient(to right, #14163c 0%, #03217b 79%);
    background-color: #ebd0d0;
    margin: 1.5rem 0 1rem 0;
    backdrop-filter: blur(25px);
  `;

    
  
