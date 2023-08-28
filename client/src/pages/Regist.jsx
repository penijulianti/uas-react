import { useState } from "react"
import { Navigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Input from "../Komponen/Input";
import Btn from "../Komponen/Btn";
// import Icon from "../Komponen/Icon";
import styled from "styled-components";
import { api } from "../utils";

export default function Regist(){
        const [daftar,setDaftar] = useState({
        nama:"",
        email:"",
        password:"",
    });
    const navigate = useNavigate();

    return(
 <main  id="login" className="bg-cover flex justify-center items-center h-full w-full">
<div className="bg-cover flex justify-center items-center h-full w-full">
    <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = new FormData();
            form.append("nama", daftar.nama);
            form.append("email", daftar.email);
            form.append("password", daftar.password);

            const response = await fetch("http://localhost:3001/api/daftar", {
              method: "POST",
              body: form,
            });
            await response.json();
            const akunResponse = await fetch("http://localhost:3001/api/akun");
            const akunData = await akunResponse.json();
            setDaftar(akunData);
            alert(akunData);
            if (response.ok) {
              navigate("/regist");
            } else {
              const message = await response.text();
              alert(message);
            }
          }}>
<MainContainer className="flex items-center flex-col h-full w-full">
      <WelcomeText>Create your Account</WelcomeText>
      <InputContainer>
      <Input
            type="text" placeholder="Name" 
            value={daftar.nama}
            required
            autoFocus
            onChange={(e) => setDaftar({ ...daftar, nama: e.target.value })}/>
        <Input 
            type="email" 
            placeholder="Email"
            value={daftar.email}
            required
            autoFocus
            onChange={(e) => setDaftar({ ...daftar, email: e.target.value })} />
        <Input 
            type="password" 
            placeholder="Password"
            value={daftar.password}
            required
            onChange={(e) => setDaftar({ ...daftar, password: e.target.value })} />
      </InputContainer>
      <ButtonContainer>
        <Btn type="submit" content="Register" />
      </ButtonContainer>
      <HorizontalRule />
    </MainContainer>

    </form>
</div>
</main>
        )
    }
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
    margin-top:15px;
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
