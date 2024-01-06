import Container from '@/app/components/Container'
import React from 'react'
import ManageOrdersClient from './ManageOrdersClient'
import getCurrentUser from '@/actions/getCurrentUser'
import NullData from '@/app/components/NullData'
import getOrders from '@/actions/getOrders'

const ManageOrders = async () => {

  const orders = await getOrders();
  const currentUser = await getCurrentUser();
 //@ts-ignore
  if(!currentUser || currentUser.Role !== 'ADMIN'){
    return <NullData title='Oops! Access Denied' />
  };

  return (
    <div>
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  )
}

export default ManageOrders