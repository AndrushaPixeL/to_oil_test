/* eslint react/prop-types: 0 */
import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { News } from '../../redux/types/types'
import './CardNews.scss'

interface ICardNews {
  news: News
  deleteNews: (id: number) => void
}

const CardNews: React.FC<ICardNews> = ({ news, deleteNews }) => {
  const date = new Date(news.created_at)
  const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  return (
    <Card>
      <div className="card_wrapper">
        <CardContent>
          <div className="news_header">
            <Typography gutterBottom variant="h5" component="div">
              {news.title}
            </Typography>
            <IconButton
              aria-label="settings"
              onClick={() => deleteNews(news.id)}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Typography variant="h6" color="text.secondary">
            {news?.description}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {`${news?.author.name} ${news?.author.lastname}`}
          </Typography>
          <Typography variant="button" color="text.secondary">
            {dateString}
          </Typography>
        </CardContent>
      </div>
    </Card>
  )
}
export default CardNews
