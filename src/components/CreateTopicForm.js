import React from 'react';
import {useForm} from 'react-hook-form';
import ValidateWrapper from './utilities/ValidateWrapper';

const CreateTopicForm = ({submitHandler}) => {
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    })

    return (
        <>
            <h3>Новая тема</h3>
            <form
                className="fs-12"
                onSubmit={handleSubmit(submitHandler)}
            >
                <label className="mb-2">Название темы</label>
                <ValidateWrapper error={errors?.title} className="mb-4">
                    <input
                        type="text"
                        className={!errors?.title ? 'mb-4' : ''}
                        placeholder="Придумайте название темы"
                        {...register('title', {
                            required: 'поле обязательно к заполнению'
                        })}
                    />
                </ValidateWrapper>
                <label className="mb-2">Текст темы</label>
                <ValidateWrapper error={errors?.description}>
                    <textarea
                        rows="5"
                        placeholder="Ваша история или вопрос"
                        {...register('description', {
                            required: 'поле обязательно к заполнению'
                        })}
                    />
                </ValidateWrapper>
                <div className="row flex-sm-row-reverse mt-4">
                    <div className="col-sm-5">
                        <button type="submit" className="btn btn-2 w-100">
                            Сохранить
                        </button>
                    </div>
                    <div className="col-sm-7 mt-2 mt-sm-0">
                        <div className="fs-09 text-center">
                            Нажимая на кнопку “Создать тему”, вы соглашаетесь с{" "}
                            <a className="blue" href="/">
                                правилами публикации
                            </a>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default CreateTopicForm;