import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function Connexion() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("utilisateur")){
      navigate("/");
    }
  })
  const {handleSubmit, register, formState:{errors} } = useForm()
  const onSubmit = (data) => {
    axios.get(`http://localhost:3000/utilisateurs?emailUtilisateur=${data.emailUtilisateur}&motDePasse=${data.motDePasse}`, data).then((res) => {
      if(res.data.length>0){
        localStorage.setItem("utilisateur", JSON.stringify(res.data[0]));//Ajouter les donnees dans mon anvigateur
        toast.success("Connexion réussie");
        navigate("/");
      }else{
        toast.error("Email ou mot de passe incorrect");
      }
      }).catch((error)=>{toast.error("Erreur au niveau du server...")})
  };

  return (
    <Stack 
      alignItems={"center"} 
      justifyContent={"center"}
      width={"100%"} 
      height={"100vh"}>
      <Box 
        width={400} 
        sx={{
          backgroundColor:"#FBFAF8",
          padding:3,
        }}>

      <Typography variant='h5'>Connexion</Typography>

      <form style={{marginTop:4}} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} gap={2}>
          
          <TextField 
            id="filled-basic" 
            label="Veuillez saisir votre Mail" 
            variant="outlined" 
            fullWidth 
            size='small'
            type='email'
            {...register("emailUtilisateur", 
                       {required:"Veuillez saisir votre address email", 
                        pattern: "/^w+([.-]?w+)*@+([.-]?w+)*(.w{2,3})+$/",  
                      })
            }
          /> 

          <TextField 
            id="filled-basic" 
            label="Veuillez saisir un mot de passe" 
            variant="outlined" 
            fullWidth 
            size='small' 
            type='password' 
            {...register("motDePasse", 
                       {required:"Veuillez saisir un mot de passe", 
                        minLength:{
                          value:5, 
                          message:"Veuillez saisir un mot de passe de plus de 5 caracteres"
                        }})
            }
            /> 
          

        </Stack>
        <Button variant='contained' sx={{marginTop:2,}} type='submit'>Se connecter</Button>
        <Typography paddingTop={2}>
          Voulez-vous creer un compte ?{" "} <Link to="/inscription">Cliquer ici</Link>
          </Typography>
      </form>
      </Box>
    </Stack>
  )
}
