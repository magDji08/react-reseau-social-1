import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export default function Inscription() {
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem("utilisateur")){
      navigate("/");
    }
  });
  const {handleSubmit, register, formState:{errors} } = useForm()
  const onSubmit = (data) => {
    if(data.motDePasse != data.motDePasseConfirmation){
      toast.error("Les mots de passe ne sont pas identiques");
    }else{
      axios.get(`http://localhost:3000/utilisateurs?emailUtilisateur=${data.emailUtilisateur}`, data).then((res) => {
        if(res.data.length > 0){
          toast.error("Cet email est déjà utilisé par un compte existant")
        }else{
          axios.post("http://localhost:3000/utilisateurs", data).then((res) => {
        console.log(res)
        toast.success("Inscription reussi")
        navigate("/connexion")
      }).catch((err)=>{
        console.log(err)
        toast.error("Erreur lors de l'inscription")
      })
        }

      }).catch((err)=>{})


      
    }
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

      <Typography variant='h5'>Inscription</Typography>

      <form style={{marginTop:4}} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"} gap={2}>
          <TextField 
            id="filled-basic" 
            label="Veuillez saisir votre nom" 
            variant="outlined" 
            fullWidth 
            size='small'
            {...register("nomUtilisateur", 
                       {required:"Veuillez saisir un nom", 
                        minLength:{
                          value:2, 
                          message:"Veuillez saisir un n0om de plus de 2 caracteres"
                        }})
            }
          /> 

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
          <TextField 
            id="filled-basic" 
            label="Veuillez confirmer votre mot de passe" 
            variant="outlined" 
            fullWidth 
            size='small' 
            type='password' 
            {...register("motDePasseConfirmation", 
                       {required:"Veuillez confirmer votre mot de passe", 
                        minLength:{
                          value:5, 
                          message:"Veuillez saisir un mot de passe de plus de 5 caracteres"
                        }})
            }  
          /> 

        </Stack>
        <Button variant='contained' sx={{marginTop:2,}} type='submit'>S'inscrire</Button>
        <Typography paddingTop={2}>
          Se connecter{" : "} <Link to="/connexion">Cliquer ici</Link>
          </Typography>
      </form>
      </Box>
    </Stack>
  )
}
