import { useForm } from 'react-hook-form';
import { useState } from 'react';
import "./FormInput.css"

import React from 'react'

const FormInput = ({ formatName, submitForm }) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });
    const onSubmit = (data) => {
        submitForm(data);
    };



    return (
        <>
            <div className="signup-container">
                <div className="signup-card">
                    <h1>{formatName}</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {formatName === "Sign Up" &&
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type='text'
                                    name='name'
                                    {...register("name", {
                                        required: true,
                                        minLength: 4
                                    })}
                                >
                                </input>
                                {errors.name && errors.name.type === 'required' && (
                                    <p className='errorMsg'>Please enter your name</p>
                                )}
                                {errors.name && errors.name.type === 'minLength' && (
                                    <p className='errorMsg'>Please select another name</p>
                                )}
                            </div>
                        }

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                {...register("email", {
                                    required: true,
                                    pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/
                                })}
                            />
                        </div>
                        {errors.email && errors.email.type === "required" && (
                            <p className="errorMsg">Email is required.</p>
                        )}
                        {errors.email && errors.email.type === "pattern" && (
                            <p className="errorMsg">Email is not valid.</p>
                        )}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                {...register("password", {
                                    required: true,
                                    minLength: 6
                                })}
                            />
                            {errors.password && errors.password.type === "required" && (
                                <p className="errorMsg">Password is required.</p>
                            )}
                            {errors.password && errors.password.type === "minLength" && (
                                <p className="errorMsg">
                                    Password should be at-least 6 characters.
                                </p>
                            )}
                        </div>
                        <button type="submit" style={{ background: "black" }}>{formatName}</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormInput
