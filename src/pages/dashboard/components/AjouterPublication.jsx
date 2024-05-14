import { Button, Stack, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function AjouterPublication() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("utilisateur"));
    const {handleSubmit, register, reset, formState:{errors} } = useForm()

    const useQuery = useQueryClient();

    const mutaion = useMutation({
        mutationFn:(pub) => {
            return axios.post("http://localhost:3000/publications", pub).then((res)=>res.data)
        },
        onError:(error)=>{
            toast.error("Une erreur est survenu")
        },
        onSuccess:() =>{
            toast.success("Publication ajoutée avec succès");
            reset();
            useQuery.invalidateQueries(["publications"]);
            navigate("/")
        }
    })


    const onSubmit = (data) => {
        const publication = {
            ...data,
            idUtilisateur: user.id,
            datePublication: new Date(),
            likePublication: 0,
            auteur: user.nomUtilisateur,
        };//les donnees qu/ont doit mettre dans ma table publication

        mutaion.mutate(publication);
        // axios.post("http://localhost:3000/publications", publication).then((res)=>{
        //     console.log(data)
        //     navigate("/")
        //     toast.success("Publication ajoutée avec succès");
        //     reset();

        // }).catch((err)=>{
        //     console.log(err);
        //     toast.error("Une erreur est survenu...")
        // })
    }
  return (
    <Stack width={"60%"} margin={"auto"}>
        <h1> Ajouter une publication</h1>
        <form 
            style={{
                marginTop:4
            }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack gap={2}>
            <TextField
                id="filled-basic"
                label="Parlez-nous de vous"
                variant="outlined"
                fullWidth
                size='small'
                type='text'
                multiline
                    rows={4}
                {...register("contenu", 
                {required:"Veuillez mettre du contenu", 
                    minLength:{
                    value:2, 
                    message:"Veuillez mettre un contenu de plus de 2 caracteres"
                    }})
         }    
            />
            <TextField
                id="filled-basic"
                label="Saisir l'url de votre image"
                variant="outlined"
                fullWidth
                size='small'
                type='text'
                {...register("image", 
                       {required:"Veuillez saisir l'url de votre image", 
                        minLength:{
                          value:2, 
                          message:"Veuillez saisir un n0om de plus de 2 caracteres"
                }})
            }
            />
            <Button variant="contained" type='submit'>Publier</Button>
            </Stack>
        </form>
    </Stack>
  )
}
