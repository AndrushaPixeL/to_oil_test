/* eslint-disable react/button-has-type */
import React from 'react'
import { CircularProgress, Typography } from '@mui/material'
import CardNews from '../../components/CardNews/CardNews'
import { useAppPresenter } from '../../redux/presenters/AppPresenter'
import AddNewsModal from '../../components/AddNewsModal/AddNewsModal'
import './Home.scss'

export const Home: React.FC = () => {
  const { values, eventHandlers } = useAppPresenter()
  return (
    <div className="home_page">
      <Typography gutterBottom variant="h5" component="div">
        {`Количество новостей: ${values.news.length}`}
      </Typography>
      <AddNewsModal />
      {values.isLoading ? (
        <div className="home_progress">
          <CircularProgress />
        </div>
      ) : (
        <div className="cards_container">
          {values.news.map((el) => (
            <div className="card" key={el.id}>
              <CardNews news={el} deleteNews={eventHandlers.handleDeleteNews} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
