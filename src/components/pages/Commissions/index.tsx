import { CommissionContext } from 'providers/CommissionProvider'
import { useContext, useEffect, useState } from 'react'
import { getCommissions } from 'services/commissionService'
import MyChips, { MyChip } from 'components/common/MyChips'
import MySearchField from 'components/common/MySearchField'
import Grid from '@material-ui/core/Grid'
import CommissionCard from './CommissionCard'
import Pagination from '@material-ui/lab/Pagination'
import { useLocation, useHistory } from 'react-router-dom'
import { GlobalContext } from 'providers/GlobalProvider'

export interface CommissionsProps {}

interface LoadProps {
  search?: string
  category?: string
  page: number
}

const Commissions: React.SFC<CommissionsProps> = () => {
  const [_, globalDispatch] = useContext(GlobalContext)!

  const [commissionState, commissionDispatch] = useContext(CommissionContext)!

  const [chip, setChip] = useState<MyChip>({ value: '', name: 'All' })

  const [page, setPage] = useState(1)

  const location = useLocation()

  const history = useHistory()

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'Commission History' })

    onLoad({ page: 1 })
  }, [])

  const onLoad = ({ page, search, category }: LoadProps) => {
    getCommissions({ page, search, category }).then(
      ({ commissions, total, pages }) => {
        commissionDispatch({
          type: 'ON_LOAD_COMMISSIONS',
          payload: { commissions, total, pages },
        })
      },
    )
  }

  const onSearch = (search: string) => {
    setChip({ value: '', name: 'All' })
    onLoad({ page: 1, search })
    setPage(1)
  }

  const onFilter = (chip: MyChip) => {
    commissionDispatch({ type: 'SET_TOTAL', payload: 0 })
    setChip(chip)
    onLoad({ page: 1, category: chip.value })
    setPage(1)
    history.push('/commissions?page=' + 1)
  }

  const chips = [
    { value: '', name: 'All' },
    { value: 'release', name: 'Release' },
    { value: 'unrelease', name: 'Unrelease' },
  ]

  const onPage = (e: any, page: number) => {
    commissionDispatch({ type: 'SET_TOTAL', payload: 0 })
    setPage(page)
    onLoad({ page, category: chip.value })
    history.push('/commissions?page=' + page)
  }

  return (
    <>
      <MySearchField onSearch={onSearch} style={{ marginBottom: 10 }} />
      <MyChips
        count={commissionState.total}
        onChipSelected={onFilter}
        active={chip}
        chips={chips}
      />
      <Grid
        container
        spacing={2}
        direction='column'
        justify='flex-start'
        alignItems='center'
      >
        {commissionState.commissions.map((commission) => (
          <Grid key={commission.id} item xs={12}>
            <CommissionCard commission={commission} />
          </Grid>
        ))}
        <Pagination
          style={{ marginTop: 15, marginBottom: 15 }}
          variant='outlined'
          color='primary'
          count={commissionState.pages}
          siblingCount={0}
          page={page}
          onChange={onPage}
        />
      </Grid>
    </>
  )
}

export default Commissions
