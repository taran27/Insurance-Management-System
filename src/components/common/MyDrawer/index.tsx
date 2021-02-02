import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import EmployeesIcon from '@material-ui/icons/People'
import ClientIcon from '@material-ui/icons/SupervisedUserCircle'
import ExitIcon from '@material-ui/icons/ExitToApp'
import ListItem from '@material-ui/core/ListItem'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid/Grid'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { GlobalContext } from 'hooks/useGlobalState'
import { useHistory } from 'react-router-dom'

export interface MyDrawerProps {
  isActive: boolean
  onToggle: Function
}

const MyDrawer: React.FC<MyDrawerProps> = (props) => {
  const styles = useStyles()

  const history = useHistory()

  const [state, dispatch] = React.useContext(GlobalContext)!

  const menus = [
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    {
      name: 'Employee Management',
      path: '/employees',
      icon: <EmployeesIcon />,
    },
    { name: 'Client Management', path: '/clients', icon: <ClientIcon /> },
  ]

  const list = () => (
    <>
      <List>
        {menus.map((menu, index) => (
          <ListItem style={{ paddingLeft: 0 }} button key={index}>
            <ListItemIcon style={{ paddingLeft: 20 }}>{menu.icon}</ListItemIcon>

            <ListItemText
              primary={menu.name}
              onClick={() => {
                props.onToggle(menu.name)
                history.replace(menu.path)
              }}
            />
          </ListItem>
        ))}
        <Divider
          style={{
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
          }}
        ></Divider>
        <ListItem style={{ paddingLeft: 0 }} button>
          <ListItemIcon style={{ paddingLeft: 20 }}>
            <ExitIcon />
          </ListItemIcon>

          <ListItemText
            primary='Logout'
            onClick={() => {
              props.onToggle()
              dispatch({ type: 'SET_IS_AUTHENTIC_USER', payload: false })
            }}
          />
        </ListItem>
      </List>
    </>
  )

  return (
    <Drawer
      anchor='left'
      open={props.isActive}
      ModalProps={{ onBackdropClick: () => props.onToggle() }}
    >
      <Grid container justify='flex-end'>
        <IconButton
          onClick={() => props.onToggle()}
          edge='start'
          color='inherit'
          aria-label='menu'
        >
          <ChevronLeftIcon />
        </IconButton>
      </Grid>
      {list()}
      <Divider style={{ marginLeft: 10, marginRight: 10 }}></Divider>
      <FormControlLabel
        style={{ marginLeft: 10, marginTop: 10 }}
        control={
          <Switch
            checked={state.isDark}
            onChange={() => dispatch({ type: 'TOGGLE_THEME' })}
            name='checkedA'
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        }
        label='Dark Mode'
      />
    </Drawer>
  )
}

const useStyles = makeStyles((theme) => ({
  close: {
    paddingTop: 5,
    paddingRight: 5,
  },
}))

export default MyDrawer
