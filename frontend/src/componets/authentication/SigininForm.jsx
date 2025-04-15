import { Button, Grid, TextField } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { loginUser } from '../../Store/Auth/Action'

const SigininForm = () => {

    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        email:Yup.string().email("Invalid Email").required("Email is required"),
        password:Yup.string().required("Passsword is required")
    })

    const formik = useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema,
        onSubmit:(values)=>{
            dispatch(loginUser(values))
            console.log("form values",values)
        }
    })
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={1}>
            <Grid item style={{ width: "100%" }}>
                <TextField
                fullWidth
                label="Email"
                name='email'
                variant='outlined'
                size='large'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                />
            </Grid>

            <Grid item style={{ width: "100%" }}>
                <TextField
                fullWidth
                label="Password"
                name='password'
                type='password'
                variant='outlined'
                size='large'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                    }
                }}
                />
            </Grid>
            <Grid item style={{ width: "100%" }}>
                <Button 
                    sx={{
                        borderRadius:"29px", 
                        py:"15px", 
                        bgcolor:blue[500]
                    }} 
                    type="submit" 
                    fullWidth 
                    variant="contained" 
                    size="large"
                >
                    Sign in
                </Button>
            </Grid>
      </Grid>
    </form>
  )
}

export default SigininForm








