import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Box, CircularProgress } from '@material-ui/core';
import AppHeader from "../components/AppHeader"
import EditSuperhero from '../components/EditSuperhero'
import SuperheroFormatter from "../components/SuperheroFormatter";
import { getSuperheroData, deleteSuperheroData, editSuperheroData } from "../redux/actions/superheroActions";
import { useAppDispatch, useAppSelector } from '../redux/reducers/hooks';
import isPositiveInteger from '../utils/isPositiveInteger';
import { FormState, SuperheroFull } from '../utils/interfaces';

const SuperheroDetails: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [editSuperheroActive, setEditSuperheroActive] = useState(false)
    const fetchingSuperhero = useAppSelector(state => state.superheroes.fetchingSuperhero)
    const deletingSuperhero = useAppSelector(state => state.superheroes.deletingSuperhero)
    const editingSuperhero = useAppSelector(state => state.superheroes.editingSuperhero)
    const superhero = useAppSelector(state => state.superheroes.superhero)
    const { id } = useParams()

    useEffect(() => {
        if (!editingSuperhero && isPositiveInteger(id)) {
            dispatch(getSuperheroData(Number(id) as number))
        }
    }, [id, editingSuperhero])

    useEffect(() => {
        if (deletingSuperhero) {
            navigate('/')
        }
    }, [deletingSuperhero])

    const handleEditClick = () => {
        setEditSuperheroActive(!editSuperheroActive)
    }

    const handleSuperheroEdit = (data: FormState) => {
        const id = (superhero as SuperheroFull).id
        setEditSuperheroActive(false)
        dispatch(editSuperheroData({ id, data }))
    }

    const handleSuperheroDelete = (id: number) => {
        dispatch(deleteSuperheroData(id))
    }

return (
    <Grid
        container
        style={{
            color: "lightblue",
            width: "100%",
            height: '100%'
        }}
        direction="column"
        alignItems="center"
    >
        <AppHeader />
        <Box sx={{ mt: 9 }}>
            {fetchingSuperhero ?
                <CircularProgress />
                : editSuperheroActive ?
                    <EditSuperhero
                        superhero={superhero as SuperheroFull}
                        onSubmit={handleSuperheroEdit}
                        onCancelClick={handleEditClick}
                    />
                    : <SuperheroFormatter
                        superhero={superhero as SuperheroFull}
                        onDelete={handleSuperheroDelete}
                        onEditClick={handleEditClick}
                    />
            }
        </Box>
    </Grid>
)

}

export default SuperheroDetails
