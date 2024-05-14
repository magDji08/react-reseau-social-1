import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, BottomNavigation, BottomNavigationAction, Box, IconButton, Stack, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';

export default function CartePub({publication}) {
    const useQuery = useQueryClient();
    const mutation = useMutation({
        mutationFn: (id)=> {
            return axios.delete(`http://localhost:3000/publications/${id}`);
            },
        onError: (error) => {
            toast.error("Une erreur est survenue");
        },    
        onSuccess: ()=>{
            useQuery.invalidateQueries({queryKey:["publications"]});//rechercher de nouveau les publications
            toast.success("Publication Supprimer avec success");
        }
    })

    const supprimerPublication =(id)=> ()=>{
        mutation.mutate(id);
    };
  return (
    <Box width={"100%"} bgcolor={"#ffff"} borderRadius={4} marginBottom={3}  padding={2} >
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <Avatar src={publication.image}></Avatar>
              <Typography>{publication.auteur}</Typography> 
              <IconButton aria-label="delete" onClick={supprimerPublication(publication.id)}>
              <DeleteIcon />
          </IconButton>
            </Stack>
            <Stack paddingLeft={3}>
            <Typography style={{backgroundColor:"#F8F8F8"}} width={"85%"} marginTop={1} marginBottom={1}>{publication.contenu}</Typography>

            <img src={publication.image} width={"100%"} style={{borderRadius:4}} />
            
            
        {/* <BottomNavigationAction label="Favorites" icon={<FavoriteIcon/>} /> */}
            <Box >
        <BottomNavigation showLabels//value={value}
            value={12}
            onChange={(event, newValue) => {
            //setValue(newValue);
            }}
            sx={{ width: "100%" , bgcolor:"", alignItems:"center"}}
        >
                <BottomNavigationAction label="Like" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Comments" icon={<TextsmsOutlinedIcon />} />
                <BottomNavigationAction label="Partager" icon={<ShareRoundedIcon />} />
           
        </BottomNavigation>
        </Box>
            </Stack>
          </Box>
  )
}
