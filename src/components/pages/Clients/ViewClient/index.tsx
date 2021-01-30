import React, { useState, useEffect, useContext } from 'react'

import { useHistory, useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import userIcon from 'assets/profile-user.svg'
import { calculateAge } from 'utils/helper'
import MyCard from 'components/common/MyCard'
import Client from 'models/client'
import { ClientContext } from 'hooks/useClientState'
import { GlobalContext } from 'hooks/useGlobalState'

import {
  getClient,
  computeTotalCountPaid,
  computeTotalCountToPay,
} from 'api/clientService'

export interface ViewClientProps {}

const ViewClient: React.SFC<ViewClientProps> = () => {
  const history = useHistory()

  const { id } = useParams<{ id: string }>()

  const [_, globalDispatch] = useContext(GlobalContext)!

  const [clientState] = useContext(ClientContext)!

  const [client, setClient] = useState<Client>()

  useEffect(() => {
    globalDispatch({ type: 'setTitle', payload: 'Client Details' })
    getClient(clientState.clients, +id).then((client) => setClient(client))
  }, [])

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
          <MyCard title={client.code}>
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
                        computeTotalCountPaid(client, clientState.plans) +
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
