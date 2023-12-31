import Container from '@/app/components/Container'
import FormWrap from '@/app/components/FormWrap'
import React from 'react'
import AddProductForm from './AddProductForm'
import getCurrentUser from '@/actions/getCurrentUser'
import NullData from '@/app/components/NullData'

const AddProducts = async () => {

  const currentUser = await getCurrentUser();
  //@ts-ignore
  if(!currentUser || currentUser.Role !== 'ADMIN'){
    return <NullData title='Oops! Access Denied' />
  }

  return (
    <div className='pt-8'>
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  )
}

export default AddProducts