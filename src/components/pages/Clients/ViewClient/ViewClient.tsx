import React, { useState, useEffect, useContext } from 'react'
import GlobalContext from 'contexts/globalContext'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import userIcon from 'assets/profile-user.svg'
import { calculateAge, getTotalCountPayment } from 'utils/helper'

import { MyCard } from 'components/Common/MyCard'
import Client from 'models/client'
import { Clients } from '../Clients'

export interface ViewClientProps {}

export const ViewClient: React.SFC<ViewClientProps> = () => {
  const history = useHistory()
  const [client, setClient] = useState<Partial<Client>>({
    id: 1,
    code: 'HEY-7634464',
    firstname: 'Fidfdfdfdfdfdfdfr',
    middlename: 'Mie',
    lastname: 'Lase',
    payment_count: 4,
    balance: 20000,
    plan: 'Plan 2',
    payment_period: 'Monthly',
    civil: 'Single',
    gender: 'Male',
    address: 'Somewhere ssdsdsd sdfdfdfdf sfdfdff',
    contact: '09234545866',
    branch: 'Somewhere',
    payment_mode: 'Installment',
    birthdate: new Date('10/03/1991'),
    end_date: new Date('09/06/2025'),
  })

  const detail = (title: string, subtitle: any) => (
    <Grid container alignItems='center' direction='column' item xs={6}>
      <Typography component='h6' variant='h6'>
        {title}
      </Typography>
      <Typography variant='subtitle1' color='textSecondary'>
        {subtitle}
      </Typography>
    </Grid>
  )

  return (
    <Grid container xs={12}>
      {client && (
        <>
          <MyCard
            title='Client Details'
            endIcon={
              <EditIcon
                style={{ color: 'white', marginTop: 5 }}
                onClick={() => history.push('/clients/edit/' + client.id)}
              />
            }
          >
            <CardContent>
              <Grid container xs={12} justify='space-between'>
                <Grid
                  style={{ paddingLeft: 10 }}
                  container
                  direction='column'
                  item
                  xs={7}
                  justify='flex-start'
                >
                  <Typography component='h6' variant='h6'>
                    {`${client.lastname}, ${client.firstname} ${client.middlename}`}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {client.plan + ' - ' + client.payment_mode}
                  </Typography>

                  <Grid item xs={1}>
                    <Chip
                      style={{ marginTop: 5 }}
                      size='small'
                      label={
                        client.payment_count +
                        '/' +
                        getTotalCountPayment(client.payment_period || null) +
                        ' Paid'
                      }
                      variant='default'
                      color='secondary'
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={5}
                  justify='center'
                  alignItems='center'
                >
                  <IconButton aria-label='play/pause'>
                    <img
                      style={{ width: 100 }}
                      src={userIcon}
                      alt='User Logo'
                    />
                  </IconButton>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {client.code}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <Divider style={{ marginLeft: 20, marginRight: 20 }}></Divider>
            <CardContent>
              <Grid spacing={1} container xs={12} style={{ paddingLeft: 10 }}>
                {detail('Period ', client.payment_period)}
                {detail('Balance', 'Php ' + client.balance)}
                {detail('Branch', client.branch)}
                {detail('Ended', client.end_date?.toLocaleDateString())}
              </Grid>
            </CardContent>
            <Divider style={{ marginLeft: 20, marginRight: 20 }}></Divider>
            <CardContent>
              <Grid spacing={1} container xs={12} style={{ paddingLeft: 10 }}>
                {detail('Gender', client.gender)}
                {detail('Civil Status', client.civil)}
                {detail('Contact', client.contact)}
                {detail(
                  'Age',
                  client.birthdate ? calculateAge(client.birthdate) : 'N/A',
                )}

                <Grid
                  container
                  alignItems='center'
                  direction='column'
                  item
                  xs={12}
                >
                  <Typography component='h6' variant='h6'>
                    Address
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {client.address}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </MyCard>
          <Grid
            style={{ paddingLeft: 18, paddingTop: 10, paddingBottom: 5 }}
            container
            xs={12}
            justify='center'
            spacing={2}
          >
            <Grid item xs={6}>
              <Button
                onClick={() => history.goBack()}
                style={{ paddingTop: 15, paddingBottom: 15 }}
                fullWidth
                variant='contained'
                color='default'
              >
                BACK
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => history.push('/clients/edit/' + client.id)}
                style={{ paddingTop: 15, paddingBottom: 15 }}
                fullWidth
                variant='contained'
                color='primary'
              >
                EDIT
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  )
}

export default ViewClient
