import { useState, useEffect, useContext } from 'react'
import { Button, Icon } from 'react-materialize'
import authContext from '../../context/authentication/authContext'
import Preloader from '../../components/layout/Preloader'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const FormUser = ({ setShowForm, dataState }) => {

    const AuthContext = useContext(authContext)
    const { addUser, updateUser } = AuthContext
    
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: dataState ? dataState.name : '',
            email: dataState ? dataState.email : ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Nombre obligatorio'),
            email: Yup.string()
                .email('Correo no valido')
                .required('El correo es obligatorio'),
        }),
        onSubmit: async data => {
            setIsLoading(true)

            if (dataState) await updateUser(data, dataState)
            else await addUser(data)

            setIsLoading(false)
            setShowForm(false)
        }
    })

    useEffect(() => {
        M.updateTextFields();
    }, [])

    return (
        <div className="container">
            {isLoading ? (
                <Preloader />
            ) : null}

            <form 
                onSubmit={formik.handleSubmit}
            >
                <div className="row">
                    <div className="input-field col s12 l6">
                        <input  
                            type="text" 
                            name="name" 
                            id="name"
                            value={formik.values.name} 
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="name">Nombre</label>
                        <span className="red-text text-darken-2">
                            <b>{formik.errors.name}</b>
                        </span>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12 l6">
                        <input 
                            type="text" 
                            name="email" 
                            id="email" 
                            value={formik.values.email} 
                            onChange={formik.handleChange}
                        />
                        <label htmlFor="email">Email</label>
                        <span className="red-text text-darken-2">
                            <b>{formik.errors.email}</b>
                        </span>
                    </div>
                </div>

                <div className="row">
                    <div className="col s12">
                        <Button
                            node="button"
                            type="submit"
                            className={`btn waves-effect waves-light ${dataState ? 'blue' : 'green'}`}
                            icon={<Icon right>send</Icon>}
                        ><b>{dataState ? 'Editar' : 'Crear'}</b></Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormUser