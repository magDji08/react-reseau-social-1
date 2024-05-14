import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Avatar, BottomNavigationAction, Box, IconButton, Stack, Typography } from '@mui/material';
import AjouterPublication from './components/AjouterPublication';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CartePub from './components/Cartepub';




export default function Dashboard() {
  // const [publications, setPublications] = useState([])
  const navigate = useNavigate();
  
  //execute en premier plan
  useEffect(()=>{
    if(!localStorage.getItem("utilisateur")){
      navigate("/connexion");
    }

    // axios.get("http://localhost:3000/publications").then((res)=>{
    //   setPublications(res.data)
    // })
  });

    const queryClient = useQueryClient();

    const {data:publications, error, isLoading} = useQuery({
      queryKey: ["publications"],
      queryFn: () =>  
        axios.get("http://localhost:3000/publications").then((res)=> res.data),
      onerror:(error)=>console.log(error),
    });

    if(isLoading){
      return <div>Chargement...</div>
    }

    //Pour trier les publications et mettre la plus recentes en haut
    let pubTrier = publications.sort((a, b)=>{
      return new Date(b.datePublication) - new Date(a.datePublication);
    })

  
  return (<Box bgcolor={"#F0F0EE"}> 
    <Navbar/>  
    <AjouterPublication/>
    <Box width={"80%"} margin={"auto"} marginTop={4}>
      {publications && pubTrier.map((publication)=>
      <CartePub publication={publication} key={publication.id}/>
      )}
    </Box>
    
  </Box>);
}
