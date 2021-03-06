/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useForm, Controller, SubmitHandler, FieldError } from 'react-hook-form'
import { useAppPresenter } from '../../redux/presenters/AppPresenter'
import './AddNewsModal.scss'

const defaultValues = {
  name: '',
  lastName: '',
  title: '',
  description: '',
}

type FormValues = {
  name: string
  lastName: string
  title: string
  description: string
}

export default function AddNewsModal() {
  const { eventHandlers } = useAppPresenter()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues,
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const id = Date.now() + Math.random() * 100

    const createdAt = new Date(
      `${new Date().toString().split('GMT')[0]} UTC`
    ).toISOString()

    const nextData = {
      id,
      created_at: createdAt,
      title: data.title,
      description: data.description,
      author: {
        name: data.name,
        lastname: data.lastName,
      },
    }

    eventHandlers.handleAddNews(nextData)
    handleClose()
    reset(defaultValues)
  }

  const classNames = (err: FieldError | undefined) => {
    let classNameValid = ''
    const name = err?.ref?.name
    switch (name) {
      case 'description': {
        classNameValid = 'textarea_invalid'
        break
      }
      case undefined: {
        classNameValid = ''
        break
      }
      default: {
        classNameValid = 'validate invalid'
        break
      }
    }
    return classNameValid
  }
  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Добавить новость
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal_container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="news_form">
              <Typography gutterBottom variant="h5" component="div">
                Чем хотите поделиться?
              </Typography>
              <div className="news_form_name">
                <Controller
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      value={value}
                      className={classNames(error)}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                  name="name"
                  defaultValue=""
                  control={control}
                  rules={{ required: true }}
                />
                <Controller
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <input
                      type="text"
                      placeholder="Ваша фамилия"
                      className={classNames(error)}
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                  name="lastName"
                  defaultValue=""
                  control={control}
                  rules={{ required: true }}
                />
              </div>
              <div>
                <Controller
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <input
                      type="text"
                      placeholder="Заголовок"
                      className={classNames(error)}
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                  defaultValue=""
                  name="title"
                  control={control}
                  rules={{ required: true }}
                />
              </div>
              <div>
                <Controller
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <textarea
                      className={`form_textarea ${classNames(error)}`}
                      placeholder="Описание"
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                  defaultValue=""
                  name="description"
                  control={control}
                  rules={{ required: true }}
                />
              </div>
            </div>
            <Button variant="outlined" type="submit">
              Добавить новость
            </Button>
            <Button
              variant="outlined"
              type="button"
              onClick={() => reset(defaultValues)}
            >
              Сброс
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  )
}
