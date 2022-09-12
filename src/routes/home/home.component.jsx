import Directory from '../../components/directory/directory.component'
import '../../components/directory/directory.styles.scss'

import { Outlet } from 'react-router-dom'


const Home = () => {
  return (
    <div>
      <Outlet />
      <Directory />
    </div>
  )
}

export default Home