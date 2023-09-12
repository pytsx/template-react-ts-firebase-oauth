import { MainCardDesign } from './MainCard.design'
import { useAuth, useFirebase } from '../../Common'
import packagejson from '../../../package.json'

const MainCardContainer = () => {
  const { perfil } = useAuth()
  const { firebaseStatus } = useFirebase()
  return (
    <MainCardDesign
      perfil={perfil}
      author={packagejson.author}
      version={packagejson.version}
    />
  )
}

export default MainCardContainer