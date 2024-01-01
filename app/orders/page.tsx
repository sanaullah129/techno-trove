import Container from '@/app/components/Container'
import React from 'react'
import OrderClient from './OrderClient'
import getCurrentUser from '@/actions/getCurrentUser'
import NullData from '@/app/components/NullData'
import getOrders from '@/actions/getOrders'
import getOrderByUserId from '@/actions/getOrderByUserId'

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser){
    return <NullData title='Oops! Access Denied' />
  };

  const orders = await getOrderByUserId(currentUser.id);
  if(!orders){
    return <NullData title='Oops! No orders found' />
  };

  return (
    <div>
      <Container>
        <OrderClient orders={orders} />
      </Container>
    </div>
  )
}

export default Orders