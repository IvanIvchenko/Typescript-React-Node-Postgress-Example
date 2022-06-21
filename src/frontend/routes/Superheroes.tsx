import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../redux/reducers/hooks"
import { useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { Grid, CircularProgress, Box, IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AppHeader from "../components/AppHeader"
import SuperheroCard from "../components/SuperheroCard";
import AddSuperhero from "../components/AddSuperhero";
import { getSuperheroesData, createSuperheroData } from "../redux/actions/superheroActions";
import setPage from '../utils/setPage'
import { FormState, SuperheroShort } from "../utils/interfaces";



const Superheroes: FC = () => {
    const [addSuperheroActive, setAddSuperheroActive] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const pagesNumber = useAppSelector((state) => state.superheroes.pagesNumber)
    const fetchingSuperheroes = useAppSelector((state) => state.superheroes.fetchingSuperheroes)
    const creatingSuperhero = useAppSelector((state) => state.superheroes.creatingSuperhero)
    const deletingSuperhero = useAppSelector((state) => state.superheroes.deletingSuperhero)
    const superheroes = useAppSelector((state) => state.superheroes.superheroes)

    useEffect(() => {
        const page = setPage(searchParams.get('page') as string, pagesNumber as number)
        dispatch(getSuperheroesData(page))
    }, [])

    useEffect(() => {
        if (!creatingSuperhero || !deletingSuperhero) {
            dispatch(getSuperheroesData(null))
        }
    }, [creatingSuperhero, deletingSuperhero])

    const handleSuperheroCreation = (event: FormState) => {
        setAddSuperheroActive(!addSuperheroActive)
        dispatch(createSuperheroData(event))
        window.location.reload()
    }

    const handleSuperheroClick = (id: number) => {
        navigate(`../superhero/${id}`)
    }

    const handlePageChange = (event: unknown, value: number) => {
        const page = searchParams.get('page')
        const pageNumber: number | null = Number(page) || null
        if (page && value === pageNumber) {
            return
        } else {
            setSearchParams({ page: page || '' })
            setAddSuperheroActive(false)
            dispatch(getSuperheroesData(value))
        }
    }

    const handleSuperheroFormCancelClick = () => {
        setAddSuperheroActive(false)
    }

    const handleHeaderClick = () => {
        setAddSuperheroActive(false)
        navigate('/')
    }

    return (
        <Grid
            container
            style={{
                color: "lightblue",
                width: "100%",
                height: '100%'
            }}
            justifyContent="center"
            direction="column"
            alignItems="center"
        >
            <AppHeader onClick={handleHeaderClick}/>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ mt: 9 }}
            >
                {!addSuperheroActive ?
                    <IconButton onClick={(() => setAddSuperheroActive(!addSuperheroActive))}>
                        <AddCircleOutlineIcon style={{ fontSize: "50" }} />
                    </IconButton>
                    : null
                }
                {addSuperheroActive ?
                    <AddSuperhero onFormSubmit={handleSuperheroCreation} onFormCancelClick={handleSuperheroFormCancelClick} />
                    : null
                }
                {fetchingSuperheroes ?
                    <CircularProgress />
                    : <>
                        {superheroes ?
                            superheroes.map((superhero: SuperheroShort) =>
                                <Grid item >
                                    <SuperheroCard
                                        superhero={superhero}
                                        onClick={(e) => handleSuperheroClick(e)}
                                    />
                                </Grid>
                            )
                            : null
                        }
                        {Number(pagesNumber) > 1 ?
                            < Pagination
                                count={pagesNumber || 0}
                                page={Number(searchParams.get('page'))}
                                onChange={handlePageChange}
                                sx={{ m: 8 }}
                                boundaryCount={2}
                                hidePrevButton
                                hideNextButton
                            />
                            : null
                        }
                    </>
                }
            </Box>
        </Grid>
    )

}

export default Superheroes