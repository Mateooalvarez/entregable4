import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import './styles/FormUser.css';

const FormUser = ({ 
    createUser, 
    userSelect, 
    updateUser, 
    setUserSelect,
    formIsOpen,
    setFormIsOpen
}) => {
    const {handleSubmit, register, reset, formState: {errors}} = useForm();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        reset(userSelect);
    }, [userSelect]);

    const submit = data => {
        const isFormValid = Object.keys(data).every(key => data[key]);

        if (!isFormValid) {
            setErrorMessage("Por favor, completa todos los campos.");
            return;
        }

        if (userSelect) {
            // Actualizar
            updateUser(userSelect.id, data);
            setUserSelect();
        } else {
            // Crear
            createUser(data);
        }

        reset({
            email: '',
            password:'',
            first_name:'',
            last_name:'',
            birthday:''
        });
        setFormIsOpen(false);
        setErrorMessage(""); 
    };

    const handleExit = () => {
        setFormIsOpen(false);
        reset({
            email: '',
            password:'',
            first_name:'',
            last_name:'',
            birthday:''
        });
        setUserSelect();
    };

    return (
        <div className={`form-container ${formIsOpen || 'form__close'}`}>
            <form className="form" onSubmit={handleSubmit(submit)}>
                <span onClick={handleExit} className="form__exit">x</span>
                <h2 className="form__title">{userSelect ? 'Editar Usuario' : 'Crear Usuario'}</h2>
                {errorMessage && <h2 className="form__error">{errorMessage}</h2>}
                <div className="form__list">
                    <label className="form__field">
                        <span className="form__label">Email</span>
                        <input className="form__input" {...register('email', {
                            minLength: {
                                value: 8,
                                message: 'Debe tener al menos 8 caracteres.'
                            }
                        })} type="email" />
                        {errors.email && <p className="form__error">{errors.email.message}</p>}
                    </label>
                    <label className="form__field">
                        <span className="form__label">Password</span>
                        <input className="form__input" {...register('password', {
                            minLength: {
                                value: 8,
                                message: 'Debe tener al menos 8 caracteres.'
                            }
                        })} type="password" />
                        {errors.password && <p className="form__error">{errors.password.message}</p>}
                    </label>
                    <label className="form__field">
                        <span className="form__label">First Name</span>
                        <input className="form__input" {...register('first_name')} type="text" />
                    </label>
                    <label className="form__field">
                        <span className="form__label">Last Name</span>
                        <input className="form__input" {...register('last_name')} type="text" />
                    </label>
                    <label className="form__field">
                        <span className="form__label">Birthday</span>
                        <input className="form__input" {...register('birthday')} type="date" />
                    </label>
                </div>
                <button className="form__btn">Submit</button>
            </form>
        </div>
    );
};

export default FormUser;
