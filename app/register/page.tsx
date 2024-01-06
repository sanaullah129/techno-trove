import getCurrentUser from '@/actions/getCurrentUser'
import Container from '../components/Container'
import FormWrap from '../components/FormWrap'
import RegisterForm from './RegisterForm'

const Register = async () => {

  const currentUser = await getCurrentUser();

  return (
    <Container>
        <FormWrap>
        {/* @ts-ignore */}
            <RegisterForm currentUser = {currentUser} />
        </FormWrap>
    </Container>
  )
}

export default Register