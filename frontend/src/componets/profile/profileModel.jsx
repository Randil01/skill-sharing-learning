import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, TextField, Avatar } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  outline:"none",
  borderRadius:4
};

export default function ProfileModel({open,handleClose}) {
  //const [open, setOpen] = React.useState(false);
  const [uploding,setUploding] = React.useState(false);
  //const dispatch = useDispach();


  const handleSubmit=(values)=>{
    console.log("submited",values);
  }
  const formik = useFormik({
    initialValues:{
      fullName:"",
      location:"",
      birthday:"",
      bio:"",
      backgroundImage:"",
      profilepic:""
    },
    onSubmit:handleSubmit
  })

  const handleImageChnage=(event)=>{
    setUploding(true);
    const {name} = event.target
    const file = event.target.files[0];
    formik.setFieldValue(name,file);
    setUploding(false);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <form onSubmit={formik.handleSubmit}>
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                    <IconButton onClick={handleClose} aria-label='delete'>
                      <CloseIcon/>
                    </IconButton>
                    <p className='text-sm'>Edit profile</p>
                </div>
                <Button type='submit'>Save</Button>
            </div>
            <div className='overflow-y-scroll overflow-x-hidden h-[80vh]'>
                <React.Fragment>
                  <div className='w-full'>
                    <div className='relative'>
                        <img className="w-full h-[12rem] objecr-cover object-center" src="" alt="" />

                        <input
                        type="file"
                        className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                        name='backgroundImage'
                        onChange={handleImageChnage}
                        />
                    </div>

                  </div>

                  <div className='w-full transform -translate-y-14 ml-4 h-[6rem]'>
                    <div className='relative'>
                        <Avatar sx={{width:"7rem",height:"7rem", border:"4px solid white"}} src='type="file"'/>

                        <input 
                        type="file"
                        className='absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer' 
                        onChange={handleImageChnage}
                        name='profilepic'
                        />
                    </div>

                  </div>
                </React.Fragment>

                <div className='space-y-3'>
                    <TextField
                    fullWidth
                    id="fullName"
                    name="fullName"
                    label="FullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                    helperText={formik.touched.fullName && formik.errors.fullName}/>

                    <TextField
                    fullWidth
                    id="location"
                    name="location"
                    label="Location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    error={formik.touched.location && Boolean(formik.errors.location)}
                    helperText={formik.touched.location && formik.errors.location}/>

<TextField
                    fullWidth
                    multiline
                    rows={4}
                    id="bio"
                    name="bio"
                    label="Bio"
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    error={formik.touched.bio && Boolean(formik.errors.bio)}
                    helperText={formik.touched.bio && formik.errors.bio}/>

                    <div className='my-3'>
                      <p className='text-lg'>Birth date . Edit</p>
                      <p className='text-2x1'>October 27, 2000</p>
                    </div>
                    <p className='py-3 text-lg'> Edit profile pp</p>
                </div>
            </div>
         </form>
        </Box>
      </Modal>
    </div>
  );
}